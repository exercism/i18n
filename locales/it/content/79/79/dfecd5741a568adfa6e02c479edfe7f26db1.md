# Appendice alle istruzioni


## Come viene implementato questo esercizio per il track Python


I test di questo esercizio si aspettano che l'orologio venga implementato in una `class` Clock.
Se non conosci le classi in Python, [concept:python/classes]() e [classi][classes in python] (_dalla documentazione di Python_) sono buoni punti da cui iniziare.


## Rappresentare la classe

Quando lavori con gli [oggetti][what-is-an-object] e ne fai il debug, è importante avere una buona rappresentazione dell'oggetto.
Per esempio, se crei un nuovo oggetto [`datetime.datetime`][datetime] nell'ambiente [REPL][REPL] di Python, puoi visualizzarne la [rappresentazione come stringa][str-rep-classes]:


```python
>>> from datetime import datetime
>>> new_date = datetime(2022, 5, 4)
>>> new_date
datetime.datetime(2022, 5, 4, 0, 0)
```

La `class` Clock dovrebbe creare un `object` personalizzato che gestisce orari _senza_ date.
Un aspetto importante di questa `class` sarà come viene rappresentata come _stringa_.
Altri programmatori che usano o chiamano gli `objects` Clock creati dalla `class` Clock si rifaranno a questa rappresentazione come stringa per il debug e altre attività.
Tuttavia, la rappresentazione predefinita di una `class` personalizzata non è molto utile:


```python
>>> Clock(12, 34)
<Clock object st 0x102807b20 >
```

Per creare una rappresentazione più utile, puoi definire un [metodo speciale][dunder-methods] [`__repr__`][repr-method] sulla `class`.

Idealmente, quel metodo `__repr__` restituisce codice Python valido che può essere usato per ricreare l'oggetto quando viene passato a [`eval()`][eval-built-in], come descritto nella [specifica di un metodo `__repr__`][repr-docs].
Restituire codice Python valido permette a un altro sviluppatore di copiare e incollare direttamente la `str` nel codice o nel REPL.
Un `Clock` che rappresenta le 11:30 potrebbe apparire così:

```python
 `Clock(11, 30)`
```

Definire un metodo `__repr__` è una buona pratica per tutte le classi personalizzate.
Alcune cose aggiuntive da tenere a mente:

- Le informazioni restituite da questo metodo dovrebbero essere utili quando si esegue il debug dei problemi.
- _Idealmente_, il metodo restituisce una stringa che è codice Python valido, anche se non sempre è possibile.
- Se il codice Python valido non è praticabile, la convenzione è restituire una descrizione tra parentesi angolari: `< ...a practical description... >`.


### Conversione in stringa

Oltre al metodo `__repr__`, potrebbe esserci anche la necessità di una rappresentazione come stringa alternativa della `class`, «leggibile da una persona».
Questa può servire a formattare l'oggetto per l'output del programma o per la documentazione.
Si fa scrivendo un metodo speciale [`__str__`][str-dunder].
Guardiamo di nuovo `datetime.datetime`:


```python
>>> str(datetime.datetime(2022, 5, 4))
'2022-05-04 00:00:00'
```

Quando a un oggetto `datetime` viene chiesto di convertirsi in una rappresentazione come stringa, restituisce una `str` formattata secondo lo [standard ISO 8601][ISO 8601], che la maggior parte delle librerie datetime è in grado di interpretare per ottenere una data e un'ora leggibili da una persona.

In questo esercizio avrai la possibilità di scrivere un metodo `__str__` per la classe Clock, oltre a un metodo `__repr__`.

```python
>>> str(Clock(11, 30))
'11:30'
```

Per supportare questa conversione in stringa, dovrai creare un metodo speciale `__str__` sulla `class` che restituisce una stringa più «leggibile da una persona», che mostra l'ora del Clock.

Se non crei un metodo `__str__` e chiami `str()` sulla classe, Python proverà a chiamare `__repr__` sulla classe come fallback.
Quindi, se implementi solo uno di questi due metodi speciali, è meglio creare un `__repr__` piuttosto che solo un `__str__`.


[ISO 8601]: https://www.iso.org/iso-8601-date-and-time-format.html
[REPL]: https://pythonprogramminglanguage.com/repl/
[classes in python]: https://docs.python.org/3/tutorial/classes.html
[datetime]: https://docs.python.org/3/library/datetime.html#available-types
[dunder-methods]: https://www.pythonmorsels.com/every-dunder-method/
[eval-built-in]: https://docs.python.org/3/library/functions.html#eval
[repr-docs]: https://docs.python.org/3/reference/datamodel.html#object.__repr__
[repr-method]: https://docs.python.org/3/library/functions.html#repr
[str-dunder]: https://docs.python.org/3/reference/datamodel.html#object.__str__
[str-rep-classes]: https://www.digitalocean.com/community/tutorials/python-str-repr-functions#introduction
[what-is-an-object]: https://realpython.com/ref/glossary/object/
