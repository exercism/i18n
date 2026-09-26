# निर्देश

आप एक बढ़िया रेस्टोरेंट के मैनेजर हैं, जिसमें एक बड़ा वाइन सेलर है। आपके बहुत से ग्राहक वाइन के बड़े शौकीन हैं और उनकी पसंद बहुत खास होती है। किसी एक ग्राहक के लिए सही वाइन की बोतल ढूँढना आसान काम नहीं है।

तकनीक की अच्छी समझ रखने वाले रेस्टोरेंट मालिक होने के नाते आपने वाइन चुनने की प्रक्रिया तेज़ करने का फैसला किया। इसके लिए आप एक ऐप बनाएँगे, जिससे मेहमान अपनी पसंद के मुताबिक आपकी वाइन छाँट सकें।

## 1. किसी दिए गए रंग की सारी वाइन निकालिए

वाइन की एक बोतल को एक कस्टम टाइप से दर्शाया जाता है, और वाइन एक ऐरे में रखी जाती हैं।

```gleam
[
  Wine("Chardonnay", 2015, "Italy", White),
  Wine("Pinot grigio", 2017, "Germany", White),
  Wine("Pinot noir", 2016, "France", Red),
  Wine("Dornfelder", 2018, "Germany", Rose)
]
```

`wines_of_color` फंक्शन बनाइए। यह वाइन की एक ऐरे लेता है और दिए गए रंग की सारी वाइन लौटाता है।

```gleam
wines_of_color(
  [
    Wine("Chardonnay", 2015, "Italy", White),
    Wine("Pinot grigio", 2017, "Germany", White),
    Wine("Pinot noir", 2016, "France", Red),
    Wine("Dornfelder", 2018, "Germany", Rose)
  ],
  color: White
)
// -> [
//   Wine("Chardonnay", 2015, "Italy", White),
//   Wine("Pinot grigio", 2017, "Germany", White),
// ]
```

## 2. किसी दिए गए देश की सारी वाइन की बोतलें निकालिए

`wines_from_country` फंक्शन बनाइए। यह वाइन की एक ऐरे लेता है और दिए गए देश की सारी वाइन लौटाता है।

```gleam
wines_from_country(
  [
    Wine("Chardonnay", 2015, "Italy", White),
    Wine("Pinot grigio", 2017, "Germany", White),
    Wine("Pinot noir", 2016, "France", Red),
    Wine("Dornfelder", 2018, "Germany", Rose)
  ],
  country: "Germany"
)
// -> [
//   Wine("Dornfelder", 2018, "Germany", Rose)
// ]
```

## 3. किसी दिए गए देश में बोतलबंद, किसी दिए गए रंग की सारी वाइन निकालिए

`filter` फंक्शन बनाइए। यह वाइन की एक ऐरे, एक रंग और एक देश लेता है, और दिए गए देश में बोतलबंद उस रंग की सारी वाइन लौटाता है।

```gleam
filter(
  [
    Wine("Chardonnay", 2015, "Italy", White),
    Wine("Pinot grigio", 2017, "Germany", White),
    Wine("Pinot noir", 2016, "France", Red),
    Wine("Dornfelder", 2018, "Germany", Rose)
  ],
  color: White
  country: "Italy"
)
// -> [
//   Wine("Chardonnay", 2015, "Italy", White),
// ]
```
