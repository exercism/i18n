# Descrição

Neste exercício, você vai criar um programa útil para não precisar decorar os valores das faixas.
O programa vai receber 1, 4 ou 5 cores como entrada e retornar o valor correto em ohms.
As faixas de cor são codificadas da seguinte forma:

| Cor    | Valor |
| ------ | ----- |
| Black  | 0     |
| Brown  | 1     |
| Red    | 2     |
| Orange | 3     |
| Yellow | 4     |
| Green  | 5     |
| Blue   | 6     |
| Violet | 7     |
| Gray   | 8     |
| White  | 9     |

Em [`Resistor Color Trio`][resistor-color-trio-exercise] você decodificou as três primeiras faixas de cor.
Por exemplo: orange-orange-brown corresponde ao valor principal `330`.
Neste exercício, você vai precisar acrescentar a _tolerância_ nessa conta.
A tolerância é a quantidade máxima que um valor pode ficar acima ou abaixo do valor principal.
Por exemplo, se a última faixa for green, a tolerância máxima será `±0.5%`.

A faixa de tolerância terá um destes valores:

| Cor    | Tolerância |
| ------ | ---------: |
| Grey   |    ±0.05% |
| Violet |    ±0.10% |
| Blue   |    ±0.25% |
| Green  |    ±0.50% |
| Brown  |    ±1.00% |
| Red    |    ±2.00% |
| Gold   |    ±5.00% |
| Silver |   ±10.00% |

O resistor de quatro faixas é montado assim:

| Faixa_1 | Faixa_2 | Faixa_3       | Faixa_4    |
| ------- | ------- | ------------- | ---------- |
| Valor_1 | Valor_2 | Multiplicador | Tolerância |

Exemplos:

- orange-orange-brown-green seria `330` ohms com tolerância de `±0.5%`.
- orange-orange-red-grey seria `3300` ohms com tolerância de `±0.05%`.

A diferença entre um resistor de quatro e de cinco faixas é que o de cinco faixas tem uma faixa extra para indicar um valor mais preciso.

| Faixa_1 | Faixa_2 | Faixa_3 | Faixa_4       | Faixa_5    |
| ------- | ------- | ------- | ------------- | ---------- |
| Valor_1 | Valor_2 | Valor_3 | Multiplicador | Tolerância |

Exemplos:

- orange-orange-orange-black-green seria `333` ohms com tolerância de `±0.5%`.
- orange-red-orange-blue-violet seria `323 million` ohms com tolerância de `±0.1%`.

Existem também resistores de uma faixa.
Resistores de uma faixa têm apenas a cor black, com valor 0.

Seu programa deve converter uma `list` de cores de faixas de resistor em um rótulo:

"... ohms ±...%"

Então, uma `list` de entrada `["orange", "orange", "black", "green"]` deve retornar:

"33 ohms ±0.5%"

Quando há milhares de ohms, dizemos "kiloohms".
É parecido com dizer "quilômetro" para 1000 metros e "quilograma" para 1000 gramas.

Então, uma `list` de entrada `["orange", "orange", "orange", "grey"]` deve retornar:

"33 kiloohms ±0.05%"

Quando há milhões de ohms, dizemos "megaohms".

Então, uma `list` de entrada `["orange", "orange", "blue", "red"]` deve retornar:

"33 megaohms ±2%"

[resistor-color-trio-exercise]: https://exercism.org/tracks/python/exercises/resistor-color-trio
