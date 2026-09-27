# ملحق التعليمات

## رسائل الاستثناء

أحيانًا تحتاج إلى [رفع استثناء](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). وعندما تفعل ذلك، يجب أن تُضمّن دائمًا **رسالة خطأ ذات معنى** تشير إلى مصدر الخطأ. فهذا يجعل الكود أكثر قابلية للقراءة ويساعد كثيرًا في تصحيح الأخطاء. وإذا كنت تعرف أن مصدر الخطأ سيكون من نوع معيّن، فيمكنك اختيار رفع أحد [أنواع الأخطاء المدمجة](https://docs.python.org/3/library/exceptions.html#base-classes)، لكن يجب مع ذلك أن تُضمّن رسالة ذات معنى.

يتطلب هذا التمرين تحديدًا أن تستخدم [جملة `raise`](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) لكي «ترمي» استثناء `ValueError` عندما تتلقى الدالة `prime()` مدخلات غير صالحة. ولأن هذا التمرين يتعامل مع الأعداد _الموجبة_ فقط، فأي عدد أصغر من 1 يُعد غير صالح. لن تنجح الاختبارات إلا إذا استخدمت `raise` ورفعت `exception` وأضفت معه رسالة.

ولرفع `ValueError` مع رسالة، اكتب الرسالة كوسيط لنوع `exception`:

```python
# when the prime function receives malformed input
raise ValueError('there is no zeroth prime')
```
