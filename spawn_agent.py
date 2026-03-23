import re
import json
import time
from datetime import datetime

# Tools provided by environment (stubbed as imports in real agent environment)
from functions import spawn_cube, get_game_state

WORKTREE = "/mnt/c/GitHub/agent-playground-programmer"
SCENE_FILE = WORKTREE + "/scene_spec.md"
SPAWN_LOG = WORKTREE + "/spawn_log.json"
EVIDENCE_FILE = WORKTREE + "/spawn_evidence.json"

HEX_REGEX = re.compile(r"^#?([A-Fa-f0-9]{6})$")


def read_scene_spec():
    try:
        with open(SCENE_FILE, "r") as f:
            data = f.read()
        return data
    except Exception as e:
        return None


def parse_scene(data):
    """Extract primary_color_hex and position from the scene_spec.md.
    Position fallback to [0,0,0], size fallback to 1.
    Returns dict with keys: original_message, primary_color_hex, position, size
    """
    result = {
        "original_message": data,
        "primary_color_hex": None,
        "position": [0.0, 0.0, 0.0],
        "size": 1
    }
    if not data:
        return result
    # simple parsing assuming format 'key: value' per line
    for line in data.splitlines():
        line = line.strip()
        if line.startswith("primary_color_hex"):
            parts = line.split(":", 1)
            if len(parts) > 1:
                result["primary_color_hex"] = parts[1].strip().strip('"')
        if line.startswith("position"):
            parts = line.split(":", 1)
            if len(parts) > 1:
                try:
                    # eval is ok here given controlled file
                    result["position"] = [float(x) for x in eval(parts[1].strip())]
                except Exception:
                    pass
        if line.startswith("size"):
            parts = line.split(":", 1)
            if len(parts) > 1:
                try:
                    result["size"] = float(parts[1].strip())
                except Exception:
                    pass
    return result


def validate_hex(hex_str):
    if not hex_str:
        return False, None
    m = HEX_REGEX.match(hex_str.strip())
    if not m:
        return False, None
    return True, m.group(1).lower()


def hex_to_rgb(hex_nh):
    # hex_nh is 6-char without #, lower-case
    r = int(hex_nh[0:2], 16)
    g = int(hex_nh[2:4], 16)
    b = int(hex_nh[4:6], 16)
    return {"r": r, "g": g, "b": b, "a": 255}


def spawn_with_retries(position, rgb_obj, original_message, max_attempts=3):
    attempts = []
    spawn_params = {"pos": position, "color": rgb_obj}
    for attempt in range(1, max_attempts + 1):
        ts = datetime.utcnow().isoformat() + "Z"
        try:
            # spawn_cube expects {position:[x,y,z], color: {r,g,b,a}} per tool definition
            resp = spawn_cube({"position": position, "color": rgb_obj})
            entry = {
                "ts": ts,
                "msg": original_message,
                "#": '{:02x}{:02x}{:02x}'.format(rgb_obj['r'], rgb_obj['g'], rgb_obj['b']),
                "hex_valid": True,
                "pos": position,
                "rgb": [rgb_obj['r'], rgb_obj['g'], rgb_obj['b']],
                "spawn_params": {"pos": position, "color": rgb_obj},
                "attempt": attempt,
                "result": resp
            }
            attempts.append(entry)
            write_spawn_log(attempts)
            return resp, attempts
        except Exception as e:
            entry = {
                "ts": ts,
                "msg": original_message,
                "#": '{:02x}{:02x}{:02x}'.format(rgb_obj['r'], rgb_obj['g'], rgb_obj['b']),
                "hex_valid": True,
                "pos": position,
                "rgb": [rgb_obj['r'], rgb_obj['g'], rgb_obj['b']],
                "spawn_params": {"pos": position, "color": rgb_obj},
                "attempt": attempt,
                "result": {"error": str(e)}
            }
            attempts.append(entry)
            write_spawn_log(attempts)
            if attempt < max_attempts:
                backoff = 0.5 * (2 ** (attempt - 1))
                time.sleep(backoff)
                continue
            else:
                return None, attempts


def write_spawn_log(entries):
    try:
        with open(SPAWN_LOG, "w") as f:
            json.dump(entries, f, indent=2)
    except Exception:
        pass


def write_evidence(evidence):
    try:
        with open(EVIDENCE_FILE, "w") as f:
            json.dump(evidence, f, indent=2)
    except Exception:
        pass


def main():
    data = read_scene_spec()
    parsed = parse_scene(data)
    original_message = parsed.get("original_message")
    hex_raw = parsed.get("primary_color_hex")
    pos = parsed.get("position", [0.0, 0.0, 0.0])

    hex_valid, hex_clean = validate_hex(hex_raw)
    final_hex = hex_clean if hex_valid else "ffffff"
    if not hex_valid:
        # log invalid hex; no spawn attempted per QA when invalid
        entry = {
            "ts": datetime.utcnow().isoformat() + "Z",
            "msg": original_message,
            "#": hex_raw,
            "hex_valid": False,
            "pos": pos,
            "rgb": None,
            "spawn_params": None,
            "attempt": 0,
            "result": {"error": "invalid_hex"}
        }
        write_spawn_log([entry])
        print("Invalid hex; aborting spawn. See spawn_log.json")
        return

    rgb = hex_to_rgb(final_hex)

    # spawn
    resp, attempts = spawn_with_retries(pos, rgb, original_message)
    if resp is None:
        print("Spawn failed after retries; see spawn_log.json")
        return

    # capture game state
    try:
        state = get_game_state()
    except Exception as e:
        state = {"error": str(e)}

    evidence = {
        "ts": datetime.utcnow().isoformat() + "Z",
        "spawn_attempts": attempts,
        "game_state": state
    }
    write_evidence(evidence)
    print("Spawn completed. Entity info in spawn_log.json and spawn_evidence.json")


if __name__ == "__main__":
    main()
