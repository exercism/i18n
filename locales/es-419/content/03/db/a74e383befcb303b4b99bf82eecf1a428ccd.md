# Introducción

Cuando haces [recursión][exercism-recursion] sobre enumerables (listas, bitstrings, strings), a menudo hay dos cosas que tener en cuenta:

- cuánta memoria se necesita para almacenar el rastro de llamadas a funciones recursivas
- cómo construir la solución de forma eficiente

Para ocuparte de estas cosas puedes usar un _acumulador_.

Un acumulador es una variable que se pasa además de los datos. Se usa para ir pasando el estado actual de la ejecución de la función, de llamada en llamada, hasta llegar al _caso base_. En el caso base, el acumulador se usa para devolver el valor final de la llamada recursiva.

Los acumuladores los debe inicializar quien escribe la función, no quien la usa. Para lograrlo, declara dos funciones: una función pública que recibe solo los datos necesarios como argumentos y que inicializa el acumulador, y una función privada que también recibe un acumulador. En Elixir, es un patrón común que el nombre de la función privada empiece con `do_`.

```elixir
# Count the length of a list without an accumulator
def count([]), do: 0
def count([_head | tail]), do: 1 + count(tail)

# Count the length of a list with an accumulator
def count(list), do: do_count(list, 0)

defp do_count([], count), do: count
defp do_count([_head | tail], count), do: do_count(tail, count + 1)
```

Usar un acumulador nos permite convertir funciones recursivas en funciones _recursivas de cola_. Una función es recursiva de cola si lo _último_ que ejecuta es una llamada a sí misma.

[exercism-recursion]: https://exercism.org/tracks/elixir/concepts/recursion
