# التعليمات

تطلب منك جمعية الحي إدارة تسجيلات قطع الأرض في الحديقة. تُخزَّن الحالة في متغيرين ديناميكيين:

- `registrations`: متجه من صفوف `plot` المخصصة حاليًا لشخص.
- `next-id`: العدد الصحيح الذي سيُستخدم للتسجيل التالي.

يحتوي صف `plot` على خانتين:

| الخانة          | النوع     |
| --------------- | -------- |
| `id`            | عدد صحيح |
| `registered-to` | سلسلة نصية |

## 1. افتح الحديقة واعرض تسجيلاتها

عرّف `open-garden` لتهيئة المتغيرين الديناميكيين: متجه فارغ لـ `registrations`، و`1` لـ `next-id`. ثم عرّف `list-registrations` لتُرجع متجه القطع الحالي.

```factor
open-garden
list-registrations .
! => V{ }
```

## 2. سجّل قطعة أرض

عرّف `register` لتأخذ اسمًا من المكدس، وتبني صف `plot` جديدًا بالمعرّف التالي المتاح، وتضيفه إلى متجه `registrations`، وتزيد `next-id` بمقدار واحد، وتُرجع القطعة الجديدة.

```factor
open-garden
"Emma Balan" register .
! => T{ plot { id 1 } { registered-to "Emma Balan" } }

list-registrations .
! => V{ T{ plot { id 1 } { registered-to "Emma Balan" } } }
```

يجب أن تكون معرّفات القطع فريدة وأن تزداد حتى بعد التحرير. فلا ينبغي أن يُعيد `next-id` استخدام أي قيمة أبدًا.

## 3. حرّر قطعة أرض

عرّف `release` لتأخذ معرّفًا وتحذف المدخل المطابق من `registrations`. تحرير معرّف غير معروف عملية لا تفعل شيئًا.

```factor
open-garden
"Emma" register drop
1 release
list-registrations .
! => V{ }
```

## 4. احصل على قطعة مسجّلة

عرّف `get-registration` لتأخذ معرّفًا وتُرجع القطعة المطابقة، أو الرمز `not-found` إذا لم تكن هناك قطعة بهذا المعرّف.

```factor
open-garden
"Emma" register drop
1 get-registration .
! => T{ plot { id 1 } { registered-to "Emma" } }

7 get-registration .
! => not-found
```

## 5. ابحث عن القطع بالاسم

عرّف `find-by-name` لتأخذ اسمًا وتُرجع متجهًا بكل القطع المسجّلة حاليًا لذلك الشخص.

```factor
open-garden
"Emma" register drop
"Bob" register drop
"Emma" register drop
"Emma" find-by-name .
! => V{ T{ plot { id 1 } { registered-to "Emma" } }
        T{ plot { id 3 } { registered-to "Emma" } } }
```
