# निर्देश अपेंड

## Rust में समानांतर अक्षर आवृत्ति

Rust में कॉन्करेंसी के बारे में यहाँ और जानिए:

- [कॉन्करेंसी](https://doc.rust-lang.org/book/ch16-00-concurrency.html)

## बोनस

इस अभ्यास में एक बेंचमार्क भी शामिल है, जिसमें तुलना के लिए एक सीक्वेंशियल इम्प्लीमेंटेशन दिया गया है। आप अपने हल की तुलना इस बेंचमार्क से कर सकते हैं। देखिए कि अलग-अलग साइज़ के इनपुट हर एक के प्रदर्शन पर क्या असर डालते हैं। क्या आप कॉन्करेंट प्रोग्रामिंग की तकनीकों से बेंचमार्क को पीछे छोड़ सकते हैं?

इस लेखन के समय test::Bencher अस्थिर है और केवल *nightly* Rust में ही उपलब्ध है। बेंचमार्क Cargo से चलाइए:

```
cargo bench
```

अगर आप rustup.rs इस्तेमाल कर रहे हैं:

```
rustup run nightly cargo bench
```

- [बेंचमार्क टेस्ट](https://doc.rust-lang.org/stable/unstable-book/library-features/test.html)

nightly Rust के बारे में और जानिए:

- [Nightly Rust](https://doc.rust-lang.org/book/appendix-07-nightly-rust.html)
- [Rust nightly इंस्टॉल करना](https://rust-lang.github.io/rustup/concepts/channels.html#working-with-nightly-rust)
