# Anexo de instrucciones

## Mensajes de excepción

A veces es necesario [lanzar una excepción](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). Cuando lo hagas, deberías incluir siempre un **mensaje de error significativo** que indique cuál es el origen del error. Esto hace que tu código sea más legible y facilita mucho la depuración. En los casos en los que sepas que el origen del error va a ser de un tipo concreto, puedes optar por lanzar uno de los [tipos de error integrados](https://docs.python.org/3/library/exceptions.html#base-classes), pero aun así deberías incluir un mensaje significativo.

Este ejercicio en concreto requiere que uses la [instrucción raise](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) para «lanzar» un `ValueError` cuando la función `prime()` reciba una entrada mal formada. Como este ejercicio solo trabaja con números _positivos_, cualquier número < 1 está mal formado. Las pruebas solo pasarán si lanzas la `exception` mediante `raise` y, además, incluyes un mensaje con ella.

Para lanzar un `ValueError` con un mensaje, escribe el mensaje como argumento del tipo `exception`:

```python
# when the prime function receives malformed input
raise ValueError('there is no zeroth prime')
```
