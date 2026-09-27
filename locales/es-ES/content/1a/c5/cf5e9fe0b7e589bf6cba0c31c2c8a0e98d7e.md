# Instrucciones

Si quieres construir algo usando una Raspberry Pi, probablemente uses _resistencias_.
Para este ejercicio, solo necesitas saber tres cosas sobre ellas:

- Cada resistencia tiene un valor de resistencia.
- Las resistencias son pequeñas, tan pequeñas de hecho que, si imprimieras en ellas el valor de la resistencia, sería difícil de leer.
  Para sortear este problema, los fabricantes imprimen en las resistencias bandas codificadas por colores que indican sus valores de resistencia.
- Cada banda actúa como un dígito de un número.
  Por ejemplo, si imprimieran una banda de color brown (valor 1) seguida de una banda de color green (valor 5), se traduciría al número 15.
  En este ejercicio, vas a crear un programa útil para no tener que recordar los valores de las bandas.
  El programa tomará 3 colores como entrada y dará como salida el valor correcto, en ohms.
  Las bandas de color se codifican de la siguiente manera:

- black: 0
- brown: 1
- red: 2
- orange: 3
- yellow: 4
- green: 5
- blue: 6
- violet: 7
- grey: 8
- white: 9

En Resistor Color Duo descifraste los dos primeros colores.
Por ejemplo: orange-orange daba el valor principal `33`.
El tercer color indica cuántos ceros hay que añadir al valor principal.
El valor principal más los ceros nos da un valor en ohms.
Para el ejercicio no importa lo que sean realmente los ohms.
Por ejemplo:

- orange-orange-black sería 33 y ningún cero, lo que da 33 ohms.
- orange-orange-red sería 33 y 2 ceros, lo que da 3300 ohms.
- orange-orange-orange sería 33 y 3 ceros, lo que da 33000 ohms.

(Si las matemáticas son lo tuyo, quizá quieras pensar en los ceros como exponentes de 10.
Si las matemáticas no son lo tuyo, quédate con los ceros.
En realidad es lo mismo, solo que dicho en lenguaje llano en lugar de jerga matemática.)

Este ejercicio consiste en traducir los colores a una etiqueta:

> "... ohms"

Así, una entrada de `"orange", "orange", "black"` debería devolver:

> "33 ohms"

Cuando llegamos a resistencias más grandes, se usa un [prefijo métrico][metric-prefix] para indicar una magnitud mayor de ohms, como «kiloohms».
Es similar a decir «2 kilómetros» en lugar de «2000 metros», o «2 kilogramos» para «2000 gramos».

Por ejemplo, una entrada de `"orange", "orange", "orange"` debería devolver:

> "33 kiloohms"

[metric-prefix]: https://en.wikipedia.org/wiki/Metric_prefix
