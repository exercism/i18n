# ভূমিকা

`Types` কনসেপ্টে আমরা শিখেছিলাম যে:

- Julia-তে টাইপগুলো একটি হায়ারার্কি গঠন করে।
- প্রতিটি টাইপের একটি সুপারটাইপ থাকে।
- `Any` হায়ারার্কির একেবারে উপরে থাকে, আর সে নিজেই নিজের সুপারটাইপ।
- টাইপের সাবটাইপ _থাকতে পারে_, আর যেগুলোর থাকে, সেগুলোকে `abstract types` বলা হয়।
- যেসব টাইপের সাবটাইপ নেই (ট্রি-এর লিফ নোড), সেগুলোকে `concrete types` বলা হয়।
- যেসব টাইপকে ভাগ করা যায় না, যেমন `Char` বা `Int64`, সেগুলোকে `primitive types` বলা হয়।

সরল রূপে শুধু `primitive` টাইপগুলোই অ্যাবস্ট্রাক্ট বনাম কনক্রিটের এই প্যাটার্ন অনুসরণ করে।

যেসব টাইপ প্রিমিটিভ নয়, তার একটি উদাহরণ হলো কলেকশন, যেমন `Vector` বা `Set`।

```julia-repl
julia> isprimitivetype(Int)
true

julia> isprimitivetype(Vector)
false
```

_কীসের কলেকশন?_

প্রতিটি Vector (বা Set) হলো একই রকম টাইপের কিছু এলিমেন্টের কলেকশন। এই টাইপটি হয় `{ }` বন্ধনীর ভেতরে একটি _প্যারামিটার_ দিয়ে উল্লেখ করা যায়, নয়তো বাদ দিয়ে দিলে টাইপ ইনফারেন্স সেটি ঠিক করে দেয়।

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

এই `parametric types` এক ধরনের `generic programming`, আর আধুনিক অনেক ভাষাতেই এর কাছাকাছি কিছু আছে, যদিও খুঁটিনাটিতে অনেক পার্থক্য থাকে।

## প্যারামেট্রিক কম্পোজিট টাইপ

কখনও কখনও আমরা এমন একটি কম্পোজিট টাইপ বানাতে চাই যা যথেষ্ট নমনীয় (জেনেরিক), যাতে বিভিন্ন ধরনের ফিল্ড সামলাতে পারে।

ডেফিনিশনে একটি ডামি টাইপ ব্যবহার করে এটা করা যায়, যাকে সাধারণত `T` বলা হয়।

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

স্বাভাবিকভাবেই, ফিল্ডে কলেকশন রাখলেও এই পদ্ধতি কাজ করে:

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
