# Tesztek

A tesztfuttató használatához [helyesen telepített Godotra][installation] lesz szükséged.

## A tesztek futtatása

A [tesztfuttató][test runner] a megoldások betöltésére és tesztelésére szolgál.
Amikor egy feladatot helyben letöltesz, a tesztfuttató egy példányát is megkapod, egy shell-szkripttel együtt, amellyel elindíthatod.

A feladat futtatásához egyszerűen futtasd a `./run_tests` szkriptet a feladat könyvtárában.

Például:

```bash
cd "$(exercism workspace)/gdscript/hello-world"
./run_tests
```

[installation]: https://exercism.org/docs/tracks/gdscript/installation
[test runner]: https://raw.githubusercontent.com/exercism/gdscript-test-runner/refs/heads/main/bin/test_runner.gd
