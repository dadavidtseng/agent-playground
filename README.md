Spawn Agent

This agent reads scene_spec.md, validates color and position, converts hex to RGB, calls spawn_cube, and records spawn_log.json and spawn_evidence.json.

How to run:
- python spawn_agent.py

Artifacts produced:
- spawn_log.json: per-attempt entries including parsed values and spawn results.
- spawn_evidence.json: includes spawn attempts and get_game_state output.
