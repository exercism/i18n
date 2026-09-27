# پیوست دستورالعمل‌ها

## راهنمایی‌ها

باید تابع `diamond` را پیاده‌سازی کنید. این تابع یک لوزی چاپ می‌کند که از `A` شروع می‌شود و کاراکتر داده‌شده در پهن‌ترین نقاط آن قرار دارد. اگر درباره‌ی نوع‌ها مطمئن نیستید می‌توانید از امضای ارائه‌شده استفاده کنید، اما نگذارید این امضا خلاقیتتان را محدود کند:

```haskell
diamond :: Char -> Maybe [String]
```

این تمرین با داده‌های متنی کار می‌کند. به دلایل تاریخی، نوع `String` در Haskell با `[Char]`، یعنی فهرستی از کاراکترها، هم‌معنی است. برای پردازش کارآمدتر داده‌های متنی می‌توان از نوع `Text` استفاده کرد.

به‌عنوان یک بخش اختیاری برای این تمرین، می‌توانید

- درباره‌ی [نوع‌های رشته](https://haskell-lang.org/tutorial/string-types) در Haskell بخوانید.
- `- text` را به فهرست وابستگی‌هایتان در package.yaml اضافه کنید.
- `Data.Text` را به [روش زیر](https://hackernoon.com/4-steps-to-a-better-imports-list-in-haskell-43a3d868273c) وارد کنید:

```haskell
import qualified Data.Text as T
import           Data.Text (Text)
```

- حالا می‌توانید مثلاً `diamond :: Char -> Maybe [Text]` را بنویسید و به ترکیب‌کننده‌های `Data.Text` مثلاً با `T.pack` ارجاع دهید
- مستندات [`Data.Text`](https://hackage.haskell.org/package/text/docs/Data-Text.html) را ببینید
- سپس می‌توانید همه‌ی موارد `String` را در Diamond.hs با `Text` جایگزین کنید:

```haskell
diamond :: Char -> Maybe [Text]
```

این بخش کاملاً اختیاری است.
