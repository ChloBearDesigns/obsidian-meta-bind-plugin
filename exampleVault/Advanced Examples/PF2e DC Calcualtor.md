---
playerLevel: 20
InputDCLevel: 20
spellLevel: 2
---


### DC by Proficiency

| Proficiency | DC  |
| ----------- | --- |
| Untrained   | 10  |
| Trained     | 15  |
| Expert      | 20  |
| Master      | 30  |
| Legendary   | 40  |

### DC Adjustments

| Difficulty      | Adjustment |
| --------------- | ---------- |
| Incredibly Easy | -10        |
| Very Easy       | -5         |
| Easy            | -2         |
| Normal          | 0          |
| Hard            | +2         |
| Very Hard       | +5         |
| Incredibly Hard | +10        |

### DC Calculator

DC Level: `INPUT[number:playerLevel]`

| Difficulty               | DC                                                                                                    |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| Incredibly Easy          | `VIEW[({playerLevel} < 20 ? {playerLevel} + 14 + floor({playerLevel} / 3) : {playerLevel} * 2) - 10]` |
| Very Easy                | `VIEW[({playerLevel} < 20 ? {playerLevel} + 14 + floor({playerLevel} / 3) : {playerLevel} * 2) - 5]`  |
| Easy                     | `VIEW[({playerLevel} < 20 ? {playerLevel} + 14 + floor({playerLevel} / 3) : {playerLevel} * 2) - 2]`  |
| Normal                   | `VIEW[({playerLevel} < 20 ? {playerLevel} + 14 + floor({playerLevel} / 3) : {playerLevel} * 2)]`      |
| Hard (Uncommon)          | `VIEW[({playerLevel} < 20 ? {playerLevel} + 14 + floor({playerLevel} / 3) : {playerLevel} * 2) + 2]`  |
| Very Hard (Rare)         | `VIEW[({playerLevel} < 20 ? {playerLevel} + 14 + floor({playerLevel} / 3) : {playerLevel} * 2) + 5]`  |
| Incredibly Hard (Unique) | `VIEW[({playerLevel} < 20 ? {playerLevel} + 14 + floor({playerLevel} / 3) : {playerLevel} * 2) + 10]` |

Spell Level: `INPUT[number:spellLevel]`

| Spell Rarity | DC                                                                             |
| ------------ | ------------------------------------------------------------------------------ |
| Normal       | `VIEW[(({spellLevel} * 2 - 1) + 14 + floor(({spellLevel} * 2 - 1) / 3))]`      |
| Uncommon     | `VIEW[(({spellLevel} * 2 - 1) + 14 + floor(({spellLevel} * 2 - 1) / 3)) + 2]`  |
| Rare         | `VIEW[(({spellLevel} * 2 - 1) + 14 + floor(({spellLevel} * 2 - 1) / 3)) + 5]`  |
| Unique       | `VIEW[(({spellLevel} * 2 - 1) + 14 + floor(({spellLevel} * 2 - 1) / 3)) + 10]` |

