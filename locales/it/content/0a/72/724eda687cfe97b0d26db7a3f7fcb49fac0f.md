# Robot da festa eccentrico

## Storia

C'era una volta un programmatore eccentrico che viveva in una strana casa con le finestre sbarrate. Un giorno accettò un incarico da un sito di annunci di lavoro online: costruire un robot da festa. Il robot dovrebbe accogliere le persone e accompagnarle ai loro posti. La prima aggiunta era molto tecnica e mostrava la scarsa propensione del programmatore all'interazione umana. Alcune di queste caratteristiche sono finite anche nella versione finale.

## Compiti

- Accogli ogni persona con:

```
Welcome to my party, <name>!
```

- Un ospite che compie gli anni oggi viene accolto nel modo seguente, per mettere in mostra la conoscenza che il robot ha di ogni ospite:

```
Happy birthday <name>! You are now <age> years old!
Welcome to my party!
```

- A chi chiede il proprio posto vengono date le indicazioni per il suo tavolo con:

```
Welcome to my party, <name>!
You have been assigned to table <table-number-in-hex>. Your table is <direction>, exactly <distance-float> meters from here.
You will be sitting next to <neighbour-name>!
```

## Implementazioni

- [Go: strings][implementation-go] (implementazione di riferimento)

## Riferimenti

- [`types/string`][types-string]

[types-string]: https://github.com/exercism/v3/blob/main/reference/types/string.md
[implementation-go]: https://github.com/exercism/go/blob/main/exercises/concept/strings/.docs/instructions.md
