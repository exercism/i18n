# Ergänzung zu den Anweisungen

## Beschreibung der DSL

Ein Graph ist in dieser DSL ein Objekt vom Typ `Graph`. Dieser nimmt eine `list` mit einem oder mehreren Tupeln entgegen, die Folgendes beschreiben:

+ Attribute
+ `Nodes`
+ `Edges`

Die Implementierungen von `Node` und `Edge` findest du in `dot_dsl.py`.

Weitere Details zum erwarteten Aufbau der DSL und zu den erwarteten Fehlertypen und -meldungen findest du in den Testfällen in `dot_dsl_test.py`


## Ausnahmemeldungen

Manchmal ist es notwendig, eine [Ausnahme auszulösen](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). Dabei solltest du immer eine **aussagekräftige Fehlermeldung** angeben, die angibt, woher der Fehler stammt. Das macht deinen Code lesbarer und hilft beim Debugging erheblich. Wenn du weißt, dass die Fehlerquelle von einem bestimmten Typ ist, kannst du eine der [eingebauten Fehlertypen](https://docs.python.org/3/library/exceptions.html#base-classes) auslösen, solltest aber trotzdem eine aussagekräftige Meldung angeben.

Diese Übung verlangt, dass du mit der [raise-Anweisung](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) einen `TypeError` auslöst, wenn ein `Graph` fehlerhaft ist, und einen `ValueError`, wenn ein `Edge`, `Node` oder `attribute` fehlerhaft ist. Die Tests bestehen nur, wenn du die `exception` sowohl mit `raise` auslöst als auch eine Meldung dazu angibst.

Um einen Fehler mit einer Meldung auszulösen, gibst du die Meldung als Argument für den `exception`-Typ an:

```python
# Graph is malformed
raise TypeError("Graph data malformed")

# Edge has incorrect values
raise ValueError("EDGE malformed")
```
