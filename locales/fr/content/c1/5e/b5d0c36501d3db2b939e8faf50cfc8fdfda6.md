# Introduction

En Common Lisp, le temps est représenté de quatre façons, dont deux seront abordées ici.

- Le temps universel est un temps absolu, un entier représentant le nombre de secondes depuis `1900-01-01T00:00:00Z` (c'est-à-dire minuit le 1er janvier 1900 en UTC).
- Le temps décodé est un tuple de 9 valeurs, qui représentent ensemble un instant calendaire précis : secondes, minutes, heure, jour du mois, mois, année, jour de la semaine, indicateur d'heure d'été, fuseau horaire.
(Discuté en détail ci-dessous.)

## Temps universel

Pour obtenir le temps universel actuel, on utilise `get-universal-time` ou `get-decoded-time`.
La première renvoie le nombre de secondes actuel depuis `1900-01-01T00:00Z` et la seconde renvoie les mêmes données au format décodé.

## Temps décodé

`decode-universal-time` et `encode-universal-time` sont les fonctions principales pour travailler avec le temps.
La première prend un temps universel et renvoie une valeur de temps décodée sous forme de [valeurs multiples][concept-multiple-values], et la seconde prend les valeurs de temps décodées comme arguments et renvoie un temps universel.

Les deux prennent un argument optionnel de fuseau horaire.
Voir ci-dessous le format du fuseau horaire.

Un temps décodé est un ensemble de valeurs :

- *secondes* : un entier entre 0 et 59
- *minutes* : un entier entre 0 et 59
- *heure* : un entier entre 0 et 23
- *jour du mois* : un entier entre 1 et 31 (la limite supérieure dépend évidemment du mois et de l'année)
- *mois* : un entier entre 1 et 12
- *année* : un entier indiquant l'année.
- *jour de la semaine* : un entier entre 0 et 6. 0 signifie lundi, 1 signifie mardi, etc. ... 6 signifie dimanche.
- *indicateur d'heure d'été* : une valeur vraie indique que l'heure d'été est en vigueur.
- *fuseau horaire* : un nombre d'heures entre -24 et 24 signifiant le décalage par rapport à UTC.
Ce nombre est un nombre rationnel et doit être un multiple de `1/3600`

```lisp
(encode-universal-time 1 2 3 4 5 2000 0) ; => 3166398121
(decode-universal-time 3166398121)       ; => 1
                                         ;    2
                                         ;    3
                                         ;    4
                                         ;    5
                                         ;    2000
                                         ;    3 (Thursday)
                                         ;    NIL
                                         ;    0
(decode-universal-time 2208988800) ; => 0
                                   ;    0
                                   ;    0
                                   ;    1
                                   ;    1
                                   ;    1970
                                   ;    3
                                   ;    NIL
                                   ;    0
```

[concept-multiple-values]: /tracks/common-lisp/concepts/multiple-values
