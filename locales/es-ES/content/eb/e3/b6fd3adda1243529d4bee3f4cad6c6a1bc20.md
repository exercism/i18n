# Pistas

## General

- Todas las partes de este ejercicio se basan en operaciones bit a bit.
  - El [temario de aprendizaje][concept-bitwise-operations] de Exercism ofrece una introducción sencilla.
  - Los [operadores bit a bit][ref-bitwise-operators] aparecen en el manual de Julia.
  - `Base` contiene varias funciones útiles relacionadas con bits, como [count_ones()][count_ones] y [trailing_zeros()][trailing_zeros].
- Los tests intentan no imponer los tipos, pero el ejercicio trata sobre bytes sin signo y los valores [`UInt8`][uint8] son relativamente fáciles de entender.
  - Los argumentos y los valores devueltos son `Vector{UInt8}`,
  - Los valores `UInt8` son útiles para las máscaras de bits y los valores intermedios.
- Los números decimales serían una distracción, así que es preferible usar hexadecimal (`0xFF`) o binario (`0b11111111`) para los literales de `UInt8`.
  - La función [`bitstring()`][bitstring] puede resultar útil para depurar, ya que genera un formato binario legible por humanos.
- Un mensaje sin procesar llega en un vector de fragmentos de 8 bits y hay que convertirlo en fragmentos de 7 bits en los bits de orden superior, más un bit de paridad como bit menos significativo.
  - Usa máscaras de bits con `&` o `|` para aislar los bits que quieras.
  - Los operadores de desplazamiento a la izquierda (`<<`) y de desplazamiento lógico a la derecha (`>>>`) son importantes.
  - Plantea una forma de arrastrar los bits sobrantes a la siguiente ronda de procesamiento.
  - El acarreo hace que sea difícil tratar los bytes de entrada de forma independiente unos de otros, así que recorrerlos con un bucle (o quizá con recursión) probablemente sea más fácil que intentar usar funciones de orden superior.
  - Los mensajes codificados suelen ser más largos (más bytes) que el mensaje sin procesar, para poder incluir un bit de paridad por byte.


  [concept-bitwise-operations]: https://exercism.org/tracks/julia/concepts/bitwise-operations
  [ref-bitwise-operators]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
  [count_ones]: https://docs.julialang.org/en/v1/base/numbers/#Base.count_ones
  [trailing_zeros]: https://docs.julialang.org/en/v1/base/numbers/#Base.trailing_zeros
  [uint8]: https://docs.julialang.org/en/v1/base/numbers/#Core.UInt8
  [bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
