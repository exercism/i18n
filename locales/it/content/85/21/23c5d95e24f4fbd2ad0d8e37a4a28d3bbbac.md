# Appendice alle istruzioni

## Implementazione

L'argomento `diagram` inizia ogni riga con un `\n`. Questo permette alle stringhe letterali grezze di Go di presentare i diagrammi nel codice sorgente in modo ordinato, come due righe allineate a sinistra. Per esempio, il test potrebbe contenere quanto segue.

```go
        diagram := `
VVCCGG
VVCCGG`
```

Se l'argomento `children` è `nil`, usa l'elenco dei bambini definito nelle istruzioni qui sopra. Se non è `nil`, usa il valore fornito.
