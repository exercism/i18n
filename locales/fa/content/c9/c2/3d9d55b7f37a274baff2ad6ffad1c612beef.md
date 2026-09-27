# دستورالعمل‌ها

شما مدیر یک رستوران شیک هستید که انبار شراب نسبتاً بزرگی دارد. بسیاری از مشتریان شما از علاقه‌مندان پرتوقع شراب هستند. پیدا کردن بطری مناسب برای یک مشتری خاص کار آسانی نیست.

شما به عنوان صاحب رستورانی که به فناوری علاقه دارد، تصمیم گرفتید روند انتخاب شراب را سریع‌تر کنید و برای این کار اپلیکیشنی بنویسید که به مهمانان اجازه می‌دهد شراب‌های شما را بر اساس ترجیحاتشان فیلتر کنند.

## 1. همه‌ی شراب‌های یک رنگ مشخص را بگیرید

هر بطری شراب با یک نوع داده‌ی سفارشی نمایش داده می‌شود و شراب‌ها در یک لیست ذخیره می‌شوند.

```gleam
[
  Wine("Chardonnay", 2015, "Italy", White),
  Wine("Pinot grigio", 2017, "Germany", White),
  Wine("Pinot noir", 2016, "France", Red),
  Wine("Dornfelder", 2018, "Germany", Rose)
]
```

تابع `wines_of_color` را پیاده‌سازی کنید. این تابع لیستی از شراب‌ها می‌گیرد و همه‌ی شراب‌های یک رنگ مشخص را برمی‌گرداند.

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

## 2. همه‌ی بطری‌های شراب یک کشور مشخص را بگیرید

تابع `wines_from_country` را پیاده‌سازی کنید. این تابع لیستی از شراب‌ها می‌گیرد و همه‌ی شراب‌های یک کشور مشخص را برمی‌گرداند.

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

## 3. همه‌ی شراب‌های یک رنگ مشخص را که در یک کشور مشخص بطری شده‌اند بگیرید

تابع `filter` را پیاده‌سازی کنید. این تابع لیستی از شراب‌ها، یک رنگ و یک کشور می‌گیرد و همه‌ی شراب‌های رنگ مشخصی را برمی‌گرداند که در کشور مشخصی بطری شده‌اند.

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
