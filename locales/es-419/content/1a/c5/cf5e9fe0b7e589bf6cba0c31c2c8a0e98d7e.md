# Instrucciones

Si quieres construir algo con una Raspberry Pi, probablemente usarás _resistencias_.
Para este ejercicio, solo necesitas saber tres cosas sobre ellas:

- Cada resistencia tiene un valor de resistencia.
- Las resistencias son pequeñas, tan pequeñas que si imprimieras el valor de la resistencia en ellas, sería difícil de leer.
  Para solucionar este problema, los fabricantes imprimen bandas codificadas por colores sobre las resistencias para indicar sus valores de resistencia.
- Cada banda actúa como un dígito de un número.
  Por ejemplo, si imprimieran una banda brown (valor 1) seguida de una banda green (valor 5), se traduciría al número 15.
  En este ejercicio vas a crear un programa útil para que no tengas que recordar los valores de las bandas.
  El programa tomará 3 colores como entrada y devolverá el valor correcto, en ohmios.
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

En Dúo de colores de resistencias descifraste los dos primeros colores.
Por ejemplo: orange-orange daba el valor principal `33`.
El tercer color indica cuántos ceros hay que agregar al valor principal.
El valor principal más los ceros nos da un valor en ohmios.
Para el ejercicio no importa qué son en realidad los ohmios.
Por ejemplo:

- orange-orange-black sería 33 y ningún cero, lo que da 33 ohms.
- orange-orange-red sería 33 y 2 ceros, lo que da 3300 ohms.
- orange-orange-orange sería 33 y 3 ceros, lo que da 33000 ohms.

(Si las matemáticas son lo tuyo, quizá quieras pensar en los ceros como exponentes de 10.
Si las matemáticas no son lo tuyo, quédate con los ceros.
En realidad es lo mismo, solo que en palabras sencillas en lugar de jerga matemática.)

Este ejercicio consiste en traducir los colores a una etiqueta:

> «... ohms»

Así que una entrada de `"orange", "orange", "black"` debería devolver:

> «33 ohms»

Cuando pasamos a resistencias más grandes, se usa un [prefijo métrico][metric-prefix] para indicar una magnitud mayor de ohmios, como «kiloohms».
Es similar a decir «2 kilómetros» en lugar de «2000 metros», o «2 kilogramos» por «2000 gramos».

Por ejemplo, una entrada de `"orange", "orange", "orange"` debería devolver:

> «33 kiloohms»

[metric-prefix]: https://en.wikipedia.org/wiki/Metric_prefix
