# নির্দেশনার সংযোজন

## পাইথনে এই অনুশীলনীটি কীভাবে সাজানো হয়েছে

`stacks` ও `queues` `lists`, `collections.deque`, `queue.LifoQueue` এবং `multiprocessing.Queue` দিয়ে তৈরি করা গেলেও, এই অনুশীলনীতে প্রত্যাশা করা হয় একটি ["Last in, First Out" (`LIFO`) স্ট্যাক][baeldung: the stack data structure], যা একটি _নিজে তৈরি করা_ [সিঙ্গলি লিংকড লিস্ট][singly linked list] দিয়ে বানানো:

<br>

![লিংকড লিস্ট দিয়ে তৈরি একটি স্ট্যাকের চিত্র। ড্যাশ দেওয়া বর্ডারযুক্ত New_Node নামের একটি বৃত্ত একেবারে বাম দিকের প্রান্তে আছে, এর থেকে ডান দিকে দুটি বিন্দুযুক্ত তীর রেখা নির্দেশ করছে। New_Node-এ লেখা আছে "(becomes head) - New_Node - next = node_6"। উপরের বিন্দুযুক্ত তীর রেখাটির লেবেল "push" এবং সেটি ডানে ও উপরে Node_6-এর দিকে নির্দেশ করছে। Node_6-এ লেখা আছে "(current) head - Node_6 - next = node_5"। নিচের বিন্দুযুক্ত তীর রেখাটির লেবেল "pop" এবং সেটি এমন একটি বাক্সের দিকে নির্দেশ করছে যেখানে লেখা আছে "gets removed on pop()"। Node_6 থেকে একটি নিরেট তীর ডান দিকে Node_5-এর দিকে নির্দেশ করছে, যেখানে লেখা আছে "Node_5 - next = node_4"। Node_5 থেকে একটি নিরেট তীর ডান দিকে Node_4-এর দিকে নির্দেশ করছে, যেখানে লেখা আছে "Node_4 - next = node_3"। এই ধাঁচটি চলতে থাকে Node_1 পর্যন্ত, যেখানে লেখা আছে "(current) tail - Node_1 - next = None"। Node_1 থেকে একটি বিন্দুযুক্ত তীর ডান দিকে একটি নোডের দিকে নির্দেশ করছে, যেখানে লেখা আছে "None"।](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked-list.svg)

<br>

এটিকে ডায়নামিক অ্যারে বা লিস্ট ব্যবহার করা একটি [`LIFO` স্ট্যাকের][lifo stack array] সাথে গুলিয়ে ফেলা উচিত নয়, যেটি নিচে `list`, `queue`, বা `array` ব্যবহার করতে পারে।
ডায়নামিক অ্যারে-ভিত্তিক `stacks`-এর `head` অবস্থান আলাদা এবং সময় জটিলতা (Big-O) ও মেমোরি ব্যবহারও আলাদা।

<br>

![অ্যারে/ডায়নামিক অ্যারে দিয়ে তৈরি একটি স্ট্যাকের চিত্র। ড্যাশ দেওয়া বর্ডারযুক্ত New_Node নামের একটি বাক্স একেবারে ডান দিকের প্রান্তে আছে, এর থেকে বাম দিকে দুটি বিন্দুযুক্ত তীর রেখা নির্দেশ করছে। New_Node-এ লেখা আছে "(becomes head) -  New_Node"। উপরের বিন্দুযুক্ত তীর রেখাটির লেবেল "append" এবং সেটি বামে ও উপরে Node_6-এর দিকে নির্দেশ করছে। Node_6-এ লেখা আছে "(current) head - Node_6"। নিচের বিন্দুযুক্ত তীর রেখাটির লেবেল "pop" এবং সেটি বিন্দুযুক্ত রেখার একটি বাক্সের দিকে নির্দেশ করছে যেখানে লেখা আছে "gets removed on pop()"। Node_6 থেকে একটি নিরেট তীর বাম দিকে Node_5-এর দিকে নির্দেশ করছে। Node_5 থেকে একটি নিরেট তীর বাম দিকে Node_4-এর দিকে নির্দেশ করছে। এই ধাঁচটি চলতে থাকে Node_1 পর্যন্ত, যেখানে লেখা আছে "(current) tail - Node_1"।](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked_list_array.svg)

<br>

কিছু বিবেচনার জন্য Stack Overflow-এর এই দুটি প্রশ্ন দেখুন: [অ্যারে-ভিত্তিক বনাম লিস্ট-ভিত্তিক স্ট্যাক ও কিউ][stack overflow: array-based vs list-based stacks and queues] এবং [অ্যারে স্ট্যাক, লিংকড স্ট্যাক ও স্ট্যাকের মধ্যে পার্থক্য][stack overflow: what is the difference between array stack, linked stack, and stack]।
পাইথনে লিংকড লিস্ট, `LIFO` স্ট্যাক এবং অন্যান্য অ্যাবস্ট্রাক্ট ডেটা টাইপ (`ADT`) নিয়ে আরও বিস্তারিত জানতে:

- [Baeldung: লিংকড-লিস্ট ডেটা স্ট্রাকচার][baeldung linked lists] (_একাধিক ইমপ্লিমেন্টেশন কভার করে_)
- [Geeks for Geeks: লিংকড লিস্ট দিয়ে স্ট্যাক][geeks for geeks stack with linked list]
- [অ্যাবস্ট্রাক্ট ডেটা স্ট্রাকচার নিয়ে Mosh][mosh data structures in python] (_অনেক `ADT` কভার করে, শুধু লিংকড লিস্ট নয়_)

<br>

## পাইথনে ক্লাস

পাইথনে একটি লিংকড লিস্টের "ক্যানোনিকাল" ইমপ্লিমেন্টেশনে সাধারণত এক বা একাধিক `classes` লাগে।
`classes`-এর একটি ভালো পরিচিতির জন্য দেখুন [concept:python/classes]() এবং সঙ্গের অনুশীলনী [exercise:python/ellens-alien-game](), অথবা [অফিসিয়াল পাইথন টিউটোরিয়ালের ক্লাস অংশ][classes tutorial]।

<br>

## পাইথনে বিশেষ মেথড

এই অনুশীলনীর টেস্টগুলো আপনার `LinkedList`-এর উপর `len()` কল করবে।
`len()` কাজ করার জন্য আপনাকে একটি `__len__` বিশেষ মেথড তৈরি করতে হবে।
পাইথনে বিশেষ বা "dunder" মেথড ইমপ্লিমেন্ট করার বিস্তারিত জানতে দেখুন [Python Docs: Basic Object Customization][basic customization] এবং [Python Docs: object.**len**(self)][__len__]।

<br>

## একটি ইটারেটর তৈরি করা

আপনার `LinkedList`-এর মধ্য দিয়ে লুপ করা বা উল্টো দিকে চালানোর সুবিধার জন্য আপনাকে `__iter__` বিশেষ মেথডটি ইমপ্লিমেন্ট করতে হবে।
ইমপ্লিমেন্টেশনের বিস্তারিত জানতে দেখুন [একটি ক্লাসের জন্য ইটারেটর ইমপ্লিমেন্ট করা][custom iterators]।

<br>

## এক্সসেপশন কাস্টমাইজ করা ও রেইজ করা

কখনও কখনও আপনার কোডে এক্সসেপশন [কাস্টমাইজ করা][customize errors] এবং [`raise` করা][raising exceptions] দুটোই প্রয়োজন হয়।
এটা করার সময় আপনার সবসময় একটি **অর্থবহ এরর মেসেজ** যোগ করা উচিত, যাতে বোঝা যায় এররটির উৎস কী।
এতে আপনার কোড আরও পাঠযোগ্য হয় এবং ডিবাগিংয়ে অনেক সাহায্য করে।

নতুন এক্সসেপশন ক্লাসের মাধ্যমে কাস্টম এক্সসেপশন তৈরি করা যায় (আরও বিস্তারিত জানতে দেখুন [`classes`][classes tutorial]), যেগুলো সাধারণত [`Exception`][exception base class]-এর সাবক্লাস হয়।

যেসব ক্ষেত্রে আপনি জানেন যে এররের উৎস নির্দিষ্ট কোনো এক্সসেপশন _টাইপ_-এর অন্তর্গত হবে, সেখানে আপনি _Exception_ ক্লাসের অধীন [`built in error types`][built-in errors]-গুলোর একটি থেকে ইনহেরিট করতে পারেন।
এররটি রেইজ করার সময়ও আপনার একটি অর্থবহ মেসেজ যোগ করা উচিত।

এই নির্দিষ্ট অনুশীলনীতে আপনার একটি _কাস্টম এক্সসেপশন_ তৈরি করা প্রয়োজন, যা আপনার লিংকড লিস্ট **খালি** থাকলে [রেইজ করা][raise statement]/"থ্রো" করা হয়।
আপনি যথাযথ এক্সসেপশন কাস্টমাইজ করলে, সেই এক্সসেপশনগুলো `raise` করলে, এবং যথাযথ এরর মেসেজ যোগ করলে তবেই টেস্টগুলো পাস করবে।

একটি সাধারণ _এক্সসেপশন_ কাস্টমাইজ করতে, `Exception` থেকে ইনহেরিট করা একটি `class` তৈরি করুন।
মেসেজসহ কাস্টম এক্সসেপশন রেইজ করার সময়, মেসেজটি `exception` টাইপের আর্গুমেন্ট হিসেবে লিখুন:

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
