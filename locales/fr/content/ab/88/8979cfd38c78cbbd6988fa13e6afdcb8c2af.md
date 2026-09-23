# Indices

## Général

- Chacun d'entre eux choisit l'une de trois réponses : c'est donc un `if` avec un `elsif` et un `else`.
- Pose d'abord la question la plus exigeante. Si `score >= 5` est testé avant `score >= 8`, la seconde ne pourra jamais être atteinte.

## 1. Le verdict

- Trois tranches, donc deux questions : huit ou plus, puis cinq ou plus, puis tout ce qui reste.

## 2. Dans quel groupe ?

- Le plus simple est de progresser par ordre croissant : moins de 13 d'abord, puis moins de 16, puis le reste.
- « de 13 à 15 » et « moins de 16 » décrivent les mêmes interprètes, et la seconde ne demande qu'une comparaison au lieu de deux.

## 3. Quand revenir

- `=` compare deux _strings_ : `if group = "Juniors" then`.
- Écris les noms de groupes exactement comme la tâche 2 les renvoie, y compris la majuscule.

## 4. Quoi écrire sur la feuille

- Le premier cas a besoin de deux choses à la fois, donc joins-les avec `and` : `if score >= 8 and sings then`.
- Le second cas n'est atteint que si le premier a déjà échoué, il n'a donc pas besoin de poser à nouveau la question du chant.
