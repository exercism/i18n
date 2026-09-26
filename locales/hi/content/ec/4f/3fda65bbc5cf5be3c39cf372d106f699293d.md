# बारे में

हमने [`Types` कॉन्सेप्ट][types] में सीखा था कि:

- Julia में टाइप एक पदानुक्रम बनाते हैं।
- हर टाइप का एक सुपरटाइप होता है।
- `Any` इस पदानुक्रम में सबसे ऊपर होता है और खुद अपना सुपरटाइप है।
- टाइप के सबटाइप _हो सकते हैं_, और जिनके होते हैं उन्हें [`abstract types`][abstract] कहा जाता है।
- जिन टाइप के सबटाइप नहीं होते (पेड़ में पत्ते जैसे नोड), उन्हें [`concrete types`][concrete] कहा जाता है।
- अविभाज्य टाइप, जैसे `Char` या `Int64`, [`primitive types`][primitive] कहलाते हैं।

सरल रूप में यह अमूर्त और ठोस वाला ढाँचा सिर्फ `primitive` टाइप पर ही लागू होता है।

जो टाइप प्रिमिटिव नहीं होते, उनका एक उदाहरण कलेक्शन है, जैसे `Vector` या `Set`।

```julia-repl
julia> isprimitivetype(Int)
true

julia> isprimitivetype(Vector)
false
```

_किस चीज़ का कलेक्शन?_

हर Vector (या Set) एक ही टाइप वाले एलिमेंट का कलेक्शन होता है। इस टाइप को या तो `{ }` ब्रैकेट में एक _पैरामीटर_ देकर तय किया जाता है, या उसे छोड़ दिया जाता है ताकि टाइप इन्फरेंस उसे खुद तय कर ले।

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

ये [`parametric types`][parametric] [`generic programming`][generic] का एक रूप हैं, और कई आधुनिक भाषाओं में भी मोटे तौर पर इसी जैसा कुछ होता है, हालाँकि बारीकियों में कई अंतर होते हैं।

## पैरामीट्रिक कंपोज़िट टाइप

कभी-कभी हमें एक ऐसा कंपोज़िट टाइप बनाना होता है जो इतना लचीला (जेनेरिक) हो कि अलग-अलग फील्ड टाइप को संभाल सके।

यह काम परिभाषा में एक डमी टाइप रखकर किया जा सकता है, जिसे आम तौर पर `T` कहा जाता है।

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

स्वाभाविक रूप से, यह तरीका फील्ड में कलेक्शन रखने पर भी काम करता है:

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
