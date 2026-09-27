**Avviso spoiler: questo articolo contiene spoiler sull'esercizio Chicchi in generale e, in particolare, sull'esercizio Chicchi della traccia Bash.  Se non l'hai ancora completato da solo e non vuoi che ti vengano mostrate alcune soluzioni, torna quando l'avrai finito!**

È il tuo primo giorno in una nuova azienda.  Hai sbrigato tutte le pratiche, hai conosciuto il team ed è finalmente arrivato il momento di sederti e iniziare a leggere un po' del codice su cui lavorerai.  Cominci a leggere le varie funzioni, classi e moduli e, mentre leggi, ti ritrovi a strizzare gli occhi davanti allo schermo, confuso.  Continui a leggere, e dalla tua bocca sfugge una sola parola, appena sussurrata, quasi solo respirata: «Coooooosa...»[^1]  Più vai avanti, più la cosa si ripete, e ti senti sempre più smarrito e persino un po' arrabbiato.

> Che cosa sta succedendo in questo codice?

Ogni volta che più di una persona lavora sullo stesso pezzo di codice, la cura e l'intenzionalità necessarie per mantenerlo gestibile aumentano *parecchio*.  Non si tratta più di un concetto che vive nella tua testa e di un codice che deve solo farlo accadere.  Adesso il concetto deve vivere *dentro il codice*, dove tutti i collaboratori possono vederlo e modificarlo se serve.

*Come* realizzi qualcosa non significa granché per l'utente finale, ma dovrebbe dire *moltissimo* a ogni sviluppatore che in qualche momento entra in contatto con il tuo progetto.  Spesso ci sono molti modi per ottenere la stessa funzionalità, e può sembrare che qualsiasi opzione basti per fare il lavoro.  Io però credo che ogni singola decisione che prendi debba avere una ragione (anche se è una decisione piccola con una ragione piccola), e quella ragione dovrebbe comunicare un obiettivo o un requisito.

L'idea che i dettagli implementativi debbano aiutare chi legge il codice a distinguere il processo di pensiero, gli obiettivi e le priorità si chiama **intento progettuale**.  Come dai un nome alle variabili, quali parametri accetta la tua funzione e come vengono astratte le cose: tutti punti in cui l'intento progettuale può esprimersi, bene o male.

Sono fermamente convinto che l'intento progettuale sia una delle cose più importanti da considerare quando si realizza un progetto di ingegneria.  È una delle cose che distingue l'ingegneria del software dalla programmazione.

 > L'ingegneria del software è ciò che accade alla programmazione quando ci aggiungi il tempo e altri programmatori.
 >
 > [Russ Cox](https://research.swtch.com/vgo-eng)

## L'intento progettuale è trasversale alle discipline

Lavoro come ingegnere meccanico e progetto [stampi a iniezione](https://youtu.be/WHwTHarf8Ck?t=51), per lo più per dispositivi medici.  Una volta finiti, tutti i miei progetti escono direttamente dalla porta e finiscono in officina, dove si inizia a produrre tutti i pezzi e ad assemblarli.  Dato che non sanno tutto quello che mi è passato per la testa mentre creavo ogni progetto, devo trovare un modo per *mostrare* il mio intento attraverso il progetto stesso.

Spesso alcune caratteristiche sono particolarmente critiche.  O il cliente ha detto che lì servono tolleranze particolarmente strette, o il modo in cui lo stampo si incastra richiede per qualche motivo una precisione estrema.  Così, per aiutare gli operatori a produrre i pezzi dando priorità alla precisione nei punti importanti, devo lasciare zone appositamente squadrate o facili da bloccare in una morsa in un certo modo.  In questo modo, il percorso più semplice per loro produce i risultati migliori per me.

Ci sono anche punti in cui le dimensioni non sono così critiche.  Per esempio, se nel progetto metto un foro che serve solo per uno sfiato d'aria, gli darò una dimensione comune e comoda, tipo 6 mm.

Quando lavorano questo foro e vanno a misurarlo, se vedono un numero come 5,99 mm penseranno: «Ok, probabilmente doveva essere 6 mm, quindi ci sono andato vicino», e non dovranno nemmeno andare a ricontrollare le dimensioni sul CAD o sul disegno di specifica.  Invece, se scegliessi una misura insolita, tipo 5,87 mm, la guarderebbero e avrebbero questa prima reazione:

1. Oh, cavolo, sono andato molto sotto misura?  Doveva essere 6 mm?
2. (Vanno a controllare il CAD e vedono che il loro foro va bene e che è solo una misura insolita.)
3. Mmmh.  Sono sicuro che questo foro ha una misura insolita per un motivo.  Magari è davvero importante, o il cliente ha chiesto un foro speciale qui.  Devo andare a parlare con Ryan e capire cosa ha di così importante questo foro.
4. (SBAM!  Appoggiano con delicatezza il blocco di alluminio sulla mia scrivania.)
5. (Scoprono che questo foro non ha niente di importante, ho solo scelto una misura strana, e tutto questo lavoro e queste preoccupazioni sono stati inutili.)
6. Accidenti, quel Ryan, è proprio un bel tipo. (borbotta, impreca, borbotta)

Tutto questo succede perché ogni decisione del mio progetto comunica qualcosa alle altre persone che lo guardano e ci lavorano, che io lo voglia o no.  *Devono* per forza trovarci un significato, perché è l'unica informazione che hanno a disposizione!  Quindi è molto meglio se riesco a prendermi il tempo per mettere nel progetto informazioni *significative* e **intenzionali**.

## Chicchi: un'introduzione

Ora parliamo di come l'intento progettuale può essere comunicato nel codice, usando un esempio tratto da uno degli esercizi di Exercism.  Di recente ho lavorato con uno studente sulla sua soluzione all'esercizio *Chicchi* della traccia Bash.  *Chicchi* è un esercizio che affronta il [problema del grano e della scacchiera](https://en.wikipedia.org/wiki/Wheat_and_chessboard_problem).  In breve, un chicco di grano viene messo sulla prima casella di una scacchiera.  Due chicchi vanno sulla casella successiva.  Quattro chicchi sulla successiva.  E così via, con ogni casella che ha il doppio dei chicchi della precedente.  Agli studenti viene chiesto di trovare un modo per calcolare il valore di ogni singola casella e anche il numero totale di chicchi sulla scacchiera.

Questo studente in particolare ha trovato un modo piuttosto ingegnoso per calcolare il totale.

```bash
bc <<< 'ibase=16;FFFFFFFFFFFFFFFF'
```

`bc` è una calcolatrice da riga di comando.  Puoi passarle stringhe di operazioni aritmetiche e le valuterà, anche per numeri interi molto grandi e numeri in virgola mobile.  In Bash ci sono altri modi per fare calcoli senza usare `bc`, ma, per semplicità, vedremo come l'intento può essere comunicato, o non comunicato, usando `bc`.

Questa soluzione funziona perché tutto l'esercizio ruota attorno alle potenze di due, e dove ci sono potenze di due c'è il binario, e dove c'è il binario c'è l'esadecimale[^2]!

È una soluzione ingegnosa, ma che cosa ci dice il codice?  Che l'esadecimale è importante qui?  Che il problema ruota fondamentalmente attorno al 16?  Dopo aver riletto l'enunciato del problema, è chiaro che non è vero né l'uno né l'altro.  Io e lo studente abbiamo fatto un brainstorming su alcune idee per comunicare l'intento in modo più chiaro.  Ecco alcune cose che abbiamo tirato fuori:

### Prima opzione: il binario

Dato che abbiamo un mucchio di cose che raddoppiano (e quindi un mucchio di potenze di 2), vediamo cosa succede in binario, per capire se ci aiuta.

---

La prima casella ha 1 chicco.  In binario, sarebbe anche `0b1` (dove `0b` significa semplicemente «questo è un numero binario», e il numero vero e proprio è `1`).

La seconda casella ha 2 chicchi.  In binario, `0b10`.  Il totale finora è 3 (ovvero `0b11`).

La terza casella ha 4 chicchi (`0b100`).  Totale finora: 7 (`0b111`).

La quarta casella ha 8 chicchi (`0b1000`).  Totale finora: 15 (`0b1111`).

---

Riesci a vedere lo schema?

Ogni casella rappresenta un'altra cifra binaria, e sommarle tutte insieme produce solo una serie di 1.

Nella soluzione dello studente potremmo sostituire le F con 64 cifre 1 (una per ogni casella)!

```bash
bc <<< "ibase=2;1111111111111111111111111111111111111111111111111111111111111111"
```

Più intenzionale, perché corrisponde più da vicino a quello che ci dà il problema.  Ma noi non parliamo robot.  Una lunga serie di 1 praticamente impossibile da contare forse non è un miglioramento.

### Seconda opzione: il calcolo a forza bruta

Ok, allora forse abbandoniamo del tutto i sistemi di numerazione non decimali.  Perché non facciamo in modo che il codice rispecchi come conteremmo a mano il numero di chicchi su una scacchiera, contando i chicchi di ogni casella?

```bash
total=0
current_grains=1
for square in {1..64}; do
  total=$( bc <<< "$total + $current_grains" )
  current_grains=$( bc <<< "$current_grains * 2" )
done
echo "$total"
```

È molto più leggibile e comprensibile.  Il codice mostra chiaramente che il numero di caselle della scacchiera è un fattore determinante, così come l'effetto di raddoppio di ogni casella.  Penso che sia meglio della soluzione iniziale.

Però.

È lento.  Cicli, addizioni e chiamate ripetute a un comando esterno?  Tutto questo si accumula e porta a un tempo di esecuzione piuttosto lento.  È un grosso problema?  No.  Se stai scrivendo questo script in Bash, probabilmente hai già deciso di non avere vincoli di velocità.  Ma si potrebbe fare meglio?  Sì.

### Terza opzione: il calcolo diretto

Quindi, come sommiamo tutto questo senza iterare?

Consideriamo una versione *più piccola* dello stesso problema: una scacchiera con 5 caselle[^3].

Le cinque caselle avrebbero il seguente numero di chicchi:

```txt
---------------------
| 1 | 2 | 4 | 8 |16 |
---------------------
```

E il totale qui sarebbe: 1 + 2 + 4 + 8 + 16 = 31.  Mmm.  Il 31 non mi dice ancora niente di ovvio.  Facciamo un po' più grande.

Ok, e allora una scacchiera da 6 caselle?  Questa volta mostrerò il totale parziale sotto ogni casella, per aiutarci a sommare.

```txt
-------------------------
| 1 | 2 | 4 | 8 |16 |32 |
|   | 3 | 7 |15 |31 |63 |
-------------------------
```

E la somma: 1 + 2 + 4 + 8 + 16 + 32 = 63.  Mmm...  in realtà comincio a intravedere un accenno di schema, ma ne facciamo un altro per sicurezza.

7 caselle:

```txt
-----------------------------
| 1 | 2 | 4 | 8 |16 |32 |64 |
|   | 3 | 7 |15 |31 |63 |127|
-----------------------------
```

1 + 2 + 4 + 8 + 16 + 32 + 64 = 127.  Lo vedi?  I valori 31, 63, 127 ti dicono qualcosa?

Sono *quasi* potenze di 2.  Anzi, sono *uno in meno* della potenza di due *successiva*.

Un altro esempio, per fissarlo bene.  Immagina una scacchiera da 12 caselle.  Si parte da uno, raddoppiato 11 volte (che, nel mondo della matematica, è 2^11): 2048.  Raddoppialo ancora e ottieni 4096 (2^12).  Quindi... se abbiamo capito bene lo schema, il totale parziale sarebbe *uno in meno* di 4096, ovvero 4095.  E se lo sommiamo, otteniamo esattamente questo: 1 + 2 + 4 + 8 + 16 + 32 + 64 + 128 + 256 + 512 + 1024 + 2048 = 4095.

> Detto in un altro modo, per trovare il totale di tutte le `n` caselle devi salire di una potenza di due e sottrarre 1 dal risultato.

Il numero di chicchi sulla casella 64 è 2^63 (indicizzazione a partire da zero, ricordi?).  Quindiii, se vogliamo calcolare il numero totale di chicchi su tutte le caselle fino alla casella 64 *inclusa*, dobbiamo calcolare 2^64 e sottrarre 1.

Bam.

In Bash, apparirà così:

```bash
bc <<< "2^64 - 1"
```

Questo ha senso se confermi quello che succede con il binario.  In binario, qual era il totale di tutte le 64 caselle?

```txt
0b1111...  # 64 ones
```

Qual è il numero di chicchi sulla teorica 65ª casella?

```txt
0b10000... # 1 and 64 zeros
```

Come passi da 1 e 64 zeri a 64 uno?  Sottraendo 1.

E quale beneficio aggiuntivo ci dà?  Beh, ora abbiamo un'espressione bella e leggibile per il totale.  Non itera, quindi le prestazioni sono buone.  E contiene il numero 64, che è il numero di caselle di una scacchiera, un buon esempio di **intento progettuale** ben segnalato.  Se per qualche motivo, tra 1000 anni, il mondo si standardizzasse su una scacchiera 7x7, quell'ingegnere del futuro (probabilmente con Bash 6.1) controllerà lo script, capirà dove volevi arrivare e cambierà il 64 in un 49.  Tutto a posto!

## Rimanete intenzionali, amici miei

Quando realizzi un'implementazione, è facile buttare lì le cose e aggrapparsi alla prima soluzione che funziona.  Va bene mentre esplori il problema, ma una volta che hai capito bene i componenti critici, se hai il tempo da dedicare a una buona rifinitura, assicurati che ogni algoritmo, ogni nome di variabile e persino gli spazi bianchi disegnino un quadro del problema, dei requisiti critici e di come tutti i pezzi stanno insieme.

[^1]: Vedi anche [il fumetto di Thom Holwerda.](https://www.osnews.com/story/19266/wtfsm/)
[^2]: Se ti senti un po' arrugginito sul conteggio in binario ed esadecimale, @kytrinyx consiglia il libro [How to Count](https://www.amazon.com/Count-Programming-Mere-Mortals-Book-ebook/dp/B005DPIKPE).  E, con una spudorata autopromozione, di recente ho scritto [anche un paio di post sul blog su binario ed esadecimale.](https://www.assertnotmagic.com/2018/09/10/binary-hexadecimal-part-1/)
[^3]: Non so come funzionerebbe.  Forse potremmo far giostrare i pedoni l'uno contro l'altro.
