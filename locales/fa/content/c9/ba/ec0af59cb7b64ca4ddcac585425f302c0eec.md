# دستورالعمل‌ها

باشگاه فوتبال ما [exercise:csharp/football-match-reports]() در لیگ‌ها اوج می‌گیرد و از شما دعوت شده است که کار بیشتری انجام دهید، این بار روی سامانه‌ی چاپ کارت امنیتی.

سلسله‌مراتب کلاس‌های کادر پشتیبان به شرح زیر است

```
TeamSupport (interface)
├ Chairman
├ Manager
└ Staff (abstract)
    ├ Physio
    ├ OffensiveCoach
    ├ GoalKeepingCoach
    └ Security
        ├ SecurityJunior
        ├ SecurityIntern
        └ PoliceLiaison
```

پیاده‌سازی کامل این سلسله‌مراتب به‌عنوان بخشی از کد منبع تمرین در اختیار شما قرار گرفته است.

تمام داده‌هایی که به سازنده‌ی کارت امنیتی سپرده می‌شود اعتبارسنجی شده‌اند و تضمین می‌شود که `null` نیستند.

## 1. دریافت نام نمایشی برای یکی از اعضای تیم پشتیبان، به شرط اینکه عضو کارکنان باشد

لطفاً متد `SecurityPassMaker.GetDisplayName()` را پیاده‌سازی کنید. این متد باید مقدار فیلد `Title` را در نمونه‌های همه‌ی کلاس‌های مشتق‌شده از `Staff` برگرداند و در غیر این صورت باید «Too Important for a Security Pass» را برگرداند.

```csharp
var spm = new SecurityPassMaker();
spm.GetDisplayName(new Manager());
// => "Too Important for a Security Pass"
spm.GetDisplayName(new Physio());
// => "The Physio"
```

## 2. سفارشی‌سازی نام نمایشی برای تیم امنیت

لطفاً متد `SecurityPassMaker.GetDisplayName()` را تغییر دهید. این متد باید مانند کار ۱ رفتار کند، با این تفاوت که اگر عضو کارکنان، عضوی از تیم امنیت باشد (چه از نوع `Security` و چه یکی از مشتقات آن)، متن « Priority Personnel» باید بعد از عنوان نمایش داده شود.

```csharp
var spm = new SecurityPassMaker();
spm.GetDisplayName(new Physio());
// => "The Physio"
var spm2 = new SecurityPassMaker();
spm2.GetDisplayName(new Security());
// => "Security Team Member Priority Personnel"
spm2.GetDisplayName(new SecurityJunior());
// => "Security Junior Priority Personnel"
```

## 3. فقط اعضای اصلی تیم امنیت را به‌عنوان کارکنان اولویت‌دار تعیین کنید

لطفاً متد `SecurityPassMaker.GetDisplayName()` را تغییر دهید. این متد باید مانند کار ۲ رفتار کند، با این تفاوت که متن « Priority Personnel» نباید برای نمونه‌هایی از نوع `SecurityJunior`، `SecurityIntern` و `PoliceLiaison` نمایش داده شود.

```csharp
var spm2 = new SecurityPassMaker();
spm2.GetDisplayName(new Security());
// => "Security Team Member Priority Personnel"
spm2.GetDisplayName(new SecurityJunior());
// => "Security Junior"
```
