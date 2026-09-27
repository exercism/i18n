# التعليمات

في هذا التمرين ستتعامل مع أسطر السجل.

كل سطر سجل هو سلسلة نصية بتنسيق كالتالي: `"[<LEVEL>]: <MESSAGE>"`.

هناك ثلاثة مستويات مختلفة للسجل:

- `INFO`
- `WARNING`
- `ERROR`

لديك ثلاث مهام، ستأخذ كل مهمة سطر سجل وتطلب منك أن تفعل به شيئًا.

## 1. استخرج الرسالة من سطر السجل

نفّذ الدالة `message` لتُرجع رسالة سطر السجل:

```julia-repl
julia> message("[ERROR]: Invalid operation")
"Invalid operation"
```

يجب إزالة أي مسافات بيضاء في البداية أو النهاية:

```julia-repl
julia> message("[WARNING]:  Disk almost full\r\n")
"Disk almost full"
```

## 2. استخرج مستوى السجل من سطر السجل

نفّذ الدالة `log_level` لتُرجع مستوى السجل لسطر السجل، بأحرف صغيرة:

```julia-repl
julia> log_level("[ERROR]: Invalid operation")
"error"
```

## 3. أعد تنسيق سطر السجل

نفّذ الدالة `reformat` التي تعيد تنسيق سطر السجل، بحيث تأتي الرسالة أولًا ويأتي مستوى السجل بعدها بين الأقواس الهلالَين:

```julia-repl
julia> reformat("[INFO]: Operation completed")
"Operation completed (info)"
```

----

***ملاحظة:***  جميع السلاسل النصية في هذا التمرين بالإنجليزية ومحصورة في مجموعة أحرف ASCII.
ستمهّد المفاهيم اللاحقة فرصة للعمل مع أحرف يونيكود.
