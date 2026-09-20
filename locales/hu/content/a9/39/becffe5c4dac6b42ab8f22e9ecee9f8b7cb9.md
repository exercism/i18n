# JSON-fájlok formázása

Egy Exercism-kurzus repójában sok JSON-fájl található, többek között:

- A kurzus `config.json` fájlja.
- Minden fogalomhoz egy-egy `.meta/config.json` és `links.json` fájl.
- Minden tanulófeladat vagy gyakorlófeladat esetében egy `.meta/config.json` fájl.

Ezek a fájlok olvashatóbbak, ha az Exercism egészében egységes a formázásuk, ezért a configlet rendelkezik egy `fmt` paranccsal, amellyel egy kurzus JSON-fájljai kanonikus formára írhatók át.

A `fmt` parancs a következő fájlokat formázza:

- `config.json`
- `exercises/{concept,practice}/*/.approaches/config.json`
- `exercises/{concept,practice}/*/.articles/config.json`
- `exercises/{concept,practice}/*/.meta/config.json`

## Használat

A `fmt` parancs a feladatok 'meta/config.json' fájljait formázza.

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

Egy sima `configlet fmt` nem változtat a kurzuson, hanem ellenőrzi, hogy minden tanulófeladat és gyakorlófeladat `.meta/config.json` fájlja, valamint a kurzus `config.json` fájlja megfelelően formázott-e.

Ha ki szeretnéd íratni azon útvonalak listáját, amelyeknél még nincs formázott feladat-`.meta/config.json` fájl (a program nem nulla kilépési kóddal tér vissza, ha legalább egy feladatból hiányzik a formázott configfájl):

```shell
configlet fmt
```

Ha szeretnéd, hogy a program rákérdezzen a formázott configfájlok kiírására, add hozzá a `--update` kapcsolót (rövidítve `-u`):

```shell
configlet fmt --update
```

Ha interakció nélkül akarod kiírni a formázott configfájlokat, add hozzá a `--yes` kapcsolót (rövidítve `-y`):

```shell
configlet fmt --update --yes
```

Ha csak egyetlen feladaton akarsz műveletet végezni, használd a `--exercise` kapcsolót (rövidítve `-e`).
Ha például interakció nélkül akarod kiírni a `prime-factors` feladat formázott configfájlját:

```shell
configlet fmt -uy -e prime-factors
```

JSON-fájlok írásakor a `configlet fmt` a következőket teszi:

- A kulcs/érték párokat kanonikus sorrendben írja.

- Két szóközzel behúz.

- A JSON-tömb minden elemét és a JSON-objektum minden kulcsát külön sorba teszi.

- Eltávolítja azon kulcsok kulcs/érték párjait, amelyek opcionálisak és üres értékűek.
  Például a `"source": ""` eltávolításra kerül.

- Eltávolítja a `"test_runner": true` bejegyzést a gyakorlófeladatok configfájljaiból.
  Ez egy opcionális kulcs: a specifikáció szerint a kihagyott `test_runner` kulcs a `true` értéket jelenti.

- Ha egy JSON-objektumban ugyanazzal a kulcsnévvel több kulcs/érték pár is szerepel, csak az utolsót tartja meg.

Egy feladat `.meta/config.json` fájljának kanonikus kulcssorrendje:

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

ahol a szögletes zárójelek azt jelzik, hogy a bennük lévő kulcs opcionális.

Vedd figyelembe, hogy a `configlet fmt` csak azokon a feladatokon dolgozik, amelyek szerepelnek a kurzusszintű `config.json` fájlban.
Ezért ha új feladatot készítesz egy kurzushoz, és formázni szeretnéd a `.meta/config.json` fájlját, először vedd fel a feladatot a kurzusszintű `config.json` fájlba.
Ha a feladat még nem áll készen arra, hogy a felhasználók lássák, állítsd a `status` értékét `wip`-re.

A kilépési kód 0, ha a configlet kilépésekor minden általa látott configfájl formázott, egyébként 1.
