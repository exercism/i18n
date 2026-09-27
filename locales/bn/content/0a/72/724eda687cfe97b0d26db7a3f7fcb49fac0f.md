# খামখেয়ালি পার্টি রোবট

## গল্প

একদা এক খামখেয়ালি প্রোগ্রামার থাকতেন, এক অদ্ভুত বাড়িতে, যার জানালায় শিক ছিল। একদিন তিনি একটি অনলাইন জব বোর্ড থেকে পার্টি রোবট বানানোর একটি কাজ নিলেন। রোবটটির কথা হলো মানুষকে অভিবাদন জানানো এবং তাদের নিজ নিজ আসনে পৌঁছে দিতে সাহায্য করা। প্রথম সংস্করণটি ছিল খুবই টেকনিক্যাল এবং তা প্রোগ্রামারটির মানবিক যোগাযোগের অভাব ফুটিয়ে তুলেছিল। যার কিছু অংশ শেষ সংস্করণেও জায়গা পেয়েছিল।

## কাজ

- প্রত্যেক ব্যক্তিকে এভাবে অভিবাদন জানাতে হবে:

```
Welcome to my party, <name>!
```

- যে অতিথির আজ জন্মদিন, তাকে নিচের ভঙ্গিতে অভিবাদন জানানো হয়, যাতে রোবটের প্রত্যেক অতিথি সম্পর্কে জানার বিষয়টি প্রকাশ পায়:

```
Happy birthday <name>! You are now <age> years old!
Welcome to my party!
```

- যে কেউ নিজের আসন সম্পর্কে জিজ্ঞাসা করে, তাকে তার টেবিলের দিকনির্দেশ এভাবে দেওয়া হয়:

```
Welcome to my party, <name>!
You have been assigned to table <table-number-in-hex>. Your table is <direction>, exactly <distance-float> meters from here.
You will be sitting next to <neighbour-name>!
```

## ইমপ্লিমেন্টেশন

- [Go: strings][implementation-go] (রেফারেন্স ইমপ্লিমেন্টেশন)

## রেফারেন্স

- [`types/string`][types-string]

[types-string]: https://github.com/exercism/v3/blob/main/reference/types/string.md
[implementation-go]: https://github.com/exercism/go/blob/main/exercises/concept/strings/.docs/instructions.md
