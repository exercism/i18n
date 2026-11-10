# Докладніше

У концепті [`Types`][types] ми дізналися, що:

- Типи в Julia утворюють ієрархію.
- Кожен тип має супертип.
- `Any` стоїть на вершині ієрархії і є власним супертипом.
- Типи _можуть_ мати підтипи, і ті, що мають, називаються [`abstract types`][abstract].
- Типи без підтипів (листки дерева) називаються [`concrete types`][concrete].
- Неподільні типи, як-от `Char` чи `Int64`, називаються [`primitive types`][primitive].

Лише `primitive` типи підпадають під схему «абстрактне проти конкретного» у її простій формі.

Один із прикладів типів, які не є примітивними, це колекції, як-от `Vector` чи `Set`.

```julia-repl
julia> isprimitivetype(Int)
true

julia> isprimitivetype(Vector)
false
```

_Колекція чого?_

Кожен `Vector` (чи `Set`) є колекцією елементів з деяким однорідним типом, який можна або вказати _параметром_ у фігурних дужках `{ }`, або опустити, щоб його визначило виведення типу.

```julia-repl
julia> v = [1, 2, 3]
3-element Vector{Int64}:
 1
 2
 3

julia> v8 = Vector{Int8}([2, 4, 6])
3-element Vector{Int8}:
 2
 4
 6
```

Ці [`parametric types`][parametric] є формою [`generic programming`][generic], і багато сучасних мов мають щось загалом еквівалентне, хоч і з численними відмінностями в деталях.

## Параметричні складені типи

Іноді ми хочемо створити складений тип, достатньо гнучкий (узагальнений), щоб працювати з різними типами полів.

Цього можна досягти за допомогою фіктивного типу у визначенні, який зазвичай називають `T`.

```julia-repl
julia> struct Point{T}
               x::T
               y::T
       end

# high definition version

julia> real_point = Point(7.3, 4.2)
Point{Float64}(7.3, 4.2)

julia> typeof(real_point)
Point{Float64}

# low definition version

julia> int8point = Point{Int8}(17, 23)
Point{Int8}(17, 23)

julia> typeof(int8point)
Point{Int8}

julia> Point(Int8(17), Int8(23))
Point{Int8}(17, 23)
```

Звісно, цей підхід працює і з колекціями в полях:

```julia-repl
julia> struct Record{T}
           data::Vector{T}
           comment::String
       end

julia> rec = Record{Float64}([1.3, 5.2], "some data")
Record{Float64}([1.3, 5.2], "some data")

julia> rec.data
2-element Vector{Float64}:
 1.3
 5.2

julia> rec2 = Record{Int32}([3, 5], "more data")
Record{Int32}(Int32[3, 5], "more data")

julia> rec2.data
2-element Vector{Int32}:
 3
 5
```

[types]: https://exercism.org/tracks/julia/concepts/types
[parametric]: https://docs.julialang.org/en/v1/manual/types/#Parametric-Types
[generic]: https://en.wikipedia.org/wiki/Generic_programming
[primitive]: https://docs.julialang.org/en/v1/manual/types/#Primitive-Types
[types]: "https://docs.julialang.org/en/v1/manual/types/"
[isa]: https://docs.julialang.org/en/v1/base/base/#Core.isa
[abstract]: https://docs.julialang.org/en/v1/base/base/#abstract%20type
[concrete]: https://docs.julialang.org/en/v1/manual/types/#Type-Declarations
