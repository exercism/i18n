# Formattare i file JSON

Il repository di un track di Exercism contiene molti file JSON, tra cui:

- Il file `config.json` del track.
- Per ogni concetto, un file `.meta/config.json` e un file `links.json`.
- Per ogni esercizio di concetto o esercizio di pratica, un file `.meta/config.json`.

Questi file sono più leggibili se hanno una formattazione coerente in tutto Exercism, perciò configlet ha un comando `fmt` che riscrive i file JSON di un track in una forma canonica.

Il comando `fmt` formatta i seguenti file:

- `config.json`
- `exercises/{concept,practice}/*/.approaches/config.json`
- `exercises/{concept,practice}/*/.articles/config.json`
- `exercises/{concept,practice}/*/.meta/config.json`

## Utilizzo

Il comando `fmt` formatta i file «meta/config.json» degli esercizi.

```
configlet [global-options] fmt [command-options]

Global options:
  -h, --help                   Show this help message and exit
      --version                Show this tool's version information and exit
  -t, --track-dir <dir>        Specify a track directory to use instead of the current directory
  -v, --verbosity <verbosity>  The verbosity of output. Allowed values: q[uiet], n[ormal], d[etailed]

Options for fmt:
  -e, --exercise <slug>        Only operate on this exercise
  -u, --update                 Prompt to write formatted files
  -y, --yes                    Auto-confirm the prompt from --update
```

Un `configlet fmt` senza altre opzioni non modifica il track: controlla la formattazione del file `.meta/config.json` di ogni esercizio di concetto e di pratica e del file `config.json` del track.

Per stampare un elenco dei percorsi per cui non esiste ancora un file `.meta/config.json` di esercizio formattato (uscendo con un codice di uscita diverso da zero se almeno un esercizio non ha un file di configurazione formattato):

```shell
configlet fmt
```

Per ricevere una richiesta di conferma prima di scrivere i file di configurazione formattati, aggiungi l'opzione `--update` (o `-u` in forma breve):

```shell
configlet fmt --update
```

Per scrivere i file di configurazione formattati senza interazione, aggiungi l'opzione `--yes` (o `-y` in forma breve):

```shell
configlet fmt --update --yes
```

Per operare su un singolo esercizio, usa l'opzione `--exercise` (o `-e` in forma breve).
Per esempio, per scrivere senza interazione il file di configurazione formattato dell'esercizio `prime-factors`:

```shell
configlet fmt -uy -e prime-factors
```

Quando scrive i file JSON, `configlet fmt`:

- Scrive le coppie chiave/valore nell'ordine canonico.

- Usa due spazi per l'indentazione.

- Usa una riga separata per ogni elemento di un array JSON e per ogni chiave di un oggetto JSON.

- Rimuove le coppie chiave/valore delle chiavi opzionali che hanno un valore vuoto.
  Per esempio, `"source": ""` viene rimossa.

- Rimuove `"test_runner": true` dai file di configurazione degli esercizi di pratica.
  Questa è una chiave opzionale: le specifiche dicono che una chiave `test_runner` omessa implica il valore `true`.

- Quando un oggetto JSON ha più di una coppia chiave/valore con lo stesso nome di chiave, conserva solo l'ultima.

L'ordine canonico delle chiavi per il file `.meta/config.json` di un esercizio è:

```text
- authors
- [contributors]
- files
  - solution
  - test
  - exemplar           (Concept Exercises only)
  - example            (Practice Exercises only)
  - [editor]
  - [invalidator]
- [language_versions]
- [forked_from]        (Concept Exercises only)
- [icon]               (Concept Exercises only)
- [test_runner]        (Practice Exercises only)
- blurb
- [source]
- [source_url]
- [custom]
```

dove le parentesi quadre indicano che la chiave racchiusa è opzionale.

Nota che `configlet fmt` opera solo sugli esercizi presenti nel file `config.json` a livello di track.
Quindi, se stai implementando un nuovo esercizio su un track e vuoi formattarne il file `.meta/config.json`, aggiungi prima l'esercizio al file `config.json` a livello di track.
Se l'esercizio non è ancora pronto per gli utenti, imposta il suo valore `status` su `wip`.

Il codice di uscita è 0 quando, all'uscita di configlet, ogni file di configurazione esaminato è formattato, e 1 in caso contrario.
