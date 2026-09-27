# Aggiornamento

Di tanto in tanto potremmo aver bisogno che tu aggiorni qualcosa.

## Immagine Pharo

Se devi aggiornare le librerie nella tua immagine Pharo di Exercism, la cosa migliore è assicurarti di aver inviato tutti gli esercizi in corso, salvato l'immagine e poi aver fatto un backup dei file Pharo.image e Pharo.changes. Una volta che hai un backup sicuro, valuta (seleziona e premi meta-g) tutto il seguente codice in un Playground:

 ```smalltalk

 './pharo-local/iceberg/exercism' asFileReference deleteAll.
 './pharo-local/package-cache' asFileReference deleteAll.

 IceRepository reset.

 Metacello new
  baseline: 'Exercism';
  repository: 'github://exercism/pharo-smalltalk:main/releases/latest';
  onConflict: [ :ex | ex allow ];
  load.

 #ExercismManager asClass upgrade.
 ```

Potrebbe apparire un avviso sulla perdita delle modifiche al pacchetto «ExercismTools»: in quel caso scegli "Load" per assicurarti di avere una versione compatibile degli strumenti.

Se hai bisogno di aggiornare (o effettuare il downgrade) a una versione specifica di Exercism, puoi anche modificare lo script qui sopra per indicare un numero di versione preciso, cambiando il percorso del repository come segue:

```smalltalk
 ...
  repository: 'github://exercism/pharo-smalltalk:<version-tag>';
 ...
 ```

Dove `<versison-tag>` potrebbe essere qualcosa come `v0.2.3` oppure `master`.

Una volta caricata una versione specifica, potresti anche dover «recuperare di nuovo» gli esercizi esistenti su cui vuoi continuare a lavorare, usando la solita voce di menu `Exercism | Fetch...`.

In rare situazioni (e se continui ad avere problemi), potresti aver bisogno di procurarti un nuovo file Pharo.image: il modo più semplice è reinstallare Pharo in una directory nuova, seguendo le normali istruzioni di installazione in cima a questa pagina.

## Esercizi Pharo

A volte potresti anche scoprire che un esercizio è stato aggiornato per aggiungere nuovi test o per riflettere nuove intuizioni, dopo che l'hai già risolto.

In questi casi, puoi scegliere di aggiornare la tua copia dell'esercizio all'ultima versione: questo significa che potresti dover adattare la tua soluzione per far passare i test, e poi potrai inviare il nuovo codice per un'ulteriore revisione.

Puoi farlo usando il menu `Exercism | View Track Progress`, che aprirà un browser sulla pagina dei tuoi progressi attuali nel track. Nella scheda `Test suite`, in fondo alla pagina, trovi un pulsante `Update exercise to latest version` se è stata rilevata una versione più recente dell'esercizio.

Se fai clic su questo pulsante e poi sul pulsante `Copy` (nella casella "Download your solution"), puoi incollare questo valore nella richiesta del menu `Exercism | Fetch new exercise`.

_NOTA: a partire dalla versione 0.2.8, il formato dei pacchetti degli esercizi in Pharo Exercism è stato modificato, così che gli esercizi appaiono in un pacchetto di primo livello chiamato Exercise@<Name> (invece che in un pacchetto tag chiamato Exercism-<Name>). Se aggiorni la tua immagine e hai vecchi esercizi che appaiono in questo precedente formato di denominazione, puoi comunque inviarli, ma se aggiorni anche il test dell'esercizio dovrai spostare le classi della tua soluzione nel nuovo pacchetto Exercise@<Name> dove è stato memorizzato il nuovo test._
