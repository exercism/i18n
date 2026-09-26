# Dicas

## Geral

- Todas as partes deste exercício dependem de operações bit a bit.
  - O [Learning Syllabus][concept-bitwise-operations] do Exercism oferece uma introdução suave.
  - Os [operadores bit a bit][ref-bitwise-operators] estão listados no manual do Julia.
  - O `Base` contém várias funções úteis relacionadas a bits, incluindo [count_ones()][count_ones] e [trailing_zeros()][trailing_zeros].
- Os testes tentam não ser prescritivos quanto a tipos, mas o exercício é sobre bytes sem sinal, e valores [`UInt8`][uint8] são relativamente fáceis de raciocinar.
  - Os argumentos e os valores de retorno são `Vector{UInt8}`,
  - Os valores `UInt8` são úteis para máscaras de bits e valores intermediários.
- Números decimais seriam uma distração, então prefira hexadecimal (`0xFF`) ou binário (`0b11111111`) para literais `UInt8`.
  - A função [`bitstring()`][bitstring] pode ser útil no debug, pois mostra o valor em um formato binário legível para humanos.
- Uma mensagem bruta chega em um vetor de blocos de 8 bits e precisa ser convertida em blocos de 7 bits nos bits de ordem superior, mais um bit de paridade como o LSB.
  - Use máscaras de bits com `&` ou `|` para isolar os bits que você quer.
  - Os operadores de deslocamento à esquerda (`<<`) e de deslocamento à direita lógico (`>>>`) são importantes.
  - Planeje uma forma de transportar os bits excedentes para a próxima rodada de processamento.
  - O transporte dificulta tratar os bytes de entrada de forma independente uns dos outros, então usar um laço (ou talvez recursão) provavelmente é mais fácil do que tentar usar funções de ordem superior.
  - Mensagens codificadas costumam ser mais longas (mais bytes) que a mensagem bruta, para acomodar um bit de paridade por byte.


  [concept-bitwise-operations]: https://exercism.org/tracks/julia/concepts/bitwise-operations
  [ref-bitwise-operators]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
  [count_ones]: https://docs.julialang.org/en/v1/base/numbers/#Base.count_ones
  [trailing_zeros]: https://docs.julialang.org/en/v1/base/numbers/#Base.trailing_zeros
  [uint8]: https://docs.julialang.org/en/v1/base/numbers/#Core.UInt8
  [bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
