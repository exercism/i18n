# Descrição

Neste exercício, vais criar um programa útil para não teres de te lembrar dos valores das bandas.
O programa recebe 1, 4 ou 5 cores como entrada e devolve o valor correto em ohms.
As bandas de cor estão codificadas da seguinte forma:

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

Em [`Resistor Color Trio`][resistor-color-trio-exercise] descodificaste as três primeiras bandas de cor.
Por exemplo: orange-orange-brown corresponde ao valor principal `330`.
Neste exercício, tens de acrescentar a _tolerância_ à mistura.
A tolerância é a quantidade máxima que um valor pode estar acima ou abaixo do valor principal.
Por exemplo, se a última banda for green, a tolerância máxima será `±0.5%`.

A banda de tolerância terá um destes valores:

| Cor    | Tolerância |
| ------ | ---------: |
| Grey   |    ±0.05%  |
| Violet |    ±0.10%  |
| Blue   |    ±0.25%  |
| Green  |    ±0.50%  |
| Brown  |    ±1.00%  |
| Red    |    ±2.00%  |
| Gold   |    ±5.00%  |
| Silver |   ±10.00%  |

A resistência de quatro bandas compõe-se da seguinte forma:

| Banda_1 | Banda_2 | Banda_3    | Banda_4   |
| ------- | ------- | ---------- | --------- |
| Valor_1 | Valor_2 | Multiplier | Tolerance |

Exemplos:

- orange-orange-brown-green corresponderia a `330` ohms, com uma tolerância de `±0.5%`.
- orange-orange-red-grey corresponderia a `3300` ohms, com uma tolerância de `±0.05%`.

A diferença entre uma resistência de quatro e de cinco bandas é que a de cinco bandas tem uma banda extra para indicar um valor mais preciso.

| Banda_1 | Banda_2 | Banda_3 | Banda_4    | Banda_5   |
| ------- | ------- | ------- | ---------- | --------- |
| Valor_1 | Valor_2 | Valor_3 | Multiplier | Tolerance |

Exemplos:

- orange-orange-orange-black-green corresponderia a `333` ohms, com uma tolerância de `±0.5%`.
- orange-red-orange-blue-violet corresponderia a `323 million` ohms, com uma tolerância de `±0.1%`.

Também existem resistências de uma só banda.
As resistências de uma só banda têm apenas a cor black, com o valor 0.

O teu programa deve traduzir uma `list` de cores de bandas de resistência, dada como entrada, numa etiqueta:

"... ohms ±...%"

Assim, uma `list` de entrada `["orange", "orange", "black", "green"]` deve devolver:

"33 ohms ±0.5%"

Quando há milhares de ohms, dizemos "kiloohms".
É semelhante a dizer "quilómetro" para 1000 metros e "quilogramas" para 1000 gramas.

Assim, uma `list` de entrada `["orange", "orange", "orange", "grey"]` deve devolver:

"33 kiloohms ±0.05%"

Quando há milhões de ohms, dizemos "megaohms".

Assim, uma `list` de entrada `["orange", "orange", "blue", "red"]` deve devolver:

"33 megaohms ±2%"

[resistor-color-trio-exercise]: https://exercism.org/tracks/python/exercises/resistor-color-trio
