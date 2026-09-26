# Apéndice de instrucciones


## Cómo se implementa este ejercicio en el track de Python


Las pruebas de este ejercicio esperan que tu reloj se implemente en una `class` Clock.
Si aún no conoces las clases en Python, [concept:python/classes]() y [clases][classes in python] (_de la documentación de Python_) son buenos puntos de partida.


## Cómo representar tu clase

Cuando trabajas con [objetos][what-is-an-object] y los depuras, es importante tener una buena representación de ese objeto.
Por ejemplo, si crearas un nuevo objeto [`datetime.datetime`][datetime] en el entorno [REPL][REPL] de Python, podrías ver su [representación en string][str-rep-classes]:


```python
>>> from datetime import datetime
>>> new_date = datetime(2022, 5, 4)
>>> new_date
datetime.datetime(2022, 5, 4, 0, 0)
```

Tu `class` Clock debe crear un `object` personalizado que maneje horas _sin_ fechas.
Un aspecto importante de esta `class` será cómo se representa como un _string_.
Otros programadores que usen o llamen a los `objects` Clock creados a partir de la `class` Clock consultarán esta representación en string para depurar y para otras actividades.
Sin embargo, la representación predeterminada de una `class` personalizada no es muy útil:


```python
>>> Clock(12, 34)
<Clock object st 0x102807b20 >
```

Para crear una representación más útil, puedes definir un [`__repr__`][repr-method] como [método especial][dunder-methods] en la `class`.

Idealmente, ese método `__repr__` devuelve código Python válido que se puede usar para recrear el objeto cuando se pasa a [`eval()`][eval-built-in], como se describe en la [especificación de un método `__repr__`][repr-docs].
Devolver código Python válido permite que otro desarrollador copie y pegue el `str` directamente en el código o en el REPL.
Un `Clock` que represente las 11:30 AM podría verse así:

```python
 `Clock(11, 30)`
```

Definir un método `__repr__` es una buena práctica para todas las clases personalizadas.
Algunas cosas adicionales que conviene tener en cuenta:

- La información que devuelve este método debe ser útil al depurar problemas.
- _Idealmente_, el método devuelve un string que es código Python válido, aunque no siempre sea posible.
- Si no es práctico devolver código Python válido, la convención es devolver una descripción entre paréntesis angulares: `< ...a practical description... >`.


### Conversión a string

Además del método `__repr__`, también podría ser necesario tener una representación en string alternativa y «legible para humanos» de la `class`.
Esto se puede usar para formatear el objeto para la salida de un programa o para la documentación.
Esto se logra escribiendo un [`__str__`][str-dunder] como método especial.
Veamos de nuevo `datetime.datetime`:


```python
>>> str(datetime.datetime(2022, 5, 4))
'2022-05-04 00:00:00'
```

Cuando se le pide a un objeto `datetime` que se convierta a una representación en string, devuelve un `str` formateado según el [estándar ISO 8601][ISO 8601], que la mayoría de las bibliotecas de fechas pueden interpretar como una fecha y hora legibles para humanos.

En este ejercicio tendrás la oportunidad de escribir un método `__str__` para tu Clock, además de un método `__repr__`.

```python
>>> str(Clock(11, 30))
'11:30'
```

Para admitir esta conversión a string, tendrás que crear un método especial `__str__` en tu `class` que devuelva un string más «legible para humanos» que muestre la hora del Clock.

Si no creas un método `__str__` y llamas a `str()` en tu clase, Python intentará llamar a `__repr__` en tu clase como respaldo.
Así que si solo implementas uno de estos dos métodos especiales, es mejor crear un `__repr__` en lugar de solo un `__str__`.


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
