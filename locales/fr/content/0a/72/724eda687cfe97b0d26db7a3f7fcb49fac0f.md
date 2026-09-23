# Robot de fête excentrique

## Histoire

Il était une fois un programmeur excentrique qui vivait dans une étrange maison aux fenêtres barrées. Un jour, il accepta un travail proposé par un site d'offres d'emploi en ligne pour construire un robot de fête. Le robot est censé accueillir les invités et les aider à rejoindre leur place. Le premier ajout était très technique et trahissait le manque de contact humain du programmeur. Certains de ces ajouts ont d'ailleurs fini dans la version finale.

## Tâches

- Accueille chaque personne avec :

```
Welcome to my party, <name>!
```

- Un invité dont c'est l'anniversaire aujourd'hui est accueilli de la façon suivante, histoire de montrer que le robot connaît bien chaque invité :

```
Happy birthday <name>! You are now <age> years old!
Welcome to my party!
```

- Quand quelqu'un demande sa place, on lui indique le chemin jusqu'à sa table avec :

```
Welcome to my party, <name>!
You have been assigned to table <table-number-in-hex>. Your table is <direction>, exactly <distance-float> meters from here.
You will be sitting next to <neighbour-name>!
```

## Implémentations

- [Go : _strings_][implementation-go] (implémentation de référence)

## Références

- [`types/string`][types-string]

[types-string]: https://github.com/exercism/v3/blob/main/reference/types/string.md
[implementation-go]: https://github.com/exercism/go/blob/main/exercises/concept/strings/.docs/instructions.md
