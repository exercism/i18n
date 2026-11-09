# مقدمة

`Complex numbers` ليست معقّدة.
إنها تحتاج فقط إلى اسم أقل إثارة للقلق.

إنها مفيدة جدًا، خصوصًا في الهندسة والعلوم، حتى إن لغة R تُضمّن [الأعداد المركبة][web-complex] ضمن [الأنواع الذرية][ref-atomic] القياسية إلى جانب العدد الصحيح، والمزدوج، والمنطقي، والمحرف، والخام.

## الأساسيات

العدد `complex` في R قيمة واحدة.
لكن عند الاستعمال يمكن التفكير فيه كزوج من الأعداد.
ويُطلق على هذين العددين الجزء «الحقيقي» والجزء «التخيلي»، لأسباب تاريخية مؤسفة.
ومرة أخرى، من الأفضل التركيز على البساطة الكامنة وراء الفكرة لا على الأسماء الغريبة.

لإنشاء أعداد مركبة من عددين حقيقيين، ما عليك سوى إضافة اللاحقة `i` إلى الجزء التخيلي.

```r
2+3i
#> [1] 2+3i

typeof(2+3i)
#> [1] "complex"
```

أما لإنشاء عدد مركب من متغيرات حقيقية، فلن تنجح الصياغة السابقة.
فكتابة `r + imi` تُربك المحلّل فيظن أن `imi` اسم متغير (غير موجود).

إما أن تضرب الجزء التخيلي في `1i`، وإما أن تستخدم الدالة [`complex()`][ref-complex]:

```r
r <- 2
im <- 3

r + im * 1i
#> [1] 2+3i

# must include the `real` and `imaginary` keywords
complex(real = r, imaginary = im)
#> [1] 2+3i
```

قد تتساءل: لماذا `i` وليس `j`؟

معظم المهندسين يفضّلون `j`.
ومعظم العلماء والرياضيين يفضّلون الرمز الرياضي `i` اختصارًا لكلمة _التخيلي_، لكن هذا الرمز يتعارض مع استخدام `i` بمعنى _التيار_ في الهندسة الكهربائية.

اختارت R الحرف `i`، واختارت Python الحرف `j`، وتجنّبت Julia الجدل باختيارها `im`.
فكن حذرًا عند التنقل بين لغات البرمجة في مجالات [العلوم والتقنية والهندسة والرياضيات][wiki-STEM].

للوصول إلى أجزاء العدد المركب كلٌّ على حدة:

```r
z <- 2+3i

Re(z)  # real part
#> [1] 2

Im(z)  # imaginary part
#> [1] 3
```

قد يكون أي من الجزأين صفرًا، وحينها قد يتحدث الرياضيون عن العدد بأنه «حقيقي تمامًا» أو «تخيلي تمامًا».
ومع ذلك، يبقى عددًا مركبًا في R.

```r
1.2 + 0i
#> [1] 1.2+0i

typeof(1.2 + 0i)
#> [1] "complex"

2i
#> [1] 0+2i

typeof(2i)
#> [1] "complex"
```

ربما سمعت أن «`i` (أو `j`) هو الجذر التربيعي للعدد -1».

في هذه المرحلة، كل ما يعنيه ذلك أن الجزء التخيلي _بحكم التعريف_ يحقق المساواة التالية:

```r
1i * 1i == -1  # more precisely, 1i * 1i == -1 + 0i
#> [1] TRUE
```

هذه فكرة بسيطة، لكنها تؤدي إلى نتائج مثيرة للاهتمام.

## العمليات الحسابية

معظم [`operators`][ref-operators] المستخدمة مع الأعداد العشرية والصحيحة تعمل أيضًا مع الأعداد المركبة:

```r
z1 = 1.5 + 2i
z2 = 2 + 1.5i

z1 + z2  # addition
#> [1] 3.5+3.5i

z1 * z2  # multiplication
#> [1] 0+6.25i

z1 / z2  # division
#> [1] 0.96+0.28i

z1^2  # exponentiation
#> [1] -1.75+6i

2^z1  # another exponentiation
#> [1] 0.518895+2.780422i
```

شرح قواعد ضرب الأعداد المركبة وقسمتها خارج نطاق هذا المفهوم (_ومن غير المرجح أن تحتاج إلى إجراء هذه العمليات «يدويًا» كثيرًا_).

أي مقدمة [رياضية][web-math-complex] أو [في الهندسة الكهربائية][web-engineering-complex] إلى الأعداد المركبة ستغطي هذا، إن أردت التعمّق في الموضوع.

بدلًا من ذلك، لدى Exercism تمرين تدريبي بعنوان [`Complex Numbers`][exercise-complex-numbers] يمكنك فيه تنفيذ صنف للأعداد المركبة يدعم هذه العمليات انطلاقًا من المبادئ الأساسية.

القسمة الصحيحة عمومًا ___غير___ ممكنة على الأعداد المركبة، لذا سيفشل العاملان `%/%` و`%%` مع النوع المركب.

## الدوال

معظم الدوال الرياضية تعمل مع المدخلات المركبة.

لكن تقديم مدخلات حقيقية وتوقّع مخرجات مركبة لن ينجح عادةً.

```r
sqrt(z1)
#> [1] 1.414214+0.707107i

sqrt(-1)  # fails!
#> Warning in sqrt(-1) : NaNs produced
#> [1] NaN

sqrt(-1 + 0i)  # succeeds with complex input
#> [1] 0+1i

sin(z1)
#> [1] 3.752771+0.256554i
```

هناك عدة دوال، إلى جانب `Re()` و`Im()`، ذات أهمية خاصة للأعداد المركبة.

- تقوم `Conj()` ببساطة بقلب إشارة الجزء التخيلي للعدد المركب (_من + إلى - أو العكس_).
  - بسبب كيفية عمل ضرب الأعداد المركبة، فإن هذا أكثر فائدة مما قد تظن.
- يُضمن أن تُرجع `abs(<complex number>)` عددًا حقيقيًا بلا جزء تخيلي («مقداره»)، و`Mod(<complex number>)` مرادف لها.
- تُرجع `Arg(<complex number>)` زاوية الطور بالراديان.

```r
z1
#> [1] 1.5+2i

abs(z1)
#> [1] 2.5

Mod(z1)  # same as previous
#> [1] 2.5

Conj(z1)  # flip sign
#> [1] 1.5-2i

Arg(z1)
#> [1] 0.9272952
```

[web-complex]: https://www.cfm.brown.edu/people/dobrush/am33/R/intro/complex0.html
[ref-atomic]: https://cran.r-project.org/doc/manuals/r-release/R-lang.html#Vectors
[ref-complex]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/complex
[web-math-complex]: https://www.nagwa.com/en/videos/143121736364/
[web-engineering-complex]: https://www.khanacademy.org/science/electrical-engineering/ee-circuit-analysis-topic/ee-ac-analysis/v/ee-complex-numbers
[ref-operators]: https://stat.ethz.ch/R-manual/R-devel/library/base/html/Syntax.html
[wiki-STEM]: https://en.wikipedia.org/wiki/Science,_technology,_engineering,_and_mathematics
[exercise-complex-numbers]: https://exercism.org/tracks/r/exercises/complex-numbers
