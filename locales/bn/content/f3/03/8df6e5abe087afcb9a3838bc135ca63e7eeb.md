# সম্পর্কে

[`Types` ধারণা][types] থেকে আমরা শিখেছি যে:

- জুলিয়ায় টাইপগুলো একটি হায়ারার্কি গঠন করে।
- প্রতিটি টাইপের একটি সুপারটাইপ আছে।
- `Any` হায়ারার্কির একেবারে উপরে থাকে, আর সে-ই নিজের সুপারটাইপ।
- টাইপের সাবটাইপ থাকতেও _পারে_, আর যেগুলোর থাকে সেগুলোকে বলা হয় [`abstract types`][abstract]।
- যেসব টাইপের সাবটাইপ নেই (গাছের পাতার নোড), সেগুলোকে বলা হয় [`concrete types`][concrete]।
- অবিভাজ্য টাইপ, যেমন `Char` বা `Int64`, কে বলা হয় [`primitive types`][primitive]।

শুধু `primitive` টাইপই সরল রূপে অ্যাবস্ট্রাক্ট বনাম কংক্রিট প্যাটার্নটি অনুসরণ করে।

প্রিমিটিভ নয় এমন টাইপের একটি উদাহরণ হলো কালেকশন, যেমন `Vector` বা `Set`।

```julia-repl
julia> isprimitivetype(Int)
true

julia> isprimitivetype(Vector)
false
```

_কীসের কালেকশন?_

প্রতিটি Vector (বা Set) হলো একই টাইপের এলিমেন্টের একটি কালেকশন। এর টাইপটি হয় দ্বিতীয় বন্ধনী `{ }`-এর মধ্যে একটি _প্যারামিটার_ দিয়ে নির্দিষ্ট করা যায়, নয়তো বাদ দিয়ে দিলে টাইপ ইনফারেন্স সেটি বুঝে নেয়।

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

এই [`parametric types`][parametric] হলো এক ধরনের [`generic programming`][generic], আর আধুনিক অনেক ভাষাতেই এর মোটামুটি সমতুল্য কিছু আছে, যদিও বিস্তারিত খুঁটিনাটিতে অনেক পার্থক্য রয়েছে।

## প্যারামেট্রিক কম্পোজিট টাইপ

কখনও কখনও আমরা একটি কম্পোজিট টাইপকে ভিন্ন ভিন্ন ফিল্ড টাইপ সামলানোর মতো যথেষ্ট নমনীয় (জেনেরিক) বানাতে চাই।

ডেফিনিশনের ভেতরে একটি ডামি টাইপ দিয়ে এটি করা যায়, যাকে সাধারণত `T` বলা হয়।

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

স্বাভাবিকভাবেই, এই পদ্ধতিটি ফিল্ডে কালেকশন রাখার ক্ষেত্রেও কাজ করে:

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
