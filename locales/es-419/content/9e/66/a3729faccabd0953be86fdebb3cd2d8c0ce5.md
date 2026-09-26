# Acerca de

- Elixir tiene tipado dinámico.
  - El tipo de una variable solo se verifica en tiempo de ejecución.
- Usando el operador de coincidencia [`=`][match], podemos vincular un valor de cualquier tipo a un nombre de variable:
  - Es posible volver a vincular variables.
  - Una variable puede tener vinculado un valor de cualquier tipo.

## Módulos

- Los [módulos][modules] son la base de la organización del código en Elixir.
  - Un módulo es visible para todos los demás módulos.
  - Un módulo se define con [`defmodule`][defmodule].

## Funciones con nombre

- Todas las [funciones con nombre][functions] deben definirse en un módulo.

  - Las funciones con nombre se definen con [`def`][def].
  - Una función con nombre puede hacerse privada usando [`defp`][defp] en su lugar.
  - El valor de la última expresión de una función se _devuelve de forma implícita_.
  - Las funciones cortas también pueden escribirse con una sintaxis de una sola línea.

  ```elixir
  def increment(n) do
    n + 1
  end

  defp private_increment(n) do
    n + 1
  end

  def short_increment(n), do: n + 1
  ```

- Las funciones se invocan usando el nombre completo de la función junto con el nombre del módulo.
  - Si se invocan desde su propio módulo, se puede omitir el nombre del módulo.
- La aridad de una función se usa a menudo al referirse a una función con nombre.

  - La aridad se refiere al número de argumentos que acepta.

  ```elixir
  # add/3, because the arity is 3
  def add(x, y, z), do: x + y + z
  ```

## Convenciones de nombres

Los nombres de los módulos deben usar `PascalCase`. Un nombre de módulo debe comenzar con una letra mayúscula `A-Z` y puede contener letras `a-zA-Z`, números `0-9` y guiones bajos `_`.

Los nombres de variables y funciones deben usar `snake_case`. Un nombre de variable o función debe comenzar con una letra minúscula `a-z` o un guion bajo `_`, puede contener letras `a-zA-Z`, números `0-9` y guiones bajos `_`, y puede terminar con un signo de interrogación `?` o un signo de exclamación `!`.

## Enteros

Los valores enteros son números completos escritos con uno o más dígitos. Puedes realizar [operaciones matemáticas básicas][operators] con ellos.

## Strings

Los literales de [String][string] son secuencias de caracteres rodeadas de comillas dobles.

```elixir
string = "this is a string! 1, 2, 3!"
```

## Biblioteca estándar

- La documentación está disponible en línea en [hexdocs.pm/elixir][docs].
- La mayoría de los tipos de datos integrados tienen un módulo correspondiente, por ejemplo `Integer`, `Float`, `String`, `Tuple`, `List`.
- El módulo `Kernel` es un módulo especial.
  - Proporciona las capacidades básicas sobre las que se construye el resto de la biblioteca estándar.
  - Se importa automáticamente.
  - Sus funciones pueden usarse sin el prefijo `Kernel.`.

## Comentarios en el código

Los comentarios pueden usarse para dejar notas a otros desarrolladores que lean el código fuente. Los comentarios de una sola línea en Elixir van precedidos por `#`.

[match]: https://elixirschool.com/en/lessons/basics/pattern_matching/
[operators]: https://hexdocs.pm/elixir/basic-types.html#basic-arithmetic
[modules]: https://elixirschool.com/en/lessons/basics/modules/#modules
[functions]: https://elixirschool.com/en/lessons/basics/functions/#named-functions
[def]: https://hexdocs.pm/elixir/Kernel.html#def/2
[defp]: https://hexdocs.pm/elixir/Kernel.html#defp/2
[defmodule]: https://hexdocs.pm/elixir/Kernel.html#defmodule/2
[string]: https://hexdocs.pm/elixir/basic-types.html#strings
[docs]: https://hexdocs.pm/elixir/Kernel.html#content
