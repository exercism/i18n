# Instructions

Ta tâche est d'implémenter un algorithme de recherche dichotomique.

Un algorithme de recherche dichotomique trouve un élément dans un tableau en le divisant en deux à plusieurs reprises, en ne gardant que la moitié qui contient l'élément que l'on recherche.
Il permet de réduire rapidement les emplacements possibles de notre élément, jusqu'à ce qu'on le trouve ou jusqu'à ce que l'on ait éliminé tous les emplacements possibles.

~~~~exercism/caution
La recherche dichotomique ne fonctionne que si le tableau a été trié.
~~~~

Voici comment se déroule l'algorithme :

- Trouve l'élément du milieu d'un tableau *trié* et compare-le à l'élément que l'on recherche.
- Si l'élément du milieu est notre élément, alors c'est terminé !
- Si l'élément du milieu est supérieur à notre élément, on peut éliminer cet élément et tous les éléments qui se trouvent **après** lui.
- Si l'élément du milieu est inférieur à notre élément, on peut éliminer cet élément et tous les éléments qui se trouvent **avant** lui.
- Si tous les éléments du tableau ont été éliminés, alors l'élément ne se trouve pas dans le tableau.
- Sinon, répète le processus sur la partie du tableau qui n'a pas été éliminée.

Voici un exemple :

Imaginons que l'on cherche le nombre 23 dans le tableau trié suivant : `[4, 8, 12, 16, 23, 28, 32]`.

- On commence par comparer 23 avec l'élément du milieu, 16.
- Comme 23 est supérieur à 16, on peut éliminer la moitié gauche du tableau, ce qui nous laisse avec `[23, 28, 32]`.
- On compare ensuite 23 avec le nouvel élément du milieu, 28.
- Comme 23 est inférieur à 28, on peut éliminer la moitié droite du tableau : `[23]`.
- On a trouvé notre élément.
