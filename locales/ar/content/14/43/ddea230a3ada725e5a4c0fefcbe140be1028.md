# ملحق التعليمات

## الموضوعات

بعض موضوعات Rust التي قد تودّ القراءة عنها أثناء حل هذه المسألة:

- السمات، سواء سمة From أو [تنفيذ سماتك الخاصة](https://doc.rust-lang.org/book/ch10-02-traits.html)
- [التنفيذات الافتراضية للطرق](https://doc.rust-lang.org/book/ch10-02-traits.html#default-implementations) في السمات
- الماكرو: يمكن أن يقلل استخدام الماكرو من الكود المتكرر ويزيد من سهولة القراءة
  في هذا التمرين. على سبيل المثال،
  [يمكن للماكرو أن ينفّذ سمة لعدة أنواع دفعة واحدة](https://stackoverflow.com/questions/39150216/implementing-a-trait-for-multiple-types-at-once)،
  ومع ذلك لا بأس في تنفيذ `years_during` داخل سمة Planet نفسها. يمكن للماكرو
  أن يعرّف البنى وتنفيذاتها معًا. يمكن العثور على معلومات للبدء مع الماكرو في:

  - [فصل الماكرو في كتاب The Rust Programming Language](https://doc.rust-lang.org/stable/book/ch19-06-macros.html)
  - [نسخة أقدم من فصل الماكرو تتضمن تفاصيل مفيدة](https://doc.rust-lang.org/1.30.0/book/first-edition/macros.html)
  - [Rust By Example](https://doc.rust-lang.org/stable/rust-by-example/macros.html)
