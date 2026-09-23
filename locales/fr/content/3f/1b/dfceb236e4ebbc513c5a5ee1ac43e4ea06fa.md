# À propos

## Pairs

Un [`Pair`][pair] n'est rien de plus que deux éléments réunis.
Ces deux éléments portent alors les noms, pleins d'imagination, de `first` et `second`.

On peut les créer avec l'opérateur `=>` ou avec le constructeur `Pair()`.

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

Un `Vector` de Pairs ressemble à n'importe quel autre tableau : il est ordonné, homogène en type et stocké de manière contiguë en mémoire.

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

Un [`Dict`][dict] y ressemble superficiellement, mais le stockage est cette fois implémenté de manière à permettre une récupération rapide par clé, ce qu'on appelle une « table de hachage », même quand le nombre d'entrées devient important.

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

Dans d'autres langages, une structure très proche d'un `Dict` peut s'appeler un dictionnaire (Python), un Hash (Ruby) ou un HashMap (Java).

Pour les Pairs, qu'ils soient isolés ou dans un Vector, il y a peu de contraintes sur le type de chaque composant.

Pour être valide dans un `Dict`, le `Pair` doit être une paire `key => value`, dont la `key` est « hachable ».
Surtout, cela signifie que la `key` doit être _immutable_ : `Char`, `Int`, `String`, `Symbol` et `Tuple` font donc très bien l'affaire, mais `Vector` n'est pas autorisé.

Si les clés mutables te tiennent à cœur, il existe un type [`IdDict`][iddict] distinct, mais beaucoup plus rare, qui le permet.
Consulte le [manuel][dict] pour découvrir plusieurs autres variantes du type `Dict`.

### Modifier un Dict

On peut ajouter des entrées, avec une nouvelle clé, ou les écraser, avec une clé existante.

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

Pour supprimer une entrée, utilise la fonction `delete!()`, qui modifiera le Dict si la clé existe et ne fera silencieusement rien dans le cas contraire.

```julia-repl
julia> delete!(pd, 'd')
Dict{Char, Int64} with 3 entries:
  'a' => 42
  'c' => 3
  'b' => 2
```

### Vérifier si une clé ou une valeur existe

Il existe plusieurs approches.
Pour vérifier une clé, on dispose de la fonction `haskey()` :

```julia-repl
julia> haskey(pd, 'b')
true
```

Autrement, on peut chercher parmi les clés ou parmi les valeurs :

```julia-repl
julia> 'b' in keys(pd)
true

julia> 43 in values(pd)
false

julia> 42 ∈ values(pd)
true
```

Cela reste efficace même à grande échelle, car les fonctions `keys()` et `values()` renvoient chacune un itérateur doté d'un algorithme de recherche rapide.


[pair]: https://docs.julialang.org/en/v1/base/collections/#Core.Pair
[dict]: https://docs.julialang.org/en/v1/base/collections/#Dictionaries
[iddict]: https://docs.julialang.org/en/v1/base/collections/#Base.IdDict
