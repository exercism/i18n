# Istruzioni aggiuntive

## Messaggi di eccezione

A volte è necessario [sollevare un'eccezione](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). Quando lo fai, dovresti sempre includere un **messaggio di errore significativo** per indicare qual è l'origine dell'errore. Questo rende il codice più leggibile e aiuta notevolmente nel debug. Per le situazioni in cui sai che l'origine dell'errore sarà di un certo tipo, puoi scegliere di sollevare uno dei [tipi di errore predefiniti](https://docs.python.org/3/library/exceptions.html#base-classes), ma dovresti comunque includere un messaggio significativo.

Questo esercizio in particolare richiede che tu usi l'[istruzione raise](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) per «lanciare» un `ValueError` quando la funzione `prime()` riceve un input malformato. Dato che questo esercizio tratta solo numeri _positivi_, qualsiasi numero < 1 è malformato. I test passeranno solo se usi `raise` per l'`exception` e includi un messaggio con essa.

Per sollevare un `ValueError` con un messaggio, scrivi il messaggio come argomento al tipo `exception`:

```python
# when the prime function receives malformed input
raise ValueError('there is no zeroth prime')
```
