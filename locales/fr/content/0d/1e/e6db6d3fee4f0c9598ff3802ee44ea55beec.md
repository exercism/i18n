# Introduction

## Fichier

Les fonctions permettant de travailler avec des fichiers sont fournies par le module `File`.

Pour lire un fichier entier, utilise `File.read/1`. Pour écrire dans un fichier, utilise `File.write/2`.

Chaque fois qu'on écrit dans un fichier avec `File.write/2`, un descripteur de fichier est ouvert et un nouveau [processus][exercism-processes] Elixir est lancé. C'est pourquoi il faut éviter d'écrire dans un fichier en boucle avec `File.write/2`.

À la place, on peut ouvrir un fichier avec `File.open/2`. Le deuxième argument de `File.open/2` est un tableau de modes, ce qui permet de préciser si l'on veut ouvrir le fichier en lecture ou en écriture.

`File.open/2` renvoie un PID d'un processus qui gère le fichier. Pour lire et écrire dans le fichier, utilise les fonctions du module `IO` et passe ce PID comme périphérique d'E/S.

Lorsque tu as fini de travailler avec le fichier, ferme-le avec `File.close/1`.

Toutes les fonctions mentionnées du module `File` ont aussi une variante `!` qui lève une erreur au lieu de renvoyer un tuple d'erreur (par exemple `File.read!/1`). Utilise cette variante si tu ne comptes pas gérer des erreurs telles que les fichiers manquants ou l'absence de permissions.

[exercism-processes]: https://exercism.org/tracks/elixir/concepts/processes
