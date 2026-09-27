# مقدمة

تختار `case` (في [`combinators`][combinators]) بناءً على قيمة من خلال المرور على قائمة اقترانية من البنود وتنفيذ جسم أول بند مطابق.

```
case ( obj assoc -- )
```

```factor
USING: combinators ;

: name-of ( n -- s )
    {
        { 1 [ "one" ] }
        { 2 [ "two" ] }
        [ drop "many" ]
    } case ;
```

كل بند على الصورة `{ value [ body ] }`، وتُحدَّد المساواة بواسطة `=`. تُنفَّذ البنود المطابقة بينما تكون قيمة الإدخال *قد استُهلكت بالفعل*. والبند الأخير `[ body ]` (بدون قيمة) هو البند الافتراضي؛ فهو يُنفَّذ بينما تكون قيمة الإدخال *لا تزال* على المكدس، لذا يبدأ الجسم عادةً بـ `drop`.

[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
