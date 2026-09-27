## Introduzione
Ciao a tutti! Spero che stiate tutti bene.

Sono state settimane davvero entusiasmanti qui a Exercism, con il lancio di Exercism Premium e di Exercism Insiders. Abbiamo anche fatto delle belle chiamate con la community e abbiamo rilasciato tanti miglioramenti del sito, con altri in arrivo a breve. Al momento c'è tanto per cui essere entusiasti, ma niente è più entusiasmante del nostro ingresso nel sesto mese di #12in23! L'estate delle S-espressioni, o più simpaticamente abbreviata in Summer of Sexps.

Come sempre, mi accompagna il saggio del mondo della programmazione: Erik.

Dunque, questo mese abbiamo cinque linguaggi: Clojure, Common Lisp, Emacs Lisp, Racket e Scheme. Ognuno di questi linguaggi è un dialetto del linguaggio Lisp, quindi invece di concentrarci troppo sui singoli linguaggi in questo video, vedremo un po' più da vicino il Lisp stesso e che cosa lo rende unico. E poi finiremo passando brevemente in rassegna i linguaggi.

Ma prima, due parole sulle questioni pratiche! Per ottenere il badge Summer of Sexps devi completare cinque esercizi qualsiasi in uno di questi linguaggi durante il mese di giugno.

## I badge

C'è anche il badge 12in23, quello che dura tutto l'anno. Per ottenerlo, devi risolvere cinque dei nostri esercizi in evidenza in quel linguaggio. Se stai guardando questo video dopo giugno, puoi fare questa parte in qualsiasi momento dell'anno, quindi non hai perso nulla. Dato che molte persone non hanno mai lavorato con un Lisp, abbiamo cercato di scegliere esercizi relativamente semplici che ti diano un assaggio di come si presenta un linguaggio Lisp.
- **Anno bisestile:** lavorare con condizioni booleane e con la truthiness (e, facoltativamente, con lo scope lessicale)
- **Uno per te, uno per me:** formattare una stringa e lavorare con un parametro opzionale
- **Differenza di quadrati:** chiamare funzioni definite dall'utente e fare calcoli in notazione prefissa
- **Nome del robot:** lavorare con la casualità, gli atomi e i dati strutturati
- **Parentesi corrispondenti:** usare la ricorsione per validare una stringa

Questi esercizi e quelli dei mesi precedenti si trovano tutti nella pagina di #12in23.

## Panoramiche

Dunque, i linguaggi basati su Lisp. Credo che dovremmo iniziare capendo un po' di più il Lisp stesso. Cominciamo con una piccola introduzione generale al Lisp.

### Lisp
- La prima cosa da notare è che Lisp è uno dei linguaggi più antichi.
- Fu creato da John McCarthy al MIT nel 1958, all'epoca in cui i computer occupavano ancora intere stanze da cima a fondo 🙂
- Il nome Lisp sta per LISt Processing (o LISt Processor), a testimonianza dell'importanza della struttura dati lista.
- Fu progettato con lo scopo di fare ricerca sull'intelligenza artificiale.
- Lisp si basava sul calcolo lambda, inventato da Alonzo Church, un sistema formale per descrivere il calcolo in matematica (in modo semplificato).

- È un linguaggio incredibilmente influente, per varie ragioni:
- È il secondo linguaggio di programmazione ad alto livello più antico ancora comunemente usato (dopo Fortran)
- È stato il primo linguaggio di programmazione funzionale ad alto livello e ha introdotto molte delle caratteristiche che oggi associamo alla programmazione funzionale.
- Va notato che Lisp supportava comunque la programmazione imperativa
- È stato il primissimo linguaggio con un garbage collector, sollevando il programmatore dalla gestione manuale della memoria
- La sua sintassi relativamente ridotta e la semantica relativamente semplice lo rendono ottimo per scopi didattici.
- Per questo motivo Lisp (o meglio, uno dei suoi dialetti) viene spesso usato per insegnare a programmare
- Ha generato (e genera tuttora!) moltissimi dialetti del linguaggio (e tra questi parleremo di quelli supportati su Exercism).
- In altre parole, nell'albero dei linguaggi di programmazione esiste un ramo separato per i linguaggi simili a Lisp (proprio come c'è un ramo per i linguaggi simili a C).

Di recente ho parlato con Simon Peyton Jones, uno dei creatori di Haskell, e mi raccontava della differenza tra i linguaggi costruiti attorno alle macchine di Turing e quelli costruiti attorno al calcolo lambda. Vale la pena dare un'occhiata a quell'intervista se vuoi saperne di più.

### Le parentesi

Nei Lisp ci sono molte parentesi, ma non è necessariamente una cosa negativa (proprio come avere molte parentesi graffe non è necessariamente un male nei linguaggi simili a C).
I Lisp sono basati su una cosa che si chiama: S-espressioni.
Una S-espressione (abbreviazione di symbolic expression, a sua volta abbreviata in sexpr o sexp, da cui il nome della sfida di questo mese) è un'espressione per rappresentare dati. Furono inventate per il Lisp originale e da esso rese popolari.
Una S-espressione può assumere una di due forme:

- Un atomo (ad es. «x»). Pensali come «valori» non annidati o come le foglie dell'albero
- Un'espressione x . y, dove x e y sono S-espressioni. Pensali come coppie, in cui y può essere l'elemento successivo della lista (se c'è) o un nodo di un albero. Nota che questa è una definizione ricorsiva, che termina al livello delle foglie. Di solito, per questo tipo di S-espressione si usano le parentesi.


### Le S-espressioni
In Lisp, le S-espressioni si usano per rappresentare sia i dati sia le liste.
Di conseguenza, ogni volta che definisci una lista userai le parentesi.
Se a questo aggiungiamo che:
la lista è la struttura dati centrale di Lisp (da cui il nome),
in alcuni Lisp è l'unica struttura dati,
ti ritroverai con un sacco di parentesi.
Per capire quanto le liste siano centrali: se vuoi chiamare una funzione in Lisp, lo fai creando una lista.

Curiosamente, il primo elemento della lista (ovvero la testa) rappresenta la funzione chiamata, mentre gli altri elementi (ovvero la coda) vengono passati come argomenti.
Questa si chiama notazione prefissa (in cui l'operatore precede gli operandi): all'inizio può sembrare un po' strana, ma in realtà è molto utile:
- Puoi applicare un operatore a più argomenti senza dover ripetere l'operatore (ad es. (+ 1 2 3))
- La precedenza degli operatori diventa esplicita, dato che per chiamare un operatore diverso devi comunque definire una nuova S-espressione

Curiosamente, le liste vengono usate persino per rappresentare il codice sorgente, ma ci torneremo più avanti.

In generale, la maggior parte dei Lisp ha una sintassi piuttosto essenziale e una semantica relativamente semplice, il che li rende abbastanza facili da imparare e rende più semplice anche capire il codice.
Questa sintassi essenziale non li rende meno potenti!
Combinando queste due cose (sintassi essenziale + semantica semplice), i Lisp sono ideali per scrivere compilatori e interpreti.
Se un giorno vuoi costruire il tuo compilatore, costruire un Lisp è una buona opzione!

### Le caratteristiche interessanti di Lisp

Come accennato prima, i Lisp usano internamente gli stessi tipi e le stesse strutture dati per rappresentare il codice.
Questa proprietà si chiama omoiconicità (o omoiconico).
In altre parole, un linguaggio è omoiconico se un programma scritto in esso può essere manipolato come dati usando il linguaggio stesso, e quindi la rappresentazione interna del programma si può dedurre semplicemente leggendo il programma.
Questa proprietà viene spesso riassunta dicendo che il linguaggio tratta il codice come dati.

## I linguaggi

### Scheme
- Creato negli anni '70 da Guy Steele e Gerald Sussman al MIT AI Lab.
- Nacque come tentativo di comprendere il modello ad attori di Carl Hewitt attraverso un minuscolo interprete Lisp.
- Il linguaggio vero e proprio fu presentato in una serie di AI Memo di ricerca, che nel loro insieme sono diventati noti come i Lambda Papers.
- È stato il primo dialetto Lisp a usare lo scope lessicale (i valori sono nello scope solo dove vengono definiti) e uno dei primi linguaggi a supportare le continuazioni di prima classe.
- Standard IEEE ufficiale e uno standard de facto chiamato Revised Report on the Algorithmic Language Scheme (RnRS).
- Molte implementazioni: ChezScheme, Guile (entrambe supportate su Exercism), MIT/GNU Scheme e Racket
- Un linguaggio molto essenziale, con poca sintassi, ma non era intenzionale.
- Gli autori cercavano di costruire qualcosa di complicato, ma finirono per progettare qualcosa di molto più semplice di quanto intendessero
- Ricorsione in coda corretta. Il modo idiomatico di fare iterazione è tramite la ricorsione.
- Scheme ottimizza le chiamate ricorsive in coda per non consumare spazio dello stack o altre risorse. Questo significa che la ricorsione può essere usata su dati di dimensioni arbitrarie o per calcoli di durata arbitraria
- Tipi di dati numerici potenti, inclusi i numeri razionali e complessi
- Valutazione ritardata, simile alle promise.
- Un potente sistema di macro.
- Le macro igieniche riducono la probabilità di risultati inattesi quando si definiscono macro.

### Common Lisp
- I lavori su Common Lisp iniziarono nel 1981, dopo un'iniziativa di Bob Engelmore, dirigente dell'ARPA, volta a sviluppare un unico dialetto Lisp standard per la comunità, perché i vari dialetti in uso erano spesso incompatibili, il che significava che codice e conoscenze non erano condivisibili
- Il primo standard fu pubblicato nel 1984 e quello definitivo nel 1994 (una specifica molto stabile)
- Essendo uno standard, ne esistono diverse implementazioni, come Steel Bank Common Lisp (quella predefinita su Exercism) e CLisp.
- Esistono anche implementazioni commerciali, come Allegro CL e LispWorks, oltre a ECL (Embeddable Common Lisp), che può essere integrato nei programmi C, e ABCL, che gira sulla Java Virtual Machine.
- Definito da uno standard (ANSI INCITS 226-1994), quindi il codice scritto 30 anni fa funziona ancora oggi senza problemi
- Un sistema di tipi ricco ed estensibile
- Progettato per lo sviluppo basato su immagine e REPL, quindi molto ispezionabile.

### Emacs Lisp
- Sviluppato nel 1985 con lo scopo di avere un linguaggio efficiente per estendere un editor di testo
- Tipizzato dinamicamente
- Circa l'80% di Emacs è scritto in Emacs Lisp (il 20% in C per motivi di prestazioni)
- Un po' diverso dagli altri Lisp:
- Non è standardizzato, si evolve ancora lentamente
- Nessuna eliminazione automatica delle chiamate in coda, supporto tramite la macro named-let (che si trasforma in un ciclo while)
- Scope dinamico per impostazione predefinita, per il nuovo codice si consiglia lo scope lessicale
- Buona documentazione all'interno dell'editor
- Multipiattaforma (gira ovunque giri Emacs)
- Impara il linguaggio leggendo il codice delle funzionalità che usi ogni giorno (Emacs Core + Packages)
- Un sottoinsieme di Common Lisp è disponibile tramite il pacchetto cl-lib. Mentre Emacs Lisp è piuttosto minimalista, Common Lisp è molto più completo. Il pacchetto cl-lib rende disponibile un sottoinsieme di CL

### Racket
- Matthias Felleisen fondò PLT Inc., che nel gennaio 1995 decise di sviluppare un ambiente di programmazione pedagogico basato su Scheme. In origine si chiamava PLT Scheme, poi fu ribattezzato Racket.
- Oltre a essere un ambiente di programmazione pedagogico, fu progettato come piattaforma per la progettazione e l'implementazione di linguaggi di programmazione.
- Un LISP moderno, discendente di Scheme
- Supporta la programmazione logica!
- Una sintassi semplice ed espressiva, ideale per i principianti e potente nelle mani degli esperti
- Supporta molti paradigmi di programmazione: programmazione funzionale, programmazione orientata agli oggetti, design by contract, programmazione logica, metaprogrammazione
- Una libreria standard completa
- Include DrRacket, un IDE completo progettato per imparare e sperimentare con il minimo sforzo
- Documentazione eccellente, con abbondanti informazioni di contesto ed esempi

### Clojure
- Sviluppato da Rich Hickey con l'obiettivo di avere un LISP moderno che gira sulla JVM e con un'ottima concorrenza
- È un dialetto del LISP, ma anche un po' diverso dagli altri LISP: non supporta la ricorsione in coda implicita (non preoccuparti se non sai cosa sia) e ha più strutture dati oltre alle liste: map, set e vector. Ognuna di queste strutture dati ha una propria sintassi letterale.
- Sono anche tutte immutabili, ma mantengono ottime prestazioni con una ricerca O(log32 n), che è «di fatto» a tempo costante
- Polimorfismo a runtime tramite multimethod e protocol
- Ottima interoperabilità con la JVM
- Il sistema di specifica dei dati Clojure Spec (a runtime, non a tempo di compilazione) ti permette di definire la struttura dei dati, generare dati, fare property-based testing e altro ancora

## Casi d'uso

### Scheme
- Usato nell'istruzione per aiutare a insegnare l'informatica (l'influente Structure and Interpretation of Computer Programs usa Scheme).
- Usato nell'IA. Usato come linguaggio di scripting, ad esempio in GIMP (editor grafico), in strumenti CAD (progettazione assistita dal computer) e persino nei film, con gli script di gestione del motore di rendering di Final Fantasy: The Spirit Within

### Common Lisp
- Common Lisp è usato in molti ambiti, ad esempio nell'intelligenza artificiale e nella ricerca, ma anche in applicazioni commerciali: la NASA ha scritto in Common Lisp il software di pilotaggio automatico della sonda spaziale Deep Space One, Viaweb è stato scritto in Common Lisp (poi acquisito da Yahoo e ribattezzato Yahoo Store!) e anche la prima versione di Reddit

### Emacs Lisp
- Emacs Lisp è usato in, beh, Emacs!
- In sostanza, Emacs è un interprete per Emacs Lisp, un dialetto del linguaggio di programmazione Lisp ma con estensioni aggiunte per supportare la modifica di testo

### Racket
- Usato nell'istruzione, dato che Racket è stato progettato ponendo l'accento sul supporto alla creazione, alla semplificazione e all'analisi di linguaggi.
- Usato nella ricerca, poiché la sua sintassi e la sua semantica estensibili lo rendono adatto a progettare e prototipare nuovi linguaggi e nuove funzionalità del linguaggio.
- Usato nei videogiochi, ad esempio da John Carmack (noto per Doom) in un ambiente di scripting interattivo per la realtà virtuale, e lo sviluppatore Naughty Dog lo ha usato per lo scripting (ad esempio in Uncharted). Hacker News è scritto in Arc, anch'esso un Lisp, che a sua volta è scritto in Racket.

### Clojure
- Clojure è usato per molte cose diverse, tra cui l'acquisizione di Atomist da parte di Docker nel 2022: Atomist è una piattaforma di sicurezza e automazione dei container implementata in Clojure.
- Il maggiore utilizzatore di Clojure al mondo è Nubank, una nuova banca che lo ha acquisito qualche anno fa e che ora impiega il team principale di Clojure.
- È molto usato per la prototipazione rapida, essendo dinamico e altamente interattivo.

## Prospettiva di programmazione
Tutti i linguaggi supportano i paradigmi funzionale, imperativo e simbolico.
Alcuni supportano anche la programmazione orientata agli oggetti, in particolare Common Lisp.

I Lisp sono per lo più linguaggi dinamici, anche se Racket supporta la tipizzazione statica.

Questo non significa che siano tutti interpretati: c'è una combinazione di approcci, cioè interpretati (senza alcuna fase di compilazione), compilati in bytecode e poi interpretati, e compilati direttamente in codice macchina.

### Scheme
- Minimalista, con una semantica chiara e semplice e pochi modi diversi di formare espressioni.
- Rende facile imparare il linguaggio e capire il codice.
- Per questo motivo, Scheme è spesso usato anche in molti corsi introduttivi di informatica
- Continuazioni di prima classe.
- Una continuazione è una rappresentazione dello stato di un programma.
- Le continuazioni possono essere usate per modellare il flusso di controllo (ad esempio una struttura `return`) o le coroutine (che consentono il multitasking)

### Common Lisp
- Un sistema orientato agli oggetti estensibile, con combinazioni di metodi programmabili (sia nel modo in cui i metodi delle sottoclassi e delle superclassi vengono combinati, sia nei metodi before, after e around, che permettono di estendere i sistemi senza modificarli)
- Un sistema di condizioni programmabile (un sovrainsieme delle «eccezioni») che permette di disaccoppiare il riconoscimento delle condizioni dalla scelta di come gestirle. Il sistema di condizioni è più flessibile dei sistemi di eccezioni perché, invece di dividere il compito in due parti (il codice che segnala un errore1 e il codice che lo gestisce,2), ripartisce le responsabilità in tre parti: segnalare una condizione, gestirla e riavviare.
- Le macro permettono di estendere la sintassi del linguaggio, non solo di generare codice ripetitivo. Questo aiuta a costruire un linguaggio adatto al dominio, invece del contrario.

### Emacs Lisp
- Ottimo supporto e integrazione con l'editor
- Può essere usato per personalizzare Emacs mentre è in esecuzione («come fare chirurgia al proprio cervello» :))
- Può essere usato in modalità batch, in cui hai a disposizione tutte le capacità dell'editor di elaborare testo (come i buffer e i comandi di movimento)

### Racket
- Un potente sistema di macro. Lo zucchero sintattico come le threading macro si basa su questo. Le macro sono anche igieniche, il che risponde a una semplice domanda: una macro genera codice che viene depositato altrove. Quando quel codice viene valutato, come dovremmo determinare i binding degli identificatori al suo interno? Le macro igieniche riducono la probabilità di risultati inattesi quando si definiscono macro.
- Orientato ai linguaggi.
- Racket fornisce gli strumenti per scrivere il tuo linguaggio di programmazione o DSL, costruiti sulle macro di Racket.
- Diversi linguaggi integrati, come typed Racket (che supporta annotazioni di tipo verificate staticamente), datalog (un linguaggio simile a Prolog) che ha il supporto dell'IDE DrRacket, e scribble, uno strumento per creare documenti in prosa in formato HTML o PDF
- Il REPL è parte centrale del flusso di sviluppo, non serve solo a provare le cose o a consultare la documentazione

### Clojure
- Un potente sistema di macro.
- Lo zucchero sintattico come le threading macro si basa su questo
- Il REPL è parte centrale del flusso di sviluppo, non serve solo a provare le cose o a consultare la documentazione

## Quale provare

- Se non hai mai provato un Lisp, Scheme e Racket sono ottime opzioni, dato che entrambi hanno una sintassi molto essenziale.
- Detto questo, sia Common Lisp sia Clojure hanno la modalità di apprendimento, quindi probabilmente sono i migliori per imparare su Exercism.
- Se usi già Emacs, Emacs Lisp è una scelta naturale.
- Allo stesso modo, se usi un linguaggio della JVM, Clojure è un'opzione naturale.
- Emacs Lisp (con Emacs), Clojure (con IntelliJ) e Racket (con DrRacket) hanno tutti un ottimo supporto IDE.
- Naturalmente, esistono buoni IDE anche per Common Lisp e Scheme.
- Se vuoi un Lisp davvero ricco di funzionalità, Common Lisp, Clojure e Racket sono davvero completi
- Se vuoi un Lisp un po' diverso, Clojure ha una sintassi piuttosto particolare per un Lisp.
- Se ti interessano le macro e la metaprogrammazione, in pratica sono tutte buone opzioni! Ma se vuoi costruire nuovi linguaggi, Racket in particolare è ottimo

Naturalmente, se hai tempo ti consiglio di provarne un paio!
E non aver paura delle parentesi! Anch'io ne avevo paura, ed è per questo che per un bel po' ho rimandato l'apprendimento del Lisp.
Però ti ci abituerai presto, e magari arriverai persino ad apprezzarle, come è successo a me.
Anzi, ormai adoro i linguaggi Lisp, con la loro sintassi essenziale e la semantica semplice, pur restando molto espressivi.
