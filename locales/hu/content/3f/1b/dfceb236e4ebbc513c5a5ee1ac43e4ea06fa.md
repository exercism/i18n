# Névjegy

## Párok

A [`Pair`][pair] mindössze két összekapcsolt elem.
A két elemet aztán találóan `first` és `second` néven emlegetjük.

Létrehozhatod őket a `=>` operátorral vagy a `Pair()` konstruktorral.

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

## Szótárak

A párok `Vector`-ja olyan, mint bármely más tömb: rendezett, azonos típusú elemekből áll, és a memóriában egymás után tárolódik.

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

A [`Dict`][dict] felületesen hasonló, de a tárolás most olyan módon valósul meg, hogy lehetővé teszi a kulcs alapján történő gyors visszakeresést, amit „hash-táblának” neveznek, még akkor is, ha a bejegyzések száma jelentősen megnő.

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

Más nyelvekben a `Dict`-hez nagyon hasonló dolog neve lehet szótár (Python), Hash (Ruby) vagy HashMap (Java).

A párok esetében, akár önmagukban, akár egy `Vector`-ban vannak, kevés megkötés vonatkozik az egyes komponensek típusára.

Ahhoz, hogy egy `Pair` érvényes legyen egy `Dict`-ben, `key => value` párnak kell lennie, ahol a `key` „hash-elhető”.
A legfontosabb, hogy a `key`-nek _megváltoztathatatlannak_ kell lennie, így a `Char`, `Int`, `String`, `Symbol` és `Tuple` mind rendben van, a `Vector` viszont nem megengedett.

Ha fontosak számodra a módosítható kulcsok, van egy külön, de sokkal ritkább [`IdDict`][iddict] típus, amely ezt lehetővé teszi.
A `Dict` típus számos más változatáért lásd a [kézikönyvet][dict].

### A `Dict` módosítása

A bejegyzések hozzáadhatók új kulccsal, vagy felülírhatók meglévő kulccsal.

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

Egy bejegyzés eltávolításához használd a `delete!()` függvényt, amely módosítja a Dictet, ha a kulcs létezik, ellenkező esetben pedig csendben semmit sem tesz.

```julia-repl
julia> delete!(pd, 'd')
Dict{Char, Int64} with 3 entries:
  'a' => 42
  'c' => 3
  'b' => 2
```

### Kulcs vagy érték létezésének ellenőrzése

Többféle megközelítés létezik.
Egy kulcs ellenőrzésére ott van a `haskey()` függvény:

```julia-repl
julia> haskey(pd, 'b')
true
```

Alternatívaként kereshetsz a kulcsok vagy az értékek között:

```julia-repl
julia> 'b' in keys(pd)
true

julia> 43 in values(pd)
false

julia> 42 ∈ values(pd)
true
```

Ez nagy méreteknél is hatékony marad, mivel a `keys()` és a `values()` függvény egy-egy gyors keresési algoritmusú iterátort ad vissza.

[pair]: https://docs.julialang.org/en/v1/base/collections/#Core.Pair
[dict]: https://docs.julialang.org/en/v1/base/collections/#Dictionaries
[iddict]: https://docs.julialang.org/en/v1/base/collections/#Base.IdDict
