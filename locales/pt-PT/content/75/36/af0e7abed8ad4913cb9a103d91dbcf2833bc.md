1.  Familiariza-te com as convenções descritas no [PEP 8][pep-8].
    Embora não sejam "lei", são o padrão usado no próprio projeto Python e um excelente ponto de partida na maioria das situações de programação.
2.  Lê e reflete sobre as ideias descritas no [PEP 20 (também conhecido como "The Zen of Python")][pep-20].
    Tal como o PEP 8, não são "leis", mas são princípios orientadores sólidos para escrever código Python melhor e mais claro.
3.  Prefere código claro e fácil de seguir a comentários. Mas comenta SEMPRE onde for necessário para garantir clareza.
4.  Considera usar type hints para tornar o teu código mais claro.
    Explora a [documentação][type-hint-docs] sobre type hints e [as razões pelas quais podes não querer usar type hints][type-hint-nos].
5.  Tenta seguir as diretrizes para docstrings apresentadas no [PEP 257][pep-257].
    Uma boa documentação é importante.
6.  Evita [números mágicos][magic-numbers].
7.  Em ciclos que precisam tanto de um índice como de um elemento, prefere [`enumerate()`][enumerate-docs] a [`range(len())`][range-docs].
8.  Prefere [compreensões de listas][comprehensions] e [expressões geradoras][generators] a ciclos que acrescentam elementos a uma estrutura de dados.
    Mas não [abuses das compreensões de listas][comprehension-overuse].
9.  Quando juntas vários substrings ou concatenas dentro de um ciclo, prefere [`str.join()`][join] a outros métodos de concatenação de strings.
10.  Familiariza-te com o vasto conjunto de [funções incorporadas][built-in-functions]  do Python e com a [Biblioteca Padrão][standard-lib].
     Vai [aqui][standard-lib-overview] para uma breve visita guiada e alguns destaques interessantes.

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
