# ملحق التعليمات

## تعليمات Arturo

في هذا التمرين، ستحتاج إلى دعم أسلوبين مختلفين لاستدعاء الكلمة `stringify`:

1. مع السمة `roman` (مثال: `stringify.roman 3999`)
2. بدون السمة `roman` (مثال: `stringify 3999`)

لمزيد من المعلومات، اطّلع على توثيق [السمات][attributes] وكذلك توثيق [`attr`][attr].

~~~~exercism/caution
بالإضافة إلى `attr`، فإن الدالة `attrs` مفيدة: فهي تُرجع كل سمات استدعاء الدالة على هيئة قاموس.

احذر، فهاتان الدالتان مُدمِّرتان!

يستخدم تطبيق Arturo ["جدول سمات"][createAttrsStack].

* تُفرِّغ `attrs` [الجدول صراحةً][getAttrsDict] بعد استرجاع السمات.
* و`attr` [تحذف السمة من الجدول ("تقتلعها")][builtinAttr].

مثال:

```arturo
showAttributes: function [x][
    print attr 'question
    print attrs
    print attrs
]

showAttributes .question:"6 * 9" .answer:42 'arg
```
فتُخرِج
```
6 * 9
[answer:42]
[]
```

في كل خطوة، نرى قاموس السمات يتقلّص.

**الخلاصة**: اعلم أنك لا تستطيع جلب السمات إلا مرة واحدة.
إذا احتجت إلى الرجوع إلى السمات، فالتقطها في بداية دوالك.

[getAttrsDict]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L187
[builtinAttr]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/library/Reflection.nim#L85
[createAttrsStack]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L136
~~~~

[attributes]: https://arturo-lang.io/documentation/language/#attributes
[attr]: https://arturo-lang.io/documentation/library/reflection/attr/
