# Anleitung

Chaitana besitzt einen sehr beliebten Freizeitpark.
 Sie hat nur eine einzige Attraktion, genau im Zentrum einer wunderschön angelegten Parklandschaft: Die größte Achterbahn der Welt(TM).
 Obwohl es nur diese eine Attraktion gibt, reisen Menschen aus aller Welt an und stehen stundenlang an, um die Chance zu bekommen, Chaitanas Hypercoaster zu fahren.

Für diese Bahn gibt es zwei Warteschlangen, die jeweils als `list` dargestellt werden:

1. Normale Warteschlange
2. Express-Warteschlange (_auch bekannt als Fast-Track_) – dort zahlen die Leute extra für bevorzugten Zugang.


Du sollst etwas Code schreiben, um die Gäste im Park besser zu verwalten.
 Du musst die folgenden Funktionen so schnell wie möglich implementieren, bevor die Gäste (und deine Chefin Chaitana!) schlechte Laune bekommen.
 Lies aufmerksam.
 Bei manchen Aufgaben sollst du die vorhandene Warteschlange ändern oder aktualisieren, bei anderen eine Kopie davon erstellen.


## 1. Füge mich zur Warteschlange hinzu

Definiere die Funktion `add_me_to_the_queue()`, die 4 Parameter `<express_queue>, <normal_queue>, <ticket_type>, <person_name>` entgegennimmt und die passende Warteschlange zurückgibt, die um den Namen der Person ergänzt wurde.


1. `<ticket_type>` ist ein `int` mit 1 == express_queue und 0 == normal_queue.
2. `<person_name>` ist der Name (als `str`) der Person, die zur jeweiligen Warteschlange hinzugefügt werden soll.


```python
>>> add_me_to_the_queue(express_queue=["Tony", "Bruce"], normal_queue=["RobotGuy", "WW"], ticket_type=1, person_name="RichieRich")
...
["Tony", "Bruce", "RichieRich"]

>>> add_me_to_the_queue(express_queue=["Tony", "Bruce"], normal_queue=["RobotGuy", "WW"], ticket_type=0, person_name="HawkEye")
....
["RobotGuy", "WW", "HawkEye"]
```

## 2. Wo sind meine Freunde?

Eine Person ist zu spät im Park angekommen, möchte sich aber der Warteschlange anschließen, in der ihre Freunde warten.
 Sie hat aber keine Ahnung, wo ihre Freunde stehen, und es gibt keinen Handyempfang, um sie anzurufen.

Definiere die Funktion `find_my_friend()`, die 2 Parameter `queue` und  `friend_name` entgegennimmt und die Position des Namens dieser Person in der Warteschlange zurückgibt.


1. `<queue>` ist die `list` der Personen, die in der Warteschlange stehen.
2. `<friend_name>` ist der Name des Freundes, dessen Index (Platz in der Warteschlange) du finden musst.

Zur Erinnerung:  Die Indizierung beginnt bei 0 von links und bei -1 von rechts.


```python
>>> find_my_friend(queue=["Natasha", "Steve", "T'challa", "Wanda", "Rocket"], friend_name="Steve")
...
1
```


## 3. Darf ich mich bitte dazustellen?

Nachdem ihre Freunde gefunden wurden (in Aufgabe 2 oben), möchte die zu spät gekommene Person an deren Platz in der Warteschlange dazustoßen.
Definiere die Funktion `add_me_with_my_friends()`, die 3 Parameter `queue`, `index` und  `person_name` entgegennimmt.


1. `<queue>` ist die `list` der Personen, die in der Warteschlange stehen.
2. `<index>` ist die Position, an der die neue Person eingefügt werden soll.
3. `<person_name>` ist der Name der Person, die an der Indexposition eingefügt werden soll.

Gib die Warteschlange zurück, aktualisiert um den Namen der zu spät gekommenen Person.


```python
>>> add_me_with_my_friends(queue=["Natasha", "Steve", "T'challa", "Wanda", "Rocket"], index=1, person_name="Bucky")
...
["Natasha", "Bucky", "Steve", "T'challa", "Wanda", "Rocket"]
```

## 4. Gemeine Person in der Warteschlange

Du hast gerade aus der Warteschlange gehört, dass dort eine richtig gemeine Person drängelt, herumschreit und Ärger macht.
 Du musst diesen Übeltäter wegen schlechten Benehmens rauswerfen!


Definiere die Funktion `remove_the_mean_person()`, die 2 Parameter `queue` und `person_name` entgegennimmt.


1. `<queue>` ist die `list` der Personen, die in der Warteschlange stehen.
2. `<person_name>` ist der Name der Person, die rausgeworfen werden muss.

Gib die Warteschlange ohne den Namen der gemeinen Person zurück.

```python
>>> remove_the_mean_person(queue=["Natasha", "Steve", "Eltran", "Wanda", "Rocket"], person_name="Eltran")
...
["Natasha", "Steve", "Wanda", "Rocket"]
```


## 5. Namensvettern

Vielleicht hast du noch nie zwei nicht verwandte Personen gesehen, die genau gleich aussehen, aber du hast _garantiert_ schon nicht verwandte Personen mit exakt demselben Namen gesehen (_Namensvetter_)!
 Heute scheinen jede Menge davon anwesend zu sein.
  Du möchtest wissen, wie oft ein bestimmter Name in der Warteschlange vorkommt.

Definiere die Funktion `how_many_namefellows()`, die 2 Parameter `queue` und  `person_name` entgegennimmt.

1. `<queue>` ist die `list` der Personen, die in der Warteschlange stehen.
2. `<person_name>` ist der Name, von dem du vermutest, dass er mehr als einmal in der Warteschlange vorkommt.


Gib die Anzahl der Vorkommen von `person_name` als `int` zurück.


```python
>>> how_many_namefellows(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"], person_name="Natasha")
...
2
```

## 6. Entferne die letzte Person

Leider ist der Park heute überfüllt, und du musst die letzte Person in der normalen Warteschlange entfernen (_du gibst ihr einen Gutschein, damit sie an einem anderen Tag über den Fast-Track zurückkommen kann_).
 Du musst die Funktion `remove_the_last_person()` definieren, die 1 Parameter `queue` entgegennimmt, also die Liste der Personen, die in der Warteschlange stehen.

Du solltest die `list` aktualisieren und außerdem den Namen der entfernten Person mit `return` zurückgeben, damit du ihr einen Gutschein schreiben kannst.


```python
>>> remove_the_last_person(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"])
...
'Rocket'
```

## 7. Sortiere die Warteschlangenliste

Für administrative Zwecke musst du alle Namen in einer bestimmten Warteschlange in alphabetische Reihenfolge bringen.


Definiere die Funktion `sorted_names()`, die 1 Argument `queue` entgegennimmt (die `list` der Personen, die in der Warteschlange stehen), und eine `sorted`-Kopie der `list` zurückgibt.


```python
>>> sorted_names(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"])
...
['Eltran', 'Natasha', 'Natasha', 'Rocket', 'Steve']
```
