# Formate les fichiers JSON

Le dépôt d'un parcours Exercism contient de nombreux fichiers JSON, notamment :

- Le fichier `config.json` du parcours.
- Pour chaque concept, un fichier `.meta/config.json` et un fichier `links.json`.
- Pour chaque exercice d'apprentissage ou exercice d'entraînement, un fichier `.meta/config.json`.

Ces fichiers sont plus lisibles lorsqu'ils ont un formatage cohérent à l'échelle d'Exercism, c'est pourquoi configlet dispose d'une commande `fmt` qui réécrit les fichiers JSON d'un parcours sous une forme canonique.

La commande `fmt` formate les fichiers suivants :

- `config.json`
- `exercises/{concept,practice}/*/.approaches/config.json`
- `exercises/{concept,practice}/*/.articles/config.json`
- `exercises/{concept,practice}/*/.meta/config.json`

## Utilisation

La commande `fmt` formate les fichiers `.meta/config.json` des exercices.

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

Une simple commande `configlet fmt` n'apporte aucune modification au parcours : elle vérifie le formatage du fichier `.meta/config.json` de chaque exercice d'apprentissage et exercice d'entraînement, ainsi que celui du fichier `config.json` du parcours.

Pour afficher la liste des chemins pour lesquels il n'existe pas encore de fichier `.meta/config.json` d'exercice formaté (en quittant avec un code de sortie non nul si au moins un exercice n'a pas de fichier de configuration formaté) :

```shell
configlet fmt
```

Pour qu'on te propose d'écrire les fichiers de configuration formatés, ajoute l'option `--update` (ou `-u` en version courte) :

```shell
configlet fmt --update
```

Pour écrire les fichiers de configuration formatés sans interaction, ajoute l'option `--yes` (ou `-y` en version courte) :

```shell
configlet fmt --update --yes
```

Pour ne traiter qu'un seul exercice, utilise l'option `--exercise` (ou `-e` en version courte).
Par exemple, pour écrire sans interaction le fichier de configuration formaté de l'exercice `prime-factors` :

```shell
configlet fmt -uy -e prime-factors
```

Lorsqu'il écrit des fichiers JSON, `configlet fmt` :

- Écrit les paires clé/valeur dans l'ordre canonique.

- Utilise deux espaces pour l'indentation.

- Place chaque élément d'un tableau JSON et chaque clé d'un objet JSON sur une ligne distincte.

- Supprime les paires clé/valeur dont la clé est facultative et la valeur vide.
  Par exemple, `"source": ""` est supprimé.

- Supprime `"test_runner": true` des fichiers de configuration des exercices d'entraînement.
  Il s'agit d'une clé facultative : la spécification indique qu'une clé `test_runner` omise implique la valeur `true`.

- Lorsqu'un objet JSON contient plusieurs paires clé/valeur portant le même nom de clé, ne conserve que la dernière.

L'ordre canonique des clés pour un fichier `.meta/config.json` d'exercice est le suivant :

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

où les crochets indiquent que la clé qu'ils entourent est facultative.

Note que `configlet fmt` ne traite que les exercices qui existent dans le fichier `config.json` au niveau du parcours.
Par conséquent, si tu implémentes un nouvel exercice sur un parcours et que tu veux formater son fichier `.meta/config.json`, commence par ajouter l'exercice au fichier `config.json` au niveau du parcours.
Si l'exercice n'est pas encore prêt à être visible par les utilisateurs, donne à sa valeur `status` la valeur `wip`.

Le code de sortie est 0 lorsque tous les fichiers de configuration rencontrés sont formatés au moment où configlet se termine, et 1 sinon.
