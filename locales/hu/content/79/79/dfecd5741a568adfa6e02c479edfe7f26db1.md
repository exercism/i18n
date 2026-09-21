# Kiegészítés az utasításokhoz


## Így valósul meg ez a feladat a Python kurzuson


A feladat tesztjei azt várják, hogy az órádat egy Clock `class`-ban valósítsd meg.
Ha még nem ismered a Python osztályait, a [concept:python/classes]() és az [osztályok][classes in python] (_a Python dokumentációjából_) jó kiindulópont lehet.


## Az osztályod reprezentálása

Amikor [objektumokkal][what-is-an-object] dolgozol és hibakeresed őket, fontos, hogy legyen egy jó reprezentációjuk.
Például, ha létrehozol egy új [`datetime.datetime`][datetime] objektumot a Python [REPL][REPL] környezetében, megnézheted a [string-reprezentációját][str-rep-classes]:


```python
>>> from datetime import datetime
>>> new_date = datetime(2022, 5, 4)
>>> new_date
datetime.datetime(2022, 5, 4, 0, 0)
```

A Clock `class`-odnak egy olyan egyedi `object`-et kell létrehoznia, amely dátum _nélkül_ kezeli az időpontokat.
Ennek a `class`-nak az egyik fontos jellemzője lesz, hogyan reprezentálódik _string_-ként.
Más programozók, akik a Clock `class`-ból létrehozott Clock `objects`-eket használják vagy hívják meg, ezt a string-reprezentációt fogják használni hibakereséshez és más tevékenységekhez.
Egy egyedi `class` alapértelmezett reprezentációja azonban nem túl hasznos:


```python
>>> Clock(12, 34)
<Clock object st 0x102807b20 >
```

Hogy hasznosabb reprezentációt hozz létre, definiálhatsz egy [`__repr__`][repr-method] [speciális metódust][dunder-methods] a `class`-on.

Ideális esetben a `__repr__` metódus érvényes Python-kódot ad vissza, amellyel újra létrehozható az objektum, ha átadod az [`eval()`][eval-built-in] függvénynek, ahogyan azt a [`__repr__` metódus specifikációja][repr-docs] leírja.
Az érvényes Python-kód visszaadása lehetővé teszi, hogy egy másik fejlesztő közvetlenül a kódba vagy a REPL-be másolja a `str`-t.
Egy `Clock`, amely a délelőtti 11:30-at reprezentálja, így nézhet ki:

```python
 `Clock(11, 30)`
```

A `__repr__` metódus definiálása minden egyedi osztály esetében jó gyakorlat.
Néhány további szempont:

- A metódus által visszaadott információnak hasznosnak kell lennie a hibák keresésekor.
- _Ideális esetben_ a metódus olyan stringet ad vissza, amely érvényes Python-kód, bár ez nem mindig lehetséges.
- Ha az érvényes Python-kód nem kivitelezhető, a szokás az, hogy csúcsos zárójelek között adj vissza egy leírást: `< ...a practical description... >`.


### Stringkonverzió

A `__repr__` metódus mellett szükség lehet a `class` egy alternatív, „ember által olvasható” string-reprezentációjára is.
Erre akkor lehet szükség, hogy az objektumot a program kimenetéhez vagy a dokumentációhoz formázd.
Ezt egy [`__str__`][str-dunder] speciális metódus megírásával teheted meg.
Nézzük újra a `datetime.datetime`-et:


```python
>>> str(datetime.datetime(2022, 5, 4))
'2022-05-04 00:00:00'
```

Amikor egy `datetime` objektumot arra kérsz, hogy alakítsa át magát string-reprezentációvá, egy `str`-t ad vissza a [ISO 8601 szabvány][ISO 8601] szerint formázva, amelyet a legtöbb datetime-könyvtár ember által olvasható dátumként és időpontként tud értelmezni.

Ebben a feladatban lehetőséged lesz `__str__` és `__repr__` metódust is írni a Clockodhoz.

```python
>>> str(Clock(11, 30))
'11:30'
```

A stringkonverzió támogatásához létre kell hoznod egy `__str__` speciális metódust a `class`-odon, amely egy „ember által olvashatóbb” stringet ad vissza a Clock idejével.

Ha nem hozol létre `__str__` metódust, és meghívod a `str()`-t az osztályodon, a Python tartalék megoldásként a `__repr__`-t próbálja meg meghívni az osztályodon.
Tehát ha csak az egyik speciális metódust valósítod meg a kettő közül, jobb, ha `__repr__`-t hozol létre, nem csak `__str__`-t.


[ISO 8601]: https://www.iso.org/iso-8601-date-and-time-format.html
[REPL]: https://pythonprogramminglanguage.com/repl/
[classes in python]: https://docs.python.org/3/tutorial/classes.html
[datetime]: https://docs.python.org/3/library/datetime.html#available-types
[dunder-methods]: https://www.pythonmorsels.com/every-dunder-method/
[eval-built-in]: https://docs.python.org/3/library/functions.html#eval
[repr-docs]: https://docs.python.org/3/reference/datamodel.html#object.__repr__
[repr-method]: https://docs.python.org/3/library/functions.html#repr
[str-dunder]: https://docs.python.org/3/reference/datamodel.html#object.__str__
[str-rep-classes]: https://www.digitalocean.com/community/tutorials/python-str-repr-functions#introduction
[what-is-an-object]: https://realpython.com/ref/glossary/object/
