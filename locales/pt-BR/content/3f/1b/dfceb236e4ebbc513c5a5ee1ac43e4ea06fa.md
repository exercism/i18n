# Sobre

## Pairs

Um [`Pair`][pair] nada mais é que dois itens unidos.
Os itens então ganham nomes bastante criativos: `first` e `second`.

Você pode criá-los com o operador `=>` ou com o construtor `Pair()`.

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

Um `Vector` de Pairs é como qualquer outro array: ordenado, homogêneo em tipo e armazenado de forma consecutiva na memória.

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

Um [`Dict`][dict] é superficialmente parecido, mas o armazenamento agora é implementado de um jeito que permite recuperação rápida pela chave, conhecido como "hash table", mesmo quando o número de entradas cresce muito.

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

Em outras linguagens, algo muito parecido com um `Dict` pode ser chamado de dicionário (Python), Hash (Ruby) ou HashMap (Java).

Nos Pairs, seja isoladamente ou dentro de um Vector, há poucas restrições quanto ao tipo de cada elemento.

Para ser válido em um `Dict`, o `Pair` precisa ser um par `key => value`, em que a `key` seja "hashable".
Mais importante ainda: isso significa que a `key` precisa ser _imutável_, então `Char`, `Int`, `String`, `Symbol` e `Tuple` funcionam bem, mas `Vector` não é permitido.

Se chaves mutáveis forem importantes para você, existe um tipo separado, mas bem menos comum, [`IdDict`][iddict], que permite isso.
Consulte o [manual][dict] para conhecer várias outras variantes do tipo `Dict`.

### Modificando um Dict

As entradas podem ser adicionadas, com uma chave nova, ou sobrescritas, com uma chave que já existe.

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

Para remover uma entrada, use a função `delete!()`, que altera o Dict se a chave existir e, caso contrário, não faz nada, em silêncio.

```julia-repl
julia> delete!(pd, 'd')
Dict{Char, Int64} with 3 entries:
  'a' => 42
  'c' => 3
  'b' => 2
```

### Verificar se uma chave ou um valor existe

Há diferentes abordagens.
Para verificar uma chave, existe a função `haskey()`:

```julia-repl
julia> haskey(pd, 'b')
true
```

Como alternativa, procure tanto nas chaves quanto nos valores:

```julia-repl
julia> 'b' in keys(pd)
true

julia> 43 in values(pd)
false

julia> 42 ∈ values(pd)
true
```

Isso continua eficiente mesmo em grande escala, pois as funções `keys()` e `values()` retornam cada uma um iterador com um algoritmo de busca rápido.


[pair]: https://docs.julialang.org/en/v1/base/collections/#Core.Pair
[dict]: https://docs.julialang.org/en/v1/base/collections/#Dictionaries
[iddict]: https://docs.julialang.org/en/v1/base/collections/#Base.IdDict
