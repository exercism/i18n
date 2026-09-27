# Pistas

La introducción contiene la mayor parte de lo que se necesita para este ejercicio.
La tarea 5 (el renderizado) se puede hacer antes para ayudar con la visualización, pero ten cuidado de tener en cuenta los distintos valores posibles de los puntos.

## 1. Define el logotipo `Matrix` de Exercism

- ¡Sé creativo! Aunque también puedes simplemente copiar y pegar de las instrucciones.

## 2. Define las funciones que hacen fruncir el ceño al logotipo

- Recuerda que las funciones que terminan en `!` mutan la entrada (la modifican in situ), mientras que las demás no.
- `frown!` se puede hacer mediante la asignación de elementos concretos o, de forma menos eficiente, intercambiando dos filas.
- `frown` va a ser muy similar a `frown!`, solo que devuelve una `copy` de la matriz de entrada.

## 3. Monta un muro de pegatinas

- Usa tu función `frown()`.
- Las funciones `vcat()` y `hcat()`, o sus equivalentes, son tus aliadas aquí.
- Fíjate en que hay una fila de `1`s (es decir, `X`s) que separa la mitad superior de la mitad inferior.
- La función `ones()` se puede usar si quieres, pero ten cuidado con su forma.

## 4. Convierte los puntos en recuentos de píxeles por columna

- El broadcasting es una forma estupenda de hacerlo de manera concisa.
- Para hacer broadcasting, necesitarás un vector *fila* con el número de puntos de cada columna.
- Para obtener un vector con el número de puntos por columna, puedes aplicar una función a la `Matrix` con `dims` especificado.

## 5. Renderiza una matriz de puntos

- Los puntos (p. ej., `1`, `2`, etc.) y los `0`s deben cambiarse por `"X"` y `" "`, respectivamente.
- Usar `eachrow()` para un bucle interno puede ser útil aquí, pero no es necesario.
- La función `join()` también puede ayudar a que todo sea más conciso e incluso podría hacerse con broadcasting.
