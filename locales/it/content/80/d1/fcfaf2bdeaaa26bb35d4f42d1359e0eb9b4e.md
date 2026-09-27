# Istruzioni

Questo esercizio riguarda il parsing dei file di log.

Dopo una recente revisione di sicurezza, ti è stato chiesto di ripulire i file di log archiviati dell'organizzazione.

Tutte le stringhe passate alle funzioni sono garantite non nulle e senza spazi all'inizio e alla fine.

## 1. Identificare le righe di log corrotte

Ti serve un'idea di quante righe di log nel tuo archivio non rispettino gli standard attuali.
Ritieni che un semplice test riveli se una riga di log è valida.
Per essere considerata valida, una riga deve iniziare con una delle seguenti stringhe:

- [TRC]
- [DBG]
- [INF]
- [WRN]
- [ERR]
- [FTL]

Implementa la funzione `IsValidLine` in modo che restituisca `false` se una stringa non è valida, altrimenti `true`.

```go
IsValidLine("[ERR] A good error here")
// => true
IsValidLine("Any old [ERR] text")
// => false
IsValidLine("[BOB] Any old text")
// => false
```

## 2. Dividere la riga di log

Un nuovo team si è unito all'organizzazione e hai scoperto che i suoi file di log usano uno strano separatore per i «campi».
Invece di qualcosa di sensato come i due punti ":", usano una stringa come "<--->" o "<=>" (perché è più carina): in pratica qualsiasi stringa che abbia come primo carattere "<", come ultimo carattere ">" e, nel mezzo, qualsiasi combinazione dei seguenti caratteri "~", "\*", "=" e "-".

Implementa la funzione `SplitLogLine` che prende una riga e restituisce un array di stringhe, ognuna delle quali contiene un campo.

```go
SplitLogLine("section 1<*>section 2<~~~>section 3")
// => []string{"section 1", "section 2", "section 3"},
```

## 3. Contare il numero di righe che contengono `password` in un testo tra virgolette

Il team ha bisogno di conoscere i riferimenti alle password nei testi tra virgolette, così da poterli esaminare manualmente.

Implementa la funzione `CountQuotedPasswords` per fornire un'indicazione della probabile entità del lavoro manuale.

Individua le righe di log in cui la stringa "password", che può essere in qualsiasi combinazione di maiuscole e minuscole, è racchiusa tra virgolette.
Devi tenere conto della possibilità che ci sia altro contenuto tra le virgolette, prima e dopo "password".
Ogni riga conterrà al massimo due virgolette.

Le righe passate alla routine possono essere valide oppure no, secondo la definizione del punto 1.
Le elaboriamo allo stesso modo, che siano valide o no.

```go
lines := []string{
    `[INF] passWord`, // contains 'password' but not surrounded by quotation marks
    `"passWord"`,  // count this one
    `[INF] User saw error message "Unexpected Error" on page load.`, // does not contain 'password'
    `[INF] The message "Please reset your password" was ignored by the user`, // count this one
}
// => 2
```

## 4. Rimuovere gli artefatti dal log

Hai scoperto che una qualche elaborazione a monte dei log ha disseminato in tutti i log il testo "end-of-line" seguito da un numero di riga (senza spazio in mezzo).

Implementa la funzione `RemoveEndOfLineText` in modo che prende una stringa, rimuova il testo end-of-line e restituisca una stringa «pulita».

Le righe che non contengono il testo end-of-line devono essere restituite senza modifiche.

Rimuovi soltanto la stringa end-of-line.
Non provare a sistemare gli spazi bianchi.

```go
RemoveEndOfLineText("[INF] end-of-line23033 Network Failure end-of-line27")
// => "[INF]  Network Failure "
```

## 5. Etichettare le righe con i nomi utente

Hai notato che alcune righe di log contengono frasi che si riferiscono a utenti.
Queste frasi contengono sempre la stringa `"User"`, seguita da uno o più spazi e poi da un nome utente.
Decidi di etichettare queste righe.

Implementa una funzione `TagWithUserName` che elabora le righe di log:

- Le righe che non contengono la stringa `"User "` restano invariate.
- Per le righe che contengono la stringa `"User "`, anteponi alla riga `[USR]` seguito dal nome utente.

Ad esempio:

```go
result := TagWithUserName([]string{
    "[WRN] User James123 has exceeded storage space.",
	"[WRN] Host down. User   Michelle4 lost connection.",
	"[INF] Users can login again after 23:00.",
	"[DBG] We need to check that user names are at least 6 chars long.",
})
// => []string {
//  "[USR] James123 [WRN] User James123 has exceeded storage space.",
//  "[USR] Michelle4 [WRN] Host down. User   Michelle4 lost connection.",
//  "[INF] Users can login again after 23:00.",
//  "[DBG] We need to check that user names are at least 6 chars long."
// }
```

Puoi dare per scontato che:

- I nomi utente siano seguiti da almeno un carattere di spaziatura nel log.
- C'è al massimo un'occorrenza della stringa `"User "` in ogni riga.
- I nomi utente siano stringhe non vuote che non contengono spazi bianchi.
