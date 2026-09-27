# Dicas

## Geral

- Todas as partes deste exercício dependem de operações bit a bit.
  - O [percurso de aprendizagem][concept-bitwise-operations] do Exercism oferece uma introdução suave.
  - Os [operadores bit a bit][ref-bitwise-operators] estão listados no manual do Julia.
  - O `Base` contém várias funções úteis relacionadas com bits, incluindo [count_ones()][count_ones] e [trailing_zeros()][trailing_zeros].
- Os testes tentam não ser prescritivos quanto aos tipos, mas o exercício é sobre bytes sem sinal, e é relativamente fácil raciocinar sobre valores de [`UInt8`][uint8].
  - Os argumentos e os valores devolvidos são `Vector{UInt8}`.
  - Os valores de `UInt8` são úteis para máscaras de bits e valores intermédios.
- Os números decimais seriam uma distração, por isso dá preferência a hexadecimal (`0xFF`) ou binário (`0b11111111`) para os literais de `UInt8`.
  - A função [`bitstring()`][bitstring] pode ser útil para depurar, pois produz um formato binário legível por humanos.
- Uma mensagem em bruto chega num vetor de blocos de 8 bits e tem de ser convertida em blocos de 7 bits nos bits de ordem superior, mais um bit de paridade como LSB.
  - Usa máscaras de bits com `&` ou `|` para isolar os bits que queres.
  - Os operadores de deslocamento à esquerda (`<<`) e de deslocamento lógico à direita (`>>>`) são importantes.
  - Planeia uma forma de transportar os bits excedentes para a passagem seguinte do processamento.
  - O transporte faz com que seja difícil tratar os bytes de entrada independentemente uns dos outros, por isso o mais provável é que seja mais fácil usar um ciclo (ou talvez recursão) do que tentar usar funções de ordem superior.
  - As mensagens codificadas são normalmente mais longas (mais bytes) do que a mensagem em bruto, para acomodar um bit de paridade por byte.


  [concept-bitwise-operations]: https://exercism.org/tracks/julia/concepts/bitwise-operations
  [ref-bitwise-operators]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
  [count_ones]: https://docs.julialang.org/en/v1/base/numbers/#Base.count_ones
  [trailing_zeros]: https://docs.julialang.org/en/v1/base/numbers/#Base.trailing_zeros
  [uint8]: https://docs.julialang.org/en/v1/base/numbers/#Core.UInt8
  [bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
