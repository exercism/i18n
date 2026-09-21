# Utasítások

Chaitana egy nagyon népszerű vidámpark tulajdonosa.
A gyönyörűen parkosított terület kellős közepén csak egyetlen játéka van: The Biggest Roller Coaster in the World(TM).
Bár csak ez az egy attrakció van, az emberek a világ minden tájáról utaznak ide, és órákig sorban állnak azért, hogy kipróbálhassák Chaitana hiper-hullámvasútját.

Ehhez a játékhoz két sor van, mindegyiket egy-egy `list` képviseli:

1. Normál sor
2. Expressz sor (_más néven a Fast-track_), ahol az emberek plusz pénzt fizetnek az elsőbbségi hozzáférésért.


Arra kértek, hogy írj egy kis kódot, amivel jobban kezelhetők a park vendégei.
A lehető leghamarabb meg kell valósítanod a következő függvényeket, mielőtt a vendégek (és a főnököd, Chaitana!) morcosak lesznek.
Figyelmesen olvasd el őket.
Néhány részfeladat arra kér, hogy változtasd meg vagy frissítsd a meglévő sort, mások viszont arra, hogy készíts róla egy másolatot.


## 1. Tegyél be a sorba

Definiáld az `add_me_to_the_queue()` függvényt, amely 4 paramétert vár (`<express_queue>, <normal_queue>, <ticket_type>, <person_name>`), és visszaadja a megfelelő sort az illető nevével frissítve.


1. A `<ticket_type>` egy `int`, ahol az 1 == express_queue, a 0 == normal_queue.
2. A `<person_name>` annak a személynek a neve (egy `str`), akit a megfelelő sorba be kell tenni.


```python
>>> add_me_to_the_queue(express_queue=["Tony", "Bruce"], normal_queue=["RobotGuy", "WW"], ticket_type=1, person_name="RichieRich")
...
["Tony", "Bruce", "RichieRich"]

>>> add_me_to_the_queue(express_queue=["Tony", "Bruce"], normal_queue=["RobotGuy", "WW"], ticket_type=0, person_name="HawkEye")
....
["RobotGuy", "WW", "HawkEye"]
```

## 2. Hol vannak a barátaim?

Egy ember későn érkezett a parkba, de ahhoz a sorhoz szeretne csatlakozni, ahol a barátai várakoznak.
Fogalma sincs azonban, hogy hol állnak a barátai, és nincs térerő, hogy felhívja őket.

Definiáld a `find_my_friend()` függvényt, amely 2 paramétert vár, `queue` és `friend_name`, és visszaadja a személy nevének helyét a sorban.


1. A `<queue>` a sorban álló emberek `list`-je.
2. A `<friend_name>` annak a barátnak a neve, akinek az indexét (a sorban elfoglalt helyét) meg kell keresned.

Ne feledd: az indexelés balról 0-tól, jobbról -1-től indul.


```python
>>> find_my_friend(queue=["Natasha", "Steve", "T'challa", "Wanda", "Rocket"], friend_name="Steve")
...
1
```


## 3. Csatlakozhatok hozzájuk?

Most, hogy megtaláltuk a barátait (a fenti 2. részfeladatban), a későn érkező szeretne csatlakozni hozzájuk a sorban elfoglalt helyükön.
Definiáld az `add_me_with_my_friends()` függvényt, amely 3 paramétert vár: `queue`, `index` és `person_name`.


1. A `<queue>` a sorban álló emberek `list`-je.
2. Az `<index>` az a pozíció, ahová az új személyt be kell szúrni.
3. A `<person_name>` annak a személynek a neve, akit az adott index pozícióba kell beszúrni.

Add vissza a sort frissítve a későn érkező nevével.


```python
>>> add_me_with_my_friends(queue=["Natasha", "Steve", "T'challa", "Wanda", "Rocket"], index=1, person_name="Bucky")
...
["Natasha", "Bucky", "Steve", "T'challa", "Wanda", "Rocket"]
```

## 4. Gonosz ember a sorban

Most hallottad a sorból, hogy van ott egy igazán gonosz ember, aki lökdösődik, kiabál és bajt kever.
Ki kell dobnod ezt a gazembert a rossz viselkedése miatt!


Definiáld a `remove_the_mean_person()` függvényt, amely 2 paramétert vár: `queue` és `person_name`.


1. A `<queue>` a sorban álló emberek `list`-je.
2. A `<person_name>` annak a személynek a neve, akit ki kell rúgni.

Add vissza a sort úgy frissítve, hogy ne szerepeljen benne a gonosz ember neve.

```python
>>> remove_the_mean_person(queue=["Natasha", "Steve", "Eltran", "Wanda", "Rocket"], person_name="Eltran")
...
["Natasha", "Steve", "Wanda", "Rocket"]
```


## 5. Névrokonok

Lehet, hogy még nem láttál két egymáshoz nem tartozó embert, akik pontosan ugyanúgy néznek ki, de azt _biztosan_ láttad már, hogy egymáshoz nem tartozó embereknek pontosan ugyanaz a nevük (_névrokonok_)!
Úgy tűnik, ma sok ilyen ember van jelen.
Szeretnéd tudni, hogy egy adott név hányszor fordul elő a sorban.

Definiáld a `how_many_namefellows()` függvényt, amely 2 paramétert vár, `queue` és `person_name`.

1. A `<queue>` a sorban álló emberek `list`-je.
2. A `<person_name>` az a név, amiről azt gyanítod, hogy többször is előfordulhat a sorban.


Add vissza a `person_name` előfordulásainak számát egy `int`-ként.


```python
>>> how_many_namefellows(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"], person_name="Natasha")
...
2
```

## 6. Távolítsd el az utolsó embert

Sajnos ma túlzsúfolt a park, és el kell távolítanod az utolsó embert a normál sorból (_kapsz egy utalványt, hogy egy másik napon a fast-track sorban térhessen vissza_).
Definiálnod kell a `remove_the_last_person()` függvényt, amely 1 paramétert vár, a `queue`-t, ami a sorban álló emberek listája.

Frissítened kell a `list`-et, és `return`-nel vissza is kell adnod az eltávolított személy nevét, hogy utalványt írhass neki.


```python
>>> remove_the_last_person(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"])
...
'Rocket'
```

## 7. Rendezd a sor listáját

Adminisztratív okokból egy adott sor összes nevét ábécé szerinti sorrendbe kell rendezned.


Definiáld a `sorted_names()` függvényt, amely 1 argumentumot vár, a `queue`-t (a sorban álló emberek `list`-jét), és visszaadja a `list` egy `sorted` másolatát.


```python
>>> sorted_names(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"])
...
['Eltran', 'Natasha', 'Natasha', 'Rocket', 'Steve']
```
