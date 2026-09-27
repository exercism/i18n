# Ergänzung zu den Anweisungen

## Fehlermeldungen in Exceptions

Manchmal musst du eine [Exception auslösen](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). Dabei solltest du immer eine **aussagekräftige Fehlermeldung** angeben, die zeigt, woher der Fehler stammt. Das macht deinen Code lesbarer und hilft beim Debuggen erheblich. Wenn du weißt, dass die Fehlerquelle von einem bestimmten Typ ist, kannst du einen der [eingebauten Fehlertypen](https://docs.python.org/3/library/exceptions.html#base-classes) auslösen, solltest aber trotzdem eine aussagekräftige Nachricht mitgeben.

Diese Übung verlangt, dass du die [raise-Anweisung](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) verwendest, um eine `ValueError` zu „werfen“, wenn die Funktion `prime()` einen fehlerhaften Eingabewert erhält. Da es in dieser Übung nur um _positive_ Zahlen geht, ist jede Zahl < 1 fehlerhaft. Die Tests bestehen nur, wenn du die `exception` sowohl mit `raise` auslöst als auch eine Nachricht dazu angibst.

Um eine `ValueError` mit einer Nachricht auszulösen, schreibst du die Nachricht als Argument an den Typ `exception`:

```python
# when the prime function receives malformed input
raise ValueError('there is no zeroth prime')
```
