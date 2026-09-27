# التعليمات

أنت مدير مطعم فاخر يمتلك قبو نبيذ واسعًا. كثير من عملائك من عشّاق النبيذ المتطلبين. العثور على زجاجة النبيذ المناسبة لعميل بعينه ليس مهمة سهلة.

وبصفتك صاحب مطعم ملمًّا بالتقنية، قررت تسريع عملية اختيار النبيذ عبر كتابة تطبيق يتيح للضيوف تصفية النبيذ حسب تفضيلاتهم.

## 1. احصل على كل النبيذ ذي اللون المعيّن

تُمثَّل زجاجة النبيذ بنوع مخصص، ويُخزَّن النبيذ في مصفوفة.

```gleam
[
  Wine("Chardonnay", 2015, "Italy", White),
  Wine("Pinot grigio", 2017, "Germany", White),
  Wine("Pinot noir", 2016, "France", Red),
  Wine("Dornfelder", 2018, "Germany", Rose)
]
```

نفّذ الدالة `wines_of_color`. يجب أن تأخذ مصفوفة من النبيذ وتُرجع كل النبيذ ذي اللون المعيّن.

```gleam
wines_of_color(
  [
    Wine("Chardonnay", 2015, "Italy", White),
    Wine("Pinot grigio", 2017, "Germany", White),
    Wine("Pinot noir", 2016, "France", Red),
    Wine("Dornfelder", 2018, "Germany", Rose)
  ],
  color: White
)
// -> [
//   Wine("Chardonnay", 2015, "Italy", White),
//   Wine("Pinot grigio", 2017, "Germany", White),
// ]
```

## 2. احصل على كل زجاجات النبيذ في بلد معيّن

نفّذ الدالة `wines_from_country`. يجب أن تأخذ مصفوفة من النبيذ وتُرجع كل النبيذ القادم من بلد معيّن.

```gleam
wines_from_country(
  [
    Wine("Chardonnay", 2015, "Italy", White),
    Wine("Pinot grigio", 2017, "Germany", White),
    Wine("Pinot noir", 2016, "France", Red),
    Wine("Dornfelder", 2018, "Germany", Rose)
  ],
  country: "Germany"
)
// -> [
//   Wine("Dornfelder", 2018, "Germany", Rose)
// ]
```

## 3. احصل على كل النبيذ ذي اللون المعيّن المعبأ في بلد معيّن

نفّذ الدالة `filter`. يجب أن تأخذ مصفوفة من النبيذ ولونًا وبلدًا، وتُرجع كل النبيذ ذي اللون المعيّن المعبأ في البلد المعيّن.

```gleam
filter(
  [
    Wine("Chardonnay", 2015, "Italy", White),
    Wine("Pinot grigio", 2017, "Germany", White),
    Wine("Pinot noir", 2016, "France", Red),
    Wine("Dornfelder", 2018, "Germany", Rose)
  ],
  color: White
  country: "Italy"
)
// -> [
//   Wine("Chardonnay", 2015, "Italy", White),
// ]
```
