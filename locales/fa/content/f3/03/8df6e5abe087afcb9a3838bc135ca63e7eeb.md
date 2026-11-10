# درباره

در [مفهوم `Types`][types] یاد گرفتیم که:

- نوع‌ها در جولیا یک سلسله‌مراتب می‌سازند.
- هر نوع یک ابرنوع دارد.
- `Any` در بالای سلسله‌مراتب قرار دارد و ابرنوع خودش است.
- نوع‌ها _ممکن است_ زیرنوع داشته باشند و به آن‌هایی که دارند [`abstract types`][abstract] می‌گویند.
- به نوع‌هایی که زیرنوع ندارند (گره‌های برگ روی درخت) [`concrete types`][concrete] می‌گویند.
- به نوع‌های تجزیه‌ناپذیر، مانند `Char` یا `Int64`، [`primitive types`][primitive] می‌گویند.

تنها نوع‌های `primitive` هستند که الگوی انتزاعی در برابر مشخص را در شکل ساده‌اش دنبال می‌کنند.

یکی از نمونه‌های نوع‌هایی که ابتدایی نیستند، مجموعه‌ها هستند؛ مانند `Vector` یا `Set`.

```julia-repl
julia> isprimitivetype(Int)
true

julia> isprimitivetype(Vector)
false
```

_مجموعه‌ای از چه؟_

هر `Vector` (یا `Set`) مجموعه‌ای از عنصرها با یک نوع یکنواخت است که می‌توان آن را با یک _پارامتر_ در آکولاد `{ }` مشخص کرد، یا آن را حذف کرد تا استنتاج نوع آن را تعیین کند.

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

این [`parametric types`][parametric] شکلی از [`generic programming`][generic] هستند و بسیاری از زبان‌های مدرن ساختار کمابیش معادلی دارند، هرچند در جزئیات تفاوت‌های بسیاری وجود دارد.

## نوع‌های ترکیبی پارامتریک

گاهی می‌خواهیم یک نوع ترکیبی بسازیم که به‌قدر کافی انعطاف‌پذیر (عمومی) باشد تا انواع مختلف فیلد را مدیریت کند.

این کار را می‌توان با یک نوع ساختگی در تعریف انجام داد که معمولاً `T` نامیده می‌شود.

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

طبیعتاً این روش با مجموعه‌های داخل فیلدها هم کار می‌کند:

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
