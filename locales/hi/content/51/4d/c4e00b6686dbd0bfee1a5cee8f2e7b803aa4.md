# परिचय

Factor में हैशटेबल *एसोसिएटिव ऐरे* होते हैं, यानी `key/value` जोड़ों का संग्रह, जिनमें O(1) लुकअप हो जाता है। ये बड़े [`assocs`][assocs] परिवार का हिस्सा हैं।

## हैशटेबल लिटरल

```factor
H{ { "coal" 1 } { "wood" 2 } } .
```

`H{ }` एक खाली हैशटेबल है। हैशटेबल *परिवर्तनशील* होते हैं: की जोड़ने और हटाने पर ये बढ़ते और घटते रहते हैं। अगर मूल हैशटेबल को वैसा ही छोड़ना हो, तो पहले `clone` कीजिए। हैशटेबल प्रिंट करने पर उसकी एंट्रियाँ दिखती हैं, लेकिन उनका क्रम डालने के क्रम से बँधा नहीं होता। हैशटेबल बिना किसी निश्चित क्रम के होते हैं।

## पढ़ना

`at` ([`assocs`][assocs] में) एक वैल्यू पढ़ता है, और अगर की मौजूद न हो तो `f` लौटाता है:

```
at      ( key assoc -- value/f )
key?    ( key assoc -- ? )
```

```factor
"coal" H{ { "coal" 1 } { "wood" 2 } } at .   ! => 1
"gold" H{ { "coal" 1 } { "wood" 2 } } at .   ! => f
```

## लिखना

`set-at` जोड़ता है या ऊपर लिख देता है; `delete-at` हटाता है; `change-at` मौजूदा वैल्यू पर एक कोटेशन चलाता है। ये तीनों हैशटेबल को *बदल* देते हैं:

```
set-at     ( value key assoc -- )
delete-at  ( key assoc -- )
change-at  ( key assoc quot: ( old -- new ) -- )
```

```factor
H{ } clone 5 "coal" pick set-at .
! => H{ { "coal" 5 } }
```

## `inc-at`: गिनती बढ़ाने का शॉर्टकट

`inc-at` (यह भी [`assocs`][assocs] में) किसी की की मौजूदा वैल्यू में 1 जोड़ता है, और अगर की मौजूद न हो तो उसे 1 के रूप में डाल देता है। गिनती रखने के लिए बिल्कुल उपयुक्त:

```
inc-at ( key assoc -- )
```

```factor
H{ } clone "coal" over inc-at .
! => H{ { "coal" 1 } }
```

## इटरेशन और लेज़ी इंसर्शन

`assoc-each` हर `( key value -- )` जोड़े पर चलता है; `cache` किसी की की वैल्यू लौटाता है, और अगर की मौजूद न हो तो दिए गए कोटेशन से उसे एक बार गणना करके लौटाता है।

```
assoc-each ( assoc quot: ( key value -- ) -- )
cache      ( key assoc quot: ( key -- value ) -- value )
```

`cache` एक ही शब्द में "देखो या बनाओ" वाला तरीका है। जब आप की की किसी धारा से हैशटेबल बना रहे हों और हर बार की गायब होने की स्थिति नहीं सँभालना चाहते हों, तब यह बहुत काम आता है।

## की के क्रम पर हैशटेबल अपडेट लगाना

जब इनपुट की का एक क्रम हो और आपको हर की के लिए हैशटेबल एक बार अपडेट करना हो, तो `each` से *क्रम* पर इटरेशन कीजिए और एक फ्राइड कोटेशन `'[ _ … ]` ([`fry`][fry] से) इस्तेमाल कीजिए, जो हैशटेबल को लूप के अंदर के कोड में बाँध देता है। जैसे, की की एक सूची हटाना:

```factor
{ "wood" "iron" } H{ { "coal" 5 } { "wood" 3 } { "iron" 2 } } clone
[ '[ _ delete-at ] each ] keep .
! => H{ { "coal" 5 } }
```

`'[ _ delete-at ]` स्टैक पर अपने ऊपर रखे हैशटेबल को पकड़ लेता है, ताकि हर इटरेशन में `each` को सिर्फ की देनी पड़े। `keep` कोटेशन को चलाता है और साथ ही हैशटेबल को अंतिम `.` के लिए बचाए रखता है।

## किसी क्रम से हैशटेबल बनाना

`map>assoc` ([`assocs`][assocs] में) एक क्रम पर कोटेशन लगाता है और `( elt -- key value )` के परिणामों को एग्ज़ेंप्लर के टाइप वाले assoc में इकट्ठा करता है:

```
map>assoc ( seq quot: ( elt -- key value ) exemplar -- assoc )
```

```factor
{ "wood" } [ dup length ] H{ } map>assoc .
! => H{ { "wood" 4 } }
```

## की, वैल्यू और जोड़े

`keys` और `values` ([`assocs`][assocs] में) सिर्फ की या सिर्फ वैल्यू लौटाते हैं; `>alist` `{ key value }` जोड़े लौटाता है।

```
keys   ( assoc -- keys )
values ( assoc -- values )
>alist ( assoc -- alist )
```

```factor
H{ { "wood" 11 } { "coal" 7 } } keys .     ! the keys (order not guaranteed)
H{ { "wood" 11 } { "coal" 7 } } values .   ! the matching values
```

`keys` और `values` एक-दूसरे से मेल खाते हैं: किसी जगह पर मौजूद वैल्यू उसी जगह वाली की की होती है।

`sort-keys` ([`sorting`][sorting] में) `{ key value }` जोड़ों को की के अनुसार क्रम में लगाकर लौटाता है:

```factor
H{ { "wood" 11 } { "coal" 7 } } sort-keys .
! => { { "coal" 7 } { "wood" 11 } }
```

## जोड़ों से वापस हैशटेबल तक

`>hashtable` ([`hashtables`][hashtables] में) `>alist` का उल्टा है: यह किसी भी assoc को, जो अक्सर `{ key value }` जोड़ों की एक alist होती है, O(1) लुकअप वाले हैशटेबल में बदल देता है।

```
>hashtable ( assoc -- hashtable )
```

```factor
{ { "coal" 7 } { "wood" 11 } } >hashtable .
! => H{ { "wood" 11 } { "coal" 7 } }   (entry order not guaranteed)
```

यह तब काम आता है जब आपने जोड़ों की कोई सूची बनाई या बदली हो और आप उसे वापस हैशटेबल में डालकर की के ज़रिए एंट्रियाँ ढूँढना चाहते हों।

[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/article-fry.html
[hashtables]: https://docs.factorcode.org/content/vocab-hashtables.html
[sorting]: https://docs.factorcode.org/content/vocab-sorting.html
