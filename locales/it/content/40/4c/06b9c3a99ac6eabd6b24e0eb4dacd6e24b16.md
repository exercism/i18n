# Introduzione

## Altro sui pattern

Ricorda che, come visto nel concetto Fondamenti, un programma AWK è composto da **coppie pattern-azione**.

```awk
pattern1 { action1 }
pattern2 { action2 }
...
```

### Cosa intendiamo con «pattern»?

Il «pattern» è una qualsiasi espressione AWK.
Se il risultato dell'espressione è vero, l'azione viene eseguita.

### Il pattern vuoto

Il pattern può essere omesso.
In questo caso, l'azione viene eseguita per ogni record.

Possiamo stampare tutti i nomi utente nel file passwd.

```sh
awk -F: '{print $1}' /etc/passwd
```

### Espressioni regolari

AWK può confrontare le stringhe con espressioni regolari per ottenere un risultato booleano.

Usa l'operatore `~` di corrispondenza con espressioni regolari per far corrispondere un campo specifico.
Questo operatore accetta una stringa come operando di sinistra e un'espressione regolare come operando di destra.
Un valore letterale di espressione regolare è racchiuso tra barre `/`.

Per trovare gli utenti nel file passwd che effettuano l'accesso con bash:

```sh
awk -F: '$7 ~ /bash/ {print $1}' /etc/passwd
```

`!~` è l'operatore che indica che l'espressione regolare **non** corrisponde.

Per confrontare un'espressione regolare con il record corrente, puoi scrivere `$0 ~ /regex/`.
È così comune che esiste una forma abbreviata: puoi omettere `$0` e `~` e scrivere semplicemente `/regex/`

```sh
awk '/regex/' data.txt
```

~~~~exercism/note
Confronta quel one-liner AWK con il comando grep equivalente

```sh
grep 'regex' data.txt
```

AWK ti offre un intero linguaggio di programmazione senza rinunciare alla concisione.
~~~~

Approfondiremo la variante di espressioni regolari di GNU AWK in un concetto successivo.

### Espressioni

Le espressioni AWK (aritmetiche, logiche o di altro tipo) possono essere usate come pattern.

Per estrarre tutti gli utenti con UID maggiore o uguale a 1000:

```sh
awk -F: '$3 >= 1000' /etc/passwd
```

Ricorda che i valori falsi in AWK sono il numero zero e la stringa vuota, mentre tutti gli altri numeri o stringhe sono veri.
Qualsiasi espressione che dà come risultato un numero o una stringa può essere usata come pattern.

### Funzioni

Qualsiasi funzione [predefinita][builtins] o [definita dall'utente][user-defined] può essere usata in un'espressione, e quindi nel pattern.
Un paio di esempi:

```awk
length($1) {print "first field is not empty"}
```
```awk
toupper(substr($1, 1, 1)) ~ /[AEIOU]/ {print "starts with a vowel"}
```

### Pattern costanti

Un idioma AWK comune è:

```sh
{
    xyz()   # some code that transforms each record
}
1
```

`1` è un pattern vero senza alcuna azione associata.
Significa «stampa il record corrente».

[builtins]: https://www.gnu.org/software/gawk/manual/html_node/Built_002din.html
[user-defined]: https://www.gnu.org/software/gawk/manual/html_node/User_002ddefined.html
