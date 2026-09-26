# Instructions

Analiza y evalúa problemas verbales de matemáticas sencillos y devuelve la respuesta como un número entero.

## Iteración 0: números

Los problemas sin operaciones simplemente dan como resultado el número indicado.

> What is 5?

Da como resultado 5.

## Iteración 1: suma

Suma dos números.

> What is 5 plus 13?

Da como resultado 18.

Maneja números grandes y números negativos.

## Iteración 2: resta, multiplicación y división

Ahora, realiza las otras tres operaciones.

> What is 7 minus 5?

2

> What is 6 multiplied by 4?

24

> What is 25 divided by 5?

5

## Iteración 3: varias operaciones

Maneja un conjunto de operaciones, en secuencia.

Como estos son problemas verbales, evalúa la expresión de izquierda a derecha, _ignorando el orden de operaciones habitual._

> What is 5 plus 13 plus 6?

24

> What is 3 plus 2 multiplied by 3?

15 (es decir, no 9)

## Iteración 4: errores

El analizador debe rechazar:

* Operaciones no compatibles («What is 52 cubed?»)
* Preguntas que no son de matemáticas («Who is the President of the United States»)
* Problemas verbales con sintaxis no válida («What is 1 plus plus 2?»)

## Extra: exponenciales

Si quieres, maneja también las exponenciales.

> What is 2 raised to the 5th power?

32
