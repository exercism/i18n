# নির্দেশনা সংযোজন

## Rust-এ সমান্তরাল অক্ষরের ফ্রিকোয়েন্সি

Rust-এ কনকারেন্সি সম্পর্কে আরও জানুন:

- [কনকারেন্সি](https://doc.rust-lang.org/book/ch16-00-concurrency.html)

## বোনাস

এই অনুশীলনীতে একটি বেঞ্চমার্কও রয়েছে, যার বেসলাইন হিসেবে আছে একটি সিকোয়েন্সিয়াল ইমপ্লিমেন্টেশন। আপনি আপনার সমাধানটি বেঞ্চমার্কের সাথে তুলনা করতে পারেন। ভিন্ন আকারের ইনপুট প্রতিটির পারফরম্যান্সে কী প্রভাব ফেলে তা লক্ষ্য করুন। কনকারেন্ট প্রোগ্রামিং টেকনিক ব্যবহার করে আপনি কি বেঞ্চমার্ককে ছাড়িয়ে যেতে পারবেন?

এই লেখার সময়, test::Bencher আনস্টেবল এবং কেবল *nightly* Rust-এ পাওয়া যায়। Cargo দিয়ে বেঞ্চমার্কগুলো রান করুন:

```
cargo bench
```

আপনি যদি rustup.rs ব্যবহার করেন:

```
rustup run nightly cargo bench
```

- [বেঞ্চমার্ক টেস্ট](https://doc.rust-lang.org/stable/unstable-book/library-features/test.html)

nightly Rust সম্পর্কে আরও জানুন:

- [Nightly Rust](https://doc.rust-lang.org/book/appendix-07-nightly-rust.html)
- [Rust nightly ইনস্টল করা](https://rust-lang.github.io/rustup/concepts/channels.html#working-with-nightly-rust)
