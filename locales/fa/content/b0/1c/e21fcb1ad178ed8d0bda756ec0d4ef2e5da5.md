# مقدمه

در مفهوم `Types` یاد گرفتیم که:

- انواع در Julia یک سلسله‌مراتب تشکیل می‌دهند.
- هر نوع یک ابرنوع دارد.
- `Any` در بالای سلسله‌مراتب قرار دارد و ابرنوع خودش است.
- انواع _ممکن است_ زیرنوع داشته باشند، و آن‌هایی که دارند `abstract types` نامیده می‌شوند.
- انواعی که زیرنوع ندارند (گره‌های برگ روی درخت) `concrete types` نامیده می‌شوند.
- انواع تجزیه‌ناپذیر، مانند `Char` یا `Int64`، `primitive types` نامیده می‌شوند.

فقط انواع `primitive` در ساده‌ترین شکل خود از الگوی انتزاعی در برابر مشخص پیروی می‌کنند.

یک نمونه از انواعی که اولیه نیستند، مجموعه‌ها هستند، مانند `Vector` یا `Set`.

```julia-repl
julia> isprimitivetype(Int)
true

julia> isprimitivetype(Vector)
false
```

_مجموعه‌ای از چه؟_

هر `Vector` (یا `Set`) مجموعه‌ای از عنصرها با نوعی یکنواخت است، که می‌توان آن را با یک _پارامتر_ داخل آکولاد `{ }` مشخص کرد، یا آن را حذف کرد تا استنتاج نوع آن را تعیین کند.

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

این `parametric types` گونه‌ای از `generic programming` هستند، و بسیاری از زبان‌های مدرن چیزی کم‌وبیش معادل آن دارند، هرچند با تفاوت‌های زیادی در جزئیات.

## انواع مرکب پارامتری

گاهی می‌خواهیم نوعی مرکب بسازیم که به اندازه‌ی کافی انعطاف‌پذیر (عمومی) باشد تا انواع مختلف فیلد را مدیریت کند.

این کار با یک نوع ساختگی در تعریف انجام می‌شود که معمولاً `T` نامیده می‌شود.

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

طبیعتاً این روش با مجموعه‌ها در فیلدها هم کار می‌کند:

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
