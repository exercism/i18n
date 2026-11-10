# مقدمة

يُعدّ "الإحصاء" موضوعًا واسعًا ومعقّدًا له جوانب عديدة.

وقد تطرّقنا إلى بعض هذه الجوانب في مفهوم [`Randomness`][randomness]، وهو موضوع منفصل لكنه وثيق الصلة.

في أبسط صوره، قد يتضمّن الإحصاء أساليب لتلخيص مجموعة بيانات قابلة للتكرار في قيمة واحدة.
وقد يفاجأ القادمون الجدد إلى Julia بقلة عدد الدوال المضمّنة في اللغة افتراضيًا:

- `sum`، لجمع الأعداد.
- `min` و`max`، للحصول على القيم المتطرفة للمعاملات المعطاة.
- `extrema`، للحصول على الزوج المرتّب (min, max) من أي مجموعة قابلة للتكرار.
- `length`، لعدّ كل القيم.
- `count`، لعدّ القيم التي تحقق معيارًا ما فقط.

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

هذه المجموعة المحدودة من الدوال قرار متعمّد لتقليل التضخّم في الجزء الأساسي من Julia، وذلك بنقل دوال أخرى إلى طبقات متتالية من الوحدات والحزم الأخرى.

## وحدة `Statistics`

بما أن `Statistics` جزء من المكتبة القياسية، فمن المرجّح أن تكون مثبّتة مسبقًا، لذا يكفي إضافة `using Statistics` في أعلى البرنامج لإدخالها إلى فضاء الأسماء.

تحتوي هذه الوحدة على الطبقة التالية من الدوال الشائعة، والتي من المرجّح أن تستخدمها فئة معيّنة من المبرمجين على نطاق واسع.

تفترض العديد من الدوال في `Statistics` وجود خلفية معرفية معيّنة بالموضوع.
ومن أبسط الأمثلة:

- `mean`، وهي ما يسمّيه كثيرون المتوسط (الناتج نفسه الذي يعطيه `sum / length`).
- `median`، القيمة الوسطى بعد الترتيب.
- `std`، أي [الانحراف المعياري][stddev]: مقياس لمدى تشتّت القيم.
- `var`، أي التباين: مربّع `std`، وهو أسرع في الحساب عمومًا.

تميل كل دالة إلى امتلاك خيارات متنوعة، وهناك دوال _أكثر بكثير_، لذا راجع [التوثيق][statistics] إن كنت مهتمًا.

## حزم أخرى

كما قد تتوقّع، يمثّل الإحصاء حالة استخدام كبيرة في Julia، وهناك العديد من الحزم المتاحة لدعم أعمال أكثر تخصّصًا.

وتُدير مجموعة JuliaStats بكل لطف [قائمة على الإنترنت][juliastats].

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
