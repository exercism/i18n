# Pistas

## General

- Todas las partes de este ejercicio se apoyan en operaciones a nivel de bits.
  - El [temario de aprendizaje][concept-bitwise-operations] de Exercism ofrece una introducción sencilla.
  - Los [operadores a nivel de bits][ref-bitwise-operators] aparecen en el manual de Julia.
  - `Base` contiene varias funciones útiles relacionadas con bits, como [count_ones()][count_ones] y [trailing_zeros()][trailing_zeros].
- Los tests tratan de no ser prescriptivos con los tipos, pero el ejercicio trata sobre bytes sin signo y es relativamente fácil razonar sobre los valores [`UInt8`][uint8].
  - Los argumentos y los valores de retorno son `Vector{UInt8}`,
  - Los valores `UInt8` son útiles para máscaras de bits y valores intermedios.
- Los números decimales serían una distracción, así que prefiere el hexadecimal (`0xFF`) o el binario (`0b11111111`) para los literales `UInt8`.
  - La función [`bitstring()`][bitstring] puede ser útil para depurar, ya que muestra el formato binario de manera legible para las personas.
- Un mensaje sin procesar viene en un vector de fragmentos de 8 bits y hay que convertirlo en fragmentos de 7 bits en los bits de orden superior, más un bit de paridad como bit menos significativo (LSB).
  - Usa máscaras de bits con `&` o `|` para aislar los bits que quieras.
  - Los operadores de desplazamiento a la izquierda (`<<`) y de desplazamiento lógico a la derecha (`>>>`) son importantes.
  - Planea una forma de acarrear los bits sobrantes a la siguiente ronda de procesamiento.
  - El acarreo hace que sea difícil manejar los bytes de entrada de forma independiente entre sí, así que probablemente sea más fácil usar un bucle (o quizás recursión) que intentar usar funciones de orden superior.
  - Los mensajes codificados suelen ser más largos (más bytes) que el mensaje sin procesar, para incluir un bit de paridad por byte.


  [concept-bitwise-operations]: https://exercism.org/tracks/julia/concepts/bitwise-operations
  [ref-bitwise-operators]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
  [count_ones]: https://docs.julialang.org/en/v1/base/numbers/#Base.count_ones
  [trailing_zeros]: https://docs.julialang.org/en/v1/base/numbers/#Base.trailing_zeros
  [uint8]: https://docs.julialang.org/en/v1/base/numbers/#Core.UInt8
  [bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
