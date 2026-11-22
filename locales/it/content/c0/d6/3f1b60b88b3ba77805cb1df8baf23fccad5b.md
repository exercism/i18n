# Introduzione

Un programma `jq` che incontra un problema mentre elabora un valore (indicizzare un numero con una stringa, analizzare un testo JSON non valido, chiamare una funzione con un argomento del tipo sbagliato) genera un **errore di runtime**.
Un errore di runtime non gestito fa sì che `jq` stampi un messaggio su _standard error_ ed esca con stato `5`.

## Generare errori: `error` e `error(message)`

- `error` genera un errore il cui valore è il valore di **input**.
- `error(message)` genera un errore il cui valore è il risultato di `message`.

Il valore dell'errore può essere _qualsiasi_ valore JSON, non solo una stringa.

```jq
42 | error("invalid value: \(.)")
# => "invalid value: 42"

42 | error
(not a string): 42
```

## Intercettare gli errori: `try` e `catch`

Gli errori si possono intercettare con `try EXP catch HANDLER`.
Viene eseguita la prima espressione; se genera un errore, viene eseguita l'espressione `HANDLER` **con il valore dell'errore come input**.
L'output di `try catch` è l'output dell'ultima espressione eseguita (`EXP` oppure `HANDLER`).

```jq
{a: 42} | try .a catch "no index a in \(.)"
# => 42

true | try .a catch "cannot index a \(type)"
# => "cannot index a boolean"

true | try error("some exception") catch .
# => "some exception"
```

La forma più breve `try EXP` equivale a `try EXP catch empty`: l'errore viene scartato e non viene prodotto alcun output.

```jq
[{}, true, {"a": 1}] | [.[] | try .a]
# => [null, 1]
```

## Sopprimere gli errori: l'operatore `?`

L'operatore `?`, usato come `EXP?`, è una scorciatoia per `try EXP`.
Trasforma un'espressione che fallisce in un'espressione che semplicemente non produce alcun output.

```jq
["1", "invalid", "3", 4] | [.[] | tonumber?]
# => [1, 3, 4]
```

Lo si vede spesso attaccato agli operatori di indicizzazione: `.foo?` e `.[]?`.

## Arrestare il programma: `halt_error` e `halt`

`halt_error` arresta il programma, stampa il suo input su _standard error_ come testo grezzo ed esce con lo stato indicato, che per impostazione predefinita è `5`.
Il filtro correlato `halt` arresta il programma in silenzio con stato di uscita `0`.

```jq
"Error: something went wrong" | halt_error(1)
```
