# نبذة

تمثّل Python القيمتين صحيح وخطأ بالنوع [`bool`][bools]، وهو نوع فرعي من `int`. ولا يوجد في هذا النوع سوى قيمتين منطقيتين: `True` و`False`. ويمكن إسناد هاتين القيمتين إلى متغير ودمجهما باستخدام [العوامل المنطقية][boolean-operators] (`and` و`or` و`not`):


```python
>>> true_variable = True and True
>>> false_variable = True and False

>>> true_variable = False or True
>>> false_variable = False or False

>>> true_variable = not False
>>> false_variable = not True
```

تستخدم [العوامل المنطقية][boolean-operators] _التقييم قصير الدائرة_، أي أن التعبير الواقع على يمين العامل لا يُقيَّم إلا عند الحاجة.

ولكل عامل من هذه العوامل أسبقية مختلفة، إذ يُقيَّم `not` قبل `and` و`or`. ويمكن استخدام الأقواس الهلالية لتقييم جزء من التعبير قبل الأجزاء الأخرى:

```python
>>> not True and True
False

>>> not (True and False)
True
```

وتُعدّ جميع `boolean operators` ذات أسبقية أدنى من [`comparison operators`][comparisons] في Python، مثل `==` و`>` و`<` و`is` و`is not`.


## تحويل الأنواع والصدق المنطقي

تحوّل دالة `bool` ([`bool()`][bool-function]) أي كائن إلى قيمة منطقية. وبشكل افتراضي، تُرجع جميع الكائنات `True` ما لم يُعرَّف لها أن تُرجع `False`.

وهناك بعض `built-ins` التي تُعدّ دائمًا `False` بحكم التعريف:

- الثابتان `None` و`False`
- الصفر من أي _نوع رقمي_ (`int` و`float` و`complex` و`decimal` أو `fraction`)
- _المتتاليات_ و_المجموعات_ الفارغة (`str` و`list` و`set` و`tuple` و`dict` و`range(0)`)


```python
>>> bool(None)
False

>>> bool(1)
True

>>> bool(0)
False

>>> bool([1,2,3])
True

>>> bool([])
False

>>> bool({"Pig" : 1, "Cow": 3})
True

>>> bool({})
False
```

عند استخدام كائن في _سياق منطقي_، فإنه يُقيَّم بشكل شفاف على أنه _صادق_ أو _زائف_ باستخدام `bool()`:


```python
>>> a = "is this true?"
>>> b = []

# This will print "True", as a non-empty string is considered a "truthy" value
>>> if a:
...  print("True")

# This will print "False", as an empty list is considered a "falsey" value
>>> if not b:
...   print("False")
```


ويمكن للأصناف أن تحدّد كيف تُقيَّم في المواقف الصادقة إذا تجاوزت ونفّذت الطريقة `__bool__()` و/أو الطريقة `__len__()`.


## كيف تعمل القيم المنطقية من الداخل

يُنفَّذ النوع `bool` على أنه _نوع فرعي_ من _int_. وهذا يعني أن `True` _يساوي عدديًا_ `1` و`False` _يساوي عدديًا_ `0`. ويمكن ملاحظة ذلك عند مقارنتهما باستخدام _عامل التساوي_:


```python
>>> 1 == True
True

>>> 0 == False
True
```

غير أن `bools` **لا تزال مختلفة** عن `ints`، كما يظهر عند مقارنتها باستخدام _عامل الهوية_، `is`:


```python
>>> 1 is True
False

>>> 0 is False
False
```

> ملاحظة: في python >= 3.8، سيؤدي استخدام قيمة حرفية (مثل `1` أو `''` أو `[]` أو `{}`) على _الجانب الأيسر_ من `is` إلى رفع تحذير.


يُعدّ استخدام عامل التساوي لمقارنة متغير منطقي بـ`True` أو `False` [نمطًا مضادًا في Python][comparing to true in the wrong way]. وبدلًا من ذلك، ينبغي استخدام عامل الهوية `is`:


```python

>>> flag = True

# Not "Pythonic"
>>> if flag == True:
...    print("This works, but it's not considered Pythonic.")

# A better way
>>> if flag:
...    print("Pythonistas prefer this pattern as more Pythonic.")
```


[Boolean-operators]: https://docs.python.org/3/library/stdtypes.html#boolean-operations-and-or-not
[bool-function]: https://docs.python.org/3/library/functions.html#bool
[bools]: https://docs.python.org/3/library/stdtypes.html#typebool
[comparing to true in the wrong way]: https://docs.quantifiedcode.com/python-anti-patterns/readability/comparison_to_true.html
[comparisons]: https://docs.python.org/3/library/stdtypes.html#comparisons
