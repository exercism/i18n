# Instructions

Dans cet exercice, on va traduire quelques règles du jeu classique Pac-Man en fonctions Elixir.

Il y a quatre règles à traduire, toutes liées aux états du jeu.

> Ne te préoccupe pas de la façon dont les arguments sont obtenus, concentre-toi simplement sur leur combinaison pour renvoyer le résultat voulu.

## 1. Définis si Pac-Man mange un fantôme

Définis la fonction `Rules.eat_ghost?/2` qui prend deux arguments (_si Pac-Man a une super pac-gomme active_ et _si Pac-Man touche un fantôme_) et renvoie une valeur booléenne indiquant si Pac-Man peut manger le fantôme. La fonction doit renvoyer vrai uniquement si Pac-Man a une super pac-gomme active et touche un fantôme.

```elixir
Rules.eat_ghost?(false, true)
# => false
```

## 2. Définis si Pac-Man marque des points

Définis la fonction `Rules.score?/2` qui prend deux arguments (_si Pac-Man touche une super pac-gomme_ et _si Pac-Man touche une pac-gomme_) et renvoie une valeur booléenne indiquant si Pac-Man a marqué des points. La fonction doit renvoyer vrai si Pac-Man touche une super pac-gomme ou une pac-gomme.

```elixir
Rules.score?(true, true)
# => true
```

## 3. Définis si Pac-Man perd

Définis la fonction `Rules.lose?/2` qui prend deux arguments (_si Pac-Man a une super pac-gomme active_ et _si Pac-Man touche un fantôme_) et renvoie une valeur booléenne indiquant si Pac-Man perd. La fonction doit renvoyer vrai si Pac-Man touche un fantôme et n'a pas de super pac-gomme active.

```elixir
Rules.lose?(false, true)
# => true
```

## 4. Définis si Pac-Man gagne

Définis la fonction `Rules.win?/3` qui prend trois arguments (_si Pac-Man a mangé toutes les pac-gommes_, _si Pac-Man a une super pac-gomme active_ et _si Pac-Man touche un fantôme_) et renvoie une valeur booléenne indiquant si Pac-Man gagne. La fonction doit renvoyer vrai si Pac-Man a mangé toutes les pac-gommes et n'a pas perdu d'après les arguments définis dans la partie 3.

```elixir
Rules.win?(false, true, false)
# => false
```
