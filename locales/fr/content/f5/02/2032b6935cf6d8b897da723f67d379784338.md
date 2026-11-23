# Instructions

Implémente les opérations de base sur les listes.

Dans les langages fonctionnels, les opérations sur les listes telles que `length`, `map` et `reduce` sont très courantes.
Implémente une série d'opérations de base sur les listes, sans utiliser les fonctions existantes.

Le nombre et les noms exacts des opérations à implémenter dépendent du parcours, afin d'éviter les conflits avec des noms existants, mais les opérations générales que tu implémenteras incluent :

- `append` (_étant donné deux listes, ajouter tous les éléments de la seconde liste à la fin de la première_) ;
- `concatenate` (_étant donné une série de listes, combiner tous les éléments de toutes les listes en une seule liste aplatie_) ;
- `filter` (_étant donné un prédicat et une liste, renvoyer la liste de tous les éléments pour lesquels `predicate(item)` est vrai_) ;
- `length` (_étant donné une liste, renvoyer le nombre total d'éléments qu'elle contient_) ;
- `map` (_étant donné une fonction et une liste, renvoyer la liste des résultats de l'application de `function(item)` à tous les éléments_) ;
- `foldl` (_étant donné une fonction, une liste et un accumulateur initial, replier (réduire) chaque élément dans l'accumulateur en partant de la gauche_) ;
- `foldr` (_étant donné une fonction, une liste et un accumulateur initial, replier (réduire) chaque élément dans l'accumulateur en partant de la droite_) ;
- `reverse` (_étant donné une liste, renvoyer une liste contenant tous les éléments d'origine, mais dans l'ordre inverse_).

Remarque : l'ordre dans lequel les arguments sont passés aux fonctions de repli (`foldl`, `foldr`) est important.
