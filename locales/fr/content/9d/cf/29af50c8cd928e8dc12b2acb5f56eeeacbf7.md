# Instructions

Dans cet exercice, tu vas écrire du code pour t'aider à cuisiner de délicieuses lasagnes tirées de ton livre de recettes préféré.

Trois tâches t'attendent, toutes liées au temps passé à cuisiner les lasagnes.

## 1. Définis la durée de cuisson attendue au four, en minutes

Définis `expectedMinutesInOven` pour calculer combien de minutes les lasagnes doivent rester au four. D'après le livre de recettes, la durée de cuisson attendue au four est de 40 minutes :

```elm
expectedMinutesInOven
    --> 40
```

## 2. Calcule le temps de préparation en minutes

Définis `preparationTimeInMinutes`, qui prend le nombre de couches des lasagnes en paramètre et renvoie le nombre de minutes nécessaires pour préparer les lasagnes, en supposant que chaque couche demande 2 minutes de préparation.

```elm
preparationTimeInMinutes 3
    --> 6
```

## 3. Calcule le temps écoulé en minutes

Définis la fonction `elapsedTimeInMinutes`, qui prend deux paramètres : le premier est le nombre de couches des lasagnes, et le second le nombre de minutes que les lasagnes ont déjà passées au four. La fonction doit renvoyer le nombre de minutes que tu as passées à cuisiner les lasagnes, c'est-à-dire la somme du temps de préparation en minutes et du temps en minutes que les lasagnes ont passé au four à cet instant.

```elm
elapsedTimeInMinutes 3 20
    --> 26
```
