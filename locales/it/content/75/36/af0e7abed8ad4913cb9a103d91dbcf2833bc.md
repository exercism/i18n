1.  Prendi familiarità con le convenzioni descritte in [PEP 8][pep-8].
    Anche se non sono «legge», sono lo standard usato dal progetto Python stesso e un'ottima base di partenza nella maggior parte delle situazioni di programmazione.
2.  Leggi e rifletti sulle idee descritte in [PEP 20 (ovvero «The Zen of Python»)][pep-20].
    Come il PEP 8, non sono «leggi», ma sono solidi principi guida per scrivere codice Python migliore e più chiaro.
3.  Preferisci codice chiaro e facile da seguire ai commenti. Ma commenta assolutamente dove serve per la chiarezza.
4.  Valuta di usare i type hint per rendere più chiaro il codice.
    Esplora la [documentazione][type-hint-docs] sui type hint e [perché potresti non voler usare i type hint][type-hint-nos].
5.  Cerca di seguire le linee guida per le docstring illustrate in [PEP 257][pep-257].
    Una buona documentazione è importante.
6.  Evita i [numeri magici][magic-numbers].
7.  Nei cicli che richiedono sia un indice che un elemento, preferisci [`enumerate()`][enumerate-docs] a [`range(len())`][range-docs].
8.  Preferisci le [comprehension][comprehensions] e le [espressioni generatore][generators] ai cicli che aggiungono elementi a una struttura dati.
    Ma non [abusare delle comprehension][comprehension-overuse].
9.  Quando unisci più di qualche sottostringa o concateni in un ciclo, preferisci [`str.join()`][join] agli altri metodi di concatenazione di stringhe.
10.  Prendi familiarità con il ricco insieme di [funzioni built-in][built-in-functions] di Python e con la [libreria standard][standard-lib].
     Vai [qui][standard-lib-overview] per una breve panoramica e alcuni spunti interessanti.

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
