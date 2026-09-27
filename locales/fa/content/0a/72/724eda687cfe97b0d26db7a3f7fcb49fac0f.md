# ربات مهمانی عجیب‌وغریب

## داستان

روزی برنامه‌نویسی عجیب‌وغریب در خانه‌ای عجیب با پنجره‌های میله‌دار زندگی می‌کرد. یک روز از یک تابلوی آگهی استخدام آنلاین کاری را پذیرفت: ساختن یک ربات مهمانی. قرار بود این ربات به مردم خوش‌آمد بگوید و آن‌ها را به صندلی‌هایشان راهنمایی کند. اولین افزوده بسیار فنی بود و کمبود تعامل انسانی برنامه‌نویس را نشان می‌داد. بعضی از آن‌ها هم به نسخه‌ی نهایی راه پیدا کردند.

## وظایف

- هر نفر را با این جمله خوش‌آمد بگویید:

```
Welcome to my party, <name>!
```

- مهمانی که تولدش امروز است، این‌گونه خوش‌آمد گفته می‌شود تا ربات دانشش را درباره‌ی هر مهمان به نمایش بگذارد:

```
Happy birthday <name>! You are now <age> years old!
Welcome to my party!
```

- به کسی که جای نشستنش را می‌پرسد، مسیر میزش این‌گونه گفته می‌شود:

```
Welcome to my party, <name>!
You have been assigned to table <table-number-in-hex>. Your table is <direction>, exactly <distance-float> meters from here.
You will be sitting next to <neighbour-name>!
```

## پیاده‌سازی‌ها

- [Go: strings][implementation-go] (پیاده‌سازی مرجع)

## مرجع

- [`types/string`][types-string]

[types-string]: https://github.com/exercism/v3/blob/main/reference/types/string.md
[implementation-go]: https://github.com/exercism/go/blob/main/exercises/concept/strings/.docs/instructions.md
