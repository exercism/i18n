# À propos

La réduction consiste à appliquer de façon répétée une fonction à chaque élément d'une séquence, puis à accumuler d'une manière ou d'une autre les résultats.
La fonction appliquée prend deux paramètres : la valeur accumulée courante et l'élément à traiter.
Elle doit s'évaluer en la nouvelle valeur accumulée.

Dans certains langages de programmation, on appelle cela _accumulate_ ou _fold_.

En Common Lisp, ce processus s'effectue avec la fonction `reduce`.
Dans sa forme la plus simple, cela ressemble à :

`(reduce #'function-to-apply sequence :initial-value value)`

Remarque : une valeur initiale est fournie. Celle-ci sera la « valeur accumulée courante » transmise à la fonction lors du traitement du premier élément.

Voici un exemple qui additionne les nombres de la liste en partant d'une valeur initiale de 10 :

`(reduce #'+ '(1 2 3 4) :initial-value 10) ; => 20`

Note que si la séquence est vide, la fonction n'est jamais appelée et la forme s'évalue en la valeur initiale.

## Spécifier ou non la valeur initiale

L'argument `:initial-value` n'est pas obligatoire, et `reduce` se comporte différemment selon qu'il a été fourni ou non et selon que la séquence contient des éléments ou non.

1. Si la valeur initiale n'est pas fournie et que la séquence contient plus d'un élément, alors la première fois que la fonction est appelée, elle l'est avec les deux premiers éléments de la séquence.
2. Si la valeur initiale n'est pas fournie et que la séquence contient un seul élément, alors la forme s'évalue en cet élément et la fonction n'est pas appelée.
3. Si la valeur initiale est fournie et que la séquence est vide, alors la forme s'évalue en la valeur initiale et la fonction n'est pas appelée.
4. Si la valeur initiale n'est pas fournie et que la séquence est vide, alors la fonction est appelée avec *zéro* argument.

Le dernier cas est de ceux qui peuvent prendre au dépourvu.
Il est généralement facile de fournir une valeur initiale pour que le programme n'atteigne jamais ce cas étrange.

## Autres arguments nommés

`reduce` prend d'autres arguments nommés qui peuvent être utiles dans certains cas.

* `:start` et `:end` : ils spécifient des indices dans la séquence, ce qui amène reduce à travailler sur une sous-séquence. Leurs valeurs par défaut sont `0` et `nil`, respectivement, ce qui signifie le début et la fin de la séquence.
* `:from-end` : si ce booléen généralisé s'évalue à vrai, alors au lieu de travailler de gauche à droite, la réduction se fera de droite à gauche.
* `:key` : spécifie une fonction à appeler sur chaque élément *avant* qu'il ne soit donné à la fonction de réduction. Cette fonction n'est *pas* appliquée à la valeur spécifiée par `:initial-value`.

Quelques exemples :

```lisp
(reduce #'+ '(1 2 3 4 5 6 7 8 9 10) 
        :start 2 :end 5)               ; => 12 (only adds 3, 4, 5)
(reduce #'cons '(1 2 3))               ; => ((1 . 2) . 3)
(reduce #'cons '(1 2 3) :from-end t)   ; => (1 2 . 3)
(reduce #'+ '((1) (2) (3)) :key #'car) ; => 6
```
