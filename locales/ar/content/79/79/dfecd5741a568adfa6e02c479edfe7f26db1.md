# ملحق التعليمات


## كيف يُنفَّذ هذا التمرين في مسار Python


تتوقّع اختبارات هذا التمرين أن تُنفَّذ ساعتك على هيئة `class` باسم `Clock`.
إذا لم تكن معتادًا على الأصناف في Python، فإن [concept:python/classes]() و[الأصناف][classes in python] (_من توثيق Python_) نقطتان جيدتان للبدء.


## تمثيل صنفك

عند العمل مع [الكائنات][what-is-an-object] وتصحيح أخطائها، من المهم أن يكون لديك تمثيل جيد لهذا الكائن.
على سبيل المثال، إذا أنشأت كائنًا جديدًا من [`datetime.datetime`][datetime] في بيئة [REPL][REPL] الخاصة بـ Python، فيمكنك عرض [تمثيل السلسلة النصية][str-rep-classes] الخاص به:


```python
>>> from datetime import datetime
>>> new_date = datetime(2022, 5, 4)
>>> new_date
datetime.datetime(2022, 5, 4, 0, 0)
```

ينبغي أن يُنشئ `class` الساعة `object` مخصصًا يتعامل مع الأوقات _بدون_ تواريخ.
أحد الجوانب المهمة في `class` هذا هو كيفية تمثيله على هيئة _سلسلة نصية_.
سيعتمد المبرمجون الآخرون الذين يستخدمون أو يستدعون `objects` الساعة المنشأة من `class` الساعة على تمثيل السلسلة النصية هذا عند تصحيح الأخطاء والقيام بأنشطة أخرى.
لكن التمثيل الافتراضي في `class` مخصص ليس مفيدًا كثيرًا:


```python
>>> Clock(12, 34)
<Clock object st 0x102807b20 >
```

لإنشاء تمثيل أكثر فائدة، يمكنك تعريف [`__repr__`][repr-method]، وهي [طريقة خاصة][dunder-methods]، على `class`.

من المثالي أن تُرجع طريقة `__repr__` تلك كود Python صالحًا يمكن استخدامه لإعادة إنشاء الكائن عند تمريره إلى [`eval()`][eval-built-in]، على النحو الموضّح في [مواصفات طريقة `__repr__`][repr-docs].
إرجاع كود Python صالح يتيح لمبرمج آخر نسخ `str` ولصقه مباشرةً في الكود أو في REPL.
قد يبدو `Clock` الذي يمثّل 11:30 صباحًا هكذا:

```python
 `Clock(11, 30)`
```

تعريف طريقة `__repr__` ممارسة جيدة لجميع الأصناف المخصصة.
بعض الأمور الإضافية التي ينبغي مراعاتها:

- ينبغي أن تكون المعلومات التي تُرجعها هذه الطريقة مفيدة عند تصحيح المشكلات.
- _من المثالي_ أن تُرجع الطريقة سلسلة نصية تمثّل كود Python صالحًا، وإن لم يكن ذلك ممكنًا دائمًا.
- إذا لم يكن إرجاع كود Python صالح عمليًا، فالعُرف هو إرجاع وصف بين الأقواس الزاوية: `< ...a practical description... >`.


### تحويل السلسلة النصية

بالإضافة إلى طريقة `__repr__`، قد تحتاج أيضًا إلى تمثيل بديل للسلسلة النصية خاص بـ `class` يكون "مقروءًا للبشر".
قد يُستخدم هذا لتنسيق الكائن لمخرجات البرنامج أو للتوثيق.
ويتم ذلك بكتابة طريقة خاصة هي [`__str__`][str-dunder].
ولننظر إلى `datetime.datetime` مرة أخرى:


```python
>>> str(datetime.datetime(2022, 5, 4))
'2022-05-04 00:00:00'
```

عندما يُطلب من كائن `datetime` أن يحوّل نفسه إلى سلسلة نصية، فإنه يُرجع `str` منسّقًا وفقًا لـ[معيار ISO 8601][ISO 8601]، وهو ما يمكن لمعظم مكتبات `datetime` تحليله إلى تاريخ ووقت مقروءين للبشر.

في هذا التمرين، ستتاح لك فرصة كتابة طريقة `__str__` لساعتك، وكذلك طريقة `__repr__`.

```python
>>> str(Clock(11, 30))
'11:30'
```

لدعم تحويل السلسلة النصية هذا، ستحتاج إلى إنشاء طريقة `__str__` خاصة على `class` الخاص بك، تُرجع سلسلة نصية أكثر "قابلية للقراءة" تعرض وقت الساعة.

إذا لم تُنشئ طريقة `__str__` واستدعيت `str()` على صنفك، فسيحاول Python استدعاء `__repr__` على صنفك كخيار احتياطي.
لذا إذا نفّذت واحدة فقط من هاتين الطريقتين الخاصتين، فمن الأفضل إنشاء `__repr__` بدلًا من `__str__` فقط.


[ISO 8601]: https://www.iso.org/iso-8601-date-and-time-format.html
[REPL]: https://pythonprogramminglanguage.com/repl/
[classes in python]: https://docs.python.org/3/tutorial/classes.html
[datetime]: https://docs.python.org/3/library/datetime.html#available-types
[dunder-methods]: https://www.pythonmorsels.com/every-dunder-method/
[eval-built-in]: https://docs.python.org/3/library/functions.html#eval
[repr-docs]: https://docs.python.org/3/reference/datamodel.html#object.__repr__
[repr-method]: https://docs.python.org/3/library/functions.html#repr
[str-dunder]: https://docs.python.org/3/reference/datamodel.html#object.__str__
[str-rep-classes]: https://www.digitalocean.com/community/tutorials/python-str-repr-functions#introduction
[what-is-an-object]: https://realpython.com/ref/glossary/object/
