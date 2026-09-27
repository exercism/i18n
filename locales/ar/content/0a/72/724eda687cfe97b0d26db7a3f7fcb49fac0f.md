# روبوت الحفلات غريب الأطوار

## القصة

كان يا ما كان مبرمج غريب الأطوار يعيش في بيت غريب ذي نوافذ مُقضّبة. وفي أحد الأيام، قبل عملًا من منصة وظائف على الإنترنت لبناء روبوت حفلات. المفترض أن يحيّي الروبوت الناس ويساعدهم على الوصول إلى مقاعدهم. وكانت الإضافة الأولى تقنية بحتة، وكشفت عن افتقار المبرمج إلى التفاعل البشري. وقد انتهى بعضها أيضًا إلى النسخة النهائية.

## المهام

- رحّب بكل شخص بهذه العبارة:

```
Welcome to my party, <name>!
```

- الضيف الذي يصادف اليوم عيد ميلاده يُرحَّب به على النحو التالي لإظهار معرفة الروبوت بكل ضيف:

```
Happy birthday <name>! You are now <age> years old!
Welcome to my party!
```

- من يطلب مقعده تُقدَّم له إرشادات للوصول إلى طاولته بهذه العبارة:

```
Welcome to my party, <name>!
You have been assigned to table <table-number-in-hex>. Your table is <direction>, exactly <distance-float> meters from here.
You will be sitting next to <neighbour-name>!
```

## التنفيذات

- [Go: السلاسل النصية][implementation-go] (التنفيذ المرجعي)

## المراجع

- [`types/string`][types-string]

[types-string]: https://github.com/exercism/v3/blob/main/reference/types/string.md
[implementation-go]: https://github.com/exercism/go/blob/main/exercises/concept/strings/.docs/instructions.md
