# निर्देश परिशिष्ट

## DSL का विवरण

इस DSL में ग्राफ `Graph` टाइप का एक ऑब्जेक्ट होता है। यह एक या अधिक टपल की एक `list` लेता है, जो इनका वर्णन करते हैं:

+ एट्रिब्यूट
+ `Nodes`
+ `Edges`

`Node` और `Edge` के इम्प्लीमेंटेशन `dot_dsl.py` में दिए गए हैं।

DSL के अपेक्षित डिज़ाइन और अपेक्षित एरर टाइपों तथा संदेशों की अधिक जानकारी के लिए `dot_dsl_test.py` में दिए गए टेस्ट केस देखिए।


## एक्सेप्शन संदेश

कभी-कभी [एक्सेप्शन उठाना](https://docs.python.org/3/tutorial/errors.html#raising-exceptions) आवश्यक होता है। ऐसा करते समय आपको हमेशा एक **अर्थपूर्ण एरर संदेश** शामिल करना चाहिए, ताकि पता चले कि एरर का स्रोत क्या है। इससे आपका कोड पढ़ने में आसान हो जाता है और डिबगिंग में काफी मदद मिलती है। ऐसी स्थितियों में, जहाँ आप जानते हैं कि एरर का स्रोत कोई निश्चित टाइप होगा, आप [पहले से मौजूद एरर टाइप](https://docs.python.org/3/library/exceptions.html#base-classes) में से कोई एक उठाना चुन सकते हैं, लेकिन तब भी एक अर्थपूर्ण संदेश ज़रूर शामिल कीजिए।

इस अभ्यास में आपको [raise स्टेटमेंट](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) से एक `TypeError` "फेंकना" होता है, जब `Graph` ठीक से नहीं बना हो, और जब `Edge`, `Node` या `attribute` ठीक से नहीं बना हो, तब एक `ValueError` फेंकना होता है। टेस्ट तभी पास होंगे जब आप `exception` को `raise` करें और उसके साथ एक संदेश भी दें।

किसी एरर को संदेश के साथ उठाने के लिए संदेश को `exception` टाइप के आर्गुमेंट के रूप में लिखिए:

```python
# Graph is malformed
raise TypeError("Graph data malformed")

# Edge has incorrect values
raise ValueError("EDGE malformed")
```
