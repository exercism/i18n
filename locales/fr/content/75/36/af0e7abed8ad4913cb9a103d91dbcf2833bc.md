1.  Familiarise-toi avec les conventions décrites dans [PEP 8][pep-8].
    Même si ce ne sont pas des « lois », elles constituent la norme utilisée dans le projet Python lui-même et un excellent point de départ dans la plupart des situations de programmation.
2.  Lis et réfléchis aux idées présentées dans [PEP 20 (aussi appelé « The Zen of Python »)][pep-20].
    Comme le PEP 8, ce ne sont pas des « lois », mais de solides principes directeurs pour écrire du code Python meilleur et plus clair.
3.  Préfère un code clair et facile à suivre aux commentaires. Mais commente bel et bien là où la clarté l'exige.
4.  Envisage d'utiliser des annotations de type pour clarifier ton code.
    Explore la [documentation][type-hint-docs] sur les annotations de type et [pourquoi tu pourrais préférer ne pas en mettre][type-hint-nos].
5.  Essaie de suivre les recommandations sur les _docstrings_ présentées dans [PEP 257][pep-257].
    Une bonne documentation, c'est important.
6.  Évite les [nombres magiques][magic-numbers].
7.  Dans les boucles qui ont besoin à la fois d'un indice et d'un élément, préfère [`enumerate()`][enumerate-docs] à [`range(len())`][range-docs].
8.  Préfère les [compréhensions][comprehensions] et les [expressions génératrices][generators] aux boucles qui ajoutent des éléments à une structure de données.
    Mais ne les [utilise pas à outrance][comprehension-overuse].
9.  Quand tu joins plus que quelques _strings_, ou que tu concatènes dans une boucle, préfère [`str.join()`][join] aux autres méthodes de concaténation.
10.  Familiarise-toi avec le riche ensemble de [fonctions natives][built-in-functions] de Python et sa [bibliothèque standard][standard-lib].
     Va [ici][standard-lib-overview] pour une brève visite guidée et quelques points intéressants.

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
