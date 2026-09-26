# परिचय

## Option टाइप

`Option` टाइप का उपयोग ऐसी वैल्यू को दर्शाने के लिए किया जाता है जो या तो मौजूद नहीं हो सकती या मौजूद हो सकती है।

इसे `gleam/option` मॉड्यूल में इस तरह परिभाषित किया गया है:

```gleam
type Option(a) {
  Some(a)
  None
}
```

जब कोई वैल्यू मौजूद होती है, तो उसे लपेटने के लिए `Some` कंस्ट्रक्टर का उपयोग किया जाता है, और वैल्यू के न होने को दर्शाने के लिए `None` कंस्ट्रक्टर का उपयोग किया जाता है।

किसी `Option` की सामग्री तक पहुँचने के लिए अक्सर पैटर्न मैचिंग का उपयोग किया जाता है।

```gleam
import gleam/option.{type Option, None, Some}

pub fn say_hello(person: Option(String)) -> String {
  case person {
    Some(name) -> "Hello, " <> name <> "!"
    None -> "Hello, Friend!"
  }
}
```

```gleam
say_hello(Some("Matthieu"))
// -> "Hello, Matthieu!"

say_hello(None)
// -> "Hello, Friend!"
```

`gleam/option` मॉड्यूल `Option` टाइप के साथ काम करने के लिए कई उपयोगी फंक्शन भी परिभाषित करता है, जैसे `unwrap`, जो किसी `Option` की सामग्री लौटाता है, या अगर वह `None` है तो एक डिफॉल्ट वैल्यू लौटाता है।

```gleam
import gleam/option.{type Option}

pub fn say_hello_again(person: Option(String)) -> String {
  let name = option.unwrap(person, "Friend")
  "Hello, " <> name <> "!"
}
```
