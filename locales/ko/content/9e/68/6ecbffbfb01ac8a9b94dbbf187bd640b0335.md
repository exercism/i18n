# 지침

이름과 숫자가 주어지면, 그 이름과 숫자를 [서수][ordinal-numeral]로 사용해 문장을 만드는 것이 과제예요.
Yaʻqūb은 1부터 999까지의 숫자를 사용할 예정이에요.

규칙:

- 1로 끝나는 숫자 (11로 끝나는 경우는 제외) → `"st"`
- 2로 끝나는 숫자 (12로 끝나는 경우는 제외) → `"nd"`
- 3으로 끝나는 숫자 (13으로 끝나는 경우는 제외) → `"rd"`
- 그 외의 모든 숫자 → `"th"`

예시:

- `"Mary", 1` → `"Mary, you are the 1st customer we serve today. Thank you!"`
- `"John", 12` → `"John, you are the 12th customer we serve today. Thank you!"`
- `"Dahir", 162` → `"Dahir, you are the 162nd customer we serve today. Thank you!"`

[ordinal-numeral]: https://en.wikipedia.org/wiki/Ordinal_numeral
