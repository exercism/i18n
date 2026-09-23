# Instructions

La saison de netball est terminée et le classement détermine qui joue les finales.

Le squelette te fournit une classe `TEAM`. Écris `FINALS_LADDER` juste en dessous.

## 1. Qui est au-dessus de qui ?

`higher` prend deux équipes et indique si la première doit figurer au-dessus de la
seconde. L'équipe qui compte le plus de points passe devant. Les équipes à égalité
de points sont départagées par la différence de buts, la plus élevée d'abord.

```sather
FINALS_LADDER::higher(#TEAM("Vixens", 24, 40), #TEAM("Magpies", 20, 90))
-- => true
```

## 2. Le classement

`ladder` prend les équipes dans n'importe quel ordre et les renvoie classées. Le
tableau passé en argument doit rester tel quel.

```sather
FINALS_LADDER::ladder(teams)
-- => the same teams, best first
```

## 3. Énonce le classement

`names` prend un tableau d'équipes et renvoie leurs noms joints par `", "`.

```sather
FINALS_LADDER::names(FINALS_LADDER::ladder(teams))
-- => "Vixens, Magpies, Swifts"
```

## 4. Les premiers

`premiers` prend les équipes dans n'importe quel ordre et renvoie le nom de
l'équipe en tête. S'il n'y a aucune équipe, la réponse est `""`.

```sather
FINALS_LADDER::premiers(teams)
-- => "Vixens"
```

## 5. Un tout autre ordre

`shortest_first` prend un tableau de _strings_ et les renvoie triées par
longueur, de la plus courte à la plus longue. Les _strings_ de même longueur
sont triées par ordre alphabétique.

```sather
FINALS_LADDER::shortest_first(|"Magpies", "Vixens", "Swifts"|)
-- => "Swifts", "Vixens", "Magpies"
```

Ce départage n'est pas purement décoratif. Le tri n'est pas stable, donc sans
lui, deux noms de même longueur pourraient ressortir dans un ordre ou dans
l'autre.

C'est la même routine de tri qu'à la tâche 2, à laquelle on passe une règle
différente. C'est tout l'intérêt de l'exercice.
