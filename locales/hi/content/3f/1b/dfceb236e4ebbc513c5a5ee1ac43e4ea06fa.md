# अधिक जानकारी

## पेयर

एक [`Pair`][pair] बस दो चीज़ों को जोड़कर बनता है। इन चीज़ों को फिर बड़े कल्पनाशील ढंग से `first` और `second` कहा जाता है।

इन्हें या तो `=>` ऑपरेटर से बनाइए, या `Pair()` कंस्ट्रक्टर से।

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

## डिक्ट

पेयर का एक `Vector` किसी भी आम ऐरे जैसा होता है: इसमें क्रम बना रहता है, सारे एलिमेंट एक ही टाइप के होते हैं, और ये मेमोरी में एक के बाद एक रखे जाते हैं।

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

ऊपर से देखने पर एक [`Dict`][dict] कुछ-कुछ वैसा ही लगता है, लेकिन अंदर डेटा ऐसे रखा जाता है कि की की मदद से एंट्री बहुत तेज़ी से निकाली जा सके। इसे "हैश टेबल" कहते हैं, और एंट्री की संख्या बहुत बढ़ जाने पर भी यह तेज़ बना रहता है।

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

दूसरी भाषाओं में `Dict` जैसी ही किसी चीज़ को डिक्शनरी (Python), हैश (Ruby) या हैशमैप (Java) कहा जाता है।

पेयर के मामले में, चाहे वे अकेले हों या किसी `Vector` में, उनके हर हिस्से के टाइप पर कोई खास पाबंदी नहीं होती।

किसी `Dict` में मान्य होने के लिए `Pair` को `key => value` जोड़ा होना चाहिए, जहाँ `key` "हैश करने योग्य" हो।
सबसे ज़रूरी बात, इसका मतलब है कि `key` _अपरिवर्तनीय_ होनी चाहिए। यानी `Char`, `Int`, `String`, `Symbol` और `Tuple` तो ठीक हैं, लेकिन `Vector` की इजाज़त नहीं है।

अगर आपके लिए परिवर्तनीय की ज़रूरी हैं, तो इसके लिए एक अलग, पर बहुत कम इस्तेमाल किया जाने वाला [`IdDict`][iddict] टाइप है, जो यह काम कर सकता है।
`Dict` टाइप के कई और रूपों के लिए [मैनुअल][dict] देखिए।

### डिक्ट में बदलाव करना

एंट्री जोड़ी जा सकती है, नई की के साथ, या बदली जा सकती है, पहले से मौजूद की के साथ।

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

किसी एंट्री को हटाने के लिए `delete!()` फंक्शन का इस्तेमाल कीजिए। अगर की मौजूद है तो यह डिक्ट को बदल देता है, वरना चुपचाप कुछ नहीं करता।

```julia-repl
julia> delete!(pd, 'd')
Dict{Char, Int64} with 3 entries:
  'a' => 42
  'c' => 3
  'b' => 2
```

### जाँचना कि कोई की या वैल्यू मौजूद है या नहीं

इसके अलग-अलग तरीके हैं।
की की जाँच के लिए एक `haskey()` फंक्शन है:

```julia-repl
julia> haskey(pd, 'b')
true
```

या फिर आप की में भी ढूँढ सकते हैं और वैल्यू में भी:

```julia-repl
julia> 'b' in keys(pd)
true

julia> 43 in values(pd)
false

julia> 42 ∈ values(pd)
true
```

डेटा बड़ा होने पर भी यह खोज तेज़ बनी रहती है, क्योंकि `keys()` और `values()` फंक्शन एक-एक इटरेटर लौटाते हैं जिसमें तेज़ खोज का एल्गोरिदम लगा होता है।


[pair]: https://docs.julialang.org/en/v1/base/collections/#Core.Pair
[dict]: https://docs.julialang.org/en/v1/base/collections/#Dictionaries
[iddict]: https://docs.julialang.org/en/v1/base/collections/#Base.IdDict
