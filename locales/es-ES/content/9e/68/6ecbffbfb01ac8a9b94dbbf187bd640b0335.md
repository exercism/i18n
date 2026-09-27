# Instrucciones

Dado un nombre y un número, tu tarea es producir una frase que use ese nombre y ese número como [número ordinal][ordinal-numeral].
Yaʻqūb espera usar números del 1 hasta el 999.

Reglas:

- Los números que terminan en 1 (salvo los que terminan en 11) → `"st"`
- Los números que terminan en 2 (salvo los que terminan en 12) → `"nd"`
- Los números que terminan en 3 (salvo los que terminan en 13) → `"rd"`
- Todos los demás números → `"th"`

Ejemplos:

- `"Mary", 1` → `"Mary, you are the 1st customer we serve today. Thank you!"`
- `"John", 12` → `"John, you are the 12th customer we serve today. Thank you!"`
- `"Dahir", 162` → `"Dahir, you are the 162nd customer we serve today. Thank you!"`

[ordinal-numeral]: https://en.wikipedia.org/wiki/Ordinal_numeral
