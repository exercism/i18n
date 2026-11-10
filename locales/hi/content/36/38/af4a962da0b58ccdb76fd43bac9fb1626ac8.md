# परिचय

सांख्यिकी एक बड़ा और जटिल विषय है, जिसके कई पहलू हैं।

[`Randomness`][randomness] कॉन्सेप्ट में इसके कुछ पहलुओं पर बात की गई थी, जो एक अलग लेकिन संबंधित विषय है।

सबसे सरल रूप में देखें तो सांख्यिकी में डेटा के इटरेबल संग्रह को एक ही वैल्यू में समेटने के तरीके शामिल हो सकते हैं।
Julia में नए लोग यह देखकर चौंक सकते हैं कि भाषा में डिफॉल्ट रूप से बहुत कम फंक्शन पहले से बने हुए हैं:

- [`sum`][sum], संख्याओं को जोड़ने के लिए।
- [`min`][min] और [`max`][max], दिए गए पैरामीटर में से सबसे छोटी और सबसे बड़ी वैल्यू निकालने के लिए।
- [`extrema`][extrema], किसी इटरेबल का (min, max) टपल निकालने के लिए।
- [`length`][length], सारी वैल्यू गिनने के लिए।
- [`count`][count], सिर्फ किसी मानदंड को पूरा करने वाली वैल्यू गिनने के लिए।

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

फंक्शनों का यह सीमित समूह जानबूझकर चुना गया है। उद्देश्य यह है कि Julia के बेस में बेवजह भार न बढ़े, इसलिए बाकी फंक्शन दूसरे मॉड्यूल और पैकेजों की एक लंबी श्रृंखला में डाल दिए गए हैं।

## `Statistics` मॉड्यूल

[`Statistics`][statistics] स्टैंडर्ड लाइब्रेरी का हिस्सा है, इसलिए यह शायद पहले से इंस्टॉल होगा। इसे नेमस्पेस में लाने के लिए प्रोग्राम के ऊपर `using Statistics` जोड़ना ही काफी है।

इस मॉड्यूल में आम फंक्शनों की अगली परत है। प्रोग्रामरों का एक वर्ग इनका शायद बहुत इस्तेमाल करता है।

`Statistics` के कई फंक्शन यह मानकर चलते हैं कि आपको इस विषय की कुछ आधारभूत जानकारी है।
सबसे आसान उदाहरण ये हैं:

- [`mean`][mean], जिसे बहुत लोग औसत कहते हैं (`sum / length` का वही परिणाम देता है)।
- [`median`][median], क्रम में लगाने के बाद बीच की वैल्यू।
- [`std`][std], [मानक विचलन][stddev]: इस बात का माप कि वैल्यू कितनी फैली हुई हैं।
- [`var`][var], प्रसरण: `std` का वर्ग, जिसकी गणना आम तौर पर जल्दी हो जाती है।

हर फंक्शन में आम तौर पर कई विकल्प होते हैं, और ऐसे _बहुत सारे_ फंक्शन हैं, इसलिए रुचि हो तो [डॉक्युमेंटेशन][statistics] देख लीजिए।

## दूसरे पैकेज

जैसा आप सोच सकते हैं, सांख्यिकी Julia के लिए एक बड़ा उपयोग क्षेत्र है, और ज़्यादा विशेष काम के लिए कई पैकेज उपलब्ध हैं।

JuliaStats समूह मदद के तौर पर एक [ऑनलाइन सूची][juliastats] बनाए रखता है।

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
