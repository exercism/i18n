# Anexo de instrucciones

## Descripción del DSL

Un grafo, en este DSL, es un objeto de tipo `Graph`. Este recibe una `list` de una
o más tuplas que describen:

+ atributos
+ `Nodes`
+ `Edges`

Las implementaciones de un `Node` y una `Edge` se proporcionan en `dot_dsl.py`.

Para más detalles sobre el diseño esperado del DSL y los tipos de error y mensajes esperados, revisa los casos de prueba en `dot_dsl_test.py`


## Mensajes de excepción

A veces es necesario [lanzar una excepción](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). Cuando lo hagas, siempre debes incluir un **mensaje de error significativo** que indique cuál es el origen del error. Esto hace que tu código sea más legible y ayuda mucho con el debug. En situaciones en las que sabes que el origen del error será de cierto tipo, puedes elegir lanzar uno de los [tipos de error integrados](https://docs.python.org/3/library/exceptions.html#base-classes), pero aun así debes incluir un mensaje significativo.

Este ejercicio en particular requiere que uses la [sentencia raise](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) para «lanzar» un `TypeError` cuando un `Graph` está mal formado, y un `ValueError` cuando un `Edge`, un `Node` o un `attribute` está mal formado. Las pruebas solo pasarán si tanto haces `raise` de la `exception` como incluyes un mensaje con ella.

Para lanzar un error con un mensaje, escribe el mensaje como argumento del tipo `exception`:

```python
# Graph is malformed
raise TypeError("Graph data malformed")

# Edge has incorrect values
raise ValueError("EDGE malformed")
```
