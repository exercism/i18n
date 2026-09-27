# دستورالعمل

انجمن محله از شما می‌خواهد ثبت‌نام قطعه‌های باغ را مدیریت کنید. وضعیت در دو متغیر پویا نگهداری می‌شود:

- `registrations` — برداری از جفت‌های `plot` که در حال حاضر به یک شخص اختصاص یافته‌اند.
- `next-id` — عدد صحیحی که برای ثبت‌نام بعدی استفاده می‌شود.

تاپل `plot` دو خانه دارد:

| خانه            | نوع      |
| --------------- | -------- |
| `id`            | عدد صحیح |
| `registered-to` | رشته     |

## 1. باغ را باز کنید و ثبت‌نام‌هایش را فهرست کنید

`open-garden` را تعریف کنید تا متغیرهای پویا را مقداردهی اولیه کند: یک بردار خالی برای `registrations` و `1` برای `next-id`. سپس `list-registrations` را تعریف کنید تا بردار کنونی قطعه‌ها را برگرداند.

```factor
open-garden
list-registrations .
! => V{ }
```

## 2. یک قطعه ثبت کنید

`register` را تعریف کنید تا یک اسم را از پشته بردارد، یک `plot` تازه با شناسه‌ی در دسترس بعدی بسازد، آن را به بردار `registrations` بیفزاید، `next-id` را یک واحد افزایش دهد و قطعه‌ی جدید را برگرداند.

```factor
open-garden
"Emma Balan" register .
! => T{ plot { id 1 } { registered-to "Emma Balan" } }

list-registrations .
! => V{ T{ plot { id 1 } { registered-to "Emma Balan" } } }
```

شناسه‌های قطعه باید یکتا باشند و حتی بعد از آزادسازی هم افزایش پیدا کنند. `next-id` هرگز نباید مقداری را دوباره استفاده کند.

## 3. یک قطعه را آزاد کنید

`release` را تعریف کنید تا یک شناسه بگیرد و عنصر متناظر را از `registrations` حذف کند. آزاد کردن یک شناسه‌ی ناشناخته هیچ کاری انجام نمی‌دهد.

```factor
open-garden
"Emma" register drop
1 release
list-registrations .
! => V{ }
```

## 4. یک قطعه‌ی ثبت‌شده را بگیرید

`get-registration` را تعریف کنید تا یک شناسه بگیرد و قطعه‌ی متناظر را برگرداند، یا اگر هیچ قطعه‌ای آن شناسه را نداشت، نماد `not-found` را برگرداند.

```factor
open-garden
"Emma" register drop
1 get-registration .
! => T{ plot { id 1 } { registered-to "Emma" } }

7 get-registration .
! => not-found
```

## 5. قطعه‌ها را بر اساس اسم پیدا کنید

`find-by-name` را تعریف کنید تا یک اسم بگیرد و برداری از همه‌ی قطعه‌هایی را برگرداند که در حال حاضر به آن شخص ثبت شده‌اند.

```factor
open-garden
"Emma" register drop
"Bob" register drop
"Emma" register drop
"Emma" find-by-name .
! => V{ T{ plot { id 1 } { registered-to "Emma" } }
        T{ plot { id 3 } { registered-to "Emma" } } }
```
