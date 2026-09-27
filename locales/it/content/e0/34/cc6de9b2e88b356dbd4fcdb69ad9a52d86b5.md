# Appendice alle istruzioni

## Struttura del progetto

* `src` contiene la soluzione dell'esercizio
* `spec` contiene i test da eseguire per l'esercizio

## Eseguire i test

Se ti trovi nella directory giusta (cioè quella che contiene `src` e `spec`), puoi eseguire i test di quell'esercizio eseguendo `crystal spec`:

```bash
$ pwd
/Users/johndoe/Code/exercism/crystal/hello-world

$ ls
GETTING_STARTED.md README.md          spec               src

$ crystal spec
```

Così verranno eseguiti tutti i file di test nella directory `spec`.

In ogni file di test, tutti i test tranne il primo sono stati saltati.

Una volta che un test passa, puoi riattivare quello successivo cambiando `pending` in `it`.

## Inviare la soluzione

Assicurati di inviare il file sorgente nella directory `src` quando invii la soluzione:

```bash
$ exercism submit src/hello_world.cr
```
