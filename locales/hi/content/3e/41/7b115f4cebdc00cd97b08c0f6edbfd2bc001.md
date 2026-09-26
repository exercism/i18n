# परिचय

Common Lisp में भी, दूसरी भाषाओं की तरह, कुछ नियम हैं जो तय करते हैं कि दो ऑब्जेक्ट 'समान' हैं या नहीं।
ये नियम चार स्तर तय करते हैं, और हर स्तर की जाँच करने के लिए एक फंक्शन है।
ये स्तर सबसे सख्त से सबसे ढीले तक के क्रम में हैं।

## `eq`

पहला स्तर है ऑब्जेक्ट की पहचान।
यह समानता [`eq`][hyper-eq] फंक्शन से जाँची जाती है।
समानता की जाँच में लिए गए दोनों ऑब्जेक्ट बिल्कुल एक ही ऑब्जेक्ट होने चाहिए:

```lisp
(eq 'apples 'apples)  ; => T
(eq 'apples 'oranges) ; => NIL

(eq '(a b c) '(a b c) ; => NIL (these two lists have the same contents but are not the same list)
(let ((list1 '(a b c)) (list2 list1)) 
  (eq list1 list2))   ; => T (these two lists are the same list)
```

## `eql`

दूसरा स्तर संख्याओं और अक्षरों की समानता भी जोड़ता है।
यह समानता [`eql`][hyper-eql] फंक्शन से जाँची जाती है।
जाँच कैसे होती है, यह आर्गुमेंट के टाइप पर निर्भर करता है:

- जो दो ऑब्जेक्ट `eq` हैं, वे `eql` भी हैं
- संख्याएँ `eql` तब होती हैं जब उनका टाइप और वैल्यू एक ही हो
- अक्षर `eql` तब होते हैं जब वे एक ही अक्षर दर्शाते हों।

```lisp
(eql 1 1)     ; => T
(eql 1 1/1)   ; => NIL (one number is an integer, the other a rational)
(eql #\c #\c) ; => T
(eql #\c #\C) ; => NIL (case is different)
```

सोचने की बात है कि संख्याओं और अक्षरों की ऑब्जेक्ट पहचान [`eq`][hyper-eq] से क्यों नहीं जाँची जाती।
Common Lisp का मानक इंप्लिमेंटेशन को यह छूट देता है कि वे चाहें तो संख्याओं और अक्षरों की कॉपी बना लें।
इसलिए `0` और `0` शायद [`eq`][hyper-eq] न हों, क्योंकि वे संख्या `0` के अलग-अलग इंस्टेंस हो सकते हैं।

## `equal`

तीसरा स्तर संरचना की समानता जाँचता है।
यह समानता [`equal`][hyper-equal] से जाँची जाती है।
जाँच कैसे होती है, यह आर्गुमेंट के टाइप पर निर्भर करता है:

- सिंबल की तुलना [`eq`][hyper-eq] से की जाती है
- अक्षरों और संख्याओं की तुलना `eql` से की जाती है
- कॉन्स [`equal`][hyper-equal] तब होते हैं जब उनके एलिमेंट [`equal`][hyper-equal] हों।
यह जाँच भीतर की हर परत तक इसी तरह होती जाती है।
- स्ट्रिंग और बिट वेक्टर [`equal`][hyper-equal] तब होते हैं जब उनके एलिमेंट `eql` हों
- बाकी टाइप के ऐरे की तुलना [`eq`][hyper-eq] से की जाती है
- पाथनेम [`equal`][hyper-equal] तब होते हैं जब वे काम करने में एक जैसे हों।
(यहाँ इंप्लिमेंटेशन पर निर्भर व्यवहार की गुंजाइश है, खासकर उन स्ट्रिंग के छोटे-बड़े अक्षरों को लेकर जो पाथनेम के हिस्से बनाती हैं।)
- किसी और टाइप के ऑब्जेक्ट की तुलना [`eq`][hyper-eq] से की जाती है

```lisp
(equal '(a (b c)) '(a (b c)))         ; => T (conses are equal if their contents are equal)
(equal "hello" "hello")               ; => T
(equal "hello" "HELLO")               ; => NIL
(equal #(1 2 3) #(1 2 3))             ; => NIL (arrays are equal only if eq)
(equal #P"foo/bar.md" #P"foo/bar.md") ; => T (pathnames are equal if "functionally equivalent"
```

## `equalp`

समानता का चौथा और सबसे ढीला स्तर [`equalp`][hyper-equalp] से जाँचा जाता है।
जाँच कैसे होती है, यह टाइप पर निर्भर करता है:

- जो दो ऑब्जेक्ट [`equalp`][hyper-equalp] हैं, वे [`equalp`][hyper-equalp] भी हैं
- संख्याएँ [`equalp`][hyper-equalp] तब होती हैं जब उनकी वैल्यू एक ही हो, चाहे उनका टाइप अलग हो
- अक्षरों और स्ट्रिंग की तुलना में छोटे-बड़े अक्षरों का फर्क नहीं देखा जाता
- कॉन्स [`equalp`][hyper-equalp] तब होते हैं जब उनके एलिमेंट [`equalp`][hyper-equalp] हों।
यह जाँच भी भीतर की हर परत तक इसी तरह होती जाती है।
- ऐरे [`equalp`][hyper-equalp] तब होते हैं जब उनके डाइमेंशन की संख्या एक ही हो, वे डाइमेंशन भी एक ही हों, और हर एलिमेंट [`equalp`][hyper-equalp] हो।
- स्ट्रक्चर [`equalp`][hyper-equalp] तब होते हैं जब उनकी क्लास और स्लॉट एक ही हों, और दोनों स्ट्रक्चर के वे सारे स्लॉट आपस में [`equalp`][hyper-equalp] हों।
- हैश टेबल [`equalp`][hyper-equalp] तब होती हैं जब दोनों में एक ही `:test` फंक्शन हो, उनकी कुंजियाँ एक ही हों (उसी `:test` फंक्शन से तुलना करने पर), और उन कुंजियों की वैल्यू [`equalp`][hyper-equalp] से तुलना करने पर एक ही हों।

```lisp
(equalp 1 1.0)                       ; => T
(equalp #\c #\C)                     ; => T
(equalp "hello" "HELLO")             ; => T
(equalp #(1 2 3) #(1.0 2.0 3.0))     ; => T (arrays contain elements which are `equalp`)
(equal #S(TEST :SLOT1 'a :SLOT2 'b) 
       #S(TEST :SLOT1 'a :SLOT2 'b)) ; => T (structures of the same class with slots that have values which are `equalp`)
```

## टाइप के हिसाब से बने फंक्शन

ऊपर दिए गए फंक्शन 'जेनेरिक' समानता फंक्शन हैं।
जैसा परिभाषित है, वे किसी भी टाइप के लिए काम करते हैं।
यह तब काम आता है जब आप ऐसा जेनेरिक कोड लिखते हैं जिसे रनटाइम तक पता नहीं होता कि वह किन टाइप के ऑब्जेक्ट की तुलना करेगा।
लेकिन आम तौर पर इसे "बेहतर तरीका" माना जाता है कि जब आपको तुलना करने वाले टाइप पता हों, तो टाइप के हिसाब से बने समानता फंक्शन इस्तेमाल किए जाएँ।
जैसे `equal` की जगह `string=`।
इन फंक्शनों की चर्चा आगे संबंधित कॉन्सेप्ट में की जाएगी।

[hyper-eq]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eq.htm
[hyper-eql]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eql.htm
[hyper-equal]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equal.htm
[hyper-equalp]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equalp.htm
