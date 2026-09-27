# تلميحات

## 1. حدّد ما إذا كنت ستحتاج إلى رخصة قيادة

- استخدم [عامل المساواة الصارمة][mdn-equality-operators] للتحقق مما إذا كان مُدخلك يساوي سلسلة نصية معينة.
- استخدم أحد [العاملين المنطقيين][mdn-logical-operators] الذين تعلمتهما في مفهوم القيمة المنطقية لدمج الشرطين.
- لست بحاجة إلى جملة شرطية لحل هذه المهمة. يمكنك إرجاع التعبير المنطقي الذي تبنيه مباشرة.

## 2. اختر بين سيارتين محتملتين للشراء

- استخدم [عاملًا علائقيًا][mdn-relational-operators] لتحديد أي الخيارين يأتي أولًا في الترتيب المعجمي.
- ثم اضبط قيمة متغير مساعد بناءً على نتيجة تلك المقارنة بمساعدة [جملة `if-else` الشرطية][mdn-if-statement].
- أخيرًا، ابنِ جملة التوصية. لذلك يمكنك استخدام [عامل الجمع][mdn-addition] لدمج السلسلتين النصيتين.

## 3. احسب تقديرًا لسعر سيارة مستعملة

- ابدأ بتحديد النسبة المئوية بناءً على عمر السيارة، واحفظها في متغير مساعد. استخدم [جملة `if-else if-else` الشرطية][mdn-if-statement] كما ورد في التعليمات.
- في شرطَي `if`، استخدم [العاملين العلائقيين][mdn-relational-operators] لمقارنة عمر السيارة بقيم الحدود.
- لحساب النتيجة، طبّق النسبة المئوية على السعر الأصلي. على سبيل المثال، يمكن حساب `30% of x` بقسمة `30` على `100` ثم الضرب في `x`.

[mdn-equality-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#equality_operators
[mdn-logical-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#binary_logical_operators
[mdn-relational-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#relational_operators
[mdn-addition]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition
[mdn-if-statement]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
