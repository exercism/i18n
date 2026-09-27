# Pistas

## 1. Clasifica a los clientes

- Las funciones `any()` y `all()` te pueden resultar útiles aquí.
- Puedes definir una función aparte que se use en ellas, o usar directamente una función anónima.

## 2. Separa a los clientes enfáticos

- Tienes que filtrar el diccionario.
- Un diccionario, por defecto, itera un `Pair` de clave/valor al que se puede acceder por campos (first/second) o por índice (1/2).
- Usa tu función `all_15()`.

## 3. Convierte las valoraciones a binario

- Necesitas una correspondencia de `1` a `0` y de `5` a `1`.
- Asegúrate de que la forma del array de salida sea la misma que la forma del array de entrada.

## 4. Convierte las valoraciones en una matriz

- Esto se puede hacer con `mapreduce()`.
- Usa tu función `tobinary()` para (¿parte de?) la correspondencia.
- Puedes obtener una matriz reduciendo un vector de vectores con `hcat()` o `vcat()`, según si la entrada es un vector columna o un vector fila, respectivamente.
- Vigila tu salida. ¿Es cada vector de valoraciones una fila de la matriz? La función `transpose()` te puede resultar útil en algún punto.
