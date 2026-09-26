# संकेत

## सामान्य

किसी इवेंट की बुनियादी जानकारी वाला लीफलेट बनाने के लिए सिर्फ f-strings या `format()` मेथड का इस्तेमाल कीजिए।

- [Python में स्ट्रिंग फॉर्मेटिंग का परिचय][str-f-strings-docs]
- [realpython.com पर एक लेख][realpython-article]

## 1. हेडर का पहला अक्षर बड़ा कीजिए

- `capitalize` नाम के str मेथड से टाइटल का पहला अक्षर बड़ा कीजिए।

## 2. तारीख को फॉर्मेट कीजिए

- `date` को `f''` या `''.format()` की मदद से खुद फॉर्मेट करना है।
- `date` के लिए यह फॉर्मेट इस्तेमाल होना चाहिए: 'Month day, year'.

## 3. यूनिकोड अक्षरों को आइकन के रूप में प्रदर्शित कीजिए

- `format` से प्रदर्शित करने का एक तरीका यूनिकोड प्रीफिक्स `u'{}'` का इस्तेमाल करना है।

## 4. तैयार लीफलेट प्रदर्शित कीजिए

- एस्टरिस्क और अक्षरों को एक सीध में लाने के लिए सही [format_spec फ़ील्ड][formatspec-docs] ढूँढिए।
- पहला भाग `header` नाम की स्ट्रिंग है, जिसका पहला अक्षर बड़ा होता है।
- दूसरा भाग `date` है।
- तीसरा भाग कलाकारों का ऐरे है; हर कलाकार उसी इंडेक्स वाले यूनिकोड अक्षर से जुड़ा होता है।
- हर लाइन में 20 अक्षर होने चाहिए।
- हर भाग के बीच ज़रूरी खाली लाइनें जोड़ने के लिए संक्षिप्त कोड लिखिए।
- अगर तारीख नहीं दी गई हो, तो उसकी जगह एक खाली लाइन रखिए।

```python
******************** # 20 asterisks
*                  *
*     'Header'     * # capitalized header
*                  *
* Month day, year  * # Optional date
*                  *
* Artist1       ⑴ * # Artist list from 1 to 4
* Artist2       ⑵ *
* Artist3       ⑶ *
* Artist4       ⑷ *
*                  *
********************
```

[str-f-strings-docs]: https://docs.python.org/3/reference/lexical_analysis.html#f-strings
[realpython-article]: https://realpython.com/python-formatted-output/
[formatspec-docs]: https://docs.python.org/3/library/string.html#formatspec
