---
number1: 11
number2: 20
unit: km
---

`INPUT[number:number1]`
`INPUT[number:number2]`
`INPUT[text:unit]`

Number one is: `VIEW[{number1}]` units
Number two is: `VIEW[{number2}]` units

Combined: `VIEW[{number1} * {number2}]` cm equals `VIEW[{number2} * {number1} cm to {unit}]`