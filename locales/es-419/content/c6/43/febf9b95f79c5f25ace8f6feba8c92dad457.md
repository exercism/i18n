# Anexo de instrucciones

## Notas de implementación

El programa de prueba crea árboles aplicando repetidamente la función variádica `New`.
Por ejemplo, la sentencia

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

Puedes suponer que no habrá valores duplicados en los árboles de prueba.

El programa de prueba usará los métodos `Value` y `Children` para deconstruir los árboles.

La construcción y deconstrucción básica del árbol debe funcionar antes de que empieces con la parte interesante del ejercicio, así que se prueba por separado en las primeras tres pruebas.

---

Los métodos `FromPov` y `PathTo` son la parte interesante del ejercicio.

El método `FromPov` recibe un argumento `from` de tipo string que especifica un nodo del árbol por su valor.
Debe devolver un árbol con el valor `from` en la raíz.
Puedes modificar el árbol original y devolverlo, o crear un árbol nuevo y devolver ese.
Si devuelves un árbol nuevo, tienes libertad de consumir o destruir el árbol original.
Por supuesto, es mejor dejarlo sin modificar.

El método `PathTo` recibe dos argumentos `from` y `to` de tipo string que especifican dos nodos del árbol por sus valores.
Debe devolver el camino más corto en el árbol desde el primer nodo hasta el segundo.
