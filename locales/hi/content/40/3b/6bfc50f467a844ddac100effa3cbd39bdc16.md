# स्ट्रिंग फॉर्मैटिंग

Python के अंतर्निहित `str` को दो मज़बूत स्ट्रिंग फॉर्मैटिंग तरीकों से बनाया जा सकता है: `f-strings` और `str.format()`। `f'{variable}'` के साथ स्ट्रिंग इंटरपोलेशन को प्राथमिकता दी जाती है, क्योंकि यह पढ़ने में आसान, पूरा और बहुत तेज़ मॉड्यूल है। जब अंतर्राष्ट्रीयकरण के अनुकूल या ज़्यादा लचीले तरीके की ज़रूरत हो, तो `str.format()` से आपकी ज़रूरत के लगभग सभी दूसरे `str` रूप बनाए जा सकते हैं।

# शाब्दिक स्ट्रिंग इंटरपोलेशन। एफ-स्ट्रिंग

शाब्दिक स्ट्रिंग इंटरपोलेशन एक ऐसा तरीका है जिसमें `f` प्रीफिक्स और घुंघराले ब्रैकेट `{object}` की मदद से एक्सप्रेशन को जल्दी और कुशलता से फॉर्मैट किया जाता है और उनका मूल्यांकन करके `str` बनाया जाता है। इसे हर तरह के स्ट्रिंग कोट के साथ इस्तेमाल किया जा सकता है: सिंगल कोट `'`, डबल कोट `"`, और कई लाइनों तथा एस्केपिंग के लिए ट्रिपल कोट `'''` या `"""`।

**एफ-स्ट्रिंग** के इस बुनियादी उदाहरण में वेरिएबल `name` स्ट्रिंग की शुरुआत में दिखाया जाता है, और `int` टाइप का वेरिएबल `age` `str` में बदलकर `' is '` के बाद दिखाया जाता है।

```python
>>> name, age = 'Artemis', 21
>>> f'{name} is {age} years old.'
'Artemis is 21 years old.'
```

एक `f-string` जिन एक्सप्रेशन का मूल्यांकन करती है, वे लगभग कुछ भी हो सकते हैं। इसलिए इनपुट साफ़ रखने की आम सावधानियाँ यहाँ भी लागू होती हैं। जिन कई वैल्यू का मूल्यांकन किया जा सकता है उनमें से कुछ हैं: `str`, संख्याएँ, वेरिएबलो, अंकगणितीय एक्सप्रेशन, शर्त वाले एक्सप्रेशन, अंतर्निहित टाइप, स्लाइस, फंक्शन, या ऐसे कोई भी ऑब्जेक्ट जिनमें `__str__` या `__repr__` मेथड परिभाषित हों। कुछ उदाहरण:

```python
>>> waves = {'water': 1, 'light': 3, 'sound': 5}

>>> f'"A dict can be represented with f-string: {waves}."'
'"A dict can be represented with f-string: {\'water\': 1, \'light\': 3, \'sound\': 5}."'

>>> f'Tenfold the value of "light" is {waves["light"]*10}.'
'Tenfold the value of "light" is 30.'
```

एफ-स्ट्रिंग का आउटपुट वही कंट्रोल तरीके इस्तेमाल कर सकता है जो `.format()` के लिए बताए गए हैं, जैसे _चौड़ाई_, _संरेखण_ और _सटीकता_। अंतर्राष्ट्रीयकरण (I18N) और स्थानीयकरण (L10N) के लिए स्ट्रिंग इंटरपोलेशन का इस्तेमाल GNU gettext API के साथ नहीं किया जा सकता। इसकी जगह `str.format()` इस्तेमाल करना पड़ता है।

# str.format() मेथड

`str.format()` टेक्स्ट के अंदर मौजूद प्लेसहोल्डर को बदलने देता है। प्लेसहोल्डर नाम वाले इंडेक्स `{price}` से, नंबर वाले इंडेक्स `{0}` से, या खाली प्लेसहोल्डर `{}` से पहचाने जाते हैं। इनकी वैल्यू `str.format()` मेथड में पैरामीटर के रूप में दी जाती है। उदाहरण:

```python
>>> 'My text: {placeholder1} and {}.'.format(12, placeholder1='value1')
'My text: value1 and 12.'
```

Python का `.format()` [मिनी लैंग्वेज स्पेसिफायर][format-mini-language] की पूरी रेंज का समर्थन करता है, जिनका इस्तेमाल टेक्स्ट को संरेखित करने, बदलने आदि के लिए किया जा सकता है।

जटिल फॉर्मैटिंग स्पेसिफायर यह है: `{[<name>][!<conversion>][:<format_specifier>]}`:

- `<name>` कोई नाम वाला प्लेसहोल्डर, कोई नंबर, या खाली हो सकता है।
- `!<conversion>` वैकल्पिक है और इन तीन में से एक होना चाहिए: [`str()`][str-conversion] के लिए `!s`, [`repr()`][repr-conversion] के लिए `!r`, या [`ascii()`][ascii-conversion] के लिए `!a`। डिफॉल्ट रूप से `str()` इस्तेमाल होता है।
- `:<format_specifier>` वैकल्पिक है और इसमें बहुत सारे विकल्प हैं, जो [यहाँ सूचीबद्ध हैं][format-specifiers]।

एक डायक्रिटिकल ascii अक्षर के कन्वर्ज़न का उदाहरण:

```python
>>> '{0!s}'.format('ë')
'ë'
>>> '{0!r}'.format('ë')
"'ë'"
>>> '{0!a}'.format('ë')
"'\\xeb'"

>>> 'She said her name is not {} but {!r}.'.format('Anna', 'Zoë')
"She said her name is not Anna but 'Zoë'."
```

फॉर्मैट स्पेसिफायर का उदाहरण, [और उदाहरण इस पेज के अंत में][summary-string-format]:

```python
>>> "The number {0:d} has a representation in binary: '{0: >8b}'.".format(42)
"The number 42 has a representation in binary: '  101010'."
```

अंतर्राष्ट्रीयकरण (I18N) और स्थानीयकरण (L10N) के लिए `str.format()` का इस्तेमाल [GNU gettext API][gnu-gettext-api] के साथ करना चाहिए।

[all-about-formatting]: https://realpython.com/python-formatted-output
[difference-formatting]: https://realpython.com/python-string-formatting/#2-new-style-string-formatting-strformat
[printf-style-docs]: https://docs.python.org/3/library/stdtypes.html#printf-style-string-formatting
[tuples]: https://www.w3schools.com/python/python_tuples.asp
[format-mini-language]: https://docs.python.org/3/library/string.html#format-specification-mini-language
[str-conversion]: https://www.w3resource.com/python/built-in-function/str.php
[repr-conversion]: https://www.w3resource.com/python/built-in-function/repr.php
[ascii-conversion]: https://www.w3resource.com/python/built-in-function/ascii.php
[format-specifiers]: https://www.python.org/dev/peps/pep-3101/#standard-format-specifiers
[summary-string-format]: https://www.w3schools.com/python/ref_string_format.asp
[template-string]: https://docs.python.org/3/library/string.html#template-strings
[gnu-gettext-api]: https://docs.python.org/3/library/gettext.html
