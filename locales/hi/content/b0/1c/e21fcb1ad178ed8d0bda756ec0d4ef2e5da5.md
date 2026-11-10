# परिचय

`Types` कॉन्सेप्ट में हमने सीखा था कि:

- जूलिया में टाइप एक पदानुक्रम बनाते हैं।
- हर टाइप का एक सुपरटाइप होता है।
- `Any` इस पदानुक्रम में सबसे ऊपर है, और वह खुद अपना सुपरटाइप है।
- टाइप के सबटाइप _हो सकते हैं_, और जिनके होते हैं उन्हें `abstract types` कहा जाता है।
- जिन टाइप के सबटाइप नहीं होते (पेड़ में पत्तियों वाले नोड), उन्हें `concrete types` कहा जाता है।
- अविभाज्य टाइप, जैसे `Char` या `Int64`, `primitive types` कहलाते हैं।

केवल `primitive` टाइप ही एब्सट्रैक्ट बनाम कंक्रीट वाला पैटर्न अपने सरल रूप में अपनाते हैं।

जो टाइप प्रिमिटिव नहीं हैं, उनका एक उदाहरण कलेक्शन हैं, जैसे `Vector` या `Set`।

```julia-repl
julia> isprimitivetype(Int)
true

julia> isprimitivetype(Vector)
false
```

_किस चीज़ का कलेक्शन?_

हर Vector (या Set) एक ही जैसे टाइप वाले एलिमेंट का कलेक्शन होता है। यह टाइप या तो ब्रेसिज़ `{ }` में एक _पैरामीटर_ देकर बताया जाता है, या उसे छोड़ दिया जाता है ताकि टाइप इन्फरेंस उसे तय कर ले।

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

ये `parametric types` `generic programming` का एक रूप हैं। कई आधुनिक भाषाओं में मोटे तौर पर इसके जैसा कुछ मौजूद है, हालाँकि बारीकियों में कई फर्क होते हैं।

## पैरामीट्रिक कंपोज़िट टाइप

कभी-कभी हम एक ऐसा कंपोज़िट टाइप बनाना चाहते हैं जो इतना लचीला (जेनेरिक) हो कि अलग-अलग फील्ड टाइप को संभाल सके।

यह परिभाषा में एक डमी टाइप डालकर किया जा सकता है, जिसे आमतौर पर `T` कहा जाता है।

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

स्वाभाविक रूप से, यह तरीका फील्ड में कलेक्शन के साथ भी काम करता है:

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
