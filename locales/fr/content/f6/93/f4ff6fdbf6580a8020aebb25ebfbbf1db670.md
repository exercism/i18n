# Astuces

## 1. Classe les clients

- Les fonctions `any()` et `all()` peuvent t'aider ici.
- On peut définir une fonction distincte à utiliser dans celles-ci, ou passer directement une fonction anonyme.

## 2. Sépare les clients catégoriques

- Tu dois filtrer le dictionnaire.
- Un dictionnaire itère par défaut sur des `Pair` clé/valeur, auxquels on peut accéder par champs (first/second) ou par indice (1/2).
- Utilise la fonction `all_15()`.

## 3. Convertis les notes en binaire

- Il te faut une correspondance de `1` vers `0` et de `5` vers `1`.
- Vérifie que la forme du tableau de sortie est identique à celle du tableau d'entrée.

## 4. Transforme les notes en matrice

- On peut le faire avec `mapreduce()`.
- Utilise la fonction `tobinary()` pour (une partie de ?) la correspondance.
- On peut obtenir une matrice en réduisant un vecteur de vecteurs avec `hcat()` ou `vcat()`, selon que l'entrée est un vecteur colonne ou un vecteur ligne, respectivement.
- Fais attention à la sortie. Chaque vecteur de notes correspond-il à une ligne de la matrice ? La fonction `transpose()` peut être utile quelque part.
