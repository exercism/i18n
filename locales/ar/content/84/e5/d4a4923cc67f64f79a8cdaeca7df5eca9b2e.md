# ملحق التعليمات

## وصف DSL

الرسم البياني في هذه الـ DSL هو كائن من النوع `Graph`. وهو يستقبل `list` مكوّنة من صفّ واحد أو أكثر تصف:

+ السمات
+ `Nodes`
+ `Edges`

تجد تطبيقات `Node` و`Edge` موجودة في `dot_dsl.py`.

لمزيد من التفاصيل حول التصميم المتوقع لهذه الـ DSL وأنواع الأخطاء والرسائل المتوقعة، ألقِ نظرة على حالات الاختبار في `dot_dsl_test.py`.

## رسائل الاستثناءات

أحيانًا تحتاج إلى [رفع استثناء](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). وعندما تفعل ذلك، ينبغي أن تُضمّن دائمًا **رسالة خطأ ذات معنى** توضّح مصدر الخطأ. فهذا يجعل الكود أكثر وضوحًا ويساعد كثيرًا في تصحيح الأخطاء. وفي الحالات التي تعرف فيها أن مصدر الخطأ سيكون من نوع معيّن، يمكنك أن تختار رفع أحد [أنواع الأخطاء المضمّنة](https://docs.python.org/3/library/exceptions.html#base-classes)، لكن يجب أن تُضمّن معه رسالة ذات معنى.

يتطلّب هذا التمرين تحديدًا أن تستخدم [جملة `raise`](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) لكي "ترفع" استثناء `TypeError` عندما يكون `Graph` غير صالح، واستثناء `ValueError` عندما يكون `Edge` أو `Node` أو `attribute` غير صالح. لن تنجح الاختبارات إلا إذا استخدمت `raise` مع `exception` وأضفت معه رسالة.

ولرفع خطأ مع رسالة، اكتب الرسالة كوسيط لنوع `exception`:

```python
# Graph is malformed
raise TypeError("Graph data malformed")

# Edge has incorrect values
raise ValueError("EDGE malformed")
```
