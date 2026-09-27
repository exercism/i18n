**Importante: queste informazioni sono ormai superate. Consulta il nostro [nuovo post sul blog](https://exercism.org/blog/contribution-guidelines-nov-2023) per i dettagli aggiornati.**

---

_TL;DR; stiamo dedicando qualche mese a ridisegnare il nostro modello di volontariato e a concedere ai nostri volontari più importanti una pausa dal lavoro di revisione dei contributi della community.
Se usi Exercism soltanto per imparare o per fare da mentore, non c'è nulla che tu debba sapere (anche se, se ti interessa, leggi pure!).
Se invece sei un maintainer di un track, vuoi contribuire a Exercism o vuoi segnalare un bug o un problema, considera questa una lettura essenziale 🙂_

---

Negli ultimi 6 mesi abbiamo dedicato molto tempo a esplorare il futuro di Exercism, immaginando come sarebbe se ogni track di una lingua potesse diventare il migliore possibile.
Siamo incredibilmente orgogliosi di quello che abbiamo costruito finora.
Le 85.000 testimonianze che sono state lasciate parlano dell'incredibile lavoro che la nostra community ha fatto costruendo i track delle varie lingue e guidando come mentori così tanti studenti attraverso di essi.
La cosa più importante è che crediamo di aver appena scalfito la superficie di ciò che è possibile.
Abbiamo grandi idee, speranze ed entusiasmo per tutto ciò che Exercism può diventare.
Ma per realizzarle, dobbiamo prima risolvere alcuni problemi fondamentali che restano in agguato sotto la superficie.

Il più importante tra questi è la necessità di risolvere la sfida di far crescere la nostra community di volontari in modo sano e sostenibile.
Exercism è stato costruito sulle spalle di centinaia di volontari dedicati, ma oggi una gran parte di loro è in burnout e molti se ne sono andati proprio per questo.
Le ragioni sono innumerevoli: alcune direttamente legate a Exercism, altre dovute alle pressioni del tempo nella vita quotidiana, altre ancora al contesto di tutto ciò che sta accadendo nel mondo in questo momento.
Ma ci è diventato molto chiaro che dobbiamo progettare e sviluppare un modo migliore di costruire la nostra piattaforma insieme.

Storicamente abbiamo provato a costruire Exercism con un modello Open Source Software (OSS), con dei maintainer che revisionano i contributi della community più ampia.
Questo ci ha causato molti problemi e ha creato frustrazione sia ai maintainer sia ai contributori.
Se vuoi i dettagli, li approfondisco più avanti; ma il TL;DR; è che i nostri volontari più importanti ora passano il loro tempo a fare da guardiani reattivi invece che da creatori innovativi.
È molto meno divertente per loro, e significa che Exercism perde la magia che quelle persone avevano portato alla piattaforma.

Ci sono due cose che dobbiamo fare per risolvere la questione:
1. Dobbiamo progettare un nuovo sistema di volontariato che si adatti a Exercism meglio del modello OSS tradizionale.
  Finora abbiamo speso parecchie energie per provarci, senza riuscirci.
  Quindi ci prenderemo una pausa per lavorare con i nostri volontari e progettarlo come si deve nei prossimi mesi.
2. Metteremo in gran parte in pausa i contributi della community più ampia per i prossimi mesi, per permettere ai nostri volontari più importanti di concentrarsi sulla costruzione e lo sviluppo dei track come vogliono loro (o di prendersi un anno sabbatico, se vogliono solo tirare il fiato!)

Spero che, facendo un passo indietro e progettando davvero bene tutto questo, insieme alla raccolta fondi per ampliare il nostro team educativo, possiamo rendere Exercism un posto fantastico in cui fare volontariato e contribuire a garantirne il futuro.
Nel frattempo, questi cambiamenti dovrebbero permettere ai track di migliorare e crescere più di quanto abbiano potuto fare nell'ultimo anno, e ai nostri maintainer di smettere di cadere nel burnout e di sentirsi invece più felici, più energici e più legati al lavoro su Exercism.

## Cambiamenti concreti

Ci sono tre cambiamenti concreti che stiamo attuando.

### Usa il forum, non le issue di GitHub

Libereremo GitHub completamente perché i nostri maintainer possano lavorare sulle issue che vogliono portare avanti.
Chiuderemo una gran quantità di issue che avevamo creato in precedenza perché la community ci lavorasse (e aggiungeremo un tag così che possano essere riaperte facilmente in futuro, se lo vorremo), e allo stesso tempo non permetteremo nuove issue o PR non richieste nella maggior parte dei repository.
Se vuoi discutere o segnalare qualcosa, usa invece il [forum](https://forum.exercism.org).
Se apri una issue o una PR non richiesta, verrà chiusa automaticamente e ti verrà indicato il forum.

### Mettere in pausa i contributi della community più ampia

I track saranno divisi in tre categorie:
- La maggior parte dei track con maintainer attivi avrà i contributi della community in pausa, per permettere ai maintainer di essere autonomi o di prendersi una pausa.
  (I maintainer di questi track possono chiedere di rimuovere l'obbligo della singola revisione.
  Per questo, parla con Erik su Slack)
- Alcuni track con maintainer attivi che vogliono continuare ad accettare contributi della community resteranno aperti (se sei un maintainer e preferisci questa modalità rispetto alla (1), contatta Jonathan Middleton su Slack per parlarne).
- Per i track senza maintainer attivi, lo sviluppo dei track sarà di fatto sospeso per questo periodo.

In tutti i casi, io ed Erik continueremo a fare un controllo di affidabilità sui PR verso i repository degli strumenti prima del merge.

L'unica eccezione è che continueremo ad accettare PR per Approcci e Articoli, e attueremo una politica di merge ottimistico a livello di organizzazione che mira a popolare una base di Approcci in tutto Exercism e a consentire miglioramenti incrementali, secondo le seguenti regole:
1. Se il codice risolve l'esercizio ed è idiomatico dal punto di vista sintattico e semantico (cioè, sembra codice $LANG), dovrebbe essere fatto il merge.
  In caso contrario, dovrebbe essere corretto dall'autore della PR.
2. Se un maintainer vuole apportare modifiche al contenuto (ad esempio, migliorare i consigli, ritoccare qualcosa, mettere in evidenza approcci migliori/alternativi/più idiomatici), questo dovrebbe essere fatto in una PR successiva.

### Progettare un nuovo sistema di volontariato

Metteremo insieme un Community Board per co-progettare un quadro di volontariato sostenibile e sano per il nostro futuro, che liberi il potenziale di Exercism.
Se credi nel futuro di Exercism e vuoi far parte di questo processo, mettiti in contatto con [Jonathan](mailto:jonathan@exercism.org).

Andremo avanti con queste azioni per i prossimi mesi.
Valuteremo tutto lungo il percorso e prevediamo di prendere nuove decisioni entro giugno 2023.
Se hai qualche idea, apri un argomento sul [forum](https://forum.exercism.org)!

## Postilla: perché il nostro modello OSS è rotto

Il nostro modello storico è stato costruito attorno al modello OSS.
Si è basato su volontari che sono entrati in Exercism, hanno fatto un ottimo lavoro costruendo i track e poi hanno ricevuto i privilegi di maintainer, con cui potevano accettare contributi dalla nostra base di utenti più ampia per migliorarli.

Anche se sulla carta sembra ottimo, ha alcuni problemi significativi.
Il più importante è che le persone che aggiungono più magia a Exercism finiscono per non avere tempo per programmare o creare Exercism, perché il loro tempo viene speso a rispondere ai contributi della community.
Questo non è quasi mai il motivo per cui i maintainer si sono avvicinati a Exercism, e non è un lavoro che gli piace.
È un po' come quando qualcuno che ama sviluppare viene «promosso» a caposquadra, dove gestisce persone invece di programmare.
Potrebbe sembrare una bella promozione sul momento, ma spesso si scopre che alle persone piace fare i manager la metà di quanto piacciano loro programmare.

Si basa anche sul presupposto che la somma dei contributi della community più ampia sia maggiore del contributo individuale che un dato maintainer potrebbe altrimenti dare.
Ma in Exercism quasi mai è così.
Exercism è complesso e l'educazione è difficile, e insieme rendono il contribuire a Exercism una cosa complessa e difficile da costruire.
C'è tantissimo da imparare e capire sia su come funziona tecnicamente Exercism sia sul suo approccio all'educazione, e questo significa che la maggior parte dei primi contributi sono persone che stanno trovando la loro strada.
Questo significa che i loro contributi iniziali sono relativamente piccoli, ma anche che quasi sempre richiedono parecchio lavoro di revisione e ritocco.
È un lavoro che richiede tempo per i maintainer.
Anzi, il tempo totale speso nella revisione (oltre al cambio di contesto necessario) fa sì che il maintainer metta generalmente più impegno nel revisionare la PR di quanto ne avrebbe messo se l'avesse semplicemente fatta da sé.
Ci sono, naturalmente, alcune eccezioni, ma è vero nel 99% dei casi.
E spesso questo è ancora più doloroso per il maintainer, perché il problema che la PR risolve non era in cima alla sua lista di priorità, il che significa che le cose che sa essere davvero essenziali non vengono fatte di conseguenza.

Infine, il modello OSS si basa sul fatto che i contributori partano in piccolo e alla fine diventino abbastanza competenti e costanti da poter diventare maintainer.
Nei progetti OSS come le librerie software, questo funziona relativamente bene (ad esempio, qualcuno usa una libreria in produzione e continua ad aggiungervi miglioramenti, al punto da avere alla fine tanta conoscenza quanto il creatore originale).
Però, per Exercism, semplicemente non è successo.
Nonostante nell'ultimo anno abbiamo fatto il merge di PR di migliaia di contributori, solo una manciata di loro è diventata un contributore abituale e ancora meno sono diventati maintainer.
Anche questo è dovuto principalmente alla complessità di Exercism, ma anche al fatto che non è un pezzo di software contenuto, dove questo modello tradizionalmente funziona.

Tutto questo è incredibilmente demoralizzante per i maintainer e dannoso per Exercism.

I track si sono arenati e i nostri volontari più importanti, che avevano passione per il costruire, l'hanno in gran parte persa quando il loro lavoro è diventato revisionare il lavoro altrui, negoziare priorità contrastanti e gestire richieste inaspettate.
Durante la costruzione della v3, i maintainer potevano lavorare con relativa autonomia, perché il loro lavoro era in gran parte dietro le quinte, il che ha portato a un livello enorme di produttività e ha fatto sì che la maggior parte delle persone si divertisse davvero a contribuire.
Dal lancio della v3, nonostante molti volontari abbiano dedicato a Exercism altrettanto tempo, è stato un periodo molto meno piacevole e produttivo, in gran parte per quanta energia è stata spesa a rispondere ai contributi o alle issue altrui.
I nostri volontari ora passano il loro tempo a fare da guardiani reattivi invece che da innovatori, ed è molto meno divertente.

Queste sono le sfide che dobbiamo risolvere, e sono difficili.
Dobbiamo trovare un modo perché le persone che vogliono spendere centinaia di ore a costruire i track di Exercism possano farlo e amare farlo.
Dobbiamo trovare un modo perché le correzioni di bug e i piccoli contributi entrino nel nostro codice senza occupare l'attenzione di quei volontari più importanti.
E dobbiamo trovare un modo per attirare nuovi volontari in Exercism e sostenerli qualora decidano di impegnarsi in contributi continuativi.
Dobbiamo ridurre in generale il fare da guardiano, rispettando comunque il fatto che chi ha messo tanto impegno nei track ha opinioni forti e molto ben ponderate.
Dobbiamo rendere divertente gestire e portare avanti tutta questa struttura di volontariato.
E dobbiamo risolvere anche tutta una serie di altre cose.
Ci vorrà tempo, sarà una sfida, ma quando ci riusciremo sarà fantastico.
