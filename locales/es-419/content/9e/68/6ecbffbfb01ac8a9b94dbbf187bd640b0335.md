# Instrucciones

Dados un nombre y un número, tu tarea es construir una oración que use ese nombre y ese número como un [número ordinal][ordinal-numeral].
Yaʻqūb espera usar números del 1 hasta el 999.

Reglas:

- Números que terminan en 1 (a menos que terminen en 11) → `"st"`
- Números que terminan en 2 (a menos que terminen en 12) → `"nd"`
- Números que terminan en 3 (a menos que terminen en 13) → `"rd"`
- Todos los demás números → `"th"`

Ejemplos:

- `"Mary", 1` → `"Mary, you are the 1st customer we serve today. Thank you!"`
- `"John", 12` → `"John, you are the 12th customer we serve today. Thank you!"`
- `"Dahir", 162` → `"Dahir, you are the 162nd customer we serve today. Thank you!"`

[ordinal-numeral]: https://en.wikipedia.org/wiki/Ordinal_numeral
