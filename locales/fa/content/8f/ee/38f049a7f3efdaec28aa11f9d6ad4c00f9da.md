# مقدمه

فایل یک «جریان» است که اسمی روی دیسک دارد. واژگان [`io.files`][io.files] فایل‌ها را یا یک‌جا، در یک فراخوانی واحد، می‌خواند و می‌نویسد، یا به‌صورت تدریجی از طریق جریانی که به یک دامنه محدود است. هر تابع فایل یک **کدگذاری** می‌گیرد؛ برای متن، این تقریباً همیشه [`utf8`][utf8] از `io.encodings.utf8` است.

## خواندن

```
file-contents   ( path encoding -- str )
file-lines      ( path encoding -- seq )
```

`file-contents` کل فایل را به‌صورت یک رشته برمی‌گرداند. `file-lines` خطوط آن را به‌صورت یک آرایه برمی‌گرداند که شکستگی‌های خط در آن حذف شده‌اند.

## نوشتن

```
set-file-contents   ( str path encoding -- )
set-file-lines      ( seq path encoding -- )
```

هر دو فایل را جایگزین می‌کنند (و در صورت نیاز آن را می‌سازند). `set-file-lines` هر عنصر را در یک خط می‌نویسد و خطوط جدید را خودش برایتان اضافه می‌کند.

## افزودن و ورودی/خروجی تدریجی

ترکیب‌کننده‌های `with-…` یک فایل را به‌عنوان جریان محیطی برای یک «بلوک کد» باز می‌کنند و پس از آن می‌بندند؛ یعنی یک دامنه‌ی پاک‌سازی، مانند ترکیب‌کننده‌های جریان در `channel-chatter`.

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
