# बारे में

Python सही और गलत वैल्यू को [`bool`][bools] टाइप से दर्शाता है, जो `int` का सबक्लास है।
 इस टाइप में केवल दो बूलियन वैल्यू हैं: `True` और `False`।
  इन वैल्यू को एक वेरिएबल में असाइन किया जा सकता है और [बूलियन ऑपरेटर][boolean-operators] (`and`, `or`, `not`) के साथ जोड़ा जा सकता है:


```python
>>> true_variable = True and True
>>> false_variable = True and False

>>> true_variable = False or True
>>> false_variable = False or False

>>> true_variable = not False
>>> false_variable = not True
```

[बूलियन ऑपरेटर][boolean-operators] _शॉर्ट-सर्किट इवैल्यूएशन_ का उपयोग करते हैं, जिसका मतलब है कि ऑपरेटर के दाईं ओर वाले एक्सप्रेशन का मूल्यांकन केवल तभी किया जाता है जब ज़रूरत हो।

हर ऑपरेटर की प्राथमिकता अलग होती है, जिसमें `not` का मूल्यांकन `and` और `or` से पहले होता है।
 ब्रैकेट का उपयोग करके एक्सप्रेशन के एक हिस्से का मूल्यांकन बाकी हिस्सों से पहले किया जा सकता है:

```python
>>> not True and True
False

>>> not (True and False)
True
```

सभी `boolean operators` को Python के [`comparison operators`][comparisons] से कम प्राथमिकता वाला माना जाता है, जैसे `==`, `>`, `<`, `is` और `is not`।


## टाइप कोर्शन और ट्रूथीनेस

`bool` फंक्शन ([`bool()`][bool-function]) किसी भी ऑब्जेक्ट को बूलियन वैल्यू में बदल देता है।
 डिफ़ॉल्ट रूप से सभी ऑब्जेक्ट `True` लौटाते हैं, जब तक कि उन्हें `False` लौटाने के लिए परिभाषित न किया गया हो।

कुछ `built-ins` परिभाषा से हमेशा `False` माने जाते हैं:

- कॉन्स्टेंट `None` और `False`
- किसी भी _संख्यात्मक टाइप_ का शून्य (`int`, `float`, `complex`, `decimal`, या `fraction`)
- खाली _सिक्वेंस_ और _कलेक्शन_ (`str`, `list`, `set`, `tuple`, `dict`, `range(0)`)


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

जब किसी ऑब्जेक्ट का उपयोग _बूलियन संदर्भ_ में किया जाता है, तो उसका मूल्यांकन `bool()` का उपयोग करके पारदर्शी रूप से _ट्रूथी_ या _फॉल्सी_ के रूप में किया जाता है:


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


क्लासें यह परिभाषित कर सकती हैं कि ट्रूथी स्थितियों में उनका मूल्यांकन कैसे होगा, अगर वे `__bool__()` मेथड और/या `__len__()` मेथड को ओवरराइड करके लागू करती हैं।


## बूलियन अंदर से कैसे काम करते हैं

`bool` टाइप को _int_ का _सब-टाइप_ के रूप में लागू किया गया है।
 इसका मतलब है कि `True` _संख्यात्मक रूप से बराबर_ है `1` के और `False` _संख्यात्मक रूप से बराबर_ है `0` के।
  यह तब दिखता है जब हम इनकी तुलना _समानता ऑपरेटर_ से करते हैं:


```python
>>> 1 == True
True

>>> 0 == False
True
```

हालाँकि, `bools` `ints` से **फिर भी अलग** हैं, जैसा कि _आइडेंटिटी ऑपरेटर_ `is` से तुलना करने पर पता चलता है:


```python
>>> 1 is True
False

>>> 0 is False
False
```

> नोट: Python 3.8 और उससे नए संस्करणों में, `is` के _बाईं ओर_ कोई लिटरल (जैसे `1`, `''`, `[]`, या `{}`) उपयोग करने पर चेतावनी मिलेगी।


किसी बूलियन वेरिएबल की तुलना `True` या `False` से करने के लिए समानता ऑपरेटर का उपयोग करना [Python एंटी-पैटर्न][comparing to true in the wrong way] माना जाता है।
 इसके बजाय, _आइडेंटिटी ऑपरेटर_ `is` का उपयोग करना चाहिए:


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
