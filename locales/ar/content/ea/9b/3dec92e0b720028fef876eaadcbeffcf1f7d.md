# مقدمة

*التدفق* في Factor هو أي شيء يمكنك قراءة البايتات منه أو كتابة البايتات إليه. الملفات والمقابس والمخازن المؤقتة في الذاكرة والأغلفة المخصّصة التي تصنعها بنفسك، كلها تشارك في [البروتوكول][stream-protocol] الصغير نفسه الآتي من [`io`][io].

نصفا البروتوكول هما مزيجان: `input-stream` للأشياء التي تقرأ منها، و`output-stream` للأشياء التي تكتب إليها. وينضم الصنف إلى أحدهما (أو إلى كليهما) عبر `INSTANCE: <class> input-stream`.

## القراءة والكتابة

```
stream-read1         ( stream -- elt/f )
stream-read          ( n stream -- seq/f )
stream-write1        ( elt stream -- )
stream-write         ( seq stream -- )
stream-flush         ( stream -- )
stream-element-type  ( stream -- type )
```

تُرجع `stream-read1` البايت التالي (أو `f` عند نهاية التدفق)، وتقرأ `stream-read` حتى `n` بايت. وتقابل `stream-write1` و`stream-write` هاتين الدالتين في الإخراج. وتدفع `stream-flush` المخرجات المخزّنة مؤقتًا. وتُخبر `stream-element-type` عمّا إذا كان التدفق يتعامل مع البايتات الخام (`+byte+`) أو المحارف (`+character+`).

## التنظيف باستخدام `disposable`

تحتفظ التدفقات بموارد نظام التشغيل، لذا يقترن البروتوكول بمفردات [`destructors`][destructors]. والتدفق المخصّص يرث من الصنف الأب `disposable`:

```factor
! DOCTEST: SKIP   (illustrative class definition; no runnable assertion)
USING: accessors destructors io kernel ;

TUPLE: my-stream < disposable underlying ;
INSTANCE: my-stream output-stream

: <my-stream> ( underlying -- s )
    my-stream new-disposable swap >>underlying ;

M: my-stream dispose* underlying>> dispose ;
```

`new-disposable` (في `destructors`) هو المصنع: فهو يخصّص الصف ويسجّله في إطار عمل المدمّرات حتى لا تتسبّب الاستثناءات في تسريب المورد. ويوضّح `M: <class> dispose*` *كيفية* التنظيف، أما كود المستخدم فيستدعي `dispose` (الكلمة العامة)، التي تعلّم الكائن بأنه تم التخلّص منه ثم تشغّل `dispose*`.

## الاستخدام ضمن نطاق

تشغّل `with-disposal` و`with-input-stream` و`with-output-stream` اقتباسًا مع بقاء المورد مفتوحًا، ثم تتخلّص منه عند الخروج:

```factor
USING: io io.streams.string ;

"hello" <string-reader> [ read-contents . ] with-input-stream
! => "hello"   (the reader is disposed before this line returns)
```

[io]: https://docs.factorcode.org/content/vocab-io.html
[destructors]: https://docs.factorcode.org/content/vocab-destructors.html
[stream-protocol]: https://docs.factorcode.org/content/article-stream-protocol.html
