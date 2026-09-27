# Instruções

Dado um nome e um número, a tua tarefa é produzir uma frase que use esse nome e esse número como [numeral ordinal][ordinal-numeral].
O Yaʻqūb espera usar números de 1 a 999.

Regras:

- Números terminados em 1 (exceto os terminados em 11) → `"st"`
- Números terminados em 2 (exceto os terminados em 12) → `"nd"`
- Números terminados em 3 (exceto os terminados em 13) → `"rd"`
- Todos os outros números → `"th"`

Exemplos:

- `"Mary", 1` → `"Mary, you are the 1st customer we serve today. Thank you!"`
- `"John", 12` → `"John, you are the 12th customer we serve today. Thank you!"`
- `"Dahir", 162` → `"Dahir, you are the 162nd customer we serve today. Thank you!"`

[ordinal-numeral]: https://en.wikipedia.org/wiki/Ordinal_numeral
