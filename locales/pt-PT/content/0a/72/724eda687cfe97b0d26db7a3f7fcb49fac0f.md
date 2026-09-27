# Robô de Festa Excêntrico

## História

Era uma vez um programador excêntrico que vivia numa casa estranha com janelas com grades.
Um dia, aceitou um trabalho num site de ofertas de emprego para construir um robô de festa. O
robô devia cumprimentar as pessoas e ajudá-las a chegar aos seus lugares. A primeira versão
era muito técnica e revelava a falta de interação humana do programador. Alguns desses traços
também ficaram na edição final.

## Tarefas

- Cumprimenta cada pessoa com:

```
Welcome to my party, <name>!
```

- Um convidado que faz anos hoje é cumprimentado da seguinte forma, para mostrar o conhecimento que o robô tem de cada convidado:

```
Happy birthday <name>! You are now <age> years old!
Welcome to my party!
```

- A quem pergunta pelo seu lugar são dadas indicações até à sua mesa com:

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
