# Istruzioni

In questo esercizio elaborerai delle righe di log.

Ogni riga di log è una stringa formattata così: `"[<LEVEL>]: <MESSAGE>"`.

Ci sono tre livelli di log diversi:

- `INFO`
- `WARNING`
- `ERROR`

Hai tre compiti, ognuno dei quali riceve una riga di log e ti chiede di fare qualcosa con essa.

## 1. Ottenere il messaggio da una riga di log

Implementa la funzione `message` in modo che restituisca il messaggio di una riga di log:

```julia-repl
julia> message("[ERROR]: Invalid operation")
"Invalid operation"
```

Gli spazi bianchi all'inizio e alla fine vanno rimossi:

```julia-repl
julia> message("[WARNING]:  Disk almost full\r\n")
"Disk almost full"
```

## 2. Ottenere il livello di log da una riga di log

Implementa la funzione `log_level` in modo che restituisca il livello di log di una riga di log, che deve essere restituito in minuscolo:

```julia-repl
julia> log_level("[ERROR]: Invalid operation")
"error"
```

## 3. Riformattare una riga di log

Implementa la funzione `reformat` che riformatta la riga di log, mettendo prima il messaggio e poi il livello di log tra parentesi:

```julia-repl
julia> reformat("[INFO]: Operation completed")
"Operation completed (info)"
```

----

***Nota:*** Tutte le stringhe in questo esercizio sono in inglese e limitate al set di caratteri ASCII.
Nei concetti successivi avrai modo di lavorare con i caratteri Unicode.
