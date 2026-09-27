# Testes

Em MacOS/Linux, executa:

```sh
$ chmod +x gradlew
```

Executa os testes com:

```sh
$ ./gradlew test
```

> Usa o `gradlew.bat` se estiveres no Windows

## Testes ignorados

Depois de o primeiro teste (ou os primeiros testes) passar, continua a comentar ou a remover as anotações `@Ignore` que antecedem os outros testes.