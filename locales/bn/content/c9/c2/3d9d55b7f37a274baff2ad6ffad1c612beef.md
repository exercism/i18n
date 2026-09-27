# নির্দেশনা

আপনি এমন একটি অভিজাত রেস্টুরেন্টের ম্যানেজার, যার বেশ বড়সড় একটি ওয়াইনের ভান্ডার আছে। আপনার অনেক গ্রাহকই ওয়াইনের ব্যাপারে খুব খুঁতখুঁতে অনুরাগী। নির্দিষ্ট কোনো গ্রাহকের জন্য সঠিক ওয়াইনের বোতল খুঁজে বের করা সহজ কাজ নয়।

টেক-স্যাভি রেস্টুরেন্ট মালিক হিসেবে আপনি ঠিক করলেন, ওয়াইন বাছাইয়ের কাজটি দ্রুত করতে একটি অ্যাপ লিখবেন, যা দিয়ে অতিথিরা নিজেদের পছন্দ অনুযায়ী আপনার ওয়াইনগুলো ফিল্টার করতে পারবেন।

## 1. নির্দিষ্ট রঙের সব ওয়াইন পান

একটি ওয়াইনের বোতলকে একটি কাস্টম টাইপ দিয়ে প্রকাশ করা হয়, আর ওয়াইনগুলো একটি অ্যারেতে সংরক্ষণ করা হয়।

```gleam
[
  Wine("Chardonnay", 2015, "Italy", White),
  Wine("Pinot grigio", 2017, "Germany", White),
  Wine("Pinot noir", 2016, "France", Red),
  Wine("Dornfelder", 2018, "Germany", Rose)
]
```

`wines_of_color` ফাংশনটি ইমপ্লিমেন্ট করুন। এটি ওয়াইনের একটি অ্যারে নেবে এবং নির্দিষ্ট রঙের সব ওয়াইন রিটার্ন করবে।

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

## 2. নির্দিষ্ট দেশের সব ওয়াইনের বোতল পান

`wines_from_country` ফাংশনটি ইমপ্লিমেন্ট করুন। এটি ওয়াইনের একটি অ্যারে নেবে এবং নির্দিষ্ট দেশের সব ওয়াইন রিটার্ন করবে।

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

## 3. নির্দিষ্ট দেশে বোতলজাত নির্দিষ্ট রঙের সব ওয়াইন পান

`filter` ফাংশনটি ইমপ্লিমেন্ট করুন। এটি ওয়াইনের একটি অ্যারে, একটি রঙ এবং একটি দেশ নেবে এবং নির্দিষ্ট দেশে বোতলজাত নির্দিষ্ট রঙের সব ওয়াইন রিটার্ন করবে।

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
