Manual Test Checklist

1) initCharacterCard
- [ ] Passing minimal data returns a card with id, name, level, hp, mp, stats, createdAt
- [ ] Providing non-numeric stats coerces to numbers or zero
- [ ] Missing fields default to sensible values (level:1, hp:0, mp:0)

2) updateStats
- [ ] Additive mode: hp/mp/level/stat deltas apply additively
- [ ] Absolute mode: values replace existing fields when mode==='absolute'
- [ ] Unspecified fields remain unchanged
- [ ] updatedAt is populated after update

3) Integration
- [ ] Exported functions can be required/imported from src/ folder
- [ ] Tokens map correctly to fields when used in templates

Notes
- Use node >=10 for JSON cloning convenience
- The library is intentionally small and dependency-free for easy embedding
