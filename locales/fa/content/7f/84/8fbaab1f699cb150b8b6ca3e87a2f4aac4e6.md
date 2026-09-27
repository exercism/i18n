# پیوست دستورالعمل‌ها

## ساختار این تمرین در Python

هرچند `stacks` و `queues` را می‌توان با `lists`، `collections.deque`، `queue.LifoQueue` و `multiprocessing.Queue` پیاده‌سازی کرد، این تمرین انتظار یک [پشته‌ی «آخرین ورودی، اولین خروجی» (`LIFO`)][baeldung: the stack data structure] را دارد که با یک [فهرست پیوندی یک‌طرفه][singly linked list] _دست‌ساز_ ساخته شده باشد:

<br>

![نموداری که یک پشته‌ی پیاده‌سازی‌شده با فهرست پیوندی را نشان می‌دهد. دایره‌ای با حاشیه‌ی نقطه‌چین به نام New_Node در دورترین بخش سمت چپ قرار دارد و دو خط فلش نقطه‌چین به سمت راست اشاره می‌کنند. New_Node چنین خوانده می‌شود: «(becomes head) - New_Node - next = node_6». خط فلش نقطه‌چین بالایی برچسب «push» دارد و به Node_6 که بالاتر و سمت راست است اشاره می‌کند. Node_6 چنین خوانده می‌شود: «(current) head - Node_6 - next = node_5». خط فلش نقطه‌چین پایینی برچسب «pop» دارد و به جعبه‌ای اشاره می‌کند که چنین خوانده می‌شود: «gets removed on pop()». Node_6 یک فلش توپر دارد که به سمت راست به Node_5 اشاره می‌کند و Node_5 چنین خوانده می‌شود: «Node_5 - next = node_4». Node_5 فلش توپی دارد که به سمت راست به Node_4 اشاره می‌کند و Node_4 چنین خوانده می‌شود: «Node_4 - next = node_3». این الگو تا Node_1 ادامه می‌یابد که چنین خوانده می‌شود: «(current) tail - Node_1 - next = None». Node_1 فلش نقطه‌چینی دارد که به سمت راست به گره‌ای اشاره می‌کند که می‌گوید «None».](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked-list.svg)

<br>

این را نباید با [پشته‌ی `LIFO` که از یک آرایه یا فهرست پویا استفاده می‌کند][lifo stack array] اشتباه گرفت؛ آن یکی ممکن است در زیر از `list`، `queue` یا `array` بهره ببرد.
`stacks`های مبتنی بر آرایه‌ی پویا موقعیت `head` متفاوتی دارند و پیچیدگی زمانی (Big-O) و مصرف حافظه‌ی متفاوتی هم دارند.

<br>

![نموداری که یک پشته‌ی پیاده‌سازی‌شده با آرایه/آرایه‌ی پویا را نشان می‌دهد. جعبه‌ای با حاشیه‌ی نقطه‌چین به نام New_Node در دورترین بخش سمت راست قرار دارد و دو خط فلش نقطه‌چین به سمت چپ اشاره می‌کنند. New_Node چنین خوانده می‌شود: «(becomes head) -  New_Node». خط فلش نقطه‌چین بالایی برچسب «append» دارد و به Node_6 که بالاتر و سمت چپ است اشاره می‌کند. Node_6 چنین خوانده می‌شود: «(current) head - Node_6». خط فلش نقطه‌چین پایینی برچسب «pop» دارد و به جعبه‌ای با خط دور نقطه‌چین اشاره می‌کند که چنین خوانده می‌شود: «gets removed on pop()». Node_6 یک فلش توپر دارد که به سمت چپ به Node_5 اشاره می‌کند. Node_5 یک فلش توپر دارد که به سمت چپ به Node_4 اشاره می‌کند. این الگو تا Node_1 ادامه می‌یابد که چنین خوانده می‌شود: «(current) tail - Node_1».](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked_list_array.svg)

<br>

برای دیدن چند نکته‌ی قابل توجه، این دو پرسش Stack Overflow را ببینید: [پشته‌ها و صف‌های مبتنی بر آرایه در برابر مبتنی بر فهرست][stack overflow: array-based vs list-based stacks and queues] و [تفاوت‌های پشته‌ی آرایه‌ای، پشته‌ی پیوندی و پشته][stack overflow: what is the difference between array stack, linked stack, and stack].
برای جزئیات بیشتر درباره‌ی فهرست‌های پیوندی، پشته‌های `LIFO` و دیگر انواع داده‌ی انتزاعی (`ADT`) در Python:

- [Baeldung: ساختارهای داده‌ی فهرست پیوندی][baeldung linked lists] (_چندین پیاده‌سازی را پوشش می‌دهد_)
- [Geeks for Geeks: پشته با فهرست پیوندی][geeks for geeks stack with linked list]
- [Mosh: ساختارهای داده‌ی انتزاعی][mosh data structures in python] (_بسیاری از `ADT`ها را پوشش می‌دهد، نه فقط فهرست‌های پیوندی_)

<br>

## کلاس‌ها در Python

پیاده‌سازی «متعارف» یک فهرست پیوندی در Python معمولاً به یک یا چند `classes` نیاز دارد.
برای آشنایی خوب با `classes`، [concept:python/classes]() و تمرین همراه آن [exercise:python/ellens-alien-game]() را ببینید، یا [بخش کلاس‌ها در آموزش رسمی Python][classes tutorial].

<br>

## متدهای ویژه در Python

testهای این تمرین `len()` را روی `LinkedList` شما فراخوانی می‌کنند.
برای اینکه `len()` کار کند، باید یک متد ویژه‌ی `__len__` بسازید.
برای جزئیات پیاده‌سازی متدهای ویژه یا «dunder» در Python، [مستندات Python: سفارشی‌سازی پایه‌ی شیء][basic customization] و [مستندات Python: object.**len**(self)][__len__] را ببینید.

<br>

## ساخت یک تکرارکننده

برای پشتیبانی از حلقه زدن روی `LinkedList` یا معکوس کردن آن، باید متد ویژه‌ی `__iter__` را پیاده‌سازی کنید.
برای جزئیات پیاده‌سازی، [پیاده‌سازی یک تکرارکننده برای یک کلاس][custom iterators] را ببینید.

<br>

## سفارشی‌سازی و پرتاب استثناها

گاهی لازم است استثناها را هم [سفارشی کنید][customize errors] و هم [`raise`][raising exceptions] کنید. در چنین حالتی، همیشه باید یک **پیام خطای معنادار** بگنجانید تا منبع خطا را نشان دهد.
این کار code شما را خواناتر می‌کند و در debug کمک زیادی می‌کند.

استثناهای سفارشی را می‌توان از طریق کلاس‌های استثنای تازه ساخت (برای جزئیات بیشتر [`classes`][classes tutorial] را ببینید) که معمولاً زیرکلاس‌هایی از [`Exception`][exception base class] هستند.

برای موقعیت‌هایی که می‌دانید منبع خطا مشتقی از یک _نوع_ استثنای مشخص خواهد بود، می‌توانید ارث‌بری از یکی از [`built in error types`][built-in errors] زیر کلاس _Exception_ را انتخاب کنید.
هنگام پرتاب خطا، باز هم باید یک پیام معنادار بگنجانید.

این تمرین خاص می‌خواهد که یک _استثنای سفارشی_ بسازید تا وقتی فهرست پیوندی‌تان **خالی** است، [پرتاب][raise statement]/«thrown» شود.
testها فقط زمانی قبول می‌شوند که استثناهای مناسب را سفارشی کنید، آن استثناها را `raise` کنید و پیام‌های خطای مناسب را بگنجانید.

برای سفارشی‌سازی یک _استثنای_ عمومی، یک `class` بسازید که از `Exception` ارث‌بری کند.
هنگام پرتاب استثنای سفارشی همراه با یک پیام، پیام را به عنوان آرگومان به نوع `exception` بدهید:

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
