# Istruzioni

Dato un nome e un numero, il tuo compito è produrre una frase che usi quel nome e quel numero come [numero ordinale][ordinal-numeral].
Yaʻqūb prevede di usare numeri da 1 fino a 999.

Regole:

- I numeri che terminano con 1 (a meno che non terminino con 11) → `"st"`
- I numeri che terminano con 2 (a meno che non terminino con 12) → `"nd"`
- I numeri che terminano con 3 (a meno che non terminino con 13) → `"rd"`
- Tutti gli altri numeri → `"th"`

Esempi:

- `"Mary", 1` → `"Mary, you are the 1st customer we serve today. Thank you!"`
- `"John", 12` → `"John, you are the 12th customer we serve today. Thank you!"`
- `"Dahir", 162` → `"Dahir, you are the 162nd customer we serve today. Thank you!"`

[ordinal-numeral]: https://en.wikipedia.org/wiki/Ordinal_numeral
