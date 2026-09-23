# Instructions

Chaitana possède un parc d'attractions très populaire.
 Elle n'a qu'une seule attraction, au cœur même d'un parc magnifiquement paysagé : The Biggest Roller Coaster in the World(TM).
 Bien qu'il n'y ait que cette seule attraction, des gens viennent des quatre coins du monde et font la queue pendant des heures pour avoir la chance de monter dans l'hypercoaster de Chaitana.

Il y a deux files d'attente pour cette attraction, chacune représentée par une `list` :

1. File normale
2. File express (_aussi appelée Fast-track_) : ici, on paie un supplément pour un accès prioritaire.


On t'a demandé d'écrire du code pour mieux gérer les visiteurs du parc.
 Tu dois implémenter les fonctions suivantes au plus vite, avant que les visiteurs (et ta patronne, Chaitana !) ne s'énervent.
 Prends bien soin de lire attentivement.
 Certaines tâches te demandent de modifier ou de mettre à jour la file d'attente existante, tandis que d'autres te demandent d'en faire une copie.


## 1. Ajoute-moi à la file d'attente

Définis la fonction `add_me_to_the_queue()` qui prend 4 paramètres `<express_queue>, <normal_queue>, <ticket_type>, <person_name>` et renvoie la file d'attente appropriée, mise à jour avec le nom de la personne.


1. `<ticket_type>` est un `int` : 1 == express_queue et 0 == normal_queue.
2. `<person_name>` est le nom (sous forme de `str`) de la personne à ajouter à la file d'attente correspondante.


```python
>>> add_me_to_the_queue(express_queue=["Tony", "Bruce"], normal_queue=["RobotGuy", "WW"], ticket_type=1, person_name="RichieRich")
...
["Tony", "Bruce", "RichieRich"]

>>> add_me_to_the_queue(express_queue=["Tony", "Bruce"], normal_queue=["RobotGuy", "WW"], ticket_type=0, person_name="HawkEye")
....
["RobotGuy", "WW", "HawkEye"]
```

## 2. Où sont mes amis ?

Une personne est arrivée en retard au parc, mais elle veut rejoindre la file où ses amis attendent.
 Mais elle n'a aucune idée de l'endroit où ses amis se trouvent, et il n'y a pas de réseau pour les appeler.

Définis la fonction `find_my_friend()` qui prend 2 paramètres `queue` et `friend_name` et renvoie la position du nom de la personne dans la file d'attente.


1. `<queue>` est la `list` des personnes qui font la queue.
2. `<friend_name>` est le nom de l'ami dont tu dois trouver l'indice (sa place dans la file d'attente).

Rappel : l'indexation commence à 0 depuis la gauche, et à -1 depuis la droite.


```python
>>> find_my_friend(queue=["Natasha", "Steve", "T'challa", "Wanda", "Rocket"], friend_name="Steve")
...
1
```


## 3. Puis-je les rejoindre ?

Maintenant que leurs amis ont été trouvés (dans la tâche 2 ci-dessus), la personne arrivée en retard aimerait les rejoindre à leur place dans la file d'attente.
Définis la fonction `add_me_with_my_friends()` qui prend 3 paramètres `queue`, `index` et `person_name`.


1. `<queue>` est la `list` des personnes qui font la queue.
2. `<index>` est la position à laquelle la nouvelle personne doit être ajoutée.
3. `<person_name>` est le nom de la personne à ajouter à cette position.

Renvoie la file d'attente mise à jour avec le nom de la personne arrivée en retard.


```python
>>> add_me_with_my_friends(queue=["Natasha", "Steve", "T'challa", "Wanda", "Rocket"], index=1, person_name="Bucky")
...
["Natasha", "Bucky", "Steve", "T'challa", "Wanda", "Rocket"]
```

## 4. Une personne méchante dans la file d'attente

Tu viens d'entendre dire, dans la file d'attente, qu'une personne vraiment méchante bouscule, crie et fait du grabuge.
 Tu dois expulser ce malotru pour son mauvais comportement !


Définis la fonction `remove_the_mean_person()` qui prend 2 paramètres `queue` et `person_name`.


1. `<queue>` est la `list` des personnes qui font la queue.
2. `<person_name>` est le nom de la personne à exclure.

Renvoie la file d'attente mise à jour, sans le nom de la personne méchante.

```python
>>> remove_the_mean_person(queue=["Natasha", "Steve", "Eltran", "Wanda", "Rocket"], person_name="Eltran")
...
["Natasha", "Steve", "Wanda", "Rocket"]
```


## 5. Les homonymes

Tu n'as peut-être jamais vu deux personnes sans lien de parenté qui se ressemblent trait pour trait, mais tu as _assurément_ déjà vu des inconnus porter exactement le même nom (des _homonymes_) !
 Aujourd'hui, il semble bien qu'il y en ait beaucoup parmi les visiteurs.
  Tu veux savoir combien de fois un nom donné apparaît dans la file d'attente.

Définis la fonction `how_many_namefellows()` qui prend 2 paramètres `queue` et `person_name`.

1. `<queue>` est la `list` des personnes qui font la queue.
2. `<person_name>` est le nom qui, selon toi, pourrait apparaître plus d'une fois dans la file d'attente.


Renvoie le nombre d'occurrences de `person_name`, sous forme d'`int`.


```python
>>> how_many_namefellows(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"], person_name="Natasha")
...
2
```

## 6. Retire la dernière personne

Malheureusement, le parc est bondé aujourd'hui et tu dois retirer la dernière personne de la file normale (_tu lui donneras un bon pour revenir en fast-track un autre jour_).
 Tu devras définir la fonction `remove_the_last_person()` qui prend 1 paramètre `queue`, la liste des personnes qui font la queue.

Tu dois mettre à jour la `list` et aussi `return` le nom de la personne retirée, afin de pouvoir lui rédiger un bon.


```python
>>> remove_the_last_person(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"])
...
'Rocket'
```

## 7. Trie la liste de la file d'attente

Pour des raisons administratives, tu dois obtenir tous les noms d'une file d'attente donnée par ordre alphabétique.


Définis la fonction `sorted_names()` qui prend 1 argument, `queue`, (la `list` des personnes qui font la queue), et renvoie une copie `sorted` de la `list`.


```python
>>> sorted_names(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"])
...
['Eltran', 'Natasha', 'Natasha', 'Rocket', 'Steve']
```
