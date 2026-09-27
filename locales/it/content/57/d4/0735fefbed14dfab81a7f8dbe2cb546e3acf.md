# Guida di stile per Rexx

Questa guida descrive lo stile previsto per i file di test e di esempio degli esercizi della traccia Rexx.

## Standard Rexx

Il codice dovrebbe essere conforme al livello 5.0 del linguaggio Rexx.

È possibile usare le estensioni di Regina Rexx e le funzioni dello standard SAA per l'accesso a librerie esterne.

Non si dovrebbero usare le estensioni AREXX né le routine di manipolazione dei buffer di CMS.

## Piattaforma

L'ambiente di test in cui viene eseguito il codice è basato su Linux, quindi nelle invocazioni dell'istruzione ADDRESS si possono usare solo i comandi disponibili in quell'ambiente. Questi vanno evidenziati chiaramente nei commenti del codice.

## Nomi

### Istruzioni

Le istruzioni (parole riservate) vanno scritte in **_minuscolo_**. Quindi, quanto segue è conforme alle raccomandazioni della guida di stile:

```rexx
do while input \= ''
  parse var input char +1 input
  say char
end
```

mentre i due esempi seguenti non sono conformi e quindi non sono raccomandati:

```rexx
/* *** Not recommended *** */
Do While input \= ''
  Parse Var input char +1 input
  Say char
End
```

mentre:

```rexx
/* *** Not recommended *** */
DO WHILE input \= ''
  PARSE VAR input char +1 input
  SAY char
END
```

### Funzioni integrate (BIF)

Le BIF vanno scritte in **_maiuscolo_**, come illustrato qui:

```rexx
input = 'ABCDE'
say 'Length of input is' LENGTH(input)
say 'First letter of input is' SUBSTR(input, 1, 1)
```

### Etichette (funzioni definite dall'utente)

I nomi delle etichette vanno in **_Pascal case_**, come mostrato qui:

```rexx
greeting = MyFuncSayHello()
say greeting

exit 0

MyFuncSayHello : procedure
  hello = 'Hello there!'
return hello
```

### Variabili

I nomi delle variabili dovrebbero iniziare con una lettera **_minuscola_**, quindi le variabili composte da una sola parola saranno in minuscolo.

Le variabili composte da più parole si possono esprimere in **_camel case_** oppure in **_snake case_**.

La convenzione adottata per la traccia è usare il _camel case per la maggior parte delle variabili_ e riservare lo snake case alle variabili dei test. Le variabili pensate come costanti possono, facoltativamente, essere anch'esse in maiuscolo.

```rexx
input = 'ABCDE'
i = 0

personName = 'Alice'
test_person_description = 'Brown hair, blue eyes'

TRUE = 1
PI_CONSTANT = 3.14159
```

## Letterali

Le stringhe si possono delimitare con le virgolette singole oppure con le virgolette doppie, rispettivamente **`'`** e **`"`**. I due esempi seguenti sono equivalenti:

```rexx
say "Hello, world!"

say 'Hello, world!'
```

Ciascuna si può inserire dentro l'altra senza bisogno di un carattere di escape:

```rexx
say "Please don't do that as it's wrong."

say 'He said, "Please sir, may I have more?".'
```

A meno che le stringhe non contengano virgolette al loro interno, richiedendo così di alternare i due tipi di virgolette, è preferibile delimitarle con le **_virgolette singole_**.

### Stringhe esadecimali e binarie

I valori binari ed esadecimali si possono rappresentare aggiungendo a una stringa rispettivamente una **`B`** o una **`X`**. Esempi:

```rexx
hexvalue = "0A"X

binvalue = "00001010"B
```

Si raccomanda di delimitare tali valori con le **_virgolette doppie_**.

Insieme alla raccomandazione precedente di usare le virgolette singole per le stringhe semplici, questa convenzione dovrebbe facilitare l'individuazione delle stringhe binarie ed esadecimali in una base di codice.

### Terminatore di nuova riga
In molti linguaggi UNIX o di influenza C, il letterale, **_`\n`_**, viene usato come terminatore di **_nuova riga_**. Un uso molto diffuso, e diversi esercizi di questa traccia prevedono l'uso e la manipolazione di stringhe con questo terminatore.

Rexx non supporta questo terminatore, né supporta **_`\`_** (o qualsiasi altro carattere) come carattere di escape.

L'equivalente Rexx del carattere di nuova riga è un valore esadecimale (dipendente dalla piattaforma); sulle piattaforme derivate da UNIX è:

**_`"0A"X`_**

L'equivalente Rexx della seguente stringa con nuove righe incorporate (usando la shell bash):

```bash
printf "I have\nthree embedded\nnewlines.\n"
```

è:

```rexx
say 'I have' || "0A"X || 'three embedded' || "0A"X || 'newlines.' || "0A"X
```

Gli esercizi di questa traccia convertiranno **_`\n`_** in **_`"0A"X`_** solo quando serve in una stringa destinata alla visualizzazione sul terminale. Altrimenti, la stringa **_`\n`_** verrà semplicemente interpretata come una nuova riga logica.

## Altre raccomandazioni di stile

L'indentazione può essere di due, tre o quattro caratteri SPAZIO, anche se si preferisce l'indentazione **_di due caratteri_**, insieme alla coerenza nell'indentazione.

L'istruzione **_return_** finale di una funzione dovrebbe allinearsi al nome dell'etichetta, segnando così chiaramente la fine della funzione, e dovrebbe **_sempre_** restituire un valore.

L'operatore booleano NOT si può rappresentare con diversi simboli. Il simbolo preferito in questa traccia è **`\`** e, per mantenere la coerenza con questo uso, l'operatore relazionale «diverso da» dovrebbe essere **`\=`**.

I valori booleani **`false`** e **`true`** sono rappresentati rispettivamente da **`0`** e **`1`**. Non esistono letterali predefiniti per questi valori.

Gli stati di errore si indicano tramite i valori restituiti: la stringa vuota, **`''`**, oppure **`-1`**, segnalano uno stato di errore, a seconda del contesto.

## Esempio canonico di stile del codice
```rexx
TO DO EXAMPLE
```

## Struttura del file di test

Ogni esercizio avrà un unico file di test, che si trova nella directory di primo livello dell'esercizio, chiamato: `<exercise>-check.rexx`

Seguendo questa convenzione, il file di test per l'esercizio `acronym` si chiamerà: `acronym-check.rexx`

Il file di test di ogni esercizio è strutturato in modo libero ma specifico, sia per aiutare chi impara a capire i requisiti dell'esercizio, sia per facilitare il compito di chi contribuisce a implementare o estendere i test.

Quello che segue è un sottoinsieme del file di test per l'esercizio `acronym`:

```rexx
/* Unit Test Runner: t-rexx */
function = 'Abbreviate'
context('Checking the' function 'function')

/* Unit tests */
check('basic' function||'("Portable Network Graphics")',,
      function||'("Portable Network Graphics")',, 'to be', 'PNG')

check('lowercase words' function||'("Ruby on Rails")',,
      function||'("Ruby on Rails")',, 'to be', 'ROR')
```

Il file è diviso in due sezioni logiche, ciascuna identificata da una riga di commento.

La prima sezione assegna il nome della **_funzione sotto test_** (qui la funzione `Abbreviate`) alla variabile `function`. Questo nome di variabile è descrittivo, ma arbitrario, e viene usato nel resto del file ovunque serva il nome della funzione sotto test.

In questa sezione c'è anche una chiamata alla funzione `context`, il cui scopo è evidente.

La sezione successiva contiene gli unit test. Ogni chiamata della funzione `check` è un singolo unit test. Parametri previsti:

```rexx
check(<test description>,
      <function invocation>,
      [<actual result variable>],
      <test comparator>,
      <expected result>)
```

**\<test description>** è la stringa emessa quando il test viene eseguito. Per renderla il più descrittiva possibile, si raccomanda di usare una stringa che comprenda il nome della funzione sotto test e gli argomenti a essa passati, come nell'esempio.

**\<function invocation>** è la chiamata effettiva alla funzione, che ne passa quindi il valore restituito a `check` per il confronto nel test.

**\<actual result variable>** è un parametro opzionale e, se usato, è il nome di una variabile che contiene il valore da usare per il confronto nel test.

Il motivo per usarlo è permettere di verificare risultati _derivati dal_ valore restituito dalla funzione sotto test, anziché il valore restituito stesso. Un esempio evidente è quando il valore restituito è una stringa di diversi kB, come mostrato:

```rexx
expected_length = LENGTH(FUT(...))

check('...', FUT(...), expected_length, 'to be', 50)
```

Tieni presente che l'argomento \<function invocation> va comunque passato.

**\<test comparator>** è una stringa che descrive il tipo di confronto da eseguire. Nella maggior parte dei casi sarà la stringa «to be», che richiede un confronto di uguaglianza. Per le altre opzioni di confronto, consulta la documentazione del framework di unit test.

**\<expected result>** è, evidentemente, il valore con cui viene confrontato il risultato effettivo.

Le variabili si possono dichiarare liberamente all'interno del file di test (prima di usarle, naturalmente) e usare al posto dei letterali come argomenti di `check`.
