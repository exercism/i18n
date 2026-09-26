# परिचय

फाइल डिस्क पर एक नाम वाली स्ट्रीम होती है। [`io.files`][io.files] वोकैबुलरी फाइलों को या तो पूरी तरह, एक ही कॉल में, पढ़ती और लिखती है, या फिर स्कोप वाली स्ट्रीम के ज़रिए क्रमिक रूप से। हर फाइल वर्ड एक एन्कोडिंग लेता है; टेक्स्ट के लिए यह लगभग हमेशा `io.encodings.utf8` से [`utf8`][utf8] होती है।

## पढ़ना

```
file-contents   ( path encoding -- str )
file-lines      ( path encoding -- seq )
```

`file-contents` पूरी फाइल को एक स्ट्रिंग के रूप में लौटाता है। `file-lines` इसकी लाइनों को एक ऐरे के रूप में लौटाता है, और लाइन ब्रेक हटा देता है।

## लिखना

```
set-file-contents   ( str path encoding -- )
set-file-lines      ( seq path encoding -- )
```

दोनों फाइल को बदल देते हैं (ज़रूरत पड़ने पर उसे बना भी देते हैं)। `set-file-lines` हर लाइन में एक एलिमेंट लिखता है, और न्यूलाइन अपने आप जोड़ देता है।

## जोड़ना और क्रमिक I/O

`with-…` कॉम्बिनेटर एक फाइल को कोटेशन के लिए एम्बिएंट स्ट्रीम के रूप में खोलते हैं और बाद में उसे बंद कर देते हैं। यह एक डेस्ट्रक्टर स्कोप है, जैसे `channel-chatter` में स्ट्रीम कॉम्बिनेटर।

```
with-file-reader     ( path encoding quot -- )
with-file-writer     ( path encoding quot -- )
with-file-appender   ( path encoding quot -- )
```

```factor
USING: io io.encodings.utf8 io.files ;

"log.txt" utf8 [ "another line" print ] with-file-appender
```

[io.files]: https://docs.factorcode.org/content/vocab-io.files.html
[utf8]: https://docs.factorcode.org/content/vocab-io.encodings.utf8.html
