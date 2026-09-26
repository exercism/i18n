# निर्देश

आपका सामुदायिक संगठन आपसे बगीचे के प्लॉट के रजिस्ट्रेशन संभालने के लिए कह रहा है। यह स्थिति दो डायनैमिक वेरिएबलो में रहती है:

- `registrations`: किसी व्यक्ति को वर्तमान में असाइन किए गए `plot` टपलों का वेक्टर।
- `next-id`: अगली रजिस्ट्रेशन के लिए इस्तेमाल होने वाला पूर्णांक।

`plot` टपल में दो स्लॉट होते हैं:

| स्लॉट            | टाइप     |
| --------------- | -------- |
| `id`            | पूर्णांक |
| `registered-to` | स्ट्रिंग   |

## 1. बगीचा खोलिए और उसके रजिस्ट्रेशन की सूची बनाइए

`open-garden` बनाइए, जो डायनैमिक वेरिएबलो को शुरुआती मान दे: `registrations` के लिए खाली वेक्टर और `next-id` के लिए `1`। फिर `list-registrations` बनाइए, जो प्लॉट का वर्तमान वेक्टर लौटाए।

```factor
open-garden
list-registrations .
! => V{ }
```

## 2. प्लॉट का रजिस्ट्रेशन कीजिए

`register` बनाइए, जो स्टैक से एक नाम ले, अगले उपलब्ध id के साथ नया `plot` बनाए, उसे `registrations` वेक्टर में जोड़े, `next-id` को एक बढ़ाए, और नया `plot` लौटाए।

```factor
open-garden
"Emma Balan" register .
! => T{ plot { id 1 } { registered-to "Emma Balan" } }

list-registrations .
! => V{ T{ plot { id 1 } { registered-to "Emma Balan" } } }
```

प्लॉट की id अद्वितीय होनी चाहिए और रिलीज़ के बाद भी बढ़ती रहनी चाहिए। `next-id` को कभी कोई वैल्यू दोबारा इस्तेमाल नहीं करनी चाहिए।

## 3. प्लॉट रिलीज़ कीजिए

`release` बनाइए, जो एक id ले और `registrations` में से मेल खाती प्रविष्टि हटाए। किसी अनजान id को रिलीज़ करने पर कुछ नहीं होता।

```factor
open-garden
"Emma" register drop
1 release
list-registrations .
! => V{ }
```

## 4. रजिस्टर्ड प्लॉट प्राप्त कीजिए

`get-registration` बनाइए, जो एक id ले और मेल खाता प्लॉट लौटाए, या अगर किसी प्लॉट की वह id नहीं है तो सिंबल `not-found` लौटाए।

```factor
open-garden
"Emma" register drop
1 get-registration .
! => T{ plot { id 1 } { registered-to "Emma" } }

7 get-registration .
! => not-found
```

## 5. नाम से प्लॉट ढूँढिए

`find-by-name` बनाइए, जो एक नाम ले और उस व्यक्ति को वर्तमान में रजिस्टर्ड सभी प्लॉट का वेक्टर लौटाए।

```factor
open-garden
"Emma" register drop
"Bob" register drop
"Emma" register drop
"Emma" find-by-name .
! => V{ T{ plot { id 1 } { registered-to "Emma" } }
        T{ plot { id 3 } { registered-to "Emma" } } }
```
