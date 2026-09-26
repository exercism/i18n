# Introdução

No Common Lisp, o tempo é representado de quatro maneiras, e duas delas serão abordadas aqui.

- O tempo universal é um tempo absoluto, um número inteiro que representa a quantidade de segundos desde `1900-01-01T00:00:00Z` (ou seja, a meia-noite de 1º de janeiro de 1900 no UTC).
- O tempo decodificado é uma tupla de 9 valores que, juntos, representam um momento específico do calendário: segundos, minutos, hora, dia do mês, mês, ano, dia da semana, indicador de horário de verão e fuso horário.
(Abordado em detalhes abaixo.)

## Tempo universal

Para obter o tempo universal atual, use `get-universal-time` ou `get-decoded-time`.
A primeira retorna os segundos atuais desde `1900-01-01T00:00Z` e a segunda retorna os mesmos dados em formato decodificado.

## Tempo decodificado

`decode-universal-time` e `encode-universal-time` são as principais funções para trabalhar com tempo.
A primeira recebe um tempo universal e retorna um valor de tempo decodificado como [múltiplos valores][concept-multiple-values] e a segunda recebe os valores de tempo decodificado como argumentos e retorna um tempo universal.

Ambas recebem um argumento opcional de fuso horário.
Veja abaixo o formato do fuso horário.

Um tempo decodificado é um conjunto de valores:

- *segundos*: um número inteiro entre 0 e 59
- *minutos*: um número inteiro entre 0 e 59
- *hora*: um número inteiro entre 0 e 23
- *dia do mês*: um número inteiro entre 1 e 31 (o limite superior, na verdade, depende do mês e do ano, obviamente)
- *mês*: um número inteiro entre 1 e 12
- *ano*: um número inteiro que indica o ano.
- *dia da semana*: um número inteiro entre 0 e 6. 0 significa segunda-feira, 1 significa terça-feira etc. ... 6 significa domingo.
- *indicador de horário de verão*: um valor verdadeiro indica que o horário de verão está em vigor.
- *fuso horário*: um número de horas entre -24 e 24 que representa o deslocamento em relação ao UTC.
O número é um número racional e deve ser um múltiplo de `1/3600`

```lisp
(encode-universal-time 1 2 3 4 5 2000 0) ; => 3166398121
(decode-universal-time 3166398121)       ; => 1
                                         ;    2
                                         ;    3
                                         ;    4
                                         ;    5
                                         ;    2000
                                         ;    3 (Thursday)
                                         ;    NIL
                                         ;    0
(decode-universal-time 2208988800) ; => 0
                                   ;    0
                                   ;    0
                                   ;    1
                                   ;    1
                                   ;    1970
                                   ;    3
                                   ;    NIL
                                   ;    0
```

[concept-multiple-values]: /tracks/common-lisp/concepts/multiple-values
