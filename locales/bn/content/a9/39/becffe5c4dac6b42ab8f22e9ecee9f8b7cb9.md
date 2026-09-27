# JSON ফাইল ফরম্যাট করা

একটি Exercism track রিপোতে অনেক JSON ফাইল থাকে, যেমন:

- track লেভেলের `config.json` ফাইল।
- প্রতিটি concept-এর জন্য একটি `.meta/config.json` আর একটি `links.json` ফাইল।
- প্রতিটি Concept Exercise বা Practice Exercise-এর জন্য একটি `.meta/config.json` ফাইল।

Exercism জুড়ে এই ফাইলগুলোর ফরম্যাটিং যদি একই রকম হয়, তাহলে সেগুলো পড়তে অনেক সুবিধা হয়। তাই configlet-এ একটি `fmt` কমান্ড আছে, যা একটি track-এর JSON ফাইলগুলোকে একটি প্রমিত রূপে আবার লিখে দেয়।

`fmt` কমান্ড নিচের ফাইলগুলো ফরম্যাট করে:

- `config.json`
- `exercises/{concept,practice}/*/.approaches/config.json`
- `exercises/{concept,practice}/*/.articles/config.json`
- `exercises/{concept,practice}/*/.meta/config.json`

## ব্যবহার

`fmt` কমান্ড অনুশীলনীর 'meta/config.json' ফাইলগুলো ফরম্যাট করে।

```
configlet [global-options] fmt [command-options]

Global options:
  -h, --help                   Show this help message and exit
      --version                Show this tool's version information and exit
  -t, --track-dir <dir>        Specify a track directory to use instead of the current directory
  -v, --verbosity <verbosity>  The verbosity of output. Allowed values: q[uiet], n[ormal], d[etailed]

Options for fmt:
  -e, --exercise <slug>        Only operate on this exercise
  -u, --update                 Prompt to write formatted files
  -y, --yes                    Auto-confirm the prompt from --update
```

শুধু `configlet fmt` চালালে track-এ কোনো পরিবর্তন হয় না। এটি প্রতিটি Concept Exercise আর Practice Exercise-এর `.meta/config.json` ফাইলের এবং track লেভেলের `config.json` ফাইলের ফরম্যাটিং যাচাই করে।

যেসব পাথে আগে থেকেই ফরম্যাট করা অনুশীলনীর `.meta/config.json` ফাইল নেই, সেগুলোর একটি তালিকা দেখতে চাইলে (এবং অন্তত একটি অনুশীলনীর ফরম্যাট করা config ফাইল না থাকলে নন-জিরো exit code নিয়ে বেরিয়ে যেতে চাইলে):

```shell
configlet fmt
```

ফরম্যাট করা config ফাইল লিখতে অনুমতি চাওয়ার প্রম্পট পেতে চাইলে `--update` অপশনটি যোগ করুন (সংক্ষেপে `-u`):

```shell
configlet fmt --update
```

কোনো প্রশ্ন না করেই ফরম্যাট করা config ফাইলগুলো লিখে ফেলতে `--yes` অপশনটি যোগ করুন (সংক্ষেপে `-y`):

```shell
configlet fmt --update --yes
```

একটি মাত্র অনুশীলনীর উপর কাজ করতে `--exercise` অপশনটি (সংক্ষেপে `-e`) ব্যবহার করুন।
যেমন, `prime-factors` অনুশীলনীর ফরম্যাট করা config ফাইলটি কোনো প্রশ্ন ছাড়াই লিখতে:

```shell
configlet fmt -uy -e prime-factors
```

JSON ফাইল লেখার সময় `configlet fmt` যা যা করে:

- কী (key)/ভ্যালু জোড়াগুলো প্রমিত ক্রমে লেখে।

- ইন্ডেন্টেশনের জন্য দুটি স্পেস ব্যবহার করে।

- JSON অ্যারের প্রতিটি এলিমেন্ট এবং JSON অবজেক্টের প্রতিটি কী (key) আলাদা লাইনে লেখে।

- ঐচ্ছিক এবং খালি মানযুক্ত কী (key)-গুলোর কী (key)/ভ্যালু জোড়া মুছে দেয়।
  যেমন, `"source": ""` মুছে ফেলা হয়।

- Practice Exercise-এর config ফাইল থেকে `"test_runner": true` মুছে দেয়।
  এটি একটি ঐচ্ছিক কী (key)। স্পেসিফিকেশন অনুযায়ী, `test_runner` কী (key) বাদ দিলে তার মান `true` ধরে নেওয়া হয়।

- একটি JSON অবজেক্টে একই কী (key) নামের একাধিক কী (key)/ভ্যালু জোড়া থাকলে শুধু শেষটি রাখে।

একটি অনুশীলনীর `.meta/config.json` ফাইলের প্রমিত কী (key) ক্রম হলো:

```text
- authors
- [contributors]
- files
  - solution
  - test
  - exemplar           (Concept Exercises only)
  - example            (Practice Exercises only)
  - [editor]
  - [invalidator]
- [language_versions]
- [forked_from]        (Concept Exercises only)
- [icon]               (Concept Exercises only)
- [test_runner]        (Practice Exercises only)
- blurb
- [source]
- [source_url]
- [custom]
```

এখানে তৃতীয় বন্ধনী অর্থাৎ `[]` বোঝায়, তার ভেতরের কী (key) ঐচ্ছিক।

মনে রাখবেন, `configlet fmt` কেবল সেই অনুশীলনীগুলোর উপরই কাজ করে যেগুলো track লেভেলের `config.json` ফাইলে আছে।
তাই কোনো track-এ নতুন একটি অনুশীলনী ইমপ্লিমেন্ট করছেন আর তার `.meta/config.json` ফাইল ফরম্যাট করতে চাইলে, আগে অনুশীলনীটি track লেভেলের `config.json` ফাইলে যোগ করুন।
অনুশীলনীটি যদি এখনো ব্যবহারকারীর সামনে আনার মতো তৈরি না হয়, তাহলে তার `status` মান `wip` দিয়ে দিন।

configlet শেষ হওয়ার সময় দেখা প্রতিটি config ফাইল ফরম্যাট করা থাকলে exit code হয় 0, নয়তো 1।
