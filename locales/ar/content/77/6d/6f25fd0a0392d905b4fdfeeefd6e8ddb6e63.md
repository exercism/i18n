# تلميحات

## عام

- مكدس الآلة الحاسبة ليس سوى مصفوفة Factor. *العملية* هي quotation بالشكل `( stack -- new-stack )`.
- تُرجع `head*` من [`sequences`][sequences] كل شيء عدا آخر `n` من العناصر، وتُرجع `last2` العنصرين الأخيرين.

## 1. تنفيذ الجمع

- استخدم `bi` من [`kernel`][kernel] لتقسيم المدخل إلى عمليتين حسابيتين: «المصفوفة ناقص آخر عنصرين» و«مجموع آخر عنصرين». ثم تُجمعهما `suffix`.

## 2. تنفيذ الضرب

- بالشكل نفسه كما في المهمة 1، مع `*` بدلًا من `+`.

## 3. تطبيق عملية واحدة

- أثر quotation هو `( stack -- new-stack )`. صرّح بذلك على `call` حتى يستطيع المصرّف التحقق من الأنواع: `call( stack -- new-stack )`.

## 4. تقييم برنامج

- يكرّر `each` (في [`sequences`][sequences]) تنفيذ quotation على عناصر تسلسل. في كل تكرار يرى المكدس الجاري، ويسحب العملية التالية من البرنامج، ثم يطبّقها.

## 5. التقييم بالاسم

- ابحث عن كل اسم في assoc باستخدام `at` (في [`assocs`][assocs]) للحصول على عمليته، ثم أعد استخدام `evaluate`.
- quotation من fry بالشكل `'[ _ at ]` من [`curry-compose-fry`][fry] يُغلق على assoc بحيث يستطيع `map` استبدال كل اسم بعمليته في مرور واحد.

## 6. القسمة بأمان

- يرفع `throw` (في [`kernel`][kernel]) خطأ. إن `zero-divisor-error` معرّف مسبقًا، لذا فإن الاستدعاء هو `zero-divisor-error throw`.
- احمِ مسار القسمة بجملة شرطية `if` تتحقق مما إذا كان المقسوم عليه الأسفل هو `0`.

[sequences]: https://docs.factorcode.org/content/vocab-sequences.html
[kernel]: https://docs.factorcode.org/content/vocab-kernel.html
[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/vocab-fry.html
