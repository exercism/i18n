# পরিচিতি

Factor-এ *স্ট্রিম* হলো এমন যেকোনো কিছু, যা থেকে আপনি বাইট পড়তে পারেন বা যাতে বাইট লিখতে পারেন। ফাইল, সকেট, ইন-মেমরি বাফার আর আপনার নিজের কাস্টম র্যাপার সবাই [`io`][io]-এর একই ছোট [প্রোটোকল][stream-protocol]-এ অংশ নেয়।

প্রোটোকলের দুই অংশই মিক্সিন: যেগুলো থেকে আপনি পড়েন সেগুলোর জন্য `input-stream`, আর যেগুলোতে আপনি লেখেন সেগুলোর জন্য `output-stream`। `INSTANCE: <class> input-stream` দিয়ে একটি ক্লাস একটিতে (বা দুটিতেই) যুক্ত হয়।

## পড়া ও লেখা

```
stream-read1         ( stream -- elt/f )
stream-read          ( n stream -- seq/f )
stream-write1        ( elt stream -- )
stream-write         ( seq stream -- )
stream-flush         ( stream -- )
stream-element-type  ( stream -- type )
```

`stream-read1` পরের বাইটটি রিটার্ন করে (স্ট্রিম শেষ হলে `f`); `stream-read` সর্বোচ্চ `n` বাইট পড়ে। `stream-write1` আর `stream-write` আউটপুটের ক্ষেত্রে একই ধরনের কাজ করে। `stream-flush` বাফারে জমে থাকা আউটপুট বের করে দেয়। `stream-element-type` জানায় স্ট্রিমটি কাঁচা বাইট (`+byte+`) নিয়ে কাজ করে নাকি ক্যারেক্টার (`+character+`) নিয়ে।

## `disposable` দিয়ে পরিষ্কার করা

স্ট্রিমগুলো OS-এর রিসোর্স ধরে রাখে, তাই এই প্রোটোকল [`destructors`][destructors] ভোকাবুলারির সাথে জুটি বাঁধে। একটি কাস্টম স্ট্রিম `disposable` প্যারেন্ট ক্লাস এক্সটেন্ড করে:

```factor
! DOCTEST: SKIP   (illustrative class definition; no runnable assertion)
USING: accessors destructors io kernel ;

TUPLE: my-stream < disposable underlying ;
INSTANCE: my-stream output-stream

: <my-stream> ( underlying -- s )
    my-stream new-disposable swap >>underlying ;

M: my-stream dispose* underlying>> dispose ;
```

`new-disposable` (যা `destructors`-এ আছে) হলো ফ্যাক্টরি: এটি টাপলটি অ্যালোকেট করে এবং ডেস্ট্রাক্টর ফ্রেমওয়ার্কে রেজিস্টার করে, যাতে এক্সেপশনের কারণে রিসোর্স লিক না হয়। `M: <class> dispose*` বলে দেয় পরিষ্কার করতে *কীভাবে* হবে; ইউজার কোড `dispose` (পাবলিক ওয়ার্ড) কল করে, যা অবজেক্টটিকে ডিসপোজড হিসেবে চিহ্নিত করে, তারপর `dispose*` রান করে।

## স্কোপভিত্তিক ব্যবহার

`with-disposal`, `with-input-stream`, আর `with-output-stream` রিসোর্স খোলা রেখে একটি কোয়োটেশন রান করে এবং বেরিয়ে যাওয়ার সময় সেটি ডিসপোজ করে:

```factor
USING: io io.streams.string ;

"hello" <string-reader> [ read-contents . ] with-input-stream
! => "hello"   (the reader is disposed before this line returns)
```

[io]: https://docs.factorcode.org/content/vocab-io.html
[destructors]: https://docs.factorcode.org/content/vocab-destructors.html
[stream-protocol]: https://docs.factorcode.org/content/article-stream-protocol.html
