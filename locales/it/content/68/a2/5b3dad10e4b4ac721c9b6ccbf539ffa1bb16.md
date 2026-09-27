# Test

Su MacOS/Linux, esegui:

```sh
$ chmod +x gradlew
```

Esegui i test con:

```sh
$ ./gradlew test
```

> Usa `gradlew.bat` se sei su Windows

## Test saltati

Dopo che il primo test (o i primi test) è passato, continua trasformando in commento o rimuovendo le annotazioni `@Ignore` che precedono gli altri test.