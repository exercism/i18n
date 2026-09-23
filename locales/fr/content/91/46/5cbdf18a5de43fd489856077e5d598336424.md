# Indications

## Général

- Il est possible, mais pas obligatoire, de résoudre chaque tâche avec une seule instruction dans le corps de la fonction.


## 1. Détermine si une carte est présente

- La carte est-elle [dans][ref-match] la pile ?

## 2. Trouve la position d'une carte

- La carte est-elle dans la pile ?
- Si oui, à [quelle][ref-which] position ?
- Toutes les cartes sont garanties différentes, ce qui simplifie la tâche.
- Renvoie soit la position, soit `-1`.
  - Consulte le [concept Conditionals][concept-conditionals] pour découvrir différentes façons de faire un branchement selon qu'une valeur est `TRUE` ou `FALSE`.
  - Si tu utilises [`if_else`][ref-if_else] (l'approche la plus moderne, mais pas vraiment nécessaire ici), sache que cette fonction exige que les deux branches renvoient le même type de résultat. Il peut être nécessaire de renvoyer explicitement un seul élément, plutôt qu'un vecteur qui pourrait être vide.
  - Pour obtenir le premier élément d'un vecteur, il suffit d'ajouter `[1]` après tout ce qui renvoie un vecteur.

## 3. Détermine si chaque carte est paire

- L'opérateur modulo est `%%`.
- `x` est pair si `x %% 2 == 0`.
- Est-ce que [toutes][ref-all] les cartes correspondent à ce critère ?

## 4. Vérifie si la pile contient une carte de valeur impaire

- Une carte est impaire si elle n'est pas paire, alors regarde la tâche précédente.
- Est-ce qu'[au moins une][ref-any] carte correspond à ce critère ?

## 5. Récupère la première carte impaire de la pile

- Y a-t-il une carte impaire dans la pile ?
- Si oui, renvoie la première _carte_ (pas la position).

## 6. Détermine la position de la première carte paire

- Y a-t-il une carte paire dans la pile ?
- Si oui, renvoie la _position_ de la première carte paire.

[ref-match]: https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/match
[ref-which]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/which
[concept-conditionals]: https://exercism.org/tracks/r/concepts/conditionals
[ref-all]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/all
[ref-any]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/any
[ref-if_else]: https://dplyr.tidyverse.org/reference/if_else.html
