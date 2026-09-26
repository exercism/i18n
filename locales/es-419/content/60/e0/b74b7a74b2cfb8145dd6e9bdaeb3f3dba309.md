# Anexo a las instrucciones

## Mensajes de excepción

A veces es necesario [lanzar una excepción](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). Cuando lo hagas, siempre debes incluir un **mensaje de error significativo** que indique cuál es el origen del error. Esto hace que tu código sea más legible y ayuda mucho a la hora de depurar. Para las situaciones en las que sabes que el origen del error será de un tipo determinado, puedes optar por lanzar uno de los [tipos de error integrados](https://docs.python.org/3/library/exceptions.html#base-classes), pero aun así debes incluir un mensaje significativo.

Este ejercicio en particular requiere que uses la [sentencia `raise`](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) para «lanzar» un `ValueError` cuando la función `prime()` recibe un argumento mal formado. Como este ejercicio solo trabaja con números _positivos_, cualquier número < 1 está mal formado. Las pruebas solo pasarán si haces `raise` de la `exception` y además incluyes un mensaje con ella.

Para lanzar un `ValueError` con un mensaje, escribe el mensaje como argumento del tipo `exception`:

```python
# when the prime function receives malformed input
raise ValueError('there is no zeroth prime')
```
