1.  Ознайомтеся з конвенціями, викладеними в [PEP 8][pep-8].
    Хоча вони не «закон», це стандарт, який використовується в самому проєкті Python, і чудова відправна точка в більшості ситуацій написання коду.
2.  Прочитайте й обміркуйте ідеї, викладені в [PEP 20 (він же «Дзен Python»)][pep-20].
    Як і PEP 8, це не «закони», але це надійні принципи, що допомагають писати кращий і зрозуміліший код Python.
3.  Надавайте перевагу чіткому і зрозумілому коду, а не коментарям. Але обовʼязково коментуйте там, де це потрібно для зрозумілості.
4.  Подумайте про використання анотацій типів, щоб зробити свій код зрозумілішим.
    Ознайомтеся з [документацією][type-hint-docs] щодо анотацій типів і з [причинами, чому вам може не хотітися використовувати анотації типів][type-hint-nos].
5.  Намагайтеся дотримуватися настанов щодо рядків документації, викладених у [PEP 257][pep-257].
    Гарна документація важлива.
6.  Уникайте [магічних чисел][magic-numbers].
7.  У циклах, де потрібні й індекс, і елемент, надавайте перевагу [`enumerate()`][enumerate-docs] над [`range(len())`][range-docs].
8.  Надавайте перевагу [включенням][comprehensions] і [генераторним виразам][generators] над циклами, які додають елементи до структури даних.
    Але не [зловживайте включеннями][comprehension-overuse].
9.  Коли потрібно зʼєднати більше ніж кілька підрядків або виконати конкатенацію в циклі, надавайте перевагу [`str.join()`][join] над іншими способами конкатенації рядків.
10.  Ознайомтеся з багатим набором [вбудованих функцій][built-in-functions] Python і [стандартною бібліотекою][standard-lib].
     Загляньте [сюди][standard-lib-overview], щоб коротко оглянути їх і побачити кілька цікавих моментів.

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
