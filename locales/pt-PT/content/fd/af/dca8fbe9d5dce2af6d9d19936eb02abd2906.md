# Instruções

Um amigo teu está a aprender a resolver Killer Sudokus (as regras estão abaixo), mas tem dificuldade em perceber que algarismos podem entrar numa gaiola.
Pede-te ajuda para escrever um pequeno programa que liste todas as combinações válidas para uma determinada gaiola e todas as restrições que afetam essa gaiola.

Para que o resultado do teu programa seja fácil de ler, as combinações que ele devolve têm de estar ordenadas.

## Regras do Killer Sudoku

- Aplicam-se as [regras padrão do Sudoku][sudoku-rules].
- Os algarismos de uma gaiola, habitualmente marcada por uma linha tracejada, somam o pequeno número indicado no canto da gaiola.
- Um algarismo só pode aparecer uma vez em cada gaiola.

Para uma explicação mais detalhada, consulta [este guia][killer-guide].

## Exemplo 1: Gaiola com apenas 1 combinação possível

Numa gaiola de 3 algarismos com uma soma de 7, só há uma combinação válida: 124.

- 1 + 2 + 4 = 7
- Qualquer outra combinação que some 7, como 232, violaria a regra de não repetir algarismos dentro de uma gaiola.

![Grelha de Sudoku com três gaiolas killer marcadas como agrupadas.
A primeira gaiola killer está no bloco 3×3 do canto superior esquerdo da grelha.
A coluna central desse bloco forma a gaiola, com as seguintes células de cima para baixo: a primeira célula contém um 1 e uma marca a lápis de 7, que indica uma soma de gaiola de 7, a segunda célula contém um 2, a terceira célula contém um 5.
Os números estão destacados a vermelho para indicar um erro.
A segunda gaiola killer está no bloco 3×3 central da grelha.
A coluna central desse bloco forma a gaiola, com as seguintes células de cima para baixo: a primeira célula contém um 1 e uma marca a lápis de 7, que indica uma soma de gaiola de 7, a segunda célula contém um 2, a terceira célula contém um 4.
Nenhum dos números desta gaiola está destacado e, por isso, não contém erros.
A terceira gaiola killer segue o canto exterior do bloco 3×3 central da grelha.
É composta pelas três células seguintes: a célula superior esquerda da gaiola contém um 2, destacado a vermelho, e uma soma de gaiola de 7.
A célula superior direita da gaiola contém um 3.
A célula inferior direita da gaiola contém um 2, destacado a vermelho. Todas as outras células estão vazias.][one-solution-img]

## Exemplo 2: Gaiola com várias combinações

Numa gaiola de 2 algarismos com uma soma de 10, há 4 combinações possíveis:

- 19
- 28
- 37
- 46

![Grelha de Sudoku com todas as células vazias, exceto a coluna central, a coluna 5, que tem 8 linhas preenchidas.
Cada duas linhas contíguas formam uma gaiola killer e estão marcadas como agrupadas.
De cima para baixo: o primeiro grupo é uma célula com o valor 1 e uma marca a lápis que indica uma soma de gaiola de 10, e uma célula com o valor 9.
O segundo grupo é uma célula com o valor 2 e uma marca a lápis de 10, e uma célula com o valor 8.
O terceiro grupo é uma célula com o valor 3 e uma marca a lápis de 10, e uma célula com o valor 7.
O quarto grupo é uma célula com o valor 4 e uma marca a lápis de 10, e uma célula com o valor 6.
A última célula da coluna está vazia.][four-solutions-img]

## Exemplo 3: Gaiola com várias combinações sujeita a restrições

Numa gaiola de 2 algarismos com uma soma de 10, em que a coluna já contém um 1 e um 4, há 2 combinações possíveis:

- 28
- 37

19 e 46 não são possíveis devido ao 1 e ao 4 na coluna, segundo as regras padrão do Sudoku.

![Grelha de Sudoku com todas as células vazias, exceto a coluna central, a coluna 5, que tem 8 linhas preenchidas.
A primeira linha contém um 4, a segunda está vazia e a terceira contém um 1.
O 1 está destacado a vermelho para indicar um erro.
As últimas 6 linhas da coluna formam gaiolas killer de duas células cada.
De cima para baixo: o primeiro grupo é uma célula com o valor 2 e uma marca a lápis que indica uma soma de gaiola de 10, e uma célula com o valor 8.
O segundo grupo é uma célula com o valor 3 e uma marca a lápis de 10, e uma célula com o valor 7.
O terceiro grupo é uma célula com o valor 1, destacada a vermelho, e uma marca a lápis de 10, e uma célula com o valor 9.][not-possible-img]

## Experimenta

Se quiseres experimentar um Killer Sudoku acessível, podes tentar [este puzzle][clover-puzzle] da autoria de Clover, apresentado por [Mark Goodliffe no Cracking The Cryptic, a 21 de junho de 2021][goodliffe-video].

Também encontras Killer Sudokus de várias dificuldades em muitos jornais, bem como em aplicações, livros e sites de Sudoku.

## Créditos

As imagens acima foram geradas com o [F-Puzzles.com](https://www.f-puzzles.com/), uma ferramenta de criação de puzzles de Eric Fox.

[sudoku-rules]: https://masteringsudoku.com/sudoku-rules-beginners/
[killer-guide]: https://masteringsudoku.com/killer-sudoku/
[one-solution-img]: https://assets.exercism.org/images/exercises/killer-sudoku-helper/example1.png
[four-solutions-img]: https://assets.exercism.org/images/exercises/killer-sudoku-helper/example2.png
[not-possible-img]: https://assets.exercism.org/images/exercises/killer-sudoku-helper/example3.png
[clover-puzzle]: https://app.crackingthecryptic.com/sudoku/HqTBn3Pr6R
[goodliffe-video]: https://youtu.be/c_NjEbFEeW0?t=1180
