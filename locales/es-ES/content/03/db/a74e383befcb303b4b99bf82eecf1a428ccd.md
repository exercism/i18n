# Introducción

Al [usar la recursión][exercism-recursion] con enumerables (arrays, bitstrings, strings), a menudo hay dos aspectos que tener en cuenta:

- cuánta memoria se necesita para almacenar el rastro de las llamadas recursivas
- cómo construir la solución de forma eficiente

Para hacer frente a estos aspectos se puede usar un _acumulador_.

Un acumulador es una variable que se pasa junto con los datos. Se usa para pasar el estado actual de la ejecución de la función, de una llamada a otra, hasta llegar al _caso base_. En el caso base, el acumulador se usa para devolver el valor final de la llamada a la función recursiva.

Los acumuladores debe inicializarlos quien escribe la función, no quien la usa. Para lograrlo, declara dos funciones: una función pública que recibe solo los datos necesarios como argumentos y que inicializa el acumulador, y una función privada que recibe también un acumulador. En Elixir, es un patrón habitual anteponer `do_` al nombre de la función privada.

```elixir
# Count the length of a list without an accumulator
def count([]), do: 0
def count([_head | tail]), do: 1 + count(tail)

# Count the length of a list with an accumulator
def count(list), do: do_count(list, 0)

defp do_count([], count), do: count
defp do_count([_head | tail], count), do: do_count(tail, count + 1)
```

El uso de un acumulador nos permite convertir funciones recursivas en funciones _recursivas de cola_. Una función es recursiva de cola si lo _último_ que se ejecuta en ella es una llamada a sí misma.

[exercism-recursion]: https://exercism.org/tracks/elixir/concepts/recursion
