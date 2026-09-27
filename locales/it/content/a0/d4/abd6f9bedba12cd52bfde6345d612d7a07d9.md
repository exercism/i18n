# Appendice alle istruzioni

## Messaggi di eccezione

A volte è necessario [sollevare un'eccezione](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). Quando lo fai, dovresti sempre includere un **messaggio di errore significativo** che indichi qual è l'origine dell'errore. Questo rende il tuo codice più leggibile e aiuta molto durante il debug. Se sai che l'origine dell'errore è di un certo tipo, puoi scegliere di sollevare uno dei [tipi di errore predefiniti](https://docs.python.org/3/library/exceptions.html#base-classes), ma dovresti comunque includere un messaggio significativo.

Questo esercizio in particolare richiede che tu usi [l'istruzione raise](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) per «lanciare» un `ValueError` quando il quadrato di input è fuori dall'intervallo consentito. I test passeranno solo se usi `raise` sull'`exception` e ci alleghi anche un messaggio.

Per sollevare un `ValueError` con un messaggio, scrivi il messaggio come argomento del tipo dell'eccezione:

```python
# when the square value is not in the acceptable range        
raise ValueError("square must be between 1 and 64")
```
