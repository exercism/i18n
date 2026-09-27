# مقدمة

ذُكر في مفهوم سابق أن كلاً من التسميات المحلية والدوال مجرد عناوين داخل قسم يحتوي على كود قابل للتنفيذ، مثل `section .text`.

في الواقع، يمكن التعامل مع الدوال بالطريقة نفسها التي تتعامل بها مع أي عنوان ذاكرة، أي أنه يمكن تحميلها في السجلات، وتمريرها، وتخزينها في الذاكرة.
ومن الممكن أيضًا استخدام `call` أو `jmp` لنقل التنفيذ إلى دالة مخزّنة في سجل أو في الذاكرة:

```x86asm
section .text
sum_op:
    lea rax, [rdi + rsi] ; loads the sum rdi + rsi into rax
    ret

apply_sum:
    lea rax, [rel sum_op]
    jmp rax   ; tail call
```

يُسمّى عنوان الدالة الذي يُمرَّر كقيمة **thunk**.
تُعدّ thunks حجر الأساس في **البرمجة عالية الرتبة** بلغة التجميع: كود يعمل على كود آخر.

## الكود كبيانات

يمكن أيضًا تخزين عناوين الدوال في الذاكرة واسترجاعها لاحقًا:

```x86asm
section .bss
    cached_fn resq 1

section .text
save_op:
    mov qword [rel cached_fn], rdi
    ret

apply_op:
    ; arguments are already set up according to the ABI
    jmp qword [rel cached_fn] ; tail call
```

تكتب `save_op` عنوان الدالة الذي تستقبله في `cached_fn`.
وتبقى القيمة بعد أن تُرجع `save_op`، لذا فإن أي استدعاء لاحق لـ`apply_op` يقفز قفزة ذيلية إلى آخر عنوان خُزِّن.
وهذا يجعل من الممكن تغيير الدالة التي تستدعيها `apply_op` أثناء التنفيذ.

## جداول الإرسال

يتيح تخزين عناوين الدوال في مصفوفة اختيار دوال مختلفة وفق فهرس معيّن، قد يعتمد على شرط وقت التنفيذ.
ويُسمّى هذا **جدول إرسال**:

```x86asm
section .data
    dispatch_table dq add_op, sub_op, mul_op

section .text
dispatch:
    ; this function takes two arguments in rdi and rsi, and an index in rdx
    ; it then applies the function corresponding to the index in rdx to the arguments
    lea rax, [rel dispatch_table]
    jmp qword [rax + 8*rdx]   ; tail-call the function address for the index
```

## thunks ذات حالة

قد يتصرف thunk الذي يقرأ ذاكرة دائمة أو يحدّثها بين الاستدعاءات بشكل مختلف تبعًا لما حدث قبله.
وقد تعتمد نتيجته على أكثر من وسائطه وحدها.

على سبيل المثال، _عدّاد_ يأخذ دالة ويستدعيها بقيمة العدّ الحالية، ويزيد العدّ في كل مرة:

```x86asm
section .data
    count dq 0

section .text
tick:
    mov rax, rdi               ; saves the function address
    mov rdi, [rel count]       ; loads the current count as the function's argument
    inc qword [rel count]      ; advances the count
    jmp rax                    ; tail-calls the function
```

تستدعي `tick` الدالة المعطاة مع العدّ الحالي كوسيط، ثم تزيد العدّ.
لذا فإن أول استدعاء `tick(square)` يستدعي `square(0)`، والاستدعاء التالي `tick(square)` يستدعي `square(1)`، والتالي `square(2)`، وهكذا.

ومن الأمثلة الأخرى _حساب مؤجَّل_:

```x86asm
section .bss
    captured_fn resq 1
    argument resq 1

section .text
delay:
    mov qword [rel captured_fn], rdi ; saves the function
    mov qword [rel argument], rsi    ; saves the argument
    lea rax, [rel invoke]            ; returns the `invoke` function
    ret

invoke:
    mov rdi, qword [rel argument]    ; loads the saved argument into `rdi`
    jmp qword [rel captured_fn]      ; tail-calls the saved function
```

تأخذ `delay` دالة وقيمة، وتخزّنهما، وتُرجع `invoke`.
وعند استدعاء `invoke`، تُشغّل الدالة المخزّنة بالوسيط المحفوظ.

وتستند أنماط كثيرة شائعة في اللغات عالية المستوى، مثل الاستدعاءات الراجعة، والطرق الافتراضية، والمولّدات، وcurrying، وتركيب الدوال، وغيرها، إلى thunks تقترن بحالة دائمة.
