# Instruções

Se você quer construir algo usando um Raspberry Pi, provavelmente vai usar _resistores_.
Para este exercício, você só precisa saber três coisas sobre eles:

- Cada resistor tem um valor de resistência.
- Resistores são pequenos. Tão pequenos que, se você imprimisse o valor da resistência neles, seria difícil de ler.
  Para contornar esse problema, os fabricantes imprimem faixas codificadas por cores nos resistores para indicar seus valores de resistência.
- Cada faixa funciona como um dígito de um número.
  Por exemplo, se eles imprimissem uma faixa brown (valor 1) seguida por uma faixa green (valor 5), isso corresponderia ao número 15.
  Neste exercício, você vai criar um programa útil para não precisar lembrar os valores das faixas.
  O programa receberá 3 cores como entrada e retornará o valor correto, em ohms.
  As faixas de cores são codificadas da seguinte forma:

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

No Duo de Cores de Resistores, você decodificou as duas primeiras cores.
Por exemplo: orange-orange deu o valor principal `33`.
A terceira cor representa quantos zeros precisam ser adicionados ao valor principal.
O valor principal mais os zeros nos dá um valor em ohms.
Para o exercício, não importa o que ohms realmente são.
Por exemplo:

- orange-orange-black seria 33 e nenhum zero, o que resulta em 33 ohms.
- orange-orange-red seria 33 e 2 zeros, o que resulta em 3300 ohms.
- orange-orange-orange seria 33 e 3 zeros, o que resulta em 33000 ohms.

(Se você curte matemática, talvez queira pensar nos zeros como expoentes de 10.
Se não curte, fique com os zeros.
É realmente a mesma coisa, só que em linguagem comum em vez de jargão matemático.)

Este exercício é sobre traduzir as cores para um rótulo:

> "... ohms"

Então, uma entrada de `"orange", "orange", "black"` deve retornar:

> "33 ohms"

Quando chegamos a resistores maiores, um [prefixo métrico][metric-prefix] é usado para indicar uma magnitude maior de ohms, como "kiloohms".
Isso é parecido com dizer "2 quilômetros" em vez de "2000 metros", ou "2 quilogramas" para "2000 gramas".

Por exemplo, uma entrada de `"orange", "orange", "orange"` deve retornar:

> "33 kiloohms"

[metric-prefix]: https://en.wikipedia.org/wiki/Metric_prefix
