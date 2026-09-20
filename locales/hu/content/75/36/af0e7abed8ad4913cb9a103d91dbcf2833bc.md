1.  Ismerkedj meg a [PEP 8][pep-8]-ban leírt konvenciókkal.
    Bár ezek nem „törvények”, a Python-projekt maga is ezeket használja szabványként, és a legtöbb programozási helyzetben remek kiindulópontot jelentenek.
2.  Olvasd el és gondold át a [PEP 20 (más néven „The Zen of Python”)][pep-20]-ban leírt ötleteket.
    A PEP 8-hoz hasonlóan ezek sem „törvények”, hanem szilárd irányelvek a jobb és világosabb Python-kód írásához.
3.  A világos és könnyen követhető kódot részesítsd előnyben a megjegyzésekkel szemben. De ahol a világosság érdekében szükség van rá, ott igenis írj megjegyzést.
4.  Fontold meg, hogy típusjelölésekkel világosabbá teszed a kódodat.
    Nézd meg a típusjelölésekről szóló [dokumentációt][type-hint-docs], és azt is, hogy [miért lehet, hogy mégsem érdemes típusjelöléseket használnod][type-hint-nos].
5.  Igyekezz követni a [PEP 257][pep-257]-ben leírt docstring-irányelveket.
    A jó dokumentáció sokat számít.
6.  Kerüld a [mágikus számokat][magic-numbers].
7.  Azokban a ciklusokban, amelyekben egyszerre van szükség indexre és elemre, a [`range(len())`][range-docs] helyett részesítsd előnyben az [`enumerate()`][enumerate-docs] függvényt.
8.  Azokkal a ciklusokkal szemben, amelyek elemeket fűznek hozzá egy adatszerkezethez, részesítsd előnyben a [comprehension][comprehensions] és a [generátorkifejezés][generators] formákat.
    De ne [vidd túlzásba][comprehension-overuse] a használatukat.
9.  Ha néhánynál több stringet fűzöl össze, vagy ciklusban konkatenálsz, a [`str.join()`][join] metódust részesítsd előnyben a string-összefűzés más módszereivel szemben.
10.  Ismerkedj meg a Python gazdag [beépített függvénykészletével][built-in-functions] és a [szabványos könyvtárral][standard-lib].
     Egy rövid körúthoz és néhány érdekes kiemeléshez nézz [ide][standard-lib-overview].

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
