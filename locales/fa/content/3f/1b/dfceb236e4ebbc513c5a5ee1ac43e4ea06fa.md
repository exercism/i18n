# درباره

## جفت

یک [`Pair`][pair] تنها دو عنصر است که به هم پیوسته‌اند.
سپس به این دو عنصر، با کمی تخیل، `first` و `second` می‌گویند.

آن‌ها را می‌توانید یا با عملگر `=>` بسازید یا با سازنده‌ی `Pair()`.

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

## دیکت

یک `Vector` از جفت‌ها مانند هر آرایه‌ی دیگری است: مرتب، از نظر نوع همگن و به‌صورت پیوسته در حافظه ذخیره می‌شود.

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

یک [`Dict`][dict] ظاهراً شبیه به آن است، اما نحوه‌ی ذخیره‌سازی در آن به گونه‌ای پیاده‌سازی شده که بازیابی سریع بر اساس کلید را ممکن می‌کند، که به آن «جدول درهم‌سازی» می‌گویند، حتی وقتی تعداد ورودی‌ها زیاد شود.

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

در زبان‌های دیگر، چیزی بسیار شبیه به `Dict` ممکن است دیکشنری (Python)، Hash (Ruby) یا HashMap (Java) نامیده شود.

برای جفت‌ها، چه به‌تنهایی و چه درون یک `Vector`، محدودیت‌های کمی بر نوع هر مؤلفه وجود دارد.

برای اینکه یک `Pair` در یک `Dict` معتبر باشد، باید یک جفتِ `key => value` باشد که در آن `key` «قابل درهم‌سازی» است.
مهم‌تر از همه، این یعنی `key` باید _تغییرناپذیر_ باشد؛ بنابراین `Char`، `Int`، `String`، `Symbol` و `Tuple` همگی بی‌اشکال‌اند، اما `Vector` مجاز نیست.

اگر کلیدهای تغییرپذیر برایتان مهم‌اند، نوع جداگانه اما بسیار کم‌رایج‌تری به نام [`IdDict`][iddict] وجود دارد که می‌تواند این کار را ممکن کند.
برای چندین گونه‌ی دیگر از نوع `Dict`، به [راهنما][dict] مراجعه کنید.

### تغییر دادن یک دیکت

می‌توان ورودی‌ها را با یک کلید جدید اضافه کرد، یا با یک کلید موجود بازنویسی کرد.

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

برای حذف یک ورودی، از تابع `delete!()` استفاده کنید؛ این تابع اگر کلید وجود داشته باشد دیکت را تغییر می‌دهد و در غیر این صورت بی‌صدا هیچ کاری نمی‌کند.

```julia-repl
julia> delete!(pd, 'd')
Dict{Char, Int64} with 3 entries:
  'a' => 42
  'c' => 3
  'b' => 2
```

### بررسی وجود یک کلید یا مقدار

روش‌های مختلفی وجود دارد.
برای بررسی یک کلید، تابع `haskey()` وجود دارد:

```julia-repl
julia> haskey(pd, 'b')
true
```

یا به‌جای آن، کلیدها یا مقادیر را جست‌وجو کنید:

```julia-repl
julia> 'b' in keys(pd)
true

julia> 43 in values(pd)
false

julia> 42 ∈ values(pd)
true
```

این کار در مقیاس بزرگ هم کارآمد می‌ماند، چون توابع `keys()` و `values()` هرکدام یک تکرارگر با الگوریتم جست‌وجوی سریع برمی‌گردانند.


[pair]: https://docs.julialang.org/en/v1/base/collections/#Core.Pair
[dict]: https://docs.julialang.org/en/v1/base/collections/#Dictionaries
[iddict]: https://docs.julialang.org/en/v1/base/collections/#Base.IdDict
