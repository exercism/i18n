# Pruebas

En MacOS/Linux, ejecuta:

```sh
$ chmod +x gradlew
```

Ejecuta las pruebas con:

```sh
$ ./gradlew test
```

> Usa `gradlew.bat` si estás en Windows

## Pruebas omitidas

Cuando pase la primera prueba (o las primeras), continúa comentando o eliminando las anotaciones `@Ignore` que preceden al resto de las pruebas.