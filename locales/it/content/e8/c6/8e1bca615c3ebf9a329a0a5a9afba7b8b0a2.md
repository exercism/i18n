# Buone pratiche

## Segui le buone pratiche ufficiali

Le [buone pratiche ufficiali per il Dockerfile](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) contengono molto materiale utile su come migliorare i tuoi Dockerfile.

## Prestazioni

Dovresti ottimizzare principalmente le prestazioni (soprattutto per i test runner).
Così il tuo tooling verrà eseguito il più velocemente possibile e non andrà in timeout.

### Misurare

Misurare spesso il tempo di esecuzione è un ottimo modo per farsi un'idea delle prestazioni del tooling.
Prendi l'abitudine di misurare il tempo di esecuzione sia dopo _sia_ prima di una modifica.
Anche quando sei «certo» che una modifica migliorerà le prestazioni, dovresti comunque misurare il tempo di esecuzione.

#### Script

Quando possibile, crea degli script per misurare automaticamente le prestazioni (note anche come _benchmarking_).
Uno strumento da riga di comando molto utile è [hyperfine](https://github.com/sharkdp/hyperfine), ma sentiti libero di usare quello che ha più senso per il tuo tooling.

I repository di tooling dei track più recenti avranno accesso ai due script seguenti:

1. `./bin/benchmark.sh`: esegue il benchmark del codice del tooling del track ([codice sorgente](https://github.com/exercism/generic-test-runner/blob/main/bin/benchmark.sh))
2. `./bin/benchmark-in-docker.sh`: esegue il benchmark dell'immagine Docker del tooling del track ([codice sorgente](https://github.com/exercism/generic-test-runner/blob/main/bin/benchmark-in-docker.sh))

```exercism/note
Se stai lavorando a un repository di tooling di un track che non ha questi file, sentiti libero di copiarli nel tuo repository usando i link al codice sorgente qui sopra.
```

```exercism/caution
Gli script di benchmark possono aiutare a stimare le prestazioni del tooling.
Tieni però presente che le prestazioni sui server di produzione di Exercism sono spesso inferiori.
```

### Sperimenta con immagini di base diverse

Prova a sperimentare con immagini di base diverse (ad esempio Alpine invece di Ubuntu), per vedere se una ha prestazioni (nettamente) migliori dell'altra.
Se le prestazioni sono più o meno equivalenti, scegli l'immagine più piccola.

### Prova la rete interna

Controlla se usare la rete `internal` invece di `none` migliora le prestazioni.
Consulta la [documentazione sulla rete](/docs/building/tooling/docker#network) per maggiori informazioni.

### Preferisci i comandi in fase di build a quelli in fase di esecuzione

Il tooling del track esegue un container Docker monouso e di breve durata che compie i passaggi seguenti.

1. Viene creato un container Docker.
2. Il container Docker viene eseguito con gli argomenti corretti.
3. Il container Docker viene distrutto.

Quindi il codice che viene eseguito al passaggio 2 viene eseguito a _ogni singola esecuzione del tooling_.
Per questo motivo, ridurre la quantità di codice eseguito al passaggio 2 è un ottimo modo per migliorare le prestazioni.
Un modo per farlo è spostare il codice dalla _fase di esecuzione_ alla _fase di build_.
Mentre il codice della fase di esecuzione viene eseguito a ogni singola esecuzione del tooling, il codice della fase di build viene eseguito una sola volta (quando l'immagine Docker viene costruita).

Il codice della fase di build viene eseguito una sola volta come parte di un workflow di GitHub Actions.
Quindi va benissimo se il codice eseguito in fase di build è (relativamente) lento.

#### Esempio: precompilare le librerie

Quando esegue i test, il test runner di Haskell ha bisogno che alcune librerie di base siano compilate.
Dato che ogni esecuzione dei test avviene in un container nuovo, questo significa che la compilazione veniva fatta _a ogni singola esecuzione dei test_!
Per aggirare il problema, il [Dockerfile del test runner di Haskell](https://github.com/exercism/haskell-test-runner/blob/5264c460054649fc672c3d5932c2f3cb082e2405/Dockerfile) contiene i due comandi seguenti:

```dockerfile
COPY pre-compiled/ .
RUN stack build --resolver lts-20.18 --no-terminal --test --no-run-tests
```

Per prima cosa, la directory `pre-compiled` viene copiata nell'immagine.
Questa directory è impostata come un esercizio di test e dipende dalle stesse librerie di base da cui dipende l'esercizio vero e proprio.
Poi eseguiamo i test su quella directory, in modo simile a come vengono eseguiti i test per un esercizio vero e proprio.
L'esecuzione dei test comporterà la compilazione delle librerie di base, ma la differenza è che questa avviene in _fase di build_.
L'immagine Docker risultante avrà quindi le librerie di base già compilate.
Questo significa che non serve compilare in _fase di esecuzione_, il che porta a un'esecuzione (molto) più veloce.

#### Esempio: precompilare i binari

Alcuni linguaggi permettono di compilare il codice ahead-of-time o just-in-time.
Si tratta di un compromesso tra fase di build e fase di esecuzione e, anche in questo caso, per ragioni di prestazioni preferiamo l'esecuzione in fase di build.

Il [Dockerfile del test runner di C#](https://github.com/exercism/csharp-test-runner/blob/b54122ef76cbf86eff0691daa33c8e50bc83979f/Dockerfile) usa questo approccio: il test runner viene compilato in un binario ahead-of-time (in fase di build) invece di compilare il codice just-in-time (in fase di esecuzione).
Questo significa che c'è meno lavoro da fare in fase di esecuzione, il che dovrebbe contribuire a migliorare le prestazioni.

## Dimensione

Dovresti cercare di ridurre la dimensione dell'immagine, il che significa che questa:

- Sarà più veloce da rilasciare
- Ridurrà i costi per noi
- Migliorerà il tempo di avvio di ogni container

### Prova distribuzioni diverse

Immagini di distribuzioni diverse avranno dimensioni diverse.
Ad esempio, l'immagine `alpine:3.20.2` è **dieci volte** più piccola dell'immagine `ubuntu:24.10`:

```
REPOSITORY   TAG       SIZE
alpine       3.20.2    8.83MB
ubuntu       24.10     101MB
```

In generale, le immagini basate su Alpine sono tra le più piccole, perciò molte immagini di tooling si basano su Alpine.

### Prova le immagini ridotte

Alcune immagini hanno varianti "slim" speciali, in cui alcune funzionalità sono state rimosse, ottenendo dimensioni dell'immagine più piccole.
Ad esempio, l'immagine `node:20.16.0-slim` è **cinque volte** più piccola dell'immagine `node:20.16.0`:

```
REPOSITORY   TAG            SIZE
node         20.16.0        1.09GB
node         20.16.0-slim   219MB
```

Il motivo per cui le varianti "slim" sono più piccole è che hanno meno funzionalità.
Può darsi che la tua immagine non abbia bisogno delle funzionalità aggiuntive e, in tal caso, valuta di usare la variante "slim".

### Rimuovere gli elementi non necessari

Un modo ovvio, ma ottimo, per ridurre la dimensione della tua immagine è rimuovere tutto ciò che non ti serve.
Tra questi elementi possono esserci:

- File sorgente che non servono più dopo aver compilato un binario a partire da essi
- File destinati ad architetture diverse da quella dell'immagine Docker
- Documentazione

#### Rimuovi i file del gestore di pacchetti

La maggior parte delle immagini Docker deve installare pacchetti aggiuntivi, il che di solito avviene tramite un gestore di pacchetti.
Questi pacchetti devono essere installati in _fase di build_ (dato che in _fase di esecuzione_ non è disponibile alcuna connessione a internet).
Perciò, eventuali file di cache o di registro del gestore di pacchetti dovrebbero essere rimossi dopo aver installato i pacchetti aggiuntivi.

##### apk

Le distribuzioni che usano il gestore di pacchetti `apk` (come Alpine) dovrebbero usare il flag `--no-cache` quando usano `apk add` per installare i pacchetti:

```dockerfile
RUN apk add --no-cache curl
```

##### apt-get/apt

Le distribuzioni che usano il gestore di pacchetti `apt-get`/`apk` (come Ubuntu) dovrebbero eseguire i comandi `apt-get autoremove -y` e `rm -rf /var/lib/apt/lists/*` _dopo_ aver installato i pacchetti e nello stesso comando `RUN`:

```dockerfile
RUN apt-get update && \
    apt-get install curl -y && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*
```

### Usa le build multi-stage

Docker ha una funzionalità chiamata [build multi-stage](https://docs.docker.com/build/building/multi-stage/).
Queste ti permettono di suddividere il tuo Dockerfile in _stage_ separati, di cui solo l'ultimo finisce nell'immagine Docker prodotta (il resto serve solo a supportare la build dell'ultimo stage).
Puoi pensare a ogni stage come a un mini Dockerfile a sé stante; gli stage possono usare immagini di base diverse.

Le build multi-stage sono particolarmente utili quando il tuo Dockerfile richiede l'installazione di pacchetti necessari _solo_ in fase di build.
In questa situazione, la struttura generale del tuo Dockerfile è questa:

1. Definisci un nuovo stage (lo chiameremo stage "build").
   Questo stage sarà usato _solo_ in fase di build.
2. Installa i pacchetti aggiuntivi richiesti (nello stage "build").
3. Esegui i comandi che richiedono i pacchetti aggiuntivi (all'interno dello stage "build").
4. Definisci un nuovo stage (lo chiameremo stage "runtime").
   Questo stage costituirà l'immagine Docker risultante e verrà eseguito in fase di esecuzione.
5. Copia il risultato (o i risultati) dei comandi eseguiti al passaggio 3 (nello stage "build") in questo stage (lo stage "runtime").

Con questa configurazione, i pacchetti aggiuntivi vengono installati _solo_ nello stage "build" e _non_ nello stage "runtime", il che significa che non finiranno nell'immagine Docker prodotta.

#### Esempio: scaricare file

Il test runner di Fortran richiede `curl` per scaricare alcuni file.
Tuttavia, la sua immagine di esecuzione _non_ ha bisogno di `curl`, il che rende questo un caso d'uso perfetto per una build multi-stage.

Per prima cosa, il suo [Dockerfile](https://github.com/exercism/fortran-test-runner/blob/783e228d8449143d2040e68b95128bb791833a27/Dockerfile) definisce uno stage (chiamato "build") in cui viene installato il pacchetto `curl`.
Poi usa curl per scaricare dei file in quello stage.

```dockerfile
FROM alpine:3.15 AS build

RUN apk add --no-cache curl

WORKDIR /opt/test-runner
COPY bust_cache .

WORKDIR /opt/test-runner/testlib
RUN curl -R -O https://raw.githubusercontent.com/exercism/fortran/main/testlib/CMakeLists.txt
RUN curl -R -O https://raw.githubusercontent.com/exercism/fortran/main/testlib/TesterMain.f90

WORKDIR /opt/test-runner
RUN curl -R -O https://raw.githubusercontent.com/exercism/fortran/main/config/CMakeLists.txt
```

La seconda parte del Dockerfile definisce un nuovo stage e copia i file scaricati dallo stage "build" nel proprio stage usando il comando `COPY`:

```dockerfile
FROM alpine:3.15

RUN apk add --no-cache coreutils jq gfortran libc-dev cmake make

WORKDIR /opt/test-runner
COPY --from=build /opt/test-runner/ .

COPY . .
ENTRYPOINT ["/opt/test-runner/bin/run.sh"]
```

##### Esempio: installare le librerie

Il test runner di Ruby ha bisogno che i pacchetti `git`, `openssh`, `build-base`, `gcc` e `wget` siano installati prima che si possano installare le librerie (gem) richieste.
Il suo [Dockerfile](https://github.com/exercism/ruby-test-runner/blob/e57ed45b553d6c6411faeea55efa3a4754d1cdbf/Dockerfile) inizia con uno stage (a cui è dato il nome `build`) che installa quei pacchetti (tramite `apk add`) e poi installa le dipendenze (tramite `bundle install`):

```dockerfile
FROM ruby:3.2.2-alpine3.18 AS build

RUN apk update && apk upgrade && \
    apk add --no-cache git openssh build-base gcc wget git

COPY Gemfile Gemfile.lock .

RUN gem install bundler:2.4.18 && \
    bundle config set without 'development test' && \
    bundle install
```

Poi definisce lo stage che formerà l'immagine Docker risultante.
Questo stage _non_ installa le dipendenze installate dallo stage precedente; invece usa il comando `COPY` per copiare le librerie installate dallo stage di build nel proprio stage:

```dockerfile
FROM ruby:3.2.2-alpine3.18

RUN apk add --no-cache bash

WORKDIR /opt/test-runner

COPY --from=build /usr/local/bundle /usr/local/bundle

COPY . .

ENTRYPOINT [ "sh", "/opt/test-runner/bin/run.sh" ]
```

```exercism/note
Il [Dockerfile del test runner di C#](https://github.com/exercism/csharp-test-runner/blob/b54122ef76cbf86eff0691daa33c8e50bc83979f/Dockerfile) fa qualcosa di simile, solo che in questo caso lo stage di build può usare un'immagine Docker esistente che ha già installato i pacchetti aggiuntivi richiesti per installare le librerie.
```

## Test

### Usa i test di integrazione

Gli unit test possono essere molto utili, ma consigliamo di concentrarti sulla scrittura di [test di integrazione](https://en.wikipedia.org/wiki/Integration_testing).
Il loro vantaggio principale è che verificano meglio come il tooling viene eseguito in produzione e quindi aiutano ad aumentare la fiducia nell'implementazione del tuo tooling.

#### Usa Docker

Per imitare al meglio l'ambiente di produzione, i test di integrazione dovrebbero eseguire il tooling _esattamente come nell'ambiente di produzione_.
Questo significa costruire l'immagine Docker e poi eseguire l'immagine costruita su una soluzione per verificarne l'output.

#### Usa i golden test

I test di integrazione dovrebbero essere definiti come [golden test](https://ro-che.info/articles/2017-12-04-golden-tests), cioè test in cui l'output atteso è memorizzato in un file.
Questo è perfetto per i test di integrazione del tooling dei track, dato che anche l'output del tooling è costituito da file.

##### Esempio: test runner

Quando si esegue il test runner su una soluzione, il suo output è un file `results.json`.
Possiamo poi confrontare questo file con un file di output «noto come corretto» (cioè «atteso»), chiamato `expected_results.json`, per verificare se il test runner funziona come previsto.

## Sicurezza

La sicurezza è uno dei motivi principali per cui usiamo i container Docker per eseguire il nostro tooling.

### Preferisci le immagini ufficiali

Ci sono molte immagini Docker su [Docker Hub](https://hub.docker.com/), ma cerca di usare quelle [ufficiali](https://hub.docker.com/search?q=&image_filter=official).
Queste immagini sono curate e hanno una probabilità (molto) minore di essere pericolose.

### Fissa le versioni

Per assicurarti che le build siano stabili (cioè che non si rompano all'improvviso), dovresti sempre fissare le tue immagini di base a tag specifici.
Questo significa che invece di:

```dockerfile
FROM alpine:latest
```

dovresti usare:

```dockerfile
FROM alpine:3.20.2
```

Con quest'ultima, le build useranno sempre la stessa versione.

### Esegui come utente non privilegiato

Per impostazione predefinita, molte immagini vengono eseguite con un utente che ha privilegi di root.
Dovresti valutare di eseguire come utente non privilegiato.

```dockerfile
FROM alpine

RUN groupadd -r myuser && useradd -r -g myuser myuser

# RUN <COMMANDS THAT REQUIRE ROOT USER, E.G. INSTALLING PACKAGES>

USER myuser
```

### Aggiorna i repository dei pacchetti all'ultima versione

È (quasi) sempre una buona idea installare le versioni più recenti

```dockerfile
RUN apt-get update && \
    apt-get install curl
```

### Supporta un filesystem di sola lettura

Incoraggiamo a scrivere i Dockerfile usando un filesystem di sola lettura.
Le uniche directory che dovresti dare per scontato che siano scrivibili sono:

- La directory della soluzione (passata come secondo argomento)
- La directory di output (passata come terzo argomento)
- La directory `/tmp`

```exercism/caution
Al momento il nostro ambiente di produzione _non_ impone un filesystem di sola lettura, ma in futuro potremmo farlo.
Per questo motivo, il template di base per un nuovo test runner/analyzer/representer parte con un filesystem di sola lettura.
Se non riesci a far funzionare le cose su un filesystem di sola lettura, sentiti libero di (per ora) dare per scontato un filesystem scrivibile.
```
