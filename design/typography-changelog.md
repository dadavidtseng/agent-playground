Changelog: design/typography.md

Task ID: 7ae1c737-e6fe-4feb-8387-c476b342de20
Merge owner: Designer agent
Date: 2026-03-02

Summary

Merged Designer and Artist contributions into a single, canonical typography spec. Kept Designer's original structure and naming where possible and integrated Artist suggestions when they improved clarity or provided optional enhancements.

Decisions and rationale

1. Token naming
- The Artist proposed shorthand tokens (e.g., --fs-*, --fw-*). To avoid ambiguity and improve readability for engineers and designers alike, we standardized on the full, descriptive token names: --font-size-*, --font-weight-*, etc. This ensures consistency with existing token naming conventions in the repo.

2. Serif family
- The Artist suggested adding a serif family token for decorative headings. We included --font-family-serif as an optional token, marked in the spec for display/heading use only.

3. Utility tokens
- The Designer used the token name --font-scale-ratio in comments and documentation; the earlier file referenced --font-scale-step in one place. We standardized on --font-scale-ratio and updated the documentation accordingly.

4. Examples and usage
- Kept Designer's example CSS and accessibility notes. Where the Artist provided slight wording changes, we merged them in without changing intent.

5. No changes to color-palette.md
- Per restriction, color-palette.md was not modified or referenced beyond a note to import color tokens first.

Files changed

- design/typography.md (merged content; finalized token list)
- design/typography-changelog.md (this changelog)

Mapping from Artist shorthand (documented)

- --fs-xs -> --font-size-xs
- --fs-sm -> --font-size-sm
- --fs-base -> --font-size-base
- --fs-lg -> --font-size-lg
- --fw-regular -> --font-weight-regular
- --fw-bold -> --font-weight-bold

Notes for maintainers

- The finalized typography token list is intended to be the canonical source for developers. If the team later prefers shorthand aliases, add them in a separate tokens alias file rather than changing the canonical names.
- Any future changes to token names should be coordinated between design and engineering and recorded in the changelog.
