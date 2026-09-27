# Introducción

## Expresiones regulares

Las expresiones regulares (regex) son una herramienta poderosa para trabajar con strings en Elixir. Las expresiones regulares en Elixir siguen la especificación **PCRE** (**P**erl **C**ompatible **R**egular **E**xpressions). Los patrones de string que representan el significado de la expresión regular se compilan primero y luego se usan para coincidir con todo o parte de un string.

En Elixir, la forma más común de crear expresiones regulares es usando el sigilo `~r`. Los sigilos proporcionan atajos de _azúcar sintáctico_ para tareas comunes en Elixir. Para coincidir con un _string literal_, podemos usar el propio string como patrón después del sigilo.

```elixir
~r/test/
```

El operador `=~/2` es útil para realizar una coincidencia de regex en un string y devolver un resultado `boolean`.

```elixir
"this is a test" =~ ~r/test/
# => true
```

Dos notas sobre el uso de sigilos:

- se pueden usar muchos delimitadores diferentes según tus necesidades en lugar de `/`
- los patrones de string ya están _escapados_; cuando escribas el patrón como un string sin usar una regex, tendrás que _escapar_ las barras invertidas (`\`)

### Clases de caracteres

Coincidir con un rango de caracteres usando corchetes `[]` define una _clase de caracteres_. Esta coincidirá con cualquier carácter individual de los caracteres de la clase. También puedes especificar un rango de caracteres como `a-z`, siempre que el inicio y el final representen un rango contiguo de puntos de código.

```elixir
regex = ~r/[a-z][ADKZ][0-9][!?]/
"jZ5!" =~ regex
# => true
"jB5?" =~ regex
# => false
```

_Las clases de caracteres abreviadas_ hacen que el patrón sea más conciso. Por ejemplo:

- `\d` es la abreviatura de `[0-9]` (cualquier dígito)
- `\w` es la abreviatura de `[A-Za-z0-9_]` (cualquier carácter de palabra)
- `\s` es la abreviatura de `[ \t\r\n\f]` (cualquier carácter de espacio en blanco)

Cuando se usa una _clase de caracteres abreviada_ fuera de un sigilo, debe escaparse: `"\\d"`

### Alternancias

_Las alternancias_ usan `|` como carácter especial para indicar la coincidencia con uno _u_ otro

```elixir
regex = ~r/cat|bat/
"bat" =~ regex
# => true
"cat" =~ regex
# => true
```

### Cuantificadores

_Los cuantificadores_ permiten un patrón repetitivo en la regex. Afectan al grupo que precede al cuantificador.

- `{N, M}` donde `N` es el número mínimo de repeticiones y `M` es el máximo
- `{N,}` coincide con `N` o más repeticiones
  - `{0,}` también puede escribirse como `*`: coincide con cero o más repeticiones
  - `{1,}` también puede escribirse como `+`: coincide con una o más repeticiones
- `{,N}` coincide con hasta `N` repeticiones

### Grupos

Los paréntesis `()` se usan para denotar _grupos_ y _capturas_. El grupo también puede ser _capturado_ en algunos casos para ser devuelto y usado. En Elixir, estos pueden tener nombre o no. Las capturas se nombran añadiendo `?<name>` después del paréntesis de apertura. Los grupos funcionan como una sola unidad, como cuando van seguidos de _cuantificadores_.

```elixir
regex = ~r/(h)at/
Regex.replace(regex, "hat", "\\1op")
# => "hop"

regex = ~r/(?<letter_b>b)/
Regex.scan(regex, "blueberry", capture: :all_names)
# => [["b"], ["b"]]
```

### Anclas

_Las anclas_ se usan para vincular la expresión regular al principio o al final del string que se va a comparar:

- `^` ancla al principio del string
- `$` ancla al final del string

### Interpolación

Dado que `~r` es un atajo para `"pattern" |> Regex.escape() |> Regex.compile!()`, también puedes usar la interpolación de strings para construir dinámicamente un patrón de expresión regular:

```elixir
anchor = "$"
regex = ~r/end of the line#{anchor}/
"end of the line?" =~ regex
# => false
"end of the line" =~ regex
# => true
```
