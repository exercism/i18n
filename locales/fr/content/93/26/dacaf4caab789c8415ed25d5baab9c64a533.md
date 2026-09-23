# Indices

L'introduction contient la plupart de ce qu'il faut pour cet exercice.
La tâche 5 (le rendu) peut être faite plus tôt pour t'aider à visualiser, mais fais attention à bien prendre en compte les différentes valeurs possibles des points.

## 1. Définis le logo Exercism `Matrix`

- Fais preuve de créativité ! Tu peux aussi simplement copier-coller depuis les instructions.

## 2. Définis les fonctions qui font froncer les sourcils au logo

- Rappelle-toi que les fonctions dont le nom se termine par `!` modifient l'entrée sur place, alors que les autres ne le font pas.
- `frown!` peut se faire par affectation d'éléments précis ou, de façon moins efficace, en échangeant deux lignes.
- `frown` sera très proche de `frown!`, à ceci près qu'elle renvoie une `copy` de la matrice d'entrée.

## 3. Assemble un mur d'autocollants

- Utilise ta fonction `frown()`.
- Les fonctions `vcat()` et `hcat()`, ou leurs équivalents, te seront bien utiles ici.
- Remarque qu'une ligne de `1` (c'est-à-dire des `X`) sépare la moitié supérieure de la moitié inférieure.
- La fonction `ones()` peut être utilisée si tu le souhaites, mais fais attention à sa forme.

## 4. Remplace les points par le nombre de pixels par colonne

- Le _broadcasting_ est un excellent moyen de faire ça de façon concise.
- Pour cela, il te faut un vecteur *ligne* contenant le nombre de points de chaque colonne.
- Pour obtenir un vecteur avec le nombre de points par colonne, tu peux appliquer une fonction à la `Matrix` en précisant `dims`.

## 5. Fais le rendu d'une matrice de points

- Les points (par exemple `1`, `2`, etc.) et les `0` doivent être remplacés respectivement par `"X"` et `" "`.
- Utiliser `eachrow()` pour une boucle interne peut être utile ici, mais ce n'est pas nécessaire.
- La fonction `join()` peut aussi aider à rendre le tout plus concis, et il est même possible de lui appliquer le _broadcasting_.
