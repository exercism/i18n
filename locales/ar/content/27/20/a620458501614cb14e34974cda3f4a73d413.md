# تلميحات

## 1. اضبط اتجاه الروبوت
- ترتيب تنفيذ العمليات مهم.
- هناك عدة طرق لتحويل متجه من المتجهات إلى مصفوفة.
- بعض الأفكار التي قد تساعد في إنشاء المصفوفة: الاستيعابات، وحلقات `for`، و[`hcat`][hcat-ref]، و[`reshape`][reshape-ref]، و[`stack`][stack-ref]، وغيرها...

## 2. أدر الروبوت
- راجع المقدمة لمعرفة كيفية تدوير مصفوفة.
- كل ما تحتاجه هو ضرب المصفوفات البسيط.

## 3. تحقّق من صحة الاتجاه
- تذكّر أن العمود *الثاني* من المصفوفة هو الذي يشير إلى الاتجاه.
- يمكن التحقق من ذلك باستخدام الضرب النقطي.
- قد يكون من المفيد تطبيع المتجهات.
- في حال وجود فروق في الفاصلة العائمة، يكفي أن يكون الاتجاه [مقاربًا][isapprox-ref] لنحو `~1e-7`.
- قد تكون المتطابقة التالية مفيدة: `x⋅y = ||x||*||y||cos(θ)` حيث [`||x|| = norm(x)`][norm-ref] 

## 4. إحداثيات جسم الروبوت
- هذا مباشر جدًا، لكن العمليات عنصرًا بعنصر مهمة.
- تذكّر أنه يمكن النظر إلى مصفوفة الاتجاه على أنها ثلاثة متجهات موضع انطلاقًا من نقطة الأصل.

[hcat-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.hcat
[reshape-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.reshape
[stack-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.stack
[isapprox-ref]: https://docs.julialang.org/en/v1/base/math/#Base.isapprox
[norm-ref]: https://docs.julialang.org/en/v1/stdlib/LinearAlgebra/#LinearAlgebra.norm
