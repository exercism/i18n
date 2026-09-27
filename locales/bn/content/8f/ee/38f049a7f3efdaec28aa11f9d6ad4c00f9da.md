# পরিচিতি

ফাইল হলো ডিস্কে একটি নামসহ স্ট্রিম। [`io.files`][io.files] ভোকাবুলারিটি ফাইল পড়ে ও লেখে, হয় পুরোটা একবারের কলেই, নয়তো স্কোপড স্ট্রিমের মাধ্যমে ধাপে ধাপে। প্রতিটি ফাইল ওয়ার্ড একটি **এনকোডিং** নেয়; টেক্সটের ক্ষেত্রে সেটি প্রায় সবসময়ই `io.encodings.utf8` থেকে আসা [`utf8`][utf8]।

## পড়া

```
file-contents   ( path encoding -- str )
file-lines      ( path encoding -- seq )
```

`file-contents` পুরো ফাইলটিকে একটি স্ট্রিং হিসেবে রিটার্ন করে। `file-lines` ফাইলের লাইনগুলো একটি অ্যারে হিসেবে রিটার্ন করে, লাইন ব্রেকগুলো বাদ দিয়ে।

## লেখা

```
set-file-contents   ( str path encoding -- )
set-file-lines      ( seq path encoding -- )
```

দুটিই ফাইলটি প্রতিস্থাপন করে (প্রয়োজনে সেটি তৈরি করে)। `set-file-lines` প্রতি লাইনে একটি করে এলিমেন্ট লেখে এবং নিউলাইনগুলো নিজেই যোগ করে দেয়।

## যোগ করা ও ধাপে ধাপে I/O

`with-…` কম্বিনেটরগুলো একটি কোয়োটেশনের জন্য ফাইলটিকে অ্যাম্বিয়েন্ট স্ট্রিম হিসেবে খোলে এবং পরে সেটি বন্ধ করে দেয়, একটি ডেস্ট্রাক্টর স্কোপের মতো, যেমনটি `channel-chatter`-এর স্ট্রিম কম্বিনেটরগুলো।

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
