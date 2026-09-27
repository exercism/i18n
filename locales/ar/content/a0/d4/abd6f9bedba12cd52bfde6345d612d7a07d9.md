# ملحق التعليمات

## رسائل الاستثناء

أحيانًا قد تحتاج إلى [رفع استثناء](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). وعندما تفعل ذلك، ينبغي أن تُضمّن دائمًا **رسالة خطأ ذات معنى** تشير إلى مصدر الخطأ. فهذا يجعل الكود أكثر قابلية للقراءة، ويساعد كثيرًا في تصحيح الأخطاء. وفي الحالات التي تعرف فيها أن مصدر الخطأ سيكون من نوع معين، يمكنك أن تختار رفع أحد [أنواع الأخطاء المدمجة](https://docs.python.org/3/library/exceptions.html#base-classes)، لكن يجب أن تُضمّن معه رسالة ذات معنى.

يتطلب هذا التمرين تحديدًا أن تستخدم [عبارة `raise`](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) لكي "تطلق" `ValueError` عندما يكون مُدخل المربع خارج النطاق. ولن تنجح الاختبارات إلا إذا قمت بـ`raise` للـ`exception` وضمّنت معها رسالة.

لرفع `ValueError` مع رسالة، اكتب الرسالة كوسيط لنوع `exception`:

```python
# when the square value is not in the acceptable range        
raise ValueError("square must be between 1 and 64")
```
