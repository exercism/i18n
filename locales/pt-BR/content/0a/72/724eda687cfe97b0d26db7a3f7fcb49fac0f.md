# Robô de festa excêntrico

## História

Era uma vez um programador excêntrico que morava numa casa estranha com janelas gradeadas. Um dia, ele aceitou um trabalho de um site de vagas online para construir um robô de festa. O robô deveria cumprimentar as pessoas e ajudá-las a chegar aos seus lugares. A primeira adição era muito técnica e revelava a falta de interação humana do programador. Parte disso também foi parar na versão final.

## Tarefas

- Cumprimente cada pessoa com:

```
Welcome to my party, <name>!
```

- Uma pessoa que faz aniversário hoje é cumprimentada da seguinte forma, para exibir o conhecimento que o robô tem de cada convidado:

```
Happy birthday <name>! You are now <age> years old!
Welcome to my party!
```

- Quem pergunta pelo seu lugar recebe instruções até a sua mesa assim:

```
Welcome to my party, <name>!
You have been assigned to table <table-number-in-hex>. Your table is <direction>, exactly <distance-float> meters from here.
You will be sitting next to <neighbour-name>!
```

## Implementações

- [Go: strings][implementation-go] (implementação de referência)

## Referência

- [`types/string`][types-string]

[types-string]: https://github.com/exercism/v3/blob/main/reference/types/string.md
[implementation-go]: https://github.com/exercism/go/blob/main/exercises/concept/strings/.docs/instructions.md
