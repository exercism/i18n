# Appendice alle istruzioni

## Descrizione del DSL

Un grafo, in questo DSL, è un oggetto di tipo `Graph`. Accetta una `list` di una o più tuple che descrivono:

+ attributi
+ `Nodes`
+ `Edges`

Le implementazioni di un `Node` e di un `Edge` sono fornite in `dot_dsl.py`.

Per maggiori dettagli sul design previsto del DSL e sui tipi di errore e i messaggi previsti, dai un'occhiata ai casi di test in `dot_dsl_test.py`


## Messaggi di eccezione

A volte è necessario [sollevare un'eccezione](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). Quando lo fai, dovresti sempre includere un **messaggio di errore significativo** per indicare qual è l'origine dell'errore. Questo rende il codice più leggibile e aiuta molto con il debug. Nelle situazioni in cui sai che l'origine dell'errore sarà di un certo tipo, puoi scegliere di sollevare uno dei [tipi di errore predefiniti](https://docs.python.org/3/library/exceptions.html#base-classes), ma dovresti comunque includere un messaggio significativo.

Questo esercizio in particolare richiede di usare l'[istruzione raise](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) per «lanciare» un `TypeError` quando un `Graph` è malformato, e un `ValueError` quando un `Edge`, un `Node` o un `attribute` è malformato. I test passeranno solo se sollevi l'`exception` con `raise` e includi un messaggio con essa.

Per sollevare un errore con un messaggio, scrivi il messaggio come argomento al tipo `exception`:

```python
# Graph is malformed
raise TypeError("Graph data malformed")

# Edge has incorrect values
raise ValueError("EDGE malformed")
```
