# परिचय

Factor में *स्ट्रीम* वह हर चीज़ है जिससे आप बाइट पढ़ सकते हैं या जिसमें बाइट लिख सकते हैं। फाइलें, सॉकेट, मेमोरी में रहने वाले बफर, और आपके अपने कस्टम रैपर, ये सब [`io`][io] के इसी छोटे [प्रोटोकॉल][stream-protocol] में शामिल होते हैं।

इस प्रोटोकॉल के दो हिस्से मिक्सिन हैं: `input-stream` उन चीज़ों के लिए जिनसे आप पढ़ते हैं, और `output-stream` उन चीज़ों के लिए जिनमें आप लिखते हैं। कोई क्लास `INSTANCE: <class> input-stream` लिखकर इनमें से किसी एक (या दोनों) में शामिल हो जाती है।

## पढ़ना और लिखना

```
stream-read1         ( stream -- elt/f )
stream-read          ( n stream -- seq/f )
stream-write1        ( elt stream -- )
stream-write         ( seq stream -- )
stream-flush         ( stream -- )
stream-element-type  ( stream -- type )
```

`stream-read1` अगला बाइट लौटाता है (या स्ट्रीम के अंत पर `f`)। `stream-read` अधिकतम `n` बाइट पढ़ता है। आउटपुट के लिए `stream-write1` और `stream-write` यही काम करते हैं। `stream-flush` बफर में रुके आउटपुट को आगे भेजता है। `stream-element-type` बताता है कि स्ट्रीम कच्चे बाइट (`+byte+`) से काम करती है या अक्षरों (`+character+`) से।

## `disposable` के साथ सफाई

स्ट्रीम OS के रिसोर्स अपने पास रखती हैं, इसलिए यह प्रोटोकॉल [`destructors`][destructors] वोकैबुलरी के साथ मिलकर काम करता है। एक कस्टम स्ट्रीम `disposable` पैरेंट क्लास को विस्तारित करती है:

```factor
! DOCTEST: SKIP   (illustrative class definition; no runnable assertion)
USING: accessors destructors io kernel ;

TUPLE: my-stream < disposable underlying ;
INSTANCE: my-stream output-stream

: <my-stream> ( underlying -- s )
    my-stream new-disposable swap >>underlying ;

M: my-stream dispose* underlying>> dispose ;
```

`new-disposable` (जो `destructors` में है) फैक्ट्री है: यह टपल बनाता है और उसे डिस्ट्रक्टर फ्रेमवर्क में दर्ज कर देता है, ताकि एक्सेप्शन आने पर भी रिसोर्स लीक न हो। `M: <class> dispose*` बताता है कि सफाई *कैसे* करनी है। यूज़र कोड `dispose` (सार्वजनिक वर्ड) को कॉल करता है, जो ऑब्जेक्ट पर यह चिह्न लगा देता है कि उसकी सफाई हो चुकी है, और उसके बाद `dispose*` चलाता है।

## स्कोप के भीतर उपयोग

`with-disposal`, `with-input-stream` और `with-output-stream` किसी क्वोटेशन को इस तरह चलाते हैं कि रिसोर्स खुला रहता है, और बाहर निकलते समय उसकी सफाई हो जाती है:

```factor
USING: io io.streams.string ;

"hello" <string-reader> [ read-contents . ] with-input-stream
! => "hello"   (the reader is disposed before this line returns)
```

[io]: https://docs.factorcode.org/content/vocab-io.html
[destructors]: https://docs.factorcode.org/content/vocab-destructors.html
[stream-protocol]: https://docs.factorcode.org/content/article-stream-protocol.html
