1.  Mach dich mit den Konventionen vertraut, die in [PEP 8][pep-8] beschrieben sind.
    Sie sind zwar kein „Gesetz“, aber sie sind der Standard, der im Python-Projekt selbst verwendet wird, und eine großartige Grundlage in den meisten Coding-Situationen.
2.  Lies die Ideen in [PEP 20 (auch bekannt als „The Zen of Python“)][pep-20] und denk darüber nach.
    Wie PEP 8 sind sie keine „Gesetze“, aber sie sind solide Leitprinzipien für besseren und klareren Python-Code.
3.  Bevorzuge klaren und leicht nachvollziehbaren Code gegenüber Kommentaren. Aber kommentiere unbedingt dort, wo es der Klarheit dient.
4.  Zieh in Betracht, Typ-Hinweise zu verwenden, um deinen Code klarer zu machen.
    Schau dir die [Dokumentation][type-hint-docs] zu Typ-Hinweisen an und lies, [warum du vielleicht keine Typ-Hinweise verwenden möchtest][type-hint-nos].
5.  Versuche, die Docstring-Richtlinien aus [PEP 257][pep-257] zu befolgen.
    Gute Dokumentation ist wichtig.
6.  Vermeide [magische Zahlen][magic-numbers].
7.  Bevorzuge [`enumerate()`][enumerate-docs] gegenüber [`range(len())`][range-docs] in Schleifen, die sowohl einen Index als auch ein Element brauchen.
8.  Bevorzuge [Comprehensions][comprehensions] und [Generatorausdrücke][generators] gegenüber Schleifen, die an eine Datenstruktur anhängen.
    Aber [übertreibe es nicht mit Comprehensions][comprehension-overuse].
9.  Wenn du mehr als ein paar Teilstrings zusammenfügst oder in einer Schleife aneinanderhängst, bevorzuge [`str.join()`][join] gegenüber anderen Methoden der String-Verkettung.
10.  Mach dich mit dem reichen Angebot an [eingebauten Funktionen][built-in-functions] in Python und der [Standardbibliothek][standard-lib] vertraut.
     Geh [hier][standard-lib-overview] entlang für eine kurze Tour und ein paar interessante Highlights.

[built-in-functions]: https://docs.python.org/3/library/functions.html
[comprehension-overuse]: https://treyhunner.com/2019/03/abusing-and-overusing-list-comprehensions-in-python/
[comprehensions]: https://treyhunner.com/2015/12/python-list-comprehensions-now-in-color/
[enumerate-docs]: https://docs.python.org/3/library/functions.html#enumerate
[generators]: https://www.pythonmorsels.com/how-write-generator-expression/
[join]: https://docs.python.org/3/library/stdtypes.html#str.join
[magic-numbers]: https://en.wikipedia.org/wiki/Magic_number_(programming)
[pep-20]: https://peps.python.org/pep-0020/
[pep-257]: https://peps.python.org/pep-0257/
[pep-8]: https://peps.python.org/pep-0008/
[range-docs]: https://docs.python.org/3/library/functions.html#func-range
[standard-lib-overview]: https://docs.python.org/3/tutorial/stdlib.html
[standard-lib]: https://docs.python.org/3/library/index.html
[type-hint-docs]: https://typing.python.org/en/latest/index.html
[type-hint-nos]: https://typing.python.org/en/latest/guides/typing_anti_pitch.html
