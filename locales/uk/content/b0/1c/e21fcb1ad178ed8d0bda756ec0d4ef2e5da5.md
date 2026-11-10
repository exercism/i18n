# Вступ

У концепції `Types` ми дізналися, що:

- Типи в Julia утворюють ієрархію.
- Кожен тип має супертип.
- `Any` розташований на вершині ієрархії та є власним супертипом.
- Типи _можуть_ мати підтипи, і ті, які їх мають, називаються `abstract types`.
- Типи без підтипів (листки на дереві) називаються `concrete types`.
- Неподільні типи, як-от `Char` чи `Int64`, називаються `primitive types`.

Лише `primitive` типи дотримуються простої схеми поділу на абстрактні та конкретні.

Одним із прикладів типів, які не є примітивними, є колекції, як-от `Vector` чи `Set`.

```julia-repl
julia> isprimitivetype(Int)
true

julia> isprimitivetype(Vector)
false
```

_Колекція чого?_

Кожен Vector (або Set) є колекцією елементів певного однорідного типу, який можна або вказати за допомогою _параметра_ у фігурних дужках `{ }`, або пропустити, щоб його визначило виведення типу.

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

Ці `parametric types` є формою `generic programming`, і багато сучасних мов мають щось приблизно еквівалентне, хоча й з багатьма відмінностями в деталях.

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

Звісно, цей підхід також працює з колекціями в полях:

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
