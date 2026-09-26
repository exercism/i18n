# निर्देश परिशिष्ट


## Python ट्रैक के लिए यह अभ्यास कैसे लागू किया गया है


इस अभ्यास के टेस्ट यह अपेक्षा करते हैं कि आपकी घड़ी एक Clock `class` में बनाई जाएगी।
अगर आप Python में क्लास से परिचित नहीं हैं, तो [concept:python/classes]() और [क्लास][classes in python] (_Python के दस्तावेज़ों से_) शुरुआत करने के लिए अच्छी जगहें हैं।


## अपनी क्लास का प्रतिनिधित्व

[ऑब्जेक्ट][what-is-an-object] के साथ काम करते समय और उनमें गलतियाँ ढूँढते समय, उस ऑब्जेक्ट का अच्छा प्रतिनिधित्व होना ज़रूरी है।
उदाहरण के लिए, अगर आप Python के [REPL][REPL] वातावरण में एक नया [`datetime.datetime`][datetime] ऑब्जेक्ट बनाएँ, तो आप उसका [स्ट्रिंग प्रतिनिधित्व][str-rep-classes] देख सकते हैं:


```python
>>> from datetime import datetime
>>> new_date = datetime(2022, 5, 4)
>>> new_date
datetime.datetime(2022, 5, 4, 0, 0)
```

आपकी Clock `class` को एक ऐसा कस्टम `object` बनाना चाहिए जो समय को _तारीख़ों के बिना_ संभालता है।
इस `class` का एक ज़रूरी पहलू यह होगा कि इसे एक _स्ट्रिंग_ के रूप में कैसे दिखाया जाता है।
जो अन्य प्रोग्रामर Clock `class` से बने Clock `objects` इस्तेमाल करते हैं या उन्हें कॉल करते हैं, वे गलतियाँ ढूँढने और दूसरे कामों के लिए इस स्ट्रिंग प्रतिनिधित्व को देखेंगे।
लेकिन किसी कस्टम `class` का डिफॉल्ट प्रतिनिधित्व बहुत मददगार नहीं होता:


```python
>>> Clock(12, 34)
<Clock object st 0x102807b20 >
```

ज़्यादा मददगार प्रतिनिधित्व बनाने के लिए, आप `class` पर एक [`__repr__`][repr-method] [विशेष मेथड][dunder-methods] बना सकते हैं।

आदर्श रूप से, वह `__repr__` मेथड ऐसा मान्य Python कोड लौटाता है जिसे [`eval()`][eval-built-in] को देने पर ऑब्जेक्ट दोबारा बनाने के लिए इस्तेमाल किया जा सके।
यह [एक `__repr__` मेथड के स्पेसिफिकेशन][repr-docs] में बताया गया है।
मान्य Python कोड लौटाने से कोई दूसरा डेवलपर उस `str` को सीधे कोड या REPL में कॉपी करके पेस्ट कर सकता है।
11:30 AM को दिखाने वाला एक `Clock` ऐसा दिख सकता है:

```python
 `Clock(11, 30)`
```

सभी कस्टम क्लास के लिए `__repr__` मेथड बनाना अच्छा तरीका है।
कुछ और बातें भी ध्यान देने योग्य हैं:

- इस मेथड से लौटाई गई जानकारी समस्याओं को ढूँढने में काम आनी चाहिए।
- _आदर्श रूप से_, मेथड ऐसी स्ट्रिंग लौटाता है जो मान्य Python कोड होती है, हालाँकि यह हमेशा संभव नहीं होता।
- अगर मान्य Python कोड देना व्यावहारिक न हो, तो एंगल ब्रैकेट के बीच एक विवरण लौटाना आम बात है: `< ...a practical description... >`


### स्ट्रिंग रूपांतरण

`__repr__` मेथड के अलावा, `class` का एक ऐसा वैकल्पिक स्ट्रिंग प्रतिनिधित्व भी चाहिए हो सकता है जिसे इंसान आसानी से पढ़ सके।
इसका इस्तेमाल ऑब्जेक्ट को प्रोग्राम के आउटपुट या दस्तावेज़ों के लिए फॉर्मेट करने में हो सकता है।
यह एक [`__str__`][str-dunder] विशेष मेथड लिखकर किया जाता है।
एक बार फिर `datetime.datetime` को देखिए:


```python
>>> str(datetime.datetime(2022, 5, 4))
'2022-05-04 00:00:00'
```

जब किसी `datetime` ऑब्जेक्ट से कहा जाता है कि वह खुद को स्ट्रिंग प्रतिनिधित्व में बदल ले, तो वह [ISO 8601 मानक][ISO 8601] के अनुसार फॉर्मेट की गई एक `str` लौटाता है।
ज़्यादातर datetime लाइब्रेरी इस `str` को पढ़कर उसे इंसान के पढ़ने लायक तारीख़ और समय में बदल सकती हैं।

इस अभ्यास में आपको अपनी Clock के लिए एक `__str__` मेथड लिखने का मौका मिलेगा, साथ ही एक `__repr__` मेथड भी।

```python
>>> str(Clock(11, 30))
'11:30'
```

इस स्ट्रिंग रूपांतरण को काम करने के लिए, आपको अपनी `class` पर एक `__str__` विशेष मेथड बनाना होगा, जो Clock का समय दिखाने वाली एक ज़्यादा "इंसान के पढ़ने लायक" स्ट्रिंग लौटाए।

अगर आप `__str__` मेथड नहीं बनाते और अपनी क्लास पर `str()` कॉल करते हैं, तो Python बदले में आपकी क्लास पर `__repr__` कॉल करने की कोशिश करेगा।
इसलिए अगर आप इन दो विशेष मेथड में से सिर्फ़ एक ही बनाते हैं, तो सिर्फ़ `__str__` की जगह `__repr__` बनाना बेहतर होगा।


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
