# Instructions

Un de tes amis apprend à résoudre des Killer Sudokus (règles ci-dessous), mais il a du mal à déterminer quels chiffres peuvent aller dans une cage.
Il te demande de l'aider en écrivant un petit programme qui liste toutes les combinaisons valides pour une cage donnée, ainsi que les contraintes qui affectent cette cage.

Pour que la sortie de ton programme soit facile à lire, les combinaisons qu'il renvoie doivent être triées.

## Règles du Killer Sudoku

- Les [règles standard du Sudoku][sudoku-rules] s'appliquent.
- Les chiffres d'une cage, généralement délimités par une ligne pointillée, s'additionnent pour donner le petit nombre indiqué dans le coin de la cage.
- Un chiffre ne peut apparaître qu'une seule fois dans une cage.

Pour une explication plus détaillée, jette un œil à [ce guide][killer-guide].

## Exemple 1 : cage avec une seule combinaison possible

Dans une cage de 3 chiffres dont la somme vaut 7, il n'y a qu'une seule combinaison valide : 124.

- 1 + 2 + 4 = 7
- Toute autre combinaison dont la somme vaut 7, comme 232, enfreindrait la règle interdisant de répéter les chiffres au sein d'une cage.

![Grille de Sudoku comportant trois cages de Killer Sudoku marquées comme regroupées.
La première cage se trouve dans le carré 3×3 en haut à gauche de la grille.
La colonne du milieu de ce carré forme la cage, avec les cellules suivantes de haut en bas : la première cellule contient un 1 et une marque au crayon de 7, indiquant une somme de cage de 7, la deuxième cellule contient un 2, la troisième cellule contient un 5.
Les nombres sont surlignés en rouge pour indiquer une erreur.
La deuxième cage se trouve dans le carré 3×3 central de la grille.
La colonne du milieu de ce carré forme la cage, avec les cellules suivantes de haut en bas : la première cellule contient un 1 et une marque au crayon de 7, indiquant une somme de cage de 7, la deuxième cellule contient un 2, la troisième cellule contient un 4.
Aucun des nombres de cette cage n'est surligné et ne contient donc d'erreur.
La troisième cage suit le coin extérieur du carré 3×3 central de la grille.
Elle est composée des trois cellules suivantes : la cellule en haut à gauche de la cage contient un 2, surligné en rouge, et une somme de cage de 7.
La cellule en haut à droite de la cage contient un 3.
La cellule en bas à droite de la cage contient un 2, surligné en rouge. Toutes les autres cellules sont vides.][one-solution-img]

## Exemple 2 : cage avec plusieurs combinaisons

Dans une cage de 2 chiffres dont la somme vaut 10, il y a 4 combinaisons possibles :

- 19
- 28
- 37
- 46

![Grille de Sudoku, toutes les cases vides sauf la colonne du milieu, la colonne 5, qui a 8 lignes remplies.
Chaque paire de lignes contiguës forme une cage de Killer Sudoku et est marquée comme regroupée.
De haut en bas : le premier groupe est une cellule de valeur 1 et une marque au crayon indiquant une somme de cage de 10, une cellule de valeur 9.
Le deuxième groupe est une cellule de valeur 2 et une marque au crayon de 10, une cellule de valeur 8.
Le troisième groupe est une cellule de valeur 3 et une marque au crayon de 10, une cellule de valeur 7.
Le quatrième groupe est une cellule de valeur 4 et une marque au crayon de 10, une cellule de valeur 6.
La dernière cellule de la colonne est vide.][four-solutions-img]

## Exemple 3 : cage avec plusieurs combinaisons, mais restreinte

Dans une cage de 2 chiffres dont la somme vaut 10, où la colonne contient déjà un 1 et un 4, il y a 2 combinaisons possibles :

- 28
- 37

19 et 46 ne sont pas possibles à cause du 1 et du 4 présents dans la colonne, d'après les règles standard du Sudoku.

![Grille de Sudoku, toutes les cases vides sauf la colonne du milieu, la colonne 5, qui a 8 lignes remplies.
La première ligne contient un 4, la deuxième est vide et la troisième contient un 1.
Le 1 est surligné en rouge pour indiquer une erreur.
Les 6 dernières lignes de la colonne forment des cages de Killer Sudoku de deux cellules chacune.
De haut en bas : le premier groupe est une cellule de valeur 2 et une marque au crayon indiquant une somme de cage de 10, une cellule de valeur 8.
Le deuxième groupe est une cellule de valeur 3 et une marque au crayon de 10, une cellule de valeur 7.
Le troisième groupe est une cellule de valeur 1, surlignée en rouge, et une marque au crayon de 10, une cellule de valeur 9.][not-possible-img]

## Essaie par toi-même

Si tu veux t'essayer à un Killer Sudoku abordable, tu peux tester [ce puzzle][clover-puzzle] de Clover, présenté par [Mark Goodliffe dans Cracking The Cryptic le 21 juin 2021][goodliffe-video].

Tu peux aussi trouver des Killer Sudokus de difficulté variable dans de nombreux journaux, ainsi que dans des applications de Sudoku, des livres et des sites web.

## Crédits

Les captures d'écran ci-dessus ont été générées avec [F-Puzzles.com](https://www.f-puzzles.com/), un outil de création de puzzles d'Eric Fox.

[sudoku-rules]: https://masteringsudoku.com/sudoku-rules-beginners/
[killer-guide]: https://masteringsudoku.com/killer-sudoku/
[one-solution-img]: https://assets.exercism.org/images/exercises/killer-sudoku-helper/example1.png
[four-solutions-img]: https://assets.exercism.org/images/exercises/killer-sudoku-helper/example2.png
[not-possible-img]: https://assets.exercism.org/images/exercises/killer-sudoku-helper/example3.png
[clover-puzzle]: https://app.crackingthecryptic.com/sudoku/HqTBn3Pr6R
[goodliffe-video]: https://youtu.be/c_NjEbFEeW0?t=1180
