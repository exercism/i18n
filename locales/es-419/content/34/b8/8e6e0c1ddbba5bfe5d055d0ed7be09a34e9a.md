# Acerca de

Reducir consiste en aplicar una función de forma repetida a cada elemento de una secuencia e ir acumulando, de alguna manera, los resultados.
La función que se aplica recibe dos parámetros: el valor acumulado actual y el elemento que se va a procesar.
Debe evaluarse al nuevo valor acumulado.

En algunos lenguajes de programación, esto se llama accumulate o fold.

En Common Lisp, este proceso se hace con la función `reduce`.
En su forma más simple, se ve así:

`(reduce #'function-to-apply sequence :initial-value value)`

Fíjate que se proporciona un valor inicial: este será el «valor acumulado actual» que se pasa a la función cuando se procesa el primer elemento.

Aquí tienes un ejemplo que suma los números de la lista, empezando con un valor inicial de 10:

`(reduce #'+ '(1 2 3 4) :initial-value 10) ; => 20`

Nota que si la secuencia está vacía, la función nunca se llama y la forma se evalúa al valor inicial.

## Especificar el valor inicial o no

El argumento `:initial-value` no es obligatorio, y `reduce` actúa de manera distinta según si se proporcionó y si la secuencia tiene elementos.

1. Si no se proporciona el valor inicial y la secuencia tiene más de un elemento, la primera vez que se llama a la función, esta recibe los dos primeros elementos de la secuencia.
2. Si no se proporciona el valor inicial y la secuencia tiene un solo elemento, la forma se evalúa a ese elemento y la función no se llama.
3. Si se proporciona el valor inicial y la secuencia está vacía, la forma se evalúa al valor inicial y la función no se llama.
4. Si no se proporciona el valor inicial y la secuencia está vacía, la función se llama con *cero* argumentos.

El último caso es uno que puede hacer tropezar a más de uno.
Por lo general es fácil proporcionar un valor inicial para que el programa nunca llegue a este caso tan raro.

## Otros argumentos de palabra clave

`reduce` acepta otros argumentos de palabra clave que pueden ser útiles en algunos casos.

* `:start` y `:end`: especifican índices dentro de la secuencia que hacen que reduce trabaje sobre una subsecuencia. Sus valores predeterminados son `0` y `nil`, respectivamente, lo que significa el principio y el final de la secuencia.
* `:from-end`: si este Boolean generalizado se evalúa como verdadero, en lugar de trabajar de izquierda a derecha, la reducción ocurrirá de derecha a izquierda.
* `:key` especifica una función que se llama sobre cada elemento *antes* de que se le pase a la función de reducción. Esta función *no* se aplica al valor especificado como `:initial-value`.

Algunos ejemplos:

```lisp
(reduce #'+ '(1 2 3 4 5 6 7 8 9 10) 
        :start 2 :end 5)               ; => 12 (only adds 3, 4, 5)
(reduce #'cons '(1 2 3))               ; => ((1 . 2) . 3)
(reduce #'cons '(1 2 3) :from-end t)   ; => (1 2 . 3)
(reduce #'+ '((1) (2) (3)) :key #'car) ; => 6
```
