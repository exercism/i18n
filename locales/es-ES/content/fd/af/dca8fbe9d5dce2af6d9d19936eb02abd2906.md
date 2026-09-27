# Instrucciones

Una persona amiga tuya está aprendiendo a resolver Killer Sudokus (las reglas están más abajo), pero le cuesta averiguar qué dígitos pueden ir en una jaula. Te pide que le eches una mano escribiendo un pequeño programa que enumere todas las combinaciones válidas para una jaula dada, junto con las restricciones que afectan a la jaula.

Para que la salida de tu programa sea fácil de leer, las combinaciones que devuelve deben estar ordenadas.

## Reglas del Killer Sudoku

- Se aplican las [reglas estándar del Sudoku][sudoku-rules].
- Los dígitos de una jaula, que normalmente se marcan con una línea de puntos, suman el número pequeño que aparece en la esquina de la jaula.
- Un dígito solo puede aparecer una vez en cada jaula.

Para ver una explicación más detallada, consulta [esta guía][killer-guide].

## Ejemplo 1: jaula con una sola combinación posible

En una jaula de 3 dígitos con una suma de 7, solo hay una combinación válida: 124.

- 1 + 2 + 4 = 7
- Cualquier otra combinación que sume 7, por ejemplo 232, incumpliría la regla de no repetir dígitos dentro de una jaula.

![Cuadrícula de Sudoku con tres jaulas killer marcadas como agrupadas.
La primera jaula killer está en la caja de 3×3 de la esquina superior izquierda de la cuadrícula.
La columna central de esa caja forma la jaula, con las siguientes celdas de arriba abajo: la primera celda contiene un 1 y una marca a lápiz de 7, que indica una suma de jaula de 7; la segunda celda contiene un 2; la tercera celda contiene un 5.
Los números están resaltados en rojo para indicar un error.
La segunda jaula killer está en la caja central de 3×3 de la cuadrícula.
La columna central de esa caja forma la jaula, con las siguientes celdas de arriba abajo: la primera celda contiene un 1 y una marca a lápiz de 7, que indica una suma de jaula de 7; la segunda celda contiene un 2; la tercera celda contiene un 4.
Ninguno de los números de esta jaula está resaltado, por lo que no contienen ningún error.
La tercera jaula killer sigue la esquina exterior de la caja central de 3×3 de la cuadrícula.
Está formada por las siguientes tres celdas: la celda superior izquierda de la jaula contiene un 2, resaltado en rojo, y una suma de jaula de 7.
La celda superior derecha de la jaula contiene un 3.
La celda inferior derecha de la jaula contiene un 2, resaltado en rojo. Todas las demás celdas están vacías.][one-solution-img]

## Ejemplo 2: jaula con varias combinaciones

En una jaula de 2 dígitos con una suma de 10, hay 4 combinaciones posibles:

- 19
- 28
- 37
- 46

![Cuadrícula de Sudoku con todas las casillas vacías excepto la columna central, la columna 5, que tiene 8 filas rellenas.
Cada dos filas contiguas forman una jaula killer y están marcadas como agrupadas.
De arriba abajo: el primer grupo es una celda con valor 1 y una marca a lápiz que indica una suma de jaula de 10, y una celda con valor 9.
El segundo grupo es una celda con valor 2 y una marca a lápiz de 10, y una celda con valor 8.
El tercer grupo es una celda con valor 3 y una marca a lápiz de 10, y una celda con valor 7.
El cuarto grupo es una celda con valor 4 y una marca a lápiz de 10, y una celda con valor 6.
La última celda de la columna está vacía.][four-solutions-img]

## Ejemplo 3: jaula con varias combinaciones pero restringida

En una jaula de 2 dígitos con una suma de 10, en la que la columna ya contiene un 1 y un 4, hay 2 combinaciones posibles:

- 28
- 37

19 y 46 no son posibles debido al 1 y al 4 de la columna, según las reglas estándar del Sudoku.

![Cuadrícula de Sudoku con todas las casillas vacías excepto la columna central, la columna 5, que tiene 8 filas rellenas.
La primera fila contiene un 4, la segunda está vacía y la tercera contiene un 1.
El 1 está resaltado en rojo para indicar un error.
Las últimas 6 filas de la columna forman jaulas killer de dos celdas cada una.
De arriba abajo: el primer grupo es una celda con valor 2 y una marca a lápiz que indica una suma de jaula de 10, y una celda con valor 8.
El segundo grupo es una celda con valor 3 y una marca a lápiz de 10, y una celda con valor 7.
El tercer grupo es una celda con valor 1, resaltada en rojo, y una marca a lápiz de 10, y una celda con valor 9.][not-possible-img]

## Pruébalo por tu cuenta

Si quieres intentar resolver un Killer Sudoku asequible, puedes probar [este puzzle][clover-puzzle] de Clover, presentado por [Mark Goodliffe en Cracking The Cryptic el 21 de junio de 2021][goodliffe-video].

También puedes encontrar Killer Sudokus de dificultad variable en numerosos periódicos, así como en aplicaciones de Sudoku, libros y sitios web.

## Créditos

Las capturas de pantalla anteriores se han generado con [F-Puzzles.com](https://www.f-puzzles.com/), una herramienta de creación de puzzles de Eric Fox.

[sudoku-rules]: https://masteringsudoku.com/sudoku-rules-beginners/
[killer-guide]: https://masteringsudoku.com/killer-sudoku/
[one-solution-img]: https://assets.exercism.org/images/exercises/killer-sudoku-helper/example1.png
[four-solutions-img]: https://assets.exercism.org/images/exercises/killer-sudoku-helper/example2.png
[not-possible-img]: https://assets.exercism.org/images/exercises/killer-sudoku-helper/example3.png
[clover-puzzle]: https://app.crackingthecryptic.com/sudoku/HqTBn3Pr6R
[goodliffe-video]: https://youtu.be/c_NjEbFEeW0?t=1180
