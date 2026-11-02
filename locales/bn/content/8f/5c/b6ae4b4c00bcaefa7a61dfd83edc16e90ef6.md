# ইঙ্গিত

## সাধারণ

- [`TemporalAdjusters`][temporaladjusters-docs] ক্লাসটি (বহুবচনটি লক্ষ করুন) স্ট্যাটিক মেথডের একটি সংগ্রহ, যেগুলো তৈরি করা রেডিমেড অ্যাডজাস্টার রিটার্ন করে।
- কোনো `LocalDate` মানের ক্ষেত্রে তার [`with()`][localdate-with] মেথড দিয়ে একটি অ্যাডজাস্টার প্রয়োগ করা হয়; এই মেথড একটি নতুন `LocalDate` রিটার্ন করে আর মূল মানটি অপরিবর্তিত রাখে।
- "এক মাসের ভিতরে" অ্যাডজাস্ট করতে চাইলে ওই মাসের যেকোনো তারিখ থেকে শুরু করুন, যেমন মাসের প্রথম দিন: `LocalDate.of(year, month, 1)`।

## 1. নিয়মিত একজন গ্রাহকের স্থায়ী অ্যাপয়েন্টমেন্ট খুঁজে বের করা

- এমন একটি [অ্যাডজাস্টার][dayofweekinmonth-docs] আছে, যা যে তারিখে এটি প্রয়োগ করা হয় সেই তারিখের মাসে সপ্তাহের একটি নির্দিষ্ট বারের n-তম উপস্থিতি খুঁজে বের করে।

## 2. নিয়মিত একজন গ্রাহকের মাসের শেষের অ্যাপয়েন্টমেন্ট খুঁজে বের করা

- এমন একটি [অ্যাডজাস্টার][lastinmonth-docs] আছে, যা যে তারিখে এটি প্রয়োগ করা হয় সেই তারিখের মাসে সপ্তাহের একটি নির্দিষ্ট বারের শেষ উপস্থিতি খুঁজে বের করে।

## 3. অ্যাপয়েন্টমেন্ট ছাড়া আসা গ্রাহকের জন্য পরবর্তী উপলব্ধ দিন খুঁজে বের করা

- সপ্তাহের একটি নির্দিষ্ট বারের দিকে এগিয়ে যাওয়ার জন্য দুটি অ্যাডজাস্টার আছে: একটি সবসময় পরের তারিখে নিয়ে যায়, আর [অন্যটি][nextorsame-docs] তারিখটি ইতিমধ্যেই মিলে গেলে সেটিই ধরে রাখে।

## 4. হিসাবরক্ষণের দিন খুঁজে বের করা

- এমন একটি [অ্যাডজাস্টার][lastdayofmonth-docs] আছে, যা মাসের শেষ দিনে নিয়ে যায়।
- একটি `LocalDate` আপনাকে তার [সপ্তাহের বার][localdate-getdayofweek] বলে দিতে পারে।
- শেষ দিনটি যখন সাপ্তাহিক ছুটির দিনে পড়ে, তখন এমন একটি [অ্যাডজাস্টার][previous-docs] আছে, যা সপ্তাহের ওই বারের আগের উপস্থিতিতে পিছিয়ে নিয়ে যায়।

## 5. বেতন দেওয়ার দিনের জন্য সাপ্তাহিক ছুটির নিয়মটি আবার ব্যবহার করা

- [`TemporalAdjuster`][temporaladjuster-docs] হলো একটি ফাংশনাল ইন্টারফেস, যার একটিমাত্র মেথড `adjustInto()`, তাই এটি ল্যাম্বডা দিয়ে ইমপ্লিমেন্ট করা যায়।
- ল্যাম্বডার ভিতরে [`DayOfWeek.from()`][dayofweek-from] যে টেম্পোরালটি অ্যাডজাস্ট করা হচ্ছে তার সপ্তাহের বার জানিয়ে দেয়।
- অ্যাডজাস্টারগুলো চেইন করা যায়: একটি অ্যাডজাস্টার প্রয়োগের ফল হলো এমন একটি টেম্পোরাল, যার উপর আরেকটি অ্যাডজাস্টার প্রয়োগ করা যায়।

[temporaladjusters-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjusters.html
[temporaladjuster-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjuster.html
[localdate-with]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/LocalDate.html#with(java.time.temporal.TemporalAdjuster)
[localdate-getdayofweek]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/LocalDate.html#getDayOfWeek()
[dayofweek-from]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/DayOfWeek.html#from(java.time.temporal.TemporalAccessor)
[dayofweekinmonth-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjusters.html#dayOfWeekInMonth(int,java.time.DayOfWeek)
[lastinmonth-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjusters.html#lastInMonth(java.time.DayOfWeek)
[nextorsame-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjusters.html#nextOrSame(java.time.DayOfWeek)
[lastdayofmonth-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjusters.html#lastDayOfMonth()
[previous-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjusters.html#previous(java.time.DayOfWeek)
