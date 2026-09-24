# Докладніше

## Пари

[`Pair`][pair] - це просто два елементи, поєднані разом.
Цим двом елементам потім дають вигадливі назви `first` і `second`.

Створімо їх або за допомогою оператора `=>`, або конструктора `Pair()`.

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

## Словники

`Vector` із пар поводиться як будь-який інший масив: він упорядкований, однорідний за типом і зберігається послідовно в памʼяті.

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

[`Dict`][dict] зовні схожий, але тепер його зберігання влаштовано так, що дозволяє швидко діставати значення за ключем, навіть коли кількість записів стає великою. Такий спосіб зберігання відомий як «хеш-таблиця».

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

В інших мовах щось дуже схоже на `Dict` може називатися dictionary (Python), Hash (Ruby) або HashMap (Java).

Для пар, окремо чи в `Vector`, майже немає обмежень на тип кожного компонента.

Щоб бути придатною для `Dict`, пара має бути парою `key => value`, де `key` є «хешованим».
Найважливіше: це означає, що `key` має бути _незмінним_, тож `Char`, `Int`, `String`, `Symbol` і `Tuple` цілком підходять, а `Vector` не можна.

Якщо нам потрібні змінні ключі, є окремий, але значно рідший тип [`IdDict`][iddict], який це дозволяє.
Зазирнімо до [посібника][dict], де описано кілька інших варіантів типу `Dict`.

### Зміна `Dict`

Записи можна додавати з новим ключем або перезаписувати за наявним ключем.

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

Щоб вилучити запис, скористаймося функцією `delete!()`: вона змінить `Dict`, якщо ключ існує, і мовчки нічого не зробить, якщо його немає.

```julia-repl
julia> delete!(pd, 'd')
Dict{Char, Int64} with 3 entries:
  'a' => 42
  'c' => 3
  'b' => 2
```

### Перевірка наявності ключа чи значення

Є різні підходи.
Щоб перевірити ключ, є функція `haskey()`:

```julia-repl
julia> haskey(pd, 'b')
true
```

Або ж пошукати серед ключів чи значень:

```julia-repl
julia> 'b' in keys(pd)
true

julia> 43 in values(pd)
false

julia> 42 ∈ values(pd)
true
```

Це залишається ефективним за будь-яких масштабів, адже функції `keys()` і `values()` повертають ітератор зі швидким алгоритмом пошуку.


[pair]: https://docs.julialang.org/en/v1/base/collections/#Core.Pair
[dict]: https://docs.julialang.org/en/v1/base/collections/#Dictionaries
[iddict]: https://docs.julialang.org/en/v1/base/collections/#Base.IdDict
