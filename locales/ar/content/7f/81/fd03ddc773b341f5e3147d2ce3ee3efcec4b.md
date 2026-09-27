# صيغة الطرق

الطرق في Cairo شبيهة بالدوال، لكنها مرتبطة بنوع معيّن عبر السمات.

معاملها الأول هو دائمًا `self`، ويمثّل النسخة التي تُستدعى عليها الطريقة.

وبينما لا يسمح Cairo بتعريف الطرق مباشرة على نوع، يمكنك تحقيق الوظيفة نفسها بتعريف سمة ثم تنفيذها للنوع.

إليك مثالًا على تعريف طريقة على نوع `Rectangle` باستخدام سمة:

```rust
#[derive(Copy, Drop)]
struct Rectangle {
    width: u64,
    height: u64,
}

#[generate_trait]
impl RectangleImpl of RectangleTrait {
    fn area(self: @Rectangle) -> u64 {
        (*self.width) * (*self.height)
    }
}

fn main() {
    let rect = Rectangle { width: 30, height: 50 };
    println!("Area is {}", rect.area());
}
```

في المثال أعلاه، تحسب الطريقة `area` مساحة المستطيل.

استخدام الوسم `#[generate_trait]` يبسّط العملية إذ ينشئ لك السمة المطلوبة تلقائيًا.

وهذا يجعل الكود أنظف مع الاستمرار في السماح بربط الطرق بأنواع معيّنة.

## الدوال المرتبطة

الدوال المرتبطة شبيهة بالطرق، لكنها لا تعمل على نسخة من النوع، فهي لا تأخذ `self` كمعامل.

وغالبًا ما تُستخدم هذه الدوال كدوال إنشاء أو دوال مساعدة مرتبطة بالنوع.

```rust
#[generate_trait]
impl RectangleImpl of RectangleTrait {
    fn square(size: u64) -> Rectangle {
        Rectangle { width: size, height: size }
    }
}

fn main() {
    let square = RectangleTrait::square(10);
    println!("Square dimensions: {}x{}", square.width, square.height);
}
```

الدوال المرتبطة، مثل `Rectangle::square`، تستخدم صيغة `::` وتنتمي إلى نطاق النوع.

وهي تسهّل إنشاء النسخ أو التعامل معها دون الحاجة إلى كائن موجود مسبقًا.

وبتنظيم الوظائف المترابطة في سمات وتنفيذات، يتيح Cairo بنى كودية نظيفة ومعيارية وقابلة للتوسّع.
