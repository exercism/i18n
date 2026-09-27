1.  Familiarízate con las convenciones descritas en [PEP 8][pep-8].
    Aunque no son «ley», son el estándar que se usa en el propio proyecto de Python y un excelente punto de partida en la mayoría de las situaciones de programación.
2.  Lee y reflexiona sobre las ideas descritas en [PEP 20 (también conocido como «The Zen of Python»)][pep-20].
    Al igual que PEP 8, no son «leyes», pero son principios sólidos que te guiarán hacia un código Python mejor y más claro.
3.  Prefiere el código claro y fácil de seguir a los comentarios. Pero comenta cuando haga falta para mayor claridad.
4.  Plantéate usar anotaciones de tipo para clarificar tu código.
    Explora la [documentación][type-hint-docs] sobre anotaciones de tipo y [por qué puede que no quieras usarlas][type-hint-nos].
5.  Intenta seguir las pautas sobre docstrings descritas en [PEP 257][pep-257].
    Una buena documentación importa.
6.  Evita los [números mágicos][magic-numbers].
7.  En los bucles que necesiten tanto un índice como un elemento, prefiere [`enumerate()`][enumerate-docs] a [`range(len())`][range-docs].
8.  Prefiere las [comprensiones][comprehensions] y las [expresiones generadoras][generators] a los bucles que añaden elementos a una estructura de datos.
    Pero no [abuses de las comprensiones][comprehension-overuse].
9.  Cuando vayas a unir más de unas pocas subcadenas o a concatenar dentro de un bucle, prefiere [`str.join()`][join] a otros métodos de concatenación de strings.
10.  Familiarízate con el amplio conjunto de [funciones incorporadas][built-in-functions] de Python y con la [biblioteca estándar][standard-lib].
     Echa un vistazo [aquí][standard-lib-overview] para hacer un breve recorrido y descubrir algunos aspectos interesantes.

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
