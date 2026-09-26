1.  [PEP 8][pep-8] में दिए गए कन्वेंशनों से परिचित हो जाइए। हालाँकि ये कोई "कानून" नहीं हैं, फिर भी Python प्रोजेक्ट में खुद यही इस्तेमाल होते हैं और ज़्यादातर कोडिंग स्थितियों में ये एक अच्छा आधार हैं।
2.  [PEP 20 (यानी "The Zen of Python")][pep-20] में दिए गए विचारों को पढ़िए और उन पर सोचिए। PEP 8 की तरह ये भी "कानून" नहीं हैं, लेकिन बेहतर और साफ़ Python कोड के लिए ये ठोस मार्गदर्शक सिद्धांत हैं।
3.  टिप्पणियों की जगह साफ़ और समझने में आसान कोड को प्राथमिकता दीजिए। लेकिन जहाँ स्पष्टता के लिए ज़रूरी हो, वहाँ टिप्पणी ज़रूर कीजिए।
4.  अपने कोड को साफ़ करने के लिए टाइप हिंट इस्तेमाल करने पर विचार कीजिए। टाइप हिंट का [डॉक्युमेंटेशन][type-hint-docs] देखिए और यह भी पढ़िए कि [आप टाइप हिंट क्यों नहीं करना चाहेंगे][type-hint-nos]।
5.  [PEP 257][pep-257] में दिए गए डॉकस्ट्रिंग दिशानिर्देशों का पालन करने की कोशिश कीजिए। अच्छा डॉक्युमेंटेशन मायने रखता है।
6.  [मैजिक नंबरों][magic-numbers] से बचिए।
7.  जिन लूप में इंडेक्स और एलिमेंट दोनों चाहिए, उनमें [`range(len())`][range-docs] की जगह [`enumerate()`][enumerate-docs] को प्राथमिकता दीजिए।
8.  जो लूप किसी डेटा स्ट्रक्चर में चीज़ें जोड़ते रहते हैं, उनमें लूप की जगह [कॉम्प्रिहेंशन][comprehensions] और [जनरेटर एक्सप्रेशन][generators] को प्राथमिकता दीजिए। लेकिन [कॉम्प्रिहेंशन का अत्यधिक इस्तेमाल][comprehension-overuse] न कीजिए।
9.  कुछ से अधिक सबस्ट्रिंग जोड़ते समय या लूप में स्ट्रिंग जोड़ते समय, स्ट्रिंग जोड़ने के दूसरे तरीकों की जगह [`str.join()`][join] को प्राथमिकता दीजिए।
10.  Python के [बिल्ट-इन फंक्शन][built-in-functions] के समृद्ध समूह और [स्टैंडर्ड लाइब्रेरी][standard-lib] से परिचित हो जाइए। एक संक्षिप्त परिचय और कुछ दिलचस्प झलकियों के लिए [यहाँ][standard-lib-overview] देखिए।

[built-in-functions]: https://docs.python.org/3/library/functions.html
[comprehension-overuse]: https://treyhunner.com/2019/03/abusing-and-overusing-list-comprehensions-in-python/
[comprehensions]: https://treyhunner.com/2015/12/python-list-comprehensions-now-in-color/
[enumerate-docs]: https://docs.python.org/3/library/functions.html#enumerate
[generators]: https://www.pythonmorsels.com/how-write-generator-expression/
[join]: https://docs.python.org/3/library/stdtypes.html#str.join
[magic-numbers]: https://en.wikipedia.org/wiki/Magic_number_(programming)
[pep-20]: https://peps.python.org/pep-0020/
[pep-257]: https://peps.python.org/pep-0257/
[pep-8]: https://peps.python.org/pep-0008/
[range-docs]: https://docs.python.org/3/library/functions.html#func-range
[standard-lib-overview]: https://docs.python.org/3/tutorial/stdlib.html
[standard-lib]: https://docs.python.org/3/library/index.html
[type-hint-docs]: https://typing.python.org/en/latest/index.html
[type-hint-nos]: https://typing.python.org/en/latest/guides/typing_anti_pitch.html
