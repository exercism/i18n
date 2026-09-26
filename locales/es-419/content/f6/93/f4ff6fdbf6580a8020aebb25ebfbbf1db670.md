# Pistas

## 1. Clasifica a los clientes

- Las funciones `any()` o `all()` pueden ser útiles aquí.
- Puedes definir una función aparte para usarlas, o usar directamente una función anónima.

## 2. Separa a los clientes enfáticos

- Necesitas filtrar el diccionario.
- Un diccionario, por defecto, itera un `Pair` de clave/valor al que puedes acceder por campos (first/second) o por índice (1/2).
- Aprovecha tu función `all_15()`.

## 3. Convierte las calificaciones a binario

- Necesitas un mapeo de `1` a `0` y de `5` a `1`.
- Asegúrate de que la forma del array de salida sea la misma que la del array de entrada.

## 4. Convierte las calificaciones en una matriz

- Esto se puede hacer con `mapreduce()`.
- Aprovecha tu función `tobinary()` para (¿parte de?) el mapeo.
- Puedes obtener una matriz reduciendo un vector de vectores con `hcat()` o `vcat()`, según si la entrada es un vector columna o un vector fila, respectivamente.
- Fíjate en tu salida. ¿Cada vector de calificaciones es una fila de la matriz? La función `transpose()` puede ser útil en algún punto.
