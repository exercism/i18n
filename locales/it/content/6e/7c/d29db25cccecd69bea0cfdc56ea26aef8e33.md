# Consigli per il mentoring

## Appunti di mentoring

Uno dei maggiori aiuti nel mentoring può essere avere un file in cui tenere gli appunti per ogni esercizio che segui.
Potresti scoprire che molte soluzioni traggono beneficio dagli stessi suggerimenti: tenendo degli appunti, non devi riscrivere gli stessi suggerimenti a memoria ogni volta.
E, avendo i suggerimenti in un unico posto, puoi continuare a perfezionarli nel tempo per renderli più chiari.

Se non sai da dove iniziare con i tuoi appunti, potresti trovare un file `mentoring.md` per l'esercizio del tuo track in [exercism/website-copy/tracks][website-copy].
Se esiste, potrebbe contenere esempi di soluzioni ragionevoli, insieme a suggerimenti comuni e spunti di discussione per stimolare ulteriori approfondimenti.
Se non esiste, potresti voler tornare indietro e crearne uno dopo aver realizzato il tuo file di appunti per quell'esercizio.

Inoltre, anche se per ora fai mentoring solo in un linguaggio, potresti farlo in altri in futuro.
Può essere utile organizzare i tuoi appunti di mentoring sia per track sia per nome dell'esercizio, dato che track diversi richiederanno probabilmente suggerimenti diversi per lo stesso esercizio.

Gli appunti di mentoring sono utili, che tu segua l'esercizio spesso o raramente.
Se segui l'esercizio spesso, ti risparmi un sacco di digitazione da zero, perché puoi semplicemente copiare e incollare dai tuoi appunti.
Se segui l'esercizio raramente, possono ricordarti suggerimenti da dare che potresti aver dimenticato nelle settimane o nei mesi trascorsi dall'ultima volta.

Va bene che gli appunti di mentoring siano diversi da mentore a mentore.
Ecco un modo per strutturarli, ma non è l'_unico_ modo.

Congratulati con il mentorato per aver superato i test (se li ha superati).

Se l'esercizio è in coda da qualche giorno, potresti affrontare la cosa con qualcosa del tipo:

>Scusa se ci è voluto un po' prima che qualcuno ti rispondesse.
>C'è attualmente una carenza di mentori JavaScript attivi per `Resistor Color Duo`.

Elenca ciò che ti piace della soluzione del mentorato.
Ad esempio:

- Mi piace che questa soluzione sia concisa e leggibile.

- Mi piace l'uso di `indexOf`.

- Mi piace che qui si usi l'approccio `(first * 10) + second` per evitare di convertire da numero a stringa e di nuovo a numero.

- Mi piace che qui non si usino cicli o iterazioni.

- Mi piace il parametro destrutturato.

Poi potrebbero venire i tuoi suggerimenti frequenti.

~~~~exercism/note
Può essere molto utile per il mentorato se viene fornito un link per ogni nuova funzionalità del linguaggio che introduci.
Ad esempio:

>Non è necessario per questo esercizio, ma forse potresti considerare di convertire la funzione in una [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).
~~~~

Anche se non vogliamo svelare la soluzione, a volte un mentorato impara meglio con l'esempio.
Mettere un frammento di codice in una sezione details compressa può fornire quell'esempio, che il mentorato può scegliere di espandere o meno.
Ad esempio:

&lt;details&gt;&lt;summary&gt;Esempio spoiler&lt;/summary&gt;

&lt;pre&gt;

export const decodedValue = ([firstColor, secondColor]) =>
  COLORS.indexOf(firstColor) * 10 + COLORS.indexOf(secondColor)

&lt;/pre&gt;

&lt;/details&gt;

Verso la fine degli appunti potresti includere un link a una soluzione pubblicata che rappresenti appieno i suggerimenti.

In fondo ai tuoi appunti potresti voler inserire spiegazioni estese che a volte i mentorati chiedono.
Queste spiegazioni non capitano spesso, ma può comunque essere utile annotarle la prima volta che le usi, così la volta successiva, che potrebbe essere tra settimane o mesi, non dovrai inventarti la spiegazione da zero.
Ad esempio, a volte un mentorato chiederà come funzionerebbe l'approccio con la moltiplicazione per Resistor Color Duo se il nero fosse la prima banda per uno zero iniziale:

>Il nero come prima banda è un buon punto da considerare, quindi consideriamolo.
>Il colore della resistenza serve a rappresentare la quantità di ohm della resistenza,
>e uno zero iniziale non verrebbe usato per una resistenza a più bande.
>Quindi il nero non sarebbe una prima banda.
>Inoltre, `parseInt` o `Number` eliminano anch'essi lo zero iniziale.

Una categoria di dati opzionale da tenere negli appunti di mentoring è una registrazione dei benchmark per varie soluzioni o approcci.

## Benchmarking

Una preoccupazione comune per i mentorati è quanto sia performante la loro soluzione.
Questo vale soprattutto per i linguaggi «di basso livello» come C, C++, Go e Rust.
Oltre a quanto sia idiomatico il loro codice, i mentorati di altri linguaggi sono spesso preoccupati anche per l'efficienza del proprio codice.

~~~~exercism/note
Il benchmarking non è qualcosa che un mentore è _tenuto_ a fare.
Tuttavia, i mentorati sono spesso particolarmente colpiti da come il benchmark della loro soluzione si confronta con altri approcci.
~~~~

Go è un track particolarmente adatto al benchmarking, dato che i benchmark sono spesso inclusi nel file di test.
Altri linguaggi potrebbero richiedere un po' di ricerca per capire quale metodo funzioni meglio per te.
Per esempio, se usi solo l'editor online, dovresti cercare un posto dove eseguire i benchmark online.
Per esempio, [JSBench.me][jsbench-me] è uno strumento di benchmarking online per JavaScript.

Se esegui il codice in locale, hai la possibilità di scaricare un software di benchmarking da eseguire sulla tua macchina.
Per esempio, Rust può usare [Criterion][criterion], oppure [cargo bench][cargo-bench] con i [test di benchmark][rust-benchmark-tests].

Ci sono almeno un paio di modi per tenere traccia dei benchmark.
Un modo è tenere un elenco sempre aggiornato di tutti quelli su cui fai benchmark, ma può diventare ingestibile se l'elenco si allunga.
Un altro modo è tenere un elenco di benchmark rappresentativi per approcci diversi.
I mentorati spesso vogliono vedere il codice degli approcci più veloci, quindi se un approccio più veloce è pubblicato, fornire il link sarà probabilmente molto apprezzato.

~~~~exercism/caution
Se fornisci un link a una soluzione su cui hai fatto benchmarking, assicurati di fornire il link alla soluzione pubblicata e non alla sessione di mentoring.
Non tutte le soluzioni che ricevono mentoring vengono pubblicate.
~~~~

## Appunti di mentoring non specifici di un esercizio

Potrebbero esserci alcune funzionalità del linguaggio che ti capita di affrontare in più di un esercizio.
Quando stai per copiare e incollare un suggerimento da un file all'altro, valuta invece di metterlo in un file a sé stante.
Di nuovo, un vantaggio di tenere un suggerimento in un unico posto è che diventa più facile perfezionarlo nel tempo.
Rende anche più facile trovarlo quando lo usi per un esercizio in cui non l'avevi mai usato prima.
Invece di cercare di ricordare in quale esercizio avevi affrontato il suggerimento, puoi andare direttamente al file del suggerimento.

## Quando un mentorato ha una domanda

I mentorati sono incoraggiati a specificare cosa si aspettano dalla sessione di mentoring.
Spesso lo esprimono sotto forma di domanda.
Se la domanda è qualcosa di cui non conosci la risposta e che non ti interessa, va bene lasciare la richiesta di mentoring a un altro mentore.

Se non conosci la risposta ma vuoi trovarla, forse è meglio non prendere in carico la richiesta di mentoring finché non l'hai scoperta.
Se nel frattempo la richiesta di mentoring è sparita, almeno avrai imparato qualcosa e non avrai fatto aspettare il mentorato.

Un'eccezione può essere se la richiesta di mentoring è già in coda da diversi giorni o più.
In quella situazione potresti voler prendere in carico la richiesta di mentoring e dare il feedback che puoi, e avvisare il mentorato che gli risponderai in merito alla sua domanda.
Naturalmente, è importante dare seguito a questa cosa, o per comunicare al mentorato la risposta, o per fargli sapere che non sei riuscito a trovarla.
Se non sei riuscito a trovare la risposta, può essere utile al mentorato descrivere quali strade hai percorso per cercarla.
Il mentorato potrebbe rispondere con altri modi per provare a trovare la risposta.
Tra voi due, la risposta potrebbe saltare fuori.

Se hai esaurito tutte le strade che conosci per trovare la risposta, puoi suggerire al mentorato di chiudere la discussione e inviare di nuovo la richiesta, nella speranza che un altro mentore possa fornire la risposta.
Se lo desidera, il mentorato può scrivere nella discussione chiusa per condividere con te la risposta una volta che l'ha scoperta.
E allo stesso modo, se scopri la risposta più tardi, puoi tornare nella discussione chiusa e farlo sapere al mentorato.

Se conosci la risposta e vuoi affrontarla, un buon momento per farlo è tra il momento in cui dici al mentorato cosa ti piace della sua soluzione e quello in cui offri suggerimenti per altri approcci.

### Codice che non funziona

Il codice può fallire sia perché non supera tutti i test, sia perché non viene compilato o non soddisfa l'interprete.

Mentori diversi avranno inclinazioni e/o pazienza variabili nel gestire codice che non funziona, il che può dipendere in parte da come viene presentato, dato che il codice che non funziona non è sempre presentato allo stesso modo.

A volte un mentorato dirà che ha provato un altro approccio e non ha funzionato, e chiederà perché non abbia funzionato.
Il codice potrebbe non essere nemmeno fornito, oppure potrebbe essere pubblicato in un commento praticamente illeggibile invece che in un'iterazione.

Una soluzione testata nell'editor online può essere inviata per una richiesta di mentoring solo se ha superato tutti i test.
Una delle ragioni è che così il mentore può concentrarsi sul suggerire miglioramenti o altri approcci al codice funzionante esistente.
Il _debugging_ del codice non è necessariamente qualcosa che un mentore voglia o sia tenuto a fare.
Tuttavia, una soluzione che non funziona, inviata tramite la CLI, può essere proposta per una richiesta di mentoring, con il mentorato che chiede aiuto per risolverla.

Se il codice che non funziona non è stato fornito, e l'approccio fallito descritto non sembra buono, potrebbe bastare suggerire che, invece di usare l'approccio fallito, un altro approccio potrebbe essere uno che non sia né l'approccio fallito né quello che hanno usato e che ha superato i test.
Oppure potrebbe bastare spiegare perché l'approccio che hanno usato è migliore dell'approccio fallito, senza entrare nei dettagli di quale bug ci fosse nell'approccio fallito.

Per esempio, un caso comune è quello dei mentorati che hanno problemi con Robot Name.
O i test vanno in timeout, o non riescono a generare abbastanza nomi, e vogliono sapere come risolvere il problema.
Se ne hai l'inclinazione e la pazienza, puoi senz'altro analizzare il loro codice e suggerire come affrontare il problema.
Oppure puoi spiegare che controllare nomi generati casualmente causa più collisioni man mano che vengono generati più nomi, e suggerire che un altro approccio potrebbe essere generare i nomi in sequenza e poi mescolarli.

Se il codice che non funziona è stato incollato in un commento praticamente illeggibile, potresti voler dare il feedback che puoi sulla soluzione che passa i test, e suggerire di inviare il codice del commento come un'altra iterazione.
Puoi anche suggerire al mentorato di controllare gli errori dell'iterazione che fallisce, come guida per capire dov'è il problema.

Se il codice è in un'iterazione che fallisce, può essere utile indirizzare il mentorato a controllare gli errori dell'esecuzione dei test.
Alcuni linguaggi richiedono un po' più di guida su come leggere gli errori o i risultati dei test rispetto ad altri.
Può essere utile citare una o più parti degli errori e spiegare al mentorato cosa significano.

In definitiva, non è responsabilità del mentore riparare il codice che non funziona del mentorato, ma il mentore, se vuole, può suggerire al mentorato dei modi per ripararlo da solo.

## Gestire il continuum della coda

Può capitare che ti iscrivi per fare mentoring in un track, ma non vedi mai nessun esercizio nella sua coda da seguire.
Potresti pensare che qualcosa non vada, ma ci sono almeno un paio di ragioni per questo.
Una ragione è che al momento le persone potrebbero non richiedere mentoring nel track.
A volte un track può avere periodi di inattività.
Un'altra ragione è che altri mentori potrebbero prendere in carico le richieste prima che tu le veda.
È probabile che succeda per un track popolare che ha molti mentori attivi.

Se ci sono molte richieste in coda, ci sono alcuni modi per affrontare il mentoring.
Potresti voler procedere dal più vecchio al più recente, così chi ha aspettato di più viene gestito per primo.
Oppure potresti scegliere di procedere dal più recente al più vecchio, soprattutto se i più vecchi aspettano già da molto tempo.
Così, le persone attive di recente non devono aspettare che venga smaltito l'arretrato.

Se ci sono più richieste per lo stesso esercizio, potresti volerle gestire a gruppi dello stesso esercizio per mantenere la concentrazione, invece di passare dall'esercizio A all'esercizio B e poi di nuovo all'esercizio A.

Può capitare che una richiesta per un esercizio che non ti interessa sia lì da giorni o settimane.
Puoi scegliere di non affrontarla, sperando che un altro mentore la prenda in carico, oppure può servire da motivazione per provare tu stesso l'esercizio.
Una cosa che può essere utile è guardare la soluzione inviata.
Potrebbe usare un approccio a cui non avevi pensato, e quell'approccio potrebbe renderti più attraente risolvere l'esercizio.
Ma se guardi il codice e non sei comunque interessato a risolvere l'esercizio, non c'è alcun danno.
Il fatto che tu guardi una richiesta di mentoring non significa che devi premere il pulsante "Start mentoring".

[website-copy]: https://github.com/exercism/website-copy/tree/main/tracks
[jsbench-me]: https://jsbench.me/
[criterion]: https://crates.io/crates/criterion
[cargo-bench]: https://doc.rust-lang.org/cargo/commands/cargo-bench.html
[rust-benchmark-tests]: https://doc.rust-lang.org/unstable-book/library-features/test.html
