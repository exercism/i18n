# Introducción

## Expresiones regulares

Las expresiones regulares (regex) son una herramienta poderosa para trabajar con strings en Elixir. Las expresiones regulares en Elixir siguen la especificación **PCRE** (**P**erl **C**ompatible **R**egular **E**xpressions). Los patrones de string que representan el significado de la expresión regular se compilan primero y después se usan para hacer coincidir todo o parte de un string.

En Elixir, la forma más común de crear expresiones regulares es usar el sigilo `~r`. Los sigilos ofrecen atajos de _azúcar sintáctico_ para tareas comunes en Elixir. Para hacer coincidir un _literal de string_, podemos usar el propio string como patrón después del sigilo.

```elixir
~r/test/
```

El operador `=~/2` es útil para hacer una coincidencia de regex en un string y devolver un resultado `boolean`.

```elixir
"this is a test" =~ ~r/test/
# => true
```

Dos notas sobre el uso de los sigilos:

- puedes usar muchos delimitadores distintos según lo que necesites, en lugar de `/`
- los patrones de string ya están _escapados_; cuando escribes el patrón como string sin usar una regex, tendrás que _escapar_ las barras invertidas (`\`)

### Clases de caracteres

Hacer coincidir un rango de caracteres usando corchetes `[]` define una _clase de caracteres_. Esto hace que cualquier carácter individual coincida con los caracteres de la clase. También puedes especificar un rango de caracteres como `a-z`, siempre que el inicio y el final representen un rango contiguo de puntos de código.

```elixir
regex = ~r/[a-z][ADKZ][0-9][!?]/
"jZ5!" =~ regex
# => true
"jB5?" =~ regex
# => false
```

Las _clases de caracteres abreviadas_ hacen que el patrón sea más conciso. Por ejemplo:

- `\d` es la forma corta de `[0-9]` (cualquier dígito)
- `\w` es la forma corta de `[A-Za-z0-9_]` (cualquier carácter de «palabra»)
- `\s` es la forma corta de `[ \t\r\n\f]` (cualquier carácter de espacio en blanco)

Cuando usas una _clase de caracteres abreviada_ fuera de un sigilo, debes escaparla: `"\\d"`

### Alternancias

Las _alternancias_ usan `|` como carácter especial para indicar que coincide con uno _o_ con otro

```elixir
regex = ~r/cat|bat/
"bat" =~ regex
# => true
"cat" =~ regex
# => true
```

### Cuantificadores

Los _cuantificadores_ permiten un patrón repetido en la regex. Afectan al grupo que precede al cuantificador.

- `{N, M}`, donde `N` es el número mínimo de repeticiones y `M` es el máximo
- `{N,}` coincide con `N` o más repeticiones
  - `{0,}` también se puede escribir como `*`: coincide con cero o más repeticiones
  - `{1,}` también se puede escribir como `+`: coincide con una o más repeticiones
- `{,N}` coincide con hasta `N` repeticiones

### Grupos

Los paréntesis `()` se usan para indicar _grupos_ y _capturas_. En algunos casos, el grupo también puede _capturarse_ para devolverlo y usarlo. En Elixir, estas pueden tener nombre o no. Las capturas se nombran agregando `?<name>` después del paréntesis de apertura. Los grupos funcionan como una sola unidad, por ejemplo cuando los sigue un _cuantificador_.

```elixir
regex = ~r/(h)at/
Regex.replace(regex, "hat", "\\1op")
# => "hop"

regex = ~r/(?<letter_b>b)/
Regex.scan(regex, "blueberry", capture: :all_names)
# => [["b"], ["b"]]
```

### Anclas

Las _anclas_ se usan para fijar la expresión regular al inicio o al final del string que quieres hacer coincidir:

- `^` se ancla al inicio del string
- `$` se ancla al final del string

### Interpolación

Como `~r` es un atajo para `"pattern" |> Regex.escape() |> Regex.compile!()`, también puedes usar la interpolación de strings para construir dinámicamente un patrón de expresión regular:

```elixir
anchor = "$"
regex = ~r/end of the line#{anchor}/
"end of the line?" =~ regex
# => false
"end of the line" =~ regex
# => true
```
