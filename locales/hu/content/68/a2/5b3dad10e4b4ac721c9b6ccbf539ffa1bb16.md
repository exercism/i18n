# Tesztek

MacOS/Linux esetén futtasd a következőt:

```sh
$ chmod +x gradlew
```

A teszteket ezzel futtasd:

```sh
$ ./gradlew test
```

> Windows esetén a `gradlew.bat` fájlt használd.

## Kihagyott tesztek

Miután az első teszt(ek) sikeresen lefutottak, úgy folytasd, hogy kikommenteled vagy eltávolítod a többi teszt elé írt `@Ignore` annotációkat.