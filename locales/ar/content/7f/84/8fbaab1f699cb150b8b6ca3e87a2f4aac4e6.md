# ملحق التعليمات

## كيف يُبنى هذا التمرين في Python

بينما يمكن تنفيذ `stacks` و`queues` باستخدام `lists` و`collections.deque` و`queue.LifoQueue` و`multiprocessing.Queue`، فإن هذا التمرين يتوقع [مكدس «الأخير دخولًا، الأول خروجًا» (`LIFO`)][baeldung: the stack data structure] باستخدام [قائمة مترابطة مفردة][singly linked list] _مصنوعة يدويًا_:

<br>

![رسم توضيحي لمكدس منفَّذ بقائمة مترابطة. على أقصى الجانب الأيسر دائرة بحدود متقطعة اسمها New_Node، يتجه منها خطان منقطان بسهمين نحو اليمين. يحمل New_Node النص "(becomes head) - New_Node - next = node_6". ويحمل الخط المنقط العلوي وسم "push" ويشير إلى Node_6، أعلى وإلى اليمين. ويحمل Node_6 النص "(current) head - Node_6 - next = node_5". ويحمل الخط المنقط السفلي وسم "pop" ويشير إلى مربع يحمل النص "gets removed on pop()". من Node_6 سهم متصل يشير نحو اليمين إلى Node_5، الذي يحمل النص "Node_5 - next = node_4". ومن Node_5 سهم متصل يشير نحو اليمين إلى Node_4، الذي يحمل النص "Node_4 - next = node_3". ويتكرر هذا النمط حتى Node_1، الذي يحمل النص "(current) tail - Node_1 - next = None". ومن Node_1 سهم منقط يشير نحو اليمين إلى عقدة تقول "None".](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked-list.svg)

<br>

لا ينبغي الخلط بين هذا وبين [مكدس `LIFO` يستخدم مصفوفة أو قائمة ديناميكية][lifo stack array]، والذي قد يستخدم `list` أو `queue` أو `array` في الأسفل.
المكدسات المبنية على مصفوفة ديناميكية لها موضع `head` مختلف، ولها تعقيد زمني (Big-O) وبصمة ذاكرة مختلفان.

<br>

![رسم توضيحي لمكدس منفَّذ بمصفوفة أو مصفوفة ديناميكية. على أقصى الجانب الأيمن مربع بحدود متقطعة اسمه New_Node، يتجه منه خطان منقطان بسهمين نحو اليسار. يحمل New_Node النص "(becomes head) -  New_Node". ويحمل الخط المنقط العلوي وسم "append" ويشير إلى Node_6، أعلى وإلى اليسار. ويحمل Node_6 النص "(current) head - Node_6". ويحمل الخط المنقط السفلي وسم "pop" ويشير إلى مربع بحدود منقطة يحمل النص "gets removed on pop()". من Node_6 سهم متصل يشير نحو اليسار إلى Node_5. ومن Node_5 سهم متصل يشير نحو اليسار إلى Node_4. ويتكرر هذا النمط حتى Node_1، الذي يحمل النص "(current) tail - Node_1".](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked_list_array.svg)

<br>

راجع هذين السؤالين على Stack Overflow لبعض الاعتبارات: [المكدسات والطوابير القائمة على المصفوفات مقابل القائمة على القوائم][stack overflow: array-based vs list-based stacks and queues] و[الفرق بين مكدس المصفوفة والمكدس المترابط والمكدس][stack overflow: what is the difference between array stack, linked stack, and stack].
لمزيد من التفاصيل عن القوائم المترابطة ومكدسات `LIFO` وغيرها من أنواع البيانات المجردة (`ADT`) في Python:

- [Baeldung: بنى بيانات القوائم المترابطة][baeldung linked lists] (_يغطي عدة تنفيذات_)
- [Geeks for Geeks: المكدس بقائمة مترابطة][geeks for geeks stack with linked list]
- [Mosh عن بنى البيانات المجردة][mosh data structures in python] (_يغطي العديد من `ADT`s، وليس القوائم المترابطة فقط_)

<br>

## الأصناف في Python

يتطلب التنفيذ «القياسي» لقائمة مترابطة في Python عادةً صنفًا واحدًا أو أكثر (`classes`).
ولمقدمة جيدة عن `classes`، راجع [concept:python/classes]() والتمرين المرافق [exercise:python/ellens-alien-game]()، أو [قسم الأصناف في درس Python الرسمي][classes tutorial].

<br>

## الطرق الخاصة في Python

ستستدعي اختبارات هذا التمرين الدالة `len()` على `LinkedList` الخاص بك.
ولكي تعمل `len()`، ستحتاج إلى إنشاء طريقة خاصة باسم `__len__`.
لتفاصيل تنفيذ الطرق الخاصة أو طرق «dunder» في Python، راجع [توثيق Python: التخصيص الأساسي للكائنات][basic customization] و[توثيق Python: object.**len**(self)][__len__].

<br>

## بناء مُكرِّر

لدعم المرور عبر `LinkedList` الخاص بك أو عكسه، ستحتاج إلى تنفيذ الطريقة الخاصة `__iter__`.
راجع [تنفيذ مُكرِّر لصنف][custom iterators] لتفاصيل التنفيذ.

<br>

## تخصيص الاستثناءات ورفعها

أحيانًا تحتاج إلى كلٍّ من [تخصيص][customize errors] و[`raise`][raising exceptions] الاستثناءات في الكود.
وعندما تفعل ذلك، اجعل دائمًا **رسالة خطأ ذات معنى** تشير إلى مصدر الخطأ.
فهذا يجعل الكود أكثر قابلية للقراءة ويساعد كثيرًا في تصحيح الأخطاء.

يمكن إنشاء الاستثناءات المخصصة عبر أصناف استثناءات جديدة (راجع [`classes`][classes tutorial] لمزيد من التفاصيل) تكون عادةً أصنافًا فرعية من [`Exception`][exception base class].

وفي الحالات التي تعرف فيها أن مصدر الخطأ سيكون مشتقًا من _نوع_ استثناء معين، يمكنك أن تختار الوراثة من أحد [`built in error types`][built-in errors] ضمن صنف _Exception_.
وعند رفع الخطأ، يجب أن تُضمّن رسالة ذات معنى.

يتطلب هذا التمرين تحديدًا أن تُنشئ _استثناءً مخصصًا_ يُ[رفع][raise statement]/«يُطرح» عندما تكون قائمتك المترابطة **فارغة**.
ولن تنجح الاختبارات إلا إذا خصّصت الاستثناءات المناسبة، ورفعت تلك الاستثناءات عبر `raise`، وضمّنت رسائل خطأ مناسبة.

لتخصيص _استثناء_ عام، أنشئ `class` يرث من `Exception`.
وعند رفع الاستثناء المخصص مع رسالة، اكتب الرسالة كوسيط للنوع `exception`:

```python
# subclassing Exception to create EmptyListException
class EmptyListException(Exception):
    """Exception raised when the linked list is empty.

    message: explanation of the error.

    """
    def __init__(self, message):
        self.message = message

# raising an EmptyListException
raise EmptyListException("The list is empty.")
```

[__len__]: https://docs.python.org/3/reference/datamodel.html#object.__len__
[baeldung linked lists]: https://www.baeldung.com/cs/linked-list-data-structure
[baeldung: the stack data structure]: https://www.baeldung.com/cs/stack-data-structure
[basic customization]: https://docs.python.org/3/reference/datamodel.html#basic-customization
[built-in errors]: https://docs.python.org/3/library/exceptions.html#base-classes
[classes tutorial]: https://docs.python.org/3/tutorial/classes.html#tut-classes
[custom iterators]: https://docs.python.org/3/tutorial/classes.html#iterators
[customize errors]: https://docs.python.org/3/tutorial/errors.html#user-defined-exceptions
[exception base class]: https://docs.python.org/3/library/exceptions.html#Exception
[geeks for geeks stack with linked list]: https://www.geeksforgeeks.org/implement-a-stack-using-singly-linked-list/
[lifo stack array]: https://www.scaler.com/topics/stack-in-python/
[mosh data structures in python]: https://programmingwithmosh.com/data-structures/data-structures-in-python-stacks-queues-linked-lists-trees/
[raise statement]: https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement
[raising exceptions]: https://docs.python.org/3/tutorial/errors.html#raising-exceptions
[singly linked list]: https://blog.boot.dev/computer-science/building-a-linked-list-in-python-with-examples/
[stack overflow: array-based vs list-based stacks and queues]: https://stackoverflow.com/questions/7477181/array-based-vs-list-based-stacks-and-queues?rq=1
[stack overflow: what is the difference between array stack, linked stack, and stack]: https://stackoverflow.com/questions/22995753/what-is-the-difference-between-array-stack-linked-stack-and-stack
