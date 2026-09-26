1.  Familiarize-se com as convenções descritas na [PEP 8][pep-8].
    Apesar de não serem "lei", elas são o padrão usado no próprio projeto Python e uma ótima base na maioria das situações de programação.
2.  Leia e reflita sobre as ideias apresentadas na [PEP 20 (também conhecida como "The Zen of Python")][pep-20].
    Assim como a PEP 8, elas não são "leis", mas são princípios norteadores sólidos para um código Python melhor e mais claro.
3.  Prefira um código claro e fácil de acompanhar a comentários. Mas comente sim quando for preciso para deixar tudo mais claro.
4.  Considere usar anotações de tipo para deixar seu código mais claro.
    Explore a [documentação][type-hint-docs] sobre anotações de tipo e [por que talvez você não queira usá-las][type-hint-nos].
5.  Tente seguir as diretrizes de docstrings apresentadas na [PEP 257][pep-257].
    Uma boa documentação faz diferença.
6.  Evite [números mágicos][magic-numbers].
7.  Prefira [`enumerate()`][enumerate-docs] a [`range(len())`][range-docs] em laços que precisam de um índice e de um elemento.
8.  Prefira [compreensões de lista][comprehensions] e [expressões geradoras][generators] a laços que adicionam itens a uma estrutura de dados.
    Mas não [exagere no uso de compreensões de lista][comprehension-overuse].
9.  Ao juntar mais do que alguns substrings ou ao concatenar dentro de um laço, prefira [`str.join()`][join] a outros métodos de concatenação de strings.
10.  Familiarize-se com o rico conjunto de [funções embutidas][built-in-functions] do Python e com a [Biblioteca Padrão][standard-lib].
     Dê uma olhada [aqui][standard-lib-overview] para um tour rápido e alguns destaques interessantes.

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
