# Acerca de

## Pairs

Un [`Pair`][pair] son simplemente dos elementos unidos entre sí.
Luego, con bastante imaginación, a esos dos elementos se les llama `first` y `second`.

Puedes crearlos con el operador `=>` o con el constructor `Pair()`.

```julia-repl
julia> p1 = "k" => 2
"k" => 2

julia> p2 = Pair("k", 2)
"k" => 2

# Both forms of syntax give the same result
julia> p1 == p2
true

# Each component has its own separate type
julia> dump(p1)
Pair{String, Int64}
  first: String "k"
  second: Int64 2

# Get a component using dot syntax
julia> p1.first
"k"

julia> p1.second
2
```

## Dicts

Un `Vector` de Pairs es como cualquier otro array: ordenado, homogéneo en su tipo y almacenado de forma consecutiva en memoria.

```julia-repl
julia> pv = ['a' => 1, 'b' => 2, 'c' => 3]
3-element Vector{Pair{Char, Int64}}:
 'a' => 1
 'b' => 2
 'c' => 3

# Each pair is a single entry
julia> length(pv)
3
```

Un [`Dict`][dict] es superficialmente similar, pero ahora el almacenamiento se implementa de una forma que permite una recuperación rápida por clave, conocida como «tabla hash», incluso cuando el número de entradas crece mucho.

```julia-repl
julia> pd = Dict('a' => 1, 'b' => 2, 'c' => 3)  # or Dict(pv) gives same result
Dict{Char, Int64} with 3 entries:
  'a' => 1
  'c' => 3
  'b' => 2

julia> pd['b']
2

# Key must exist
julia> pd['d']
ERROR: KeyError: key 'd' not found

# Generators are accepted in the constructor (and note the unordered output)
julia> Dict(x => x^2 for x in 1:5)
Dict{Int64, Int64} with 5 entries:
  5 => 25
  4 => 16
  2 => 4
  3 => 9
  1 => 1

julia> Dict(x => 1 / x for x in 1:5)
Dict{Int64, Float64} with 5 entries:
  5 => 0.2
  4 => 0.25
  2 => 0.5
  3 => 0.333333
  1 => 1.0
  ```

En otros lenguajes, algo muy parecido a un `Dict` puede llamarse dictionary (Python), Hash (Ruby) o HashMap (Java).

En el caso de los Pairs, ya sea por separado o dentro de un Vector, hay pocas restricciones sobre el tipo de cada componente.

Para ser válido dentro de un `Dict`, el `Pair` debe ser un par `key => value`, donde la `key` sea «hashable».
Y lo más importante: esto significa que la `key` debe ser _inmutable_, así que `Char`, `Int`, `String`, `Symbol` y `Tuple` están bien, pero `Vector` no está permitido.

Si las claves mutables son importantes para ti, existe un tipo aparte, mucho menos común, [`IdDict`][iddict], que sí lo permite.
Consulta el [manual][dict] para ver otras variantes del tipo `Dict`.

### Modificar un Dict

Las entradas se pueden agregar, con una clave nueva, o sobrescribir, con una clave existente.

```julia-repl
julia> pd
Dict{Char, Int64} with 3 entries:
  'a' => 1
  'c' => 3
  'b' => 2

# Add
julia> pd['d'] = 4
4

# Overwrite
julia> pd['a'] = 42
42

julia> pd
Dict{Char, Int64} with 4 entries:
  'a' => 42
  'c' => 3
  'd' => 4
  'b' => 2
```

Para eliminar una entrada, usa la función `delete!()`, que cambiará el Dict si la clave existe y, si no, no hará nada de forma silenciosa.

```julia-repl
julia> delete!(pd, 'd')
Dict{Char, Int64} with 3 entries:
  'a' => 42
  'c' => 3
  'b' => 2
```

### Comprobar si existe una clave o un valor

Hay distintas formas de hacerlo.
Para comprobar una clave, existe la función `haskey()`:

```julia-repl
julia> haskey(pd, 'b')
true
```

Otra opción es buscar en las claves o en los valores:

```julia-repl
julia> 'b' in keys(pd)
true

julia> 43 in values(pd)
false

julia> 42 ∈ values(pd)
true
```

Esto sigue siendo eficiente a gran escala, ya que las funciones `keys()` y `values()` devuelven un iterador con un algoritmo de búsqueda rápido.


[pair]: https://docs.julialang.org/en/v1/base/collections/#Core.Pair
[dict]: https://docs.julialang.org/en/v1/base/collections/#Dictionaries
[iddict]: https://docs.julialang.org/en/v1/base/collections/#Base.IdDict
