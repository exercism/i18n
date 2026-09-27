# Anexo a las instrucciones

## Notas de implementación

El programa de test crea árboles mediante la aplicación repetida de la función variádica `New`.
Por ejemplo, la instrucción

```go
tree := New("a",New("b"),New("c",New("d")))
```

construye el siguiente árbol:

```text
      "a"
       |
    -------
    |     |
   "b"   "c"
          |
         "d"
```

Puedes asumir que no habrá valores duplicados en los árboles de test.

El programa de test usará los métodos `Value` y `Children` para deconstruir árboles.

La construcción y la deconstrucción básicas del árbol deben funcionar antes de que empieces con la parte interesante del ejercicio, así que se comprueban por separado en los tres primeros tests.

---

Los métodos `FromPov` y `PathTo` son la parte interesante del ejercicio.

El método `FromPov` recibe un argumento de tipo string, `from`, que especifica un nodo del árbol mediante su valor.
Debe devolver un árbol con el valor `from` en la raíz.
Puedes modificar el árbol original y devolverlo, o crear un árbol nuevo y devolver ese.
Si devuelves un árbol nuevo, eres libre de consumir o destruir el árbol original.
Por supuesto, es mejor dejarlo sin modificar.

El método `PathTo` recibe dos argumentos de tipo string, `from` y `to`, que especifican dos nodos del árbol mediante sus valores.
Debe devolver el camino más corto en el árbol desde el primer nodo hasta el segundo.
