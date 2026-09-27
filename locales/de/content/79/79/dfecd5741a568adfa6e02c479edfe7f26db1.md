# Ergänzende Anweisungen


## Wie diese Übung für den Python-Track umgesetzt wird


Die Tests für diese Übung erwarten, dass deine Uhr in einer `class` namens Clock umgesetzt wird.
Wenn du mit Klassen in Python noch nicht vertraut bist, sind [concept:python/classes]() und [Klassen][classes in python] (_aus der Python-Dokumentation_) gute Ausgangspunkte.


## Wie du deine Klasse darstellst

Wenn du mit [Objekten][what-is-an-object] arbeitest und sie debuggst, ist es wichtig, eine gute Darstellung dieses Objekts zu haben.
Wenn du zum Beispiel ein neues [`datetime.datetime`][datetime]-Objekt in der Python-[REPL][REPL]-Umgebung erstellst, kannst du dir seine [String-Darstellung][str-rep-classes] ansehen:


```python
>>> from datetime import datetime
>>> new_date = datetime(2022, 5, 4)
>>> new_date
datetime.datetime(2022, 5, 4, 0, 0)
```

Deine Clock-`class` soll ein eigenes `object` erzeugen, das Zeiten _ohne_ Datum verarbeitet.
Ein wichtiger Aspekt dieser `class` wird sein, wie sie als _String_ dargestellt wird.
Andere Programmierer, die Clock-`objects` verwenden oder aufrufen, die aus der Clock-`class` erzeugt wurden, greifen beim Debuggen und bei anderen Tätigkeiten auf diese String-Darstellung zurück.
Die Standarddarstellung einer eigenen `class` ist allerdings nicht sehr hilfreich:


```python
>>> Clock(12, 34)
<Clock object st 0x102807b20 >
```

Um eine hilfreichere Darstellung zu erzeugen, kannst du eine [`__repr__`][repr-method]-[spezielle Methode][dunder-methods] in der `class` definieren.

Idealerweise gibt diese `__repr__`-Methode gültigen Python-Code zurück, mit dem sich das Objekt neu erzeugen lässt, wenn man ihn an [`eval()`][eval-built-in] übergibt. Das ist in der [Spezifikation für eine `__repr__`-Methode][repr-docs] beschrieben.
Wenn du gültigen Python-Code zurückgibst, kann ein anderer Entwickler den `str` direkt in den Code oder die REPL kopieren.
Eine `Clock`, die 11:30 Uhr darstellt, könnte so aussehen:

```python
 `Clock(11, 30)`
```

Eine `__repr__`-Methode zu definieren, ist für alle eigenen Klassen eine gute Praxis.
Ein paar zusätzliche Punkte, die du beachten solltest:

- Die Informationen, die diese Methode zurückgibt, sollten beim Debuggen von Problemen nützlich sein.
- _Idealerweise_ gibt die Methode einen String zurück, der gültiger Python-Code ist, auch wenn das nicht immer möglich ist.
- Wenn gültiger Python-Code nicht praktikabel ist, ist es üblich, eine Beschreibung in spitzen Klammern zurückzugeben: `< ...a practical description... >`.


### String-Konvertierung

Neben der `__repr__`-Methode kann auch eine alternative, „menschenlesbare“ String-Darstellung der `class` nötig sein.
Diese kann verwendet werden, um das Objekt für die Programmausgabe oder die Dokumentation zu formatieren.
Dafür schreibst du eine spezielle Methode namens [`__str__`][str-dunder].
Schauen wir uns `datetime.datetime` noch einmal an:


```python
>>> str(datetime.datetime(2022, 5, 4))
'2022-05-04 00:00:00'
```

Wenn ein `datetime`-Objekt sich in eine String-Darstellung umwandeln soll, gibt es einen `str` zurück, der nach dem [ISO-8601-Standard][ISO 8601] formatiert ist. Diesen können die meisten Datetime-Bibliotheken in ein menschenlesbares Datum und eine Uhrzeit parsen.

In dieser Übung bekommst du die Gelegenheit, eine `__str__`-Methode für deine Uhr zu schreiben, ebenso wie eine `__repr__`-Methode.

```python
>>> str(Clock(11, 30))
'11:30'
```

Um diese String-Konvertierung zu unterstützen, musst du eine spezielle `__str__`-Methode in deiner `class` anlegen, die einen eher „menschenlesbaren“ String zurückgibt, der die Uhrzeit anzeigt.

Wenn du keine `__str__`-Methode anlegst und `str()` für deine Klasse aufrufst, versucht Python ersatzweise, `__repr__` für deine Klasse aufzurufen.
Wenn du also nur eine dieser beiden speziellen Methoden implementierst, ist es besser, eine `__repr__` anzulegen statt nur eine `__str__`.


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
