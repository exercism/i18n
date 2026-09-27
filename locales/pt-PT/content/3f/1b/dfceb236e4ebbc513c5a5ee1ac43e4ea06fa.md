# Sobre

## Pares

Um [`Pair`][pair] é simplesmente dois itens unidos entre si.
A esses itens dá-se depois o nome imaginativo de `first` e `second`.

Podes criá-los com o operador `=>` ou com o construtor `Pair()`.

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

## Dicionários

Um `Vector` de pares é como qualquer outro array: ordenado, com um tipo homogéneo e guardado de forma consecutiva na memória.

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

Um [`Dict`][dict] é superficialmente parecido, mas o armazenamento está agora implementado de uma forma que permite uma consulta rápida pela chave, conhecida como «tabela de hash», mesmo quando o número de entradas se torna grande.

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

Noutras linguagens, algo muito semelhante a um `Dict` pode chamar-se dictionary (Python), Hash (Ruby) ou HashMap (Java).

Nos pares, quer estejam isolados quer estejam num Vector, há poucas restrições quanto ao tipo de cada um dos seus elementos.

Para ser válido num `Dict`, o `Pair` tem de ser um par `key => value`, em que a `key` permite calcular um hash.
Mais importante ainda, isso significa que a `key` tem de ser _imutável_, por isso `Char`, `Int`, `String`, `Symbol` e `Tuple` servem todos, mas `Vector` não é permitido.

Se precisares mesmo de chaves mutáveis, existe um tipo separado mas muito menos comum, o [`IdDict`][iddict], que o permite.
Consulta o [manual][dict] para conheceres várias outras variantes do tipo `Dict`.

### Modificar um Dict

É possível acrescentar entradas, com uma chave nova, ou substituí-las, com uma chave já existente.

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

Para remover uma entrada, usa a função `delete!()`, que altera o Dict se a chave existir e, caso contrário, não faz nada silenciosamente.

```julia-repl
julia> delete!(pd, 'd')
Dict{Char, Int64} with 3 entries:
  'a' => 42
  'c' => 3
  'b' => 2
```

### Verificar se existe uma chave ou um valor

Há várias formas de o fazer.
Para verificar uma chave, existe a função `haskey()`:

```julia-repl
julia> haskey(pd, 'b')
true
```

Em alternativa, procura nas chaves ou nos valores:

```julia-repl
julia> 'b' in keys(pd)
true

julia> 43 in values(pd)
false

julia> 42 ∈ values(pd)
true
```

Isto mantém-se eficiente mesmo com muitos elementos, porque as funções `keys()` e `values()` devolvem, cada uma, um iterador com um algoritmo de pesquisa rápido.


[pair]: https://docs.julialang.org/en/v1/base/collections/#Core.Pair
[dict]: https://docs.julialang.org/en/v1/base/collections/#Dictionaries
[iddict]: https://docs.julialang.org/en/v1/base/collections/#Base.IdDict
