# পরিচিতি

"পরিসংখ্যান" একটি বড় ও জটিল বিষয়, যার অনেক দিক রয়েছে।

এর কিছু দিক [`Randomness`][randomness] কনসেপ্টে উল্লেখ করা হয়েছে, যা একটি আলাদা কিন্তু সম্পর্কিত বিষয়।

সহজভাবে বললে, পরিসংখ্যানে ডেটার একটি ইটারেবল সংগ্রহকে একটি একক মানে সংক্ষেপ করার উপায় থাকতে পারে।
Julia-তে নতুন যারা, তারা অবাক হতে পারেন যে ভাষায় ডিফল্টভাবে কত কম ফাংশন বিল্ট-ইন থাকে:

- [`sum`][sum], সংখ্যাগুলো যোগ করার জন্য।
- [`min`][min] এবং [`max`][max], প্রদত্ত প্যারামিটারগুলোর চরম মান বের করার জন্য।
- [`extrema`][extrema], একটি ইটারেবলের (min, max) টাপল বের করার জন্য।
- [`length`][length], সব মান গণনা করার জন্য।
- [`count`][count], শুধু কোনো একটি শর্ত পূরণ করে এমন মান গণনা করার জন্য।

```julia-repl
julia> v = collect(1:0.2:3)
11-element Vector{Float64}:
 1.0
 1.2
 ... # display truncated
 3.0

julia> mean(v)
2.0

julia> extrema(v)
(1.0, 3.0)

julia> length(v)
11

julia> min('g', 'a', 'c')
'a': ASCII/Unicode U+0061 (category Ll: Letter, lowercase)

julia> count(isodd, 1:5)  # 1, 3, and 5 are odd
3
```

ফাংশনের এই সীমিত সেটটি base Julia-তে স্ফীতি কমাতে ইচ্ছাকৃতভাবে নেওয়া একটি সিদ্ধান্ত, যেখানে অন্যান্য ফাংশনকে একের পর এক আরও মডিউল ও প্যাকেজে সরিয়ে দেওয়া হয়েছে।

## `Statistics` মডিউল

স্ট্যান্ডার্ড লাইব্রেরির অংশ হিসেবে [`Statistics`][statistics] সম্ভবত আগেই ইনস্টল করা থাকে, তাই এটিকে নেমস্পেসে আনতে প্রোগ্রামের শুরুর দিকে শুধু `using Statistics` যোগ করলেই হয়।

এই মডিউলে রয়েছে পরের স্তরের কমন ফাংশনগুলো, যেগুলো প্রোগ্রামারদের একটি উপসেট সম্ভবত ব্যাপকভাবে ব্যবহার করেন।

`Statistics`-এর অনেক ফাংশন ধরে নেয় যে ব্যবহারকারীর বিষয়টি সম্পর্কে কিছুটা পটভূমি জ্ঞান আছে।
সহজ উদাহরণগুলোর মধ্যে রয়েছে:

- [`mean`][mean], যাকে অনেকে গড় বলে থাকেন (`sum / length`-এর মতো একই ফলাফল)।
- [`median`][median], সাজানোর পর মাঝের মান।
- [`std`][std], [স্ট্যান্ডার্ড ডেভিয়েশন][stddev]: মানগুলো কতটা ছড়িয়ে আছে তার একটি পরিমাপ।
- [`var`][var], ভ্যারিয়েন্স: `std`-এর বর্গ, যা সাধারণত গণনা করতে দ্রুততর।

প্রতিটি ফাংশনে সাধারণত নানা ধরনের অপশন থাকে, আর আরও _অনেক_ ফাংশন আছে, তাই আগ্রহ থাকলে [ডকুমেন্টেশন][statistics] দেখে নিন।

## অন্যান্য প্যাকেজ

আপনি সম্ভবত যেমন আশা করবেন, Julia-র জন্য পরিসংখ্যান একটি বড় ব্যবহারক্ষেত্র, আর আরও বিশেষায়িত কাজ সমর্থন করার জন্য অনেক প্যাকেজ পাওয়া যায়।

JuliaStats গ্রুপ সদয়ভাবে একটি [অনলাইন তালিকা][juliastats] রক্ষণাবেক্ষণ করে রেখেছে।

[statistics]: https://docs.julialang.org/en/v1/stdlib/Statistics/
[randomness]: https://exercism.org/tracks/julia/concepts/randomness
[sum]: https://docs.julialang.org/en/v1/base/collections/#Base.sum
[min]: https://docs.julialang.org/en/v1/base/math/#Base.min
[max]: https://docs.julialang.org/en/v1/base/math/#Base.max
[extrema]: https://docs.julialang.org/en/v1/base/collections/#Base.extrema
[length]: https://docs.julialang.org/en/v1/base/collections/#Base.length
[count]: https://docs.julialang.org/en/v1/base/collections/#Base.count
[mean]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.mean
[median]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.median
[std]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.std
[var]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.var
[stddev]: https://en.wikipedia.org/wiki/Standard_deviation
[juliastats]: https://juliapackages.com/u/juliastats
