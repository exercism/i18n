# مقدمة

الملف تيار له اسم على القرص. تقرأ مفردات [`io.files`][io.files] الملفات وتكتبها إما كاملة، في نداء واحد، وإما تدريجيًا عبر تيار محدَّد النطاق. وتأخذ كل دالة من دوال الملفات **ترميزًا**؛ وفي النصوص يكون هذا الترميز دائمًا تقريبًا [`utf8`][utf8] من `io.encodings.utf8`.

## القراءة

```
file-contents   ( path encoding -- str )
file-lines      ( path encoding -- seq )
```

تُرجع `file-contents` الملف كاملًا على هيئة سلسلة نصية واحدة. وتُرجع `file-lines` أسطر الملف على هيئة مصفوفة، بعد إزالة فواصل الأسطر منها.

## الكتابة

```
set-file-contents   ( str path encoding -- )
set-file-lines      ( seq path encoding -- )
```

كلتا الدالتين تستبدلان الملف (وتنشئانه إذا لزم الأمر). وتكتب `set-file-lines` عنصرًا واحدًا في كل سطر، وتضيف فواصل الأسطر نيابة عنك.

## الإلحاق والإدخال والإخراج التدريجي

تفتح مُركّبات `with-…` ملفًا ليكون التيار المحيط بكتلة كود، ثم تغلقه بعد ذلك، وهو نطاق تدميري شبيه بمُركّبات التيار في `channel-chatter`.

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
