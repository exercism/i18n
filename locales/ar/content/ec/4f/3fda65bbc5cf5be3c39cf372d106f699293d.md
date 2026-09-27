# حول

في [مفهوم `Types`][types]، تعلّمنا أنّ:

- الأنواع في Julia تشكّل تسلسلًا هرميًا.
- لكل نوع نوع فائق.
- `Any` في قمة التسلسل الهرمي، وهو نوعه الفائق الخاص به.
- الأنواع _قد_ يكون لها أنواع فرعية، وتلك التي لها أنواع فرعية تُسمّى [`abstract types`][abstract].
- الأنواع التي ليس لها أنواع فرعية (العُقد الورقية في الشجرة) تُسمّى [`concrete types`][concrete].
- الأنواع غير القابلة للتجزئة، مثل `Char` أو `Int64`، تُسمّى [`primitive types`][primitive].

الأنواع `primitive` وحدها هي التي تتبع نمط المجرّد مقابل الملموس في صورته البسيطة.

من الأمثلة على الأنواع غير البدائية المجموعات، مثل `Vector` أو `Set`.

```julia-repl
julia> isprimitivetype(Int)
true

julia> isprimitivetype(Vector)
false
```

_مجموعة من ماذا؟_

كل Vector (أو Set) هو مجموعة من العناصر ذات نوع موحّد، ويمكن إمّا تحديده بـ_معامل_ بين قوسين `{ }`، أو حذفه ليحدّده استنتاج الأنواع.

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

هذه [`parametric types`][parametric] شكل من أشكال [`generic programming`][generic]، وكثير من اللغات الحديثة لديها ما يعادلها على وجه العموم، وإن اختلفت في كثير من التفاصيل.

## الأنواع المركّبة ذات المعاملات

أحيانًا نريد إنشاء نوع مركّب مرن (عام) بما يكفي للتعامل مع أنواع حقول مختلفة.

يمكن تحقيق ذلك باستخدام نوع صوري في التعريف، يُسمّى عادةً `T`.

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

بطبيعة الحال، يعمل هذا الأسلوب أيضًا مع المجموعات داخل الحقول:

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
