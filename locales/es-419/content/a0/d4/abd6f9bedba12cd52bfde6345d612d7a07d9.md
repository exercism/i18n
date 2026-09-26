# Anexo a las instrucciones

## Mensajes de excepción

A veces es necesario [lanzar una excepción](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). Cuando lo hagas, siempre debes incluir un **mensaje de error significativo** que indique cuál es el origen del error. Esto hace que tu código sea más legible y ayuda mucho con la depuración. En los casos en los que sabes que el origen del error será de un tipo determinado, puedes optar por lanzar uno de los [tipos de error integrados](https://docs.python.org/3/library/exceptions.html#base-classes), pero aun así debes incluir un mensaje significativo.

Este ejercicio en particular requiere que uses la [sentencia raise](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) para «lanzar» un `ValueError` cuando la casilla de entrada esté fuera de rango. Las pruebas solo pasarán si haces `raise` de la `exception` y además incluyes un mensaje con ella.

Para lanzar un `ValueError` con un mensaje, escribe el mensaje como argumento del tipo `exception`:

```python
# when the square value is not in the acceptable range        
raise ValueError("square must be between 1 and 64")
```
