# مقدمه

«جریان» در Factor هر چیزی است که بتوانید از آن بایت بخوانید یا در آن بایت بنویسید. فایل‌ها، سوکت‌ها، بافرهای درون‌حافظه و پوشش‌های سفارشی خودتان، همگی در همان [«پروتکل»][stream-protocol] کوچکی از [`io`][io] شرکت می‌کنند.

دو نیمه‌ی این پروتکل «میکسین» هستند: `input-stream` برای مواردی که از آن می‌خوانید و `output-stream` برای مواردی که در آن می‌نویسید. یک کلاس با `INSTANCE: <class> input-stream` به یکی از این دو (یا به هر دو) می‌پیوندد.

## خواندن و نوشتن

```
stream-read1         ( stream -- elt/f )
stream-read          ( n stream -- seq/f )
stream-write1        ( elt stream -- )
stream-write         ( seq stream -- )
stream-flush         ( stream -- )
stream-element-type  ( stream -- type )
```

`stream-read1` بایت بعدی را برمی‌گرداند (یا در پایان جریان، `f` را)؛ `stream-read` حداکثر `n` بایت می‌خواند. `stream-write1` و `stream-write` هم همین کار را برای خروجی انجام می‌دهند. `stream-flush` خروجی بافرشده را بیرون می‌فرستد. `stream-element-type` گزارش می‌دهد که آیا جریان با بایت‌های خام (`+byte+`) سر و کار دارد یا با کاراکترها (`+character+`).

## پاکسازی با `disposable`

جریان‌ها منابع سیستم‌عامل را نگه می‌دارند، بنابراین این پروتکل با واژگان [`destructors`][destructors] همراه است. یک جریان سفارشی از کلاس والد `disposable` ارث می‌برد:

```factor
! DOCTEST: SKIP   (illustrative class definition; no runnable assertion)
USING: accessors destructors io kernel ;

TUPLE: my-stream < disposable underlying ;
INSTANCE: my-stream output-stream

: <my-stream> ( underlying -- s )
    my-stream new-disposable swap >>underlying ;

M: my-stream dispose* underlying>> dispose ;
```

`new-disposable` (در `destructors`) همان کارخانه است: تاپل را تخصیص می‌دهد و آن را در چارچوب ویرانگر ثبت می‌کند تا استثناها باعث نشت منبع نشوند. `M: <class> dispose*` مشخص می‌کند که *چگونه* باید پاکسازی انجام شود؛ کد کاربر `dispose` (واژه‌ی عمومی) را فراخوانی می‌کند، که شیء را پاکسازی‌شده علامت می‌زند و بعد `dispose*` را اجرا می‌کند.

## استفاده در محدوده

`with-disposal`، `with-input-stream` و `with-output-stream` یک «کوتِیشن» را با منبع باز اجرا می‌کنند و هنگام خروج، آن را پاکسازی می‌کنند:

```factor
USING: io io.streams.string ;

"hello" <string-reader> [ read-contents . ] with-input-stream
! => "hello"   (the reader is disposed before this line returns)
```

[io]: https://docs.factorcode.org/content/vocab-io.html
[destructors]: https://docs.factorcode.org/content/vocab-destructors.html
[stream-protocol]: https://docs.factorcode.org/content/article-stream-protocol.html
