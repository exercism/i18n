# निर्देश परिशिष्ट

## Python में इस अभ्यास का ढाँचा

`stacks` और `queues` को `lists`, `collections.deque`, `queue.LifoQueue` और `multiprocessing.Queue` की मदद से बनाया जा सकता है, लेकिन इस अभ्यास में एक ["लास्ट इन, फर्स्ट आउट" (`LIFO`) स्टैक][baeldung: the stack data structure] चाहिए, जो _खुद बनाई गई_ [सिंगली लिंक्ड लिस्ट][singly linked list] पर आधारित हो:

<br>

![लिंक्ड लिस्ट से बनाए गए स्टैक को दिखाने वाला चित्र। सबसे बाईं ओर New_Node नाम का एक बिंदुदार किनारे वाला वृत्त है, जिससे दो बिंदुदार तीर रेखाएँ दाईं ओर इशारा करती हैं। New_Node पर लिखा है "(becomes head) - New_Node - next = node_6"। ऊपर वाली बिंदुदार तीर रेखा पर "push" लिखा है और वह ऊपर-दाईं ओर Node_6 की ओर इशारा करती है। Node_6 पर लिखा है "(current) head - Node_6 - next = node_5"। नीचे वाली बिंदुदार तीर रेखा पर "pop" लिखा है और वह एक डिब्बे की ओर इशारा करती है जिस पर लिखा है "gets removed on pop()"। Node_6 से एक ठोस तीर दाईं ओर Node_5 की ओर जाता है, जिस पर लिखा है "Node_5 - next = node_4"। Node_5 से एक ठोस तीर दाईं ओर Node_4 की ओर जाता है, जिस पर लिखा है "Node_4 - next = node_3"। यही क्रम Node_1 तक चलता है, जिस पर लिखा है "(current) tail - Node_1 - next = None"। Node_1 से एक बिंदुदार तीर दाईं ओर एक नोड की ओर जाता है जिस पर लिखा है "None"।](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked-list.svg)

<br>

इसे उस [`LIFO` स्टैक जो डायनामिक ऐरे या लिस्ट पर बनाया जाता है][lifo stack array] से नहीं मिलाना चाहिए; ऐसे स्टैक के अंदर `list`, `queue` या `array` इस्तेमाल हो सकते हैं।
डायनामिक ऐरे पर आधारित `stacks` में `head` की जगह अलग होती है, और समय जटिलता (Big-O) तथा मेमोरी की खपत भी अलग होती है।

<br>

![ऐरे/डायनामिक ऐरे से बनाए गए स्टैक को दिखाने वाला चित्र। सबसे दाईं ओर New_Node नाम का एक बिंदुदार किनारे वाला डिब्बा है, जिससे दो बिंदुदार तीर रेखाएँ बाईं ओर इशारा करती हैं। New_Node पर लिखा है "(becomes head) -  New_Node"। ऊपर वाली बिंदुदार तीर रेखा पर "append" लिखा है और वह ऊपर-बाईं ओर Node_6 की ओर इशारा करती है। Node_6 पर लिखा है "(current) head - Node_6"। नीचे वाली बिंदुदार तीर रेखा पर "pop" लिखा है और वह एक बिंदुदार डिब्बे की ओर इशारा करती है जिस पर लिखा है "gets removed on pop()"। Node_6 से एक ठोस तीर बाईं ओर Node_5 की ओर जाता है। Node_5 से एक ठोस तीर बाईं ओर Node_4 की ओर जाता है। यही क्रम Node_1 तक चलता है, जिस पर लिखा है "(current) tail - Node_1"।](https://assets.exercism.org/images/tracks/python/simple-linked-list/linked_list_array.svg)

<br>

कुछ बातों पर ध्यान देने के लिए Stack Overflow के ये दो सवाल देखिए: [ऐरे पर आधारित बनाम लिस्ट पर आधारित स्टैक और क्यू][stack overflow: array-based vs list-based stacks and queues] और [ऐरे स्टैक, लिंक्ड स्टैक और स्टैक में क्या अंतर है][stack overflow: what is the difference between array stack, linked stack, and stack]।
लिंक्ड लिस्ट, `LIFO` स्टैक और Python में दूसरे एब्सट्रैक्ट डेटा टाइप (`ADT`) के बारे में अधिक जानकारी के लिए:

- [Baeldung: लिंक्ड-लिस्ट डेटा स्ट्रक्चर][baeldung linked lists] (_इसमें कई तरीके शामिल हैं_)
- [Geeks for Geeks: लिंक्ड लिस्ट से बनाया गया स्टैक][geeks for geeks stack with linked list]
- [Mosh: एब्सट्रैक्ट डेटा स्ट्रक्चर][mosh data structures in python] (_इसमें सिर्फ लिंक्ड लिस्ट ही नहीं, कई `ADT` शामिल हैं_)

<br>

## Python में क्लास

Python में लिंक्ड लिस्ट बनाने का "मानक" तरीका आमतौर पर एक या अधिक `classes` चाहता है।
`classes` की अच्छी शुरुआत के लिए [concept:python/classes]() और उसके साथ वाला अभ्यास [exercise:python/ellens-alien-game]() देखिए, या [ऑफिशियल Python ट्यूटोरियल का क्लास वाला हिस्सा][classes tutorial] देखिए।

<br>

## Python में स्पेशल मेथड

इस अभ्यास के टेस्ट आपकी `LinkedList` पर `len()` कॉल करेंगे।
`len()` के काम करने के लिए आपको एक `__len__` स्पेशल मेथड बनाना होगा।
Python में स्पेशल या "डंडर" मेथड लागू करने का ब्यौरा [Python डॉक्स: बेसिक ऑब्जेक्ट कस्टमाइज़ेशन][basic customization] और [Python डॉक्स: object.**len**(self)][__len__] में देखिए।

<br>

## इटरेटर बनाना

अपनी `LinkedList` पर लूप चलाने या उसे उलटने के लिए आपको `__iter__` स्पेशल मेथड लागू करना होगा।
इसे लागू करने का तरीका [किसी क्लास के लिए इटरेटर लागू करना][custom iterators] में देखिए।

<br>

## एक्सेप्शन कस्टमाइज़ करना और उन्हें उठाना

कभी-कभी अपने कोड में एक्सेप्शन को [कस्टमाइज़][customize errors] करना और उन्हें [`raise`][raising exceptions] करना, दोनों ज़रूरी हो जाते हैं।
ऐसा करते समय आपको हमेशा एक **अर्थपूर्ण एरर मैसेज** देना चाहिए, जिससे पता चले कि एरर की जड़ कहाँ है।
इससे आपका कोड पढ़ने में आसान हो जाता है और डीबग करने में काफी मदद मिलती है।

कस्टम एक्सेप्शन नई एक्सेप्शन क्लास बनाकर बनाए जा सकते हैं (अधिक जानकारी के लिए [`classes`][classes tutorial] देखिए), जो आमतौर पर [`Exception`][exception base class] की सबक्लास होती हैं।

जहाँ आपको पता हो कि एरर की जड़ किसी खास एक्सेप्शन _टाइप_ से निकली है, वहाँ आप _Exception_ क्लास के अंदर दिए गए [`built in error types`][built-in errors] में से किसी एक को इनहेरिट कर सकते हैं।
एरर उठाते समय भी आपको अर्थपूर्ण मैसेज देना चाहिए।

इस अभ्यास में आपको एक _कस्टम एक्सेप्शन_ बनाना है, जिसे आपकी लिंक्ड लिस्ट के **खाली** होने पर [उठाना][raise statement] यानी "थ्रो" करना है।
टेस्ट तभी पास होंगे जब आप उचित एक्सेप्शन कस्टमाइज़ करेंगे, उन्हें `raise` करेंगे और उचित एरर मैसेज देंगे।

किसी सामान्य _एक्सेप्शन_ को कस्टमाइज़ करने के लिए ऐसी `class` बनाइए जो `Exception` से इनहेरिट करे।
कस्टम एक्सेप्शन को किसी मैसेज के साथ उठाते समय मैसेज को `exception` टाइप का आर्गुमेंट बनाकर लिखिए:

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
