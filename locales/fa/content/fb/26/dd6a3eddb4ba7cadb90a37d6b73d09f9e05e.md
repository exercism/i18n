# پیوست دستورالعمل‌ها

## دستورالعمل‌های Arturo

در این تمرین، باید از دو روش مختلف برای فراخوانی واژه‌ی `stringify` پشتیبانی کنید:

1. همراه با ویژگی `roman` (برای مثال `stringify.roman 3999`)
2. بدون ویژگی `roman` (برای مثال `stringify 3999`)

برای اطلاعات بیشتر، مستندات [ویژگی‌ها][attributes] و همچنین مستندات [`attr`][attr] را ببینید.

~~~~exercism/caution
علاوه بر `attr`، تابع `attrs` هم مفید است: همه‌ی ویژگی‌های فراخوانی تابع را به‌صورت یک دیکشنری برمی‌گرداند.

دقت کنید که این دو تابع مخرب هستند!

پیاده‌سازی Arturo از یک [«جدول ویژگی‌ها»][createAttrsStack] استفاده می‌کند.

* `attrs` بعد از بازیابی ویژگی‌ها، [جدول را به‌صراحت خالی می‌کند][getAttrsDict].
* `attr` [ویژگی را از جدول حذف («pop») می‌کند][builtinAttr].

یک مثال:

```arturo
showAttributes: function [x][
    print attr 'question
    print attrs
    print attrs
]

showAttributes .question:"6 * 9" .answer:42 'arg
```
خروجی:

```
6 * 9
[answer:42]
[]
```

در هر مرحله می‌بینیم که دیکشنری ویژگی‌ها کوچک‌تر می‌شود.

**نتیجه**: توجه داشته باشید که ویژگی‌ها را فقط یک بار می‌توانید بازیابی کنید.
اگر لازم است بعداً به ویژگی‌ها مراجعه کنید، آن‌ها را در ابتدای توابع خود ذخیره کنید.

[getAttrsDict]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L187
[builtinAttr]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/library/Reflection.nim#L85
[createAttrsStack]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L136
~~~~

[attributes]: https://arturo-lang.io/documentation/language/#attributes
[attr]: https://arturo-lang.io/documentation/library/reflection/attr/
