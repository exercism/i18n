# الاختبار على مسار Pyret

## تثبيت المتطلبات المسبقة

بعد أن تنزّل تمرينًا بنجاح، ستحتاج إلى تثبيت وحدات Node.js لتشغيل الاختبارات:

```sh
cd /path/to/exercise
npm install
```

ثم أضف المجلد الذي يحتوي على أداة سطر الأوامر `pyret` إلى `$PATH` الخاص بك.

```sh
# bash
PATH="./node_modules/.bin:$PATH"

# zsh
path=(./node_modules/.bin $path)

# fish
fish_add_path ./node_modules/.bin
```

## البدء

ستجد داخل مجلد التمرين عدة ملفات، لكن أهم ملفين فيه هما ملف الحل وملف الاختبار.
في المثال التالي، نزّلنا تمرين السنة الكبيسة.

```bash
leap/
├── leap.arr       # Solution file - your code goes here
├── leap-test.arr  # Test cases for the exercise
```

لتشغيل الاختبارات، استخدم `exercism test` إذا كنت قد نزّلت واجهة سطر الأوامر الرسمية لـ Exercism، أو شغّل `pyret leap-test.arr`.
سيشغّل Pyret مجموعة الاختبارات، وهي تتألف من مجموعة من كتل `check` المُعنونة التي تختبر ملف الحل لديك مقابل مدخلات محددة ونتائج متوقعة.
ومن الأجزاء الحاسمة في هذه العملية أن تصدّر أجزاءً من الكود الخاص بك بشكل صريح، حتى تتمكن مجموعة الاختبارات من رؤيتها.

## provide

تستورد الاختبارات في هذا المسار ملفك، ما يتيح لها الوصول إلى أي شيء صدّرته بشكل صريح من الكود الخاص بك.

لتصدير المتغيرات، عليك إضافة [عبارة provide][provide-statement] في بداية ملفك.

المقتطفان التاليان أسلوبان صالحان لتصدير `a` و`b` و`c`.

```pyret
# using a list of bindings
provide a, b, c end
```

```pyret
# using an object literal
provide {
  a: a,
  b: b,
  c: c
}
end
```

وهناك أسلوب ثالث، وهو `provide *`، اختصار لتصدير جميع الارتباطات على المستوى الأعلى باستثناء أنواع البيانات المخصصة
لكنه عمومًا غير مُوصى به لأن Pyret صارم في عدم السماح بـ [التظليل][shadowing].

## provide-types

ستتطلب بعض التمارين تصدير [نوع بيانات مخصص][data-definition] لأغراض الاختبار.
في تلك الحالات، يمكنك استخدام [عبارة provide-types][provide-types-statement].
ولأن نوع البيانات له دوال إضافية قد لا تكون مُصدّرة، يُنصح باستخدام `provide-types *` رغم مشكلة التظليل.

```pyret
provide-types *

data MyPoint:
  | two-dim(x, y)
  | three-dim(x, y, z)
end
```

ستحتوي جميع قوالب التمارين على عبارات `provide` أو `provide-types` مُهيّأة لاستخدامك.

[provide-statement]: https://pyret.org/docs/latest/Provide_Statements.html
[shadowing]: https://pyret.org/docs/latest/Bindings.html#%28part._s~3ashadowing%29
[data-definition]: https://pyret.org/docs/latest/s_declarations.html#%28elem._%28bnf-prod._%28.Pyret._data-decl%29%29%29
[provide-types-statement]: https://pyret.org/docs/latest/Provide_Statements.html
