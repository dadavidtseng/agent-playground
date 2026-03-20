Usage Guide and API Reference

This document describes how to integrate and use the profile card component delivered in dist/. It includes initialization examples, API docs for setStat and toggleBio, integration snippets (vanilla JS/HTML), and references to design.md and assets/README.md for design and asset details.

References
- Design notes: docs/design.md
- Assets and optimization: assets/README.md

Quick integration (vanilla HTML + JS)

1) Copy the contents of dist/ to your public assets folder (or serve directly from repo).
2) Include the CSS and JS and the component markup.

Example index.html snippet

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Profile Card Integration</title>
  <link rel="stylesheet" href="/dist/component.css">
</head>
<body>
  <!-- Container where component will be rendered -->
  <div id="profile-root"></div>

  <script src="/dist/component.js"></script>
  <script>
    // Initialize the profile card on the element
    MyProfileCard.init(document.getElementById('profile-root'), {
      name: 'Alex Example',
      title: 'Lead Developer',
      stats: { followers: 1240, projects: 12 },
      bio: 'Passionate developer building small, useful UI components.'
    });

    // Update a stat after initialization
    MyProfileCard.setStat('followers', 1250);

    // Toggle bio visibility
    MyProfileCard.toggleBio(true);
  </script>
</body>
</html>


API Reference

All functions are exposed on the global MyProfileCard object when you include dist/component.js.

1) init(containerElement, options)
- Purpose: Render the profile card into the provided container element and attach internal handlers.
- Parameters:
  - containerElement: HTMLElement (required) — DOM element where the component will be mounted.
  - options: Object (optional) — configuration object with the following keys:
    - name: string — full name to display.
    - title: string — subtitle or role.
    - stats: object — numeric stats, e.g. { followers: 100, projects: 5 }
    - bio: string — short bio text.
- Returns: void
- Example:
  MyProfileCard.init(document.getElementById('profile-root'), { name: 'A', title: 'B' });

2) setStat(statName, value)
- Purpose: Update a numeric stat in the component (smoothly updates DOM).
- Parameters:
  - statName: string (required) — the name/key of the stat to update (e.g. 'followers', 'projects').
  - value: number (required) — new numeric value for the stat. Non-numeric values will be coerced if possible; otherwise ignored.
- Returns: boolean — true if update applied, false if stat not found or invalid.
- Behavior: If the statName exists in the rendered component, the displayed value will be updated. If it does not exist, the call returns false. The function is idempotent and safe to call repeatedly.

Example:
  // increment followers by 1
  const current = 100; // read from your app state
  MyProfileCard.setStat('followers', current + 1);


3) toggleBio(show)
- Purpose: Toggle visibility of the bio block (with a small transition).
- Parameters:
  - show: boolean | undefined — if true shows the bio, if false hides it. If omitted, toggles current state.
- Returns: boolean — new visibility state (true = visible, false = hidden).
- Behavior: Adds/removes CSS class to animate height/opacity. Safe to call before init (will return false and be a no-op).

Example:
  // show bio
  MyProfileCard.toggleBio(true);

  // toggle bio (no param)
  MyProfileCard.toggleBio();


Integration notes

- No framework required: the component uses only vanilla JS and CSS.
- The component attaches to a single container element and keeps its own state.
- If you need multiple instances on a page, call init() separately with different container elements. Each call returns an instance-scoped API (see advanced usage below).

Advanced usage: multiple instances

If you include the module multiple times, you can create multiple isolated instances like this:

<script>
  const instanceA = MyProfileCard.createInstance(document.getElementById('profile-a'), { name: 'A' });
  const instanceB = MyProfileCard.createInstance(document.getElementById('profile-b'), { name: 'B' });
  instanceA.setStat('projects', 3);
</script>

Note: createInstance is optional in the provided dist/component.js; if you need instance APIs, see the implementation comments in dist/component.js.

See also
- docs/design.md — design tokens, spacing, color guidance and SVG usage
- assets/README.md — image sources, optimization steps, licensing

Contact
For handoff questions, contact the lead programmer and designer listed in docs/HANDOFF_CHECKLIST.md
