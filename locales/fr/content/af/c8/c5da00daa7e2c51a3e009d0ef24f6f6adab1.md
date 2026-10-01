# Tests

Pour utiliser l'exécuteur de tests, tu dois avoir correctement [installé Godot][installation].

## Lance les tests

L'[exécuteur de tests][test runner] sert à charger et à tester les solutions.
Quand on télécharge un exercice en local, une copie de l'exécuteur de tests y est incluse, avec un script shell pour l'invoquer.

Pour lancer l'exercice, il te suffit d'exécuter le script `./run_tests` dans le dossier de l'exercice.

Par exemple,

```bash
cd "$(exercism workspace)/gdscript/hello-world"
./run_tests
```

[installation]: https://exercism.org/docs/tracks/gdscript/installation
[test runner]: https://raw.githubusercontent.com/exercism/gdscript-test-runner/refs/heads/main/bin/test_runner.gd
