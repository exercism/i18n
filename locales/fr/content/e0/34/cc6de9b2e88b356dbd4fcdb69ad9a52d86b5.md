# Complément aux instructions

## Structure du projet

* `src` contient la solution de l'exercice
* `spec` contient les tests à exécuter pour l'exercice

## Lance les tests

Si tu te trouves dans le bon répertoire (celui qui contient `src` et `spec`), tu peux lancer les tests de cet exercice en exécutant `crystal spec` :

```bash
$ pwd
/Users/johndoe/Code/exercism/crystal/hello-world

$ ls
GETTING_STARTED.md README.md          spec               src

$ crystal spec
```

Cela exécutera tous les fichiers de test du répertoire `spec`.

Dans chaque fichier de test, tous les tests, sauf le premier, sont ignorés.

Une fois qu'un test passe, tu peux réactiver le suivant en remplaçant `pending` par `it`.

## Soumets ta solution

Pense bien à soumettre le fichier source du répertoire `src` quand tu soumets ta solution :

```bash
$ exercism submit src/hello_world.cr
```
