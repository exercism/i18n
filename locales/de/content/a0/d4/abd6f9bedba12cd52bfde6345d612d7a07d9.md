# Anhang zu den Anweisungen

## Fehlermeldungen

Manchmal ist es notwendig, eine [Exception auszulösen](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). Wenn du das tust, solltest du immer eine **aussagekräftige Fehlermeldung** angeben, um die Fehlerquelle zu benennen. Das macht deinen Code lesbarer und hilft erheblich beim Debuggen. In Situationen, in denen du weißt, dass die Fehlerquelle von einem bestimmten Typ sein wird, kannst du eine der [eingebauten Fehlertypen](https://docs.python.org/3/library/exceptions.html#base-classes) auslösen, solltest aber trotzdem eine aussagekräftige Meldung angeben.

Diese Übung erfordert, dass du die [raise-Anweisung](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) verwendest, um eine `ValueError` auszulösen, wenn die Eingabe für das Quadrat außerhalb des gültigen Bereichs liegt. Die Tests bestehen nur, wenn du die `exception` sowohl mit `raise` auslöst als auch eine Meldung dazu angibst.

Um eine `ValueError` mit einer Meldung auszulösen, schreibe die Meldung als Argument an den `exception`-Typ:

```python
# when the square value is not in the acceptable range        
raise ValueError("square must be between 1 and 64")
```
