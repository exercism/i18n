# تلميحات

## 1. تعريف الموافقة

- [عرّف نوع البيانات الجبري][ADT] `Approval` مع مُنشئات للخيارات المطلوبة.

## 2. تعريف المطبخ

- [عرّف نوع البيانات الجبري][ADT] `Cuisine` مع مُنشئات للخيارات المطلوبة.

## 3. تعريف أنواع الأفلام

- [عرّف نوع البيانات الجبري][ADT] `Genre` مع مُنشئات للخيارات المطلوبة.

## 4. تعريف النشاط

- [عرّف نوع بيانات جبري ببيانات مرتبطة][ADT-with-data] لتغليف الأنشطة المختلفة.

## 5. تقييم النشاط

- أفضل أسلوب لتنفيذ المنطق بناءً على قيمة النشاط هو استخدام [تعبيرات الحالة][case-expression].
- مطابقة الأنماط على حالة نوع بيانات جبري تتيح الوصول إلى بياناتها المرتبطة.
- لإضافة شرط إضافي إلى نمط، يمكنك استخدام [حارس][guards] داخل حالة.
- إذا أردت التقاط جميع القيم الأخرى الممكنة في حالة واحدة، يمكنك استخدام نمط البديل `_`.

[ADT]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#enumeration-types
[ADT-with-data]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#beyond-enumerations
[case-expression]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#case-expessions
[guards]: https://learnyouahaskell.github.io/syntax-in-functions.html#guards-guards
