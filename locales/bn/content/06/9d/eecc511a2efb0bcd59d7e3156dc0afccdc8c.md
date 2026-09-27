# নির্দেশনার সংযোজন

## ইঙ্গিত

আপনাকে `diamond` ফাংশনটি ইমপ্লিমেন্ট করতে হবে, যা `A` থেকে শুরু হয়ে একটি ডায়মন্ড প্রিন্ট করে এবং যার সবচেয়ে প্রশস্ত বিন্দুতে থাকে প্রদত্ত ক্যারেক্টারটি। টাইপ নিয়ে নিশ্চিত না থাকলে দেওয়া সিগনেচারটি ব্যবহার করতে পারেন, তবে তা যেন আপনার সৃজনশীলতাকে সীমাবদ্ধ না করে:

```haskell
diamond :: Char -> Maybe [String]
```

এই অনুশীলনীটি টেক্সট ডেটা নিয়ে কাজ করে। ঐতিহাসিক কারণে হাস্কেলের `String` টাইপ `[Char]`-এর সমার্থক, অর্থাৎ ক্যারেক্টারের একটি অ্যারে। টেক্সট ডেটা আরও দক্ষভাবে সামলাতে `Text` টাইপটি ব্যবহার করা যায়।

এই অনুশীলনীর একটি ঐচ্ছিক সম্প্রসারণ হিসেবে আপনি করতে পারেন

- হাস্কেলে [স্ট্রিং টাইপ](https://haskell-lang.org/tutorial/string-types) সম্পর্কে পড়ুন।
- package.yaml-এ ডিপেন্ডেন্সির তালিকায় `- text` যোগ করুন।
- `Data.Text` [নিচের পদ্ধতিতে](https://hackernoon.com/4-steps-to-a-better-imports-list-in-haskell-43a3d868273c) ইমপোর্ট করুন:

```haskell
import qualified Data.Text as T
import           Data.Text (Text)
```

- এখন আপনি লিখতে পারেন যেমন `diamond :: Char -> Maybe [Text]`, এবং `Data.Text`-এর কম্বিনেটরগুলো উল্লেখ করতে পারেন যেমন `T.pack`,
- [`Data.Text`](https://hackage.haskell.org/package/text/docs/Data-Text.html)-এর ডকুমেন্টেশন দেখে নিন,
- এরপর Diamond.hs-এ `String`-এর সব জায়গায় `Text` বসাতে পারেন:

```haskell
diamond :: Char -> Maybe [Text]
```

এই অংশটি সম্পূর্ণ ঐচ্ছিক।
