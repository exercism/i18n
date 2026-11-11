# تلميحات

## عام

- المفاهيم السابقة [structs][] و[maps][] و[methods][] مفيدة هنا.


## 1. تتبّع الحاضرين

- يشرح مفهوم [type definition][] كيفية تعريف نوع جديد.
- استخدم `make()` لإنشاء نسخة جديدة من `map`.
- لإضافة قيمة إلى الخريطة، استخدم `struct{}{}` لإنشاء نسخة من `struct{}` الفارغ.

## 2. التحقق من الحاضرين

- إذا كان عنصر موجودًا في الخريطة، فإن المجموعة تحتوي على تلك القيمة.
- يمكن استخدام [two value assignment][] للتحقق مما إذا كانت الخريطة تحتوي على عنصر.

## 3. مقارنة الحاضرين

- تكون المجموعتان متطابقتين إذا كانت كل القيم في كل مجموعة موجودة في المجموعة الأخرى.
- يمكن استخدام `range` للتحقق من جميع عناصر المجموعة.

[maps]: https://exercism.org/tracks/go/concepts/maps
[methods]: https://exercism.org/tracks/go/concepts/methods
[structs]: https://exercism.org/tracks/go/concepts/structs
[two value assignment]: https://go.dev/tour/moretypes/22
[type definition]: https://exercism.org/tracks/go/concepts/type-definitions
