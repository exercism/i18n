# Anexo de instrucciones

## Instrucciones de Arturo

Para este ejercicio, necesitarás admitir dos formas distintas de llamar a la palabra `stringify`:

1. Con el atributo `roman` (por ejemplo, `stringify.roman 3999`)
2. Sin el atributo `roman` (por ejemplo, `stringify 3999`)

Para más información, consulta la documentación de [atributos][attributes] y también la de [`attr`][attr].

~~~~exercism/caution
Además de `attr`, la función `attrs` es útil: devuelve todos los atributos de la llamada a la función como un diccionario.

¡Ojo: estas dos funciones son destructivas!

La implementación de Arturo usa una [«tabla de atributos»][createAttrsStack].

* `attrs` [vacía la tabla explícitamente][getAttrsDict] después de obtener los atributos.
* `attr` [elimina («saca») el atributo de la tabla][builtinAttr].

Un ejemplo:

```arturo
showAttributes: function [x][
    print attr 'question
    print attrs
    print attrs
]

showAttributes .question:"6 * 9" .answer:42 'arg
```
produce
```
6 * 9
[answer:42]
[]
```

En cada paso, vemos cómo se encoge el diccionario de atributos.

**Conclusión**: ten en cuenta que solo puedes obtener los atributos una vez.
Si necesitas volver a consultar los atributos, captúralos al inicio de tus funciones.

[getAttrsDict]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L187
[builtinAttr]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/library/Reflection.nim#L85
[createAttrsStack]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L136
~~~~

[attributes]: https://arturo-lang.io/documentation/language/#attributes
[attr]: https://arturo-lang.io/documentation/library/reflection/attr/
