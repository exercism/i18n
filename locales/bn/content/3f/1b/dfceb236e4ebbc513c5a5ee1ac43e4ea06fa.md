# সম্পর্কে

## পেয়ার

একটি [`Pair`][pair] হলো দুটি আইটেম একসাথে জোড়া লাগানো।
এরপর ওই আইটেম দুটির নাম রাখা হয়েছে কাল্পনিকভাবে `first` ও `second`।

এগুলো তৈরি করতে পারেন `=>` অপারেটর দিয়ে, অথবা `Pair()` কনস্ট্রাক্টর দিয়ে।

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

## ডিক্ট

পেয়ারগুলোর একটি `Vector` অন্য যেকোনো অ্যারের মতোই: ক্রমানুসারে সাজানো, টাইপে সমরূপ এবং মেমোরিতে পরপর সংরক্ষিত।

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

একটি [`Dict`][dict] দেখতে অনেকটা একই রকম, তবে এর সংরক্ষণ এখন এমনভাবে বাস্তবায়িত যাতে কী (key) দিয়ে দ্রুত খোঁজা যায়, যাকে "হ্যাশ টেবিল" বলা হয়, এবং এন্ট্রির সংখ্যা অনেক বড় হলেও এটি কাজ করে।

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

অন্য ভাষায় `Dict`-এর মতোই একটি জিনিসকে dictionary (Python), Hash (Ruby) বা HashMap (Java) বলা হয়।

পেয়ারের ক্ষেত্রে, আলাদাভাবে হোক বা `Vector`-এর ভিতরে, প্রতিটি উপাদানের টাইপের উপর খুব একটা বিধিনিষেধ নেই।

একটি `Dict`-এ বৈধ হতে হলে `Pair`-টি অবশ্যই একটি `key => value` জোড় হতে হবে, যেখানে `key`-টি "হ্যাশেবল"।
সবচেয়ে গুরুত্বপূর্ণ হলো, `key`-টি _ইমিউটেবল_ হতে হবে, তাই `Char`, `Int`, `String`, `Symbol` এবং `Tuple` সবই ঠিক আছে, কিন্তু `Vector` অনুমোদিত নয়।

যদি মিউটেবল কী (key) আপনার কাছে গুরুত্বপূর্ণ হয়, তবে এর জন্য একটি আলাদা কিন্তু অনেক কম প্রচলিত [`IdDict`][iddict] টাইপ আছে যা এটি অনুমোদন করে।
`Dict` টাইপের আরও কয়েকটি ভিন্ন রূপের জন্য [ম্যানুয়াল][dict] দেখুন।

### একটি ডিক্ট পরিবর্তন করা

নতুন কী (key) দিয়ে এন্ট্রি যোগ করা যায়, অথবা বিদ্যমান কী (key) দিয়ে ওভাররাইট করা যায়।

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

একটি এন্ট্রি মুছে ফেলতে `delete!()` ফাংশন ব্যবহার করুন, যা কী (key) থাকলে ডিক্ট পরিবর্তন করবে এবং না থাকলে চুপচাপ কিছুই করবে না।

```julia-repl
julia> delete!(pd, 'd')
Dict{Char, Int64} with 3 entries:
  'a' => 42
  'c' => 3
  'b' => 2
```

### কী (key) বা মান আছে কিনা পরীক্ষা করা

বিভিন্ন পদ্ধতি আছে।
একটি কী (key) পরীক্ষা করার জন্য `haskey()` ফাংশন আছে:

```julia-repl
julia> haskey(pd, 'b')
true
```

বিকল্পভাবে, কী (key) অথবা মানের মধ্যে খোঁজ করা যায়:

```julia-repl
julia> 'b' in keys(pd)
true

julia> 43 in values(pd)
false

julia> 42 ∈ values(pd)
true
```

এটি বড় আকারেও কার্যকর থাকে, কারণ `keys()` ও `values()` ফাংশন প্রত্যেকে একটি ইটারেটর রিটার্ন করে যাতে দ্রুত খোঁজার অ্যালগরিদম থাকে।


[pair]: https://docs.julialang.org/en/v1/base/collections/#Core.Pair
[dict]: https://docs.julialang.org/en/v1/base/collections/#Dictionaries
[iddict]: https://docs.julialang.org/en/v1/base/collections/#Base.IdDict
