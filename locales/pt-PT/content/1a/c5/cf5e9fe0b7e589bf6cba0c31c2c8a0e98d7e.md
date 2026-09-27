# Instruções

Se queres construir algo com um Raspberry Pi, provavelmente vais usar _resistências_.
Para este exercício, só precisas de saber três coisas sobre elas:

- Cada resistência tem um valor de resistência.
- As resistências são pequenas, tão pequenas que, se imprimisses nelas o valor da resistência, seria difícil de ler.
  Para contornar este problema, os fabricantes imprimem nas resistências faixas com códigos de cor que indicam os seus valores de resistência.
- Cada faixa funciona como um algarismo de um número.
  Por exemplo, se imprimissem uma faixa brown (valor 1) seguida de uma faixa green (valor 5), isso corresponderia ao número 15.
  Neste exercício, vais criar um programa útil para não teres de memorizar os valores das faixas.
  O programa recebe 3 cores como parâmetros de entrada e devolve o valor correto, em ohms.
  As faixas de cor estão codificadas da seguinte forma:

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

Em Duo de Cores de Resistência, descodificaste as duas primeiras cores.
Por exemplo: orange-orange deu o valor principal `33`.
A terceira cor indica quantos zeros é preciso acrescentar ao valor principal.
O valor principal mais os zeros dá-nos um valor em ohms.
Para este exercício, não interessa o que os ohms são na realidade.
Por exemplo:

- orange-orange-black seria 33 e nenhum zero, o que dá 33 ohms.
- orange-orange-red seria 33 e 2 zeros, o que dá 3300 ohms.
- orange-orange-orange seria 33 e 3 zeros, o que dá 33000 ohms.

(Se a matemática é a tua praia, podes pensar nos zeros como expoentes de 10.
Se a matemática não é a tua praia, fica com os zeros.
É exatamente a mesma coisa, só dita em linguagem simples em vez de jargão matemático.)

Este exercício consiste em traduzir as cores para um rótulo:

> "... ohms"

Assim, uma chamada com os valores de entrada `"orange", "orange", "black"` deve devolver:

> "33 ohms"

Quando chegamos a resistências maiores, usa-se um [prefixo métrico][metric-prefix] para indicar uma magnitude maior de ohms, como "kiloohms".
É semelhante a dizer "2 quilómetros" em vez de "2000 metros", ou "2 quilogramas" para "2000 gramas".

Por exemplo, uma chamada com os valores de entrada `"orange", "orange", "orange"` deve devolver:

> "33 kiloohms"

[metric-prefix]: https://en.wikipedia.org/wiki/Metric_prefix
