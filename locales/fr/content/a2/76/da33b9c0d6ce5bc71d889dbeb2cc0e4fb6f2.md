# Instructions

Tu vas écrire du code pour t'aider à cuisiner une lasagne à partir de ton livre de recettes préféré.

Tu as cinq tâches, toutes liées à la préparation de ta recette.

## 1. Définis le temps de cuisson attendu en minutes

Affecte à la variable `$Lasagna::ExpectedMinutesInOven` le nombre de minutes que la lasagne doit passer au four. D'après le livre de cuisine, le temps de cuisson attendu en minutes est de 40 :

```perl
$Lasagna::ExpectedMinutesInOven
# => 40
```

## 2. Calcule le temps de cuisson restant en minutes

Modifie le sous-programme `Lasagna::remaining_minutes_in_oven`, qui prend en argument le temps, en minutes, que la lasagne a déjà passé au four, pour qu'il renvoie le nombre de minutes que la lasagne doit encore rester au four, d'après le temps de cuisson attendu en minutes de la tâche précédente.

```perl
Lasagna::remaining_minutes_in_oven(30)
# => 10
```

## 3. Calcule le temps de préparation en minutes

Modifie le sous-programme `Lasagna::preparation_time_in_minutes`, qui prend en argument le nombre de couches que tu as ajoutées à la lasagne, pour qu'il renvoie le temps que tu as passé à préparer la lasagne, en supposant que chaque couche te prend 2 minutes à préparer.

```perl
Lasagna::preparation_time_in_minutes(2)
# => 4
```

## 4. Calcule le temps de travail total en minutes

Modifie le sous-programme `Lasagna::total_time_in_minutes`, qui prend deux arguments : le premier argument est le nombre de couches que tu as ajoutées à la lasagne, et le second est le nombre de minutes que la lasagne a passé au four.
Le sous-programme doit renvoyer le temps total, en minutes, que tu as consacré à la cuisson de la lasagne, c'est-à-dire la somme du temps de préparation en minutes et du temps, en minutes, que la lasagne a passé au four à cet instant.

```perl
Lasagna::total_time_in_minutes(3, 20)
# => 26
```

## 5. Crée une notification indiquant que la lasagne est prête

Modifie le sous-programme `Lasagna::oven_alarm`, qui ne prend aucun argument, pour qu'il renvoie un message indiquant que la lasagne est prête à être mangée.

```perl
Lasagna::oven_alarm()
# => "Ding!"
```
