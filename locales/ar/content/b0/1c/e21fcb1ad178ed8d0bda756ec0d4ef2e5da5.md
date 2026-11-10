# مقدمة

في مفهوم `Types`، تعلّمنا ما يلي:

- تشكّل الأنواع في Julia تسلسلًا هرميًا.
- لكل نوع نوع أعلى.
- يقع `Any` في قمة التسلسل الهرمي، وهو النوع الأعلى لنفسه.
- قد _يكون_ للأنواع أنواع فرعية، والأنواع التي لها أنواع فرعية تُسمّى `abstract types`.
- الأنواع التي لا أنواع فرعية لها (العُقد الطرفية في الشجرة) تُسمّى `concrete types`.
- الأنواع غير القابلة للتجزئة، مثل `Char` أو `Int64`، تُسمّى `primitive types`.

الأنواع `primitive` وحدها هي التي تتبع نمط المجرّد مقابل الملموس في صورته البسيطة.

ومن الأمثلة على الأنواع غير الأولية المجموعات، مثل `Vector` أو `Set`.

```julia-repl
julia> isprimitivetype(Int)
true

julia> isprimitivetype(Vector)
false
```

_مجموعة من ماذا؟_

كل `Vector` (أو `Set`) هو مجموعة من العناصر ذات نوع موحّد، ويمكن تحديد هذا النوع بواسطة _معامل_ يوضع بين قوسين معقوفين `{ }`، أو تركه ليتولّى استنتاج النوع تحديده.

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

هذه الأنواع `parametric types` هي شكل من أشكال `generic programming`، ولغات حديثة كثيرة لديها ما يعادلها على وجه العموم، وإن اختلفت عنها في كثير من التفاصيل.

## الأنواع المركّبة ذات المعاملات

أحيانًا نريد إنشاء نوع مركّب مرن (عام) بما يكفي للتعامل مع أنواع مختلفة من الحقول.

يمكن تحقيق ذلك باستخدام نوع صوري في التعريف، يُسمّى عادة `T`.

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

وبالطبع، يصلح هذا الأسلوب أيضًا مع المجموعات في الحقول:

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
