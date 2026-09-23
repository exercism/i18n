# Introduction

## En savoir plus sur les motifs

Pour rappel, comme vu dans le concept Fondamentaux, un programme AWK est composé de **paires motif-action**.

```awk
pattern1 { action1 }
pattern2 { action2 }
...
```

### Qu'entend-on par « motif » ?

Le « motif » est une expression AWK quelconque.
La valeur de vérité du résultat de l'expression détermine si l'action est exécutée.

### Le motif vide

On peut omettre le motif.
Dans ce cas, l'action est exécutée pour chaque enregistrement.

On peut afficher tous les noms d'utilisateur du fichier passwd.

```sh
awk -F: '{print $1}' /etc/passwd
```

### Les expressions régulières

AWK peut comparer des _strings_ à des expressions régulières pour obtenir un résultat booléen.

Utilise l'opérateur de correspondance d'expressions régulières `~` pour faire correspondre un champ précis.
Cet opérateur prend une _string_ comme opérande gauche et une expression régulière comme opérande droit.
Un littéral d'expression régulière est encadré par des barres obliques `/`.

Pour trouver les utilisateurs du fichier passwd qui se connectent avec bash :

```sh
awk -F: '$7 ~ /bash/ {print $1}' /etc/passwd
```

`!~` est l'opérateur « l'expression régulière ne correspond **pas** ».

Pour faire correspondre une expression régulière à l'enregistrement courant, tu peux écrire `$0 ~ /regex/`.
C'est tellement courant qu'il existe une notation abrégée : on peut omettre `$0` et `~` et simplement écrire `/regex/`

```sh
awk '/regex/' data.txt
```

~~~~exercism/note
Compare ce _one-liner_ AWK avec la commande grep équivalente

```sh
grep 'regex' data.txt
```

AWK t'offre tout un langage de programmation sans sacrifier la concision.
~~~~

On approfondira la saveur des expressions régulières de GNU AWK dans un autre concept.

### Les expressions

Les expressions AWK (arithmétiques, logiques ou autres) peuvent servir de motifs.

Pour extraire tous les utilisateurs dont l'UID est supérieur ou égal à 1000 :

```sh
awk -F: '$3 >= 1000' /etc/passwd
```

Pour rappel, les valeurs fausses d'AWK sont le nombre zéro et la _string_ vide, et tous les autres nombres ou _strings_ sont vrais.
Toute expression qui s'évalue en un nombre ou une _string_ peut servir de motif.

### Les fonctions

N'importe quelle fonction [intégrée][builtins] ou [définie par l'utilisateur][user-defined] peut être utilisée dans une expression, et donc dans le motif.
Quelques exemples :

```awk
length($1) {print "first field is not empty"}
```
```awk
toupper(substr($1, 1, 1)) ~ /[AEIOU]/ {print "starts with a vowel"}
```

### Les motifs constants

Un idiome AWK courant est le suivant :

```sh
{
    xyz()   # some code that transforms each record
}
1
```

`1` est un motif vrai sans action associée.
Cela signifie « affiche l'enregistrement courant ».

[builtins]: https://www.gnu.org/software/gawk/manual/html_node/Built_002din.html
[user-defined]: https://www.gnu.org/software/gawk/manual/html_node/User_002ddefined.html
