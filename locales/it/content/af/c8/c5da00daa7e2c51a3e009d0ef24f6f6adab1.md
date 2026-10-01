# Test

Per usare il test runner, devi avere [Godot installato][installation] correttamente.

## Eseguire i test

Il [test runner][] viene usato per caricare e testare le soluzioni.
Quando scarichi un esercizio in locale, viene inclusa una copia del test runner, insieme a uno script di shell per avviarlo.

Per eseguire l'esercizio, avvia semplicemente lo script `./run_tests` nella cartella dell'esercizio.

Ad esempio,

```bash
cd "$(exercism workspace)/gdscript/hello-world"
./run_tests
```

[installation]: https://exercism.org/docs/tracks/gdscript/installation
[test runner]: https://raw.githubusercontent.com/exercism/gdscript-test-runner/refs/heads/main/bin/test_runner.gd
