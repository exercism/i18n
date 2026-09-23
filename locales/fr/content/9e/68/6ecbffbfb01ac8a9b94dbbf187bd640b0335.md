# Instructions

On te donne un nom et un nombre. Ta tâche est de produire une phrase qui utilise ce nom et ce nombre en tant que [nombre ordinal][ordinal-numeral].
Yaʻqūb s'attend à utiliser des nombres de 1 à 999.

Règles :

- Les nombres finissant par 1 (sauf s'ils finissent par 11) → `"st"`
- Les nombres finissant par 2 (sauf s'ils finissent par 12) → `"nd"`
- Les nombres finissant par 3 (sauf s'ils finissent par 13) → `"rd"`
- Tous les autres nombres → `"th"`

Exemples :

- `"Mary", 1` → `"Mary, you are the 1st customer we serve today. Thank you!"`
- `"John", 12` → `"John, you are the 12th customer we serve today. Thank you!"`
- `"Dahir", 162` → `"Dahir, you are the 162nd customer we serve today. Thank you!"`

[ordinal-numeral]: https://en.wikipedia.org/wiki/Ordinal_numeral
