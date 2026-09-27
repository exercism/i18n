# تلميحات

## عام

- تعتمد جميع أجزاء هذا التمرين على العمليات على مستوى البت.
  - يوفّر [منهج التعلّم][concept-bitwise-operations] في Exercism مقدمة لطيفة.
  - [العوامل على مستوى البت][ref-bitwise-operators] مذكورة في دليل Julia.
  - تحتوي `Base` على دوال مفيدة متنوعة متعلقة بالبتات، منها [count_ones()][count_ones] و[trailing_zeros()][trailing_zeros].
- تحاول الاختبارات ألّا تفرض أنواعًا محددة، لكن التمرين يتعلق بالبايتات غير الموقّعة، ويسهل نسبيًا التفكير في قيم [`UInt8`][uint8].
  - الوسائط والقيم المُرجَعة من النوع `Vector{UInt8}`،
  - قيم `UInt8` مفيدة في أقنعة البتات والقيم الوسيطة.
- الأعداد العشرية ستشتّت الانتباه، لذا فضّل النظام الست عشري (`0xFF`) أو الثنائي (`0b11111111`) في القيم الحرفية من النوع `UInt8`.
  - قد تكون دالة [`bitstring()`][bitstring] مفيدة في تصحيح الأخطاء، فهي تُخرج تنسيقًا ثنائيًا يسهل على الإنسان قراءته.
- تصل الرسالة الخام على هيئة متجه من قطع بطول 8 بتات، ويلزم تحويلها إلى قطع بطول 7 بتات في البتات الأعلى أهمية، مع بت تكافؤ في البت الأقل أهمية.
  - استخدم أقنعة البتات مع `&` أو `|` لعزل البتات التي تريدها.
  - عاملا الإزاحة إلى اليسار (`<<`) والإزاحة المنطقية إلى اليمين (`>>>`) مهمّان.
  - خطّط لطريقة تنقل بها البتات الزائدة إلى الجولة التالية من المعالجة.
  - يجعل الترحيل من الصعب معالجة بايتات الإدخال كلٌّ على حدة، لذا فإن استخدام الحلقات (أو ربما الاستدعاء الذاتي) أسهل على الأرجح من محاولة استخدام الدوال عالية الرتبة.
  - الرسائل المُرمَّزة أطول عادةً (بايتات أكثر) من الرسالة الخام، لاستيعاب بت تكافؤ لكل بايت.


  [concept-bitwise-operations]: https://exercism.org/tracks/julia/concepts/bitwise-operations
  [ref-bitwise-operators]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
  [count_ones]: https://docs.julialang.org/en/v1/base/numbers/#Base.count_ones
  [trailing_zeros]: https://docs.julialang.org/en/v1/base/numbers/#Base.trailing_zeros
  [uint8]: https://docs.julialang.org/en/v1/base/numbers/#Core.UInt8
  [bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
