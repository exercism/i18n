# Informazioni

## Sintassi generale

Il ciclo for è una delle istruzioni più usate per eseguire ripetutamente una certa logica.
In Go è formato dalla parola chiave `for`, da un'intestazione e da un blocco di codice che contiene il corpo del ciclo, racchiuso tra parentesi graffe.
L'intestazione è composta da 3 componenti separati da punti e virgola (`;`): init, condition e post.

```go
for init; condition; post {
  // loop body - code that is executed repeatedly as long as the condition is true
}
```

- Il componente **init** è del codice che viene eseguito una sola volta, prima che il ciclo inizi.
- Il componente **condition** deve essere un'espressione che dà come risultato un valore booleano e che controlla quando il ciclo deve fermarsi.
  Il codice all'interno del ciclo viene eseguito finché questa condizione è vera.
  Non appena l'espressione diventa falsa, non verranno più eseguite altre iterazioni del ciclo.
- Il componente **post** è del codice che viene eseguito alla fine di ogni iterazione.

**Nota:** a differenza di altri linguaggi, non ci sono parentesi tonde (`()`) attorno ai tre componenti dell'intestazione.
Anzi, inserirle è un errore di compilazione.
Invece, le parentesi graffe (`{ }`) che racchiudono il corpo del ciclo sono sempre obbligatorie.

## Il ciclo for: un esempio

Di solito il componente init prepara una variabile contatore, il componente condition controlla se il ciclo deve continuare o fermarsi, e il componente post incrementa il contatore alla fine di ogni ripetizione.

```go
for i := 1; i < 10; i++ {
  fmt.Println(i)
}
```

Questo ciclo stamperà i numeri da `1` a `9` (compreso `9`).
Spesso il passo si definisce con un'istruzione di incremento o di decremento, come nell'esempio qui sopra.

## Componenti opzionali dell'intestazione

I componenti init e post dell'intestazione sono opzionali:

```go
var sum = 1
for sum < 1000 {
	sum += sum
}
fmt.Println(sum)
// Output: 1024
```

Omettendo i componenti init e post in un ciclo for come nell'esempio qui sopra, si crea un ciclo while in Go.
Non esiste la parola chiave `while`.
Questo è un esempio del principio di Go secondo cui i concetti devono essere ortogonali.
Dato che esiste già un concetto per ottenere il comportamento di un ciclo while, e cioè il ciclo for, `while` non è stato aggiunto come concetto aggiuntivo.

## Break e continue

All'interno del corpo di un ciclo puoi usare la parola chiave `break` per interrompere del tutto l'esecuzione del ciclo:

```go
for n := 0; n <= 5; n++ {
  if n == 3 {
    break
  }
  fmt.Println(n)
}
// Output:
// 0
// 1
// 2
```

Al contrario, la parola chiave `continue` interrompe solo l'esecuzione dell'iterazione corrente e passa a quella successiva:

```go
for n := 0; n <= 5; n++ {
  if n%2 == 0 {
    continue
  }
  fmt.Println(n)
}
// Output:
// 1
// 3
// 5
```

## Ciclo for infinito

Anche la parte relativa alla condizione nell'intestazione del ciclo è opzionale.
Anzi, puoi scrivere un ciclo senza intestazione:

```go
for {
  // Endless loop...
}
```

Questo ciclo terminerà solo se il programma esce o se nel suo corpo c'è un `break`.

## Etichette e goto

Quando usiamo `break`, Go interrompe il ciclo più interno.
Allo stesso modo, quando usiamo `continue`, Go passa all'iterazione successiva del ciclo più interno.

Però non è sempre quello che vogliamo.
Possiamo usare le etichette insieme a `break` e `continue` per specificare con esattezza da quale ciclo vogliamo uscire o in quale vogliamo continuare.

In questo esempio creiamo un'etichetta `OuterLoop`, che farà riferimento al ciclo più esterno.
Nel ciclo più interno, per indicare che vogliamo uscire dal ciclo più esterno, usiamo `break` seguito dal nome dell'etichetta del ciclo più esterno:

```go
OuterLoop:
    for i := 0; i < 10; i++ {
        for j := 0; j < 10; j++ {
            // ...
            break OuterLoop
        }
    }
```

Funzionerebbe anche usare le etichette con `continue`: in quel caso Go passerebbe all'iterazione successiva del ciclo a cui l'etichetta fa riferimento.

Go ha anche una parola chiave `goto` che funziona in modo simile e ci permette di saltare da un pezzo di codice a un altro contrassegnato da un'etichetta.

**Attenzione:** anche se Go permette di saltare a un pezzo di codice contrassegnato da un'etichetta, usare questa funzionalità del linguaggio può facilmente rendere il codice molto difficile da leggere.
Per questo motivo, usare le etichette spesso non è consigliato.
