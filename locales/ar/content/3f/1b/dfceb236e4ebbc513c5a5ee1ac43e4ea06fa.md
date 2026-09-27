# نبذة

## `Pair`

`Pair` هو مجرد عنصرين مرتبطين معًا.
ويُطلق على هذين العنصرين بعد ذلك، بمخيلة خصبة، اسم `first` و`second`.

أنشئهما إما باستخدام العامل `=>` أو باستخدام دالة البناء `Pair()`.

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

## `Dict`

`Vector` المكوّن من أزواج `Pair` يشبه أي مصفوفة أخرى: فهو مرتب، ومتجانس في النوع، ويُخزَّن على نحو متتالٍ في الذاكرة.

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

أما [`Dict`][dict] فيشبهه في الظاهر، لكن التخزين أصبح الآن منفَّذًا بطريقة تسمح بالاسترجاع السريع بواسطة المفتاح، وتُعرف باسم «جدول التجزئة»، حتى عندما يكبر عدد المدخلات.

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

في لغات أخرى، قد يُطلق على شيء شديد الشبه بـ`Dict` اسم قاموس (Python)، أو Hash (Ruby)، أو HashMap (Java).

أما عناصر `Pair`، سواء كانت منفردة أو داخل `Vector`، فلا توجد قيود كثيرة على نوع كل مكوّن.

وليكون الزوج صالحًا داخل `Dict`، يجب أن يكون من الشكل `key => value`، حيث يكون `key` «قابلًا للتجزئة».
والأهم أن هذا يعني أن `key` يجب أن يكون _غير قابل للتغيير_، لذا فإن `Char` و`Int` و`String` و`Symbol` و`Tuple` كلها مقبولة، أما `Vector` فغير مسموح به.

إذا كانت المفاتيح القابلة للتغيير مهمة بالنسبة لك، فهناك نوع منفصل وأقل شيوعًا بكثير هو [`IdDict`][iddict] يتيح ذلك.
راجع [الدليل][dict] للاطلاع على عدة صور أخرى من نوع `Dict`.

### تعديل `Dict`

يمكن إضافة مدخلات جديدة بمفتاح جديد، أو الكتابة فوق مدخلات موجودة بمفتاح موجود.

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

لحذف مدخل، استخدم الدالة `delete!()`، وهي تغيّر `Dict` إذا كان المفتاح موجودًا، ولا تفعل شيئًا بصمت إن لم يكن موجودًا.

```julia-repl
julia> delete!(pd, 'd')
Dict{Char, Int64} with 3 entries:
  'a' => 42
  'c' => 3
  'b' => 2
```

### التحقق من وجود مفتاح أو قيمة

هناك أساليب مختلفة.
للتحقق من مفتاح، توجد الدالة `haskey()`:

```julia-repl
julia> haskey(pd, 'b')
true
```

وبدلًا من ذلك، ابحث في المفاتيح أو في القيم:

```julia-repl
julia> 'b' in keys(pd)
true

julia> 43 in values(pd)
false

julia> 42 ∈ values(pd)
true
```

ويبقى هذا فعّالًا حتى مع الأعداد الكبيرة، لأن الدالتين `keys()` و`values()` تُرجع كل منهما مكرِّرًا بخوارزمية بحث سريعة.


[pair]: https://docs.julialang.org/en/v1/base/collections/#Core.Pair
[dict]: https://docs.julialang.org/en/v1/base/collections/#Dictionaries
[iddict]: https://docs.julialang.org/en/v1/base/collections/#Base.IdDict
