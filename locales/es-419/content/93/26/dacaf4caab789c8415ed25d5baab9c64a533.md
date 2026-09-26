# Pistas

La introducción contiene casi todo lo que se necesita para este ejercicio.
La tarea 5 (el renderizado) se puede hacer antes para ayudar con la visualización, pero ten cuidado de tomar en cuenta los distintos valores posibles de los puntos.

## 1. Define el logo `Matrix` de Exercism

- ¡Dale rienda suelta a tu creatividad! Aunque también puedes simplemente copiar y pegar de las instrucciones.

## 2. Define las funciones que hacen fruncir el ceño al logo

- Recuerda que las funciones que terminan en `!` mutan el argumento (lo modifican in situ), mientras que las demás no.
- `frown!` se puede hacer mediante la asignación de elementos específicos o (menos eficientemente) intercambiando dos filas.
- `frown` va a ser muy similar a `frown!`, solo que devuelve una `copy` del argumento.

## 3. Arma un muro de calcomanías

- Usa tu función `frown()`.
- Las funciones `vcat()` y `hcat()`, o sus equivalentes, son tus aliadas aquí.
- Fíjate que hay una fila de `1`s (es decir, `X`s) que separa la mitad superior de la mitad inferior.
- La función `ones()` se puede usar si quieres, pero ten cuidado con su forma.

## 4. Cambia los puntos por recuentos de puntos por columna

- El broadcasting es una gran forma de hacer esto de manera concisa.
- Para hacer broadcasting, necesitarás un vector *fila* con los recuentos de puntos por columna.
- Para obtener un vector con los recuentos de puntos por columna, puedes aplicar una función a la `Matrix` con las `dims` especificadas.

## 5. Renderiza una matriz de puntos

- Los puntos (por ejemplo, `1`, `2`, etc.) y los `0`s se deben cambiar a `"X"` y `" "`, respectivamente.
- Usar `eachrow()` para un bucle interno puede ser útil aquí, pero no es necesario.
- La función `join()` también puede ayudar a que todo sea más conciso, y hasta se le podría aplicar broadcasting.
