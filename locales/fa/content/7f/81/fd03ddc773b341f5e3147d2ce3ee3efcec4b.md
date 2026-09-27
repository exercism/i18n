# نحوه‌ی نگارش متد

متدها در Cairo شبیه توابع هستند، اما از طریق trait به یک نوع مشخص گره خورده‌اند.

پارامتر اول آن‌ها همیشه `self` است که همان نمونه‌ای است که متد روی آن فراخوانی می‌شود.

Cairo اجازه نمی‌دهد متدها را مستقیماً روی یک نوع تعریف کنید، اما می‌توانید همین کارکرد را با تعریف یک trait و پیاده‌سازی آن برای آن نوع به دست آورید.

در ادامه مثالی آورده شده است که با استفاده از یک trait، متدی روی نوع `Rectangle` تعریف می‌کند:

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

در مثال بالا، متد `area` مساحت یک مستطیل را محاسبه می‌کند.

استفاده از attribute یعنی `#[generate_trait]` این فرایند را ساده می‌کند، چون trait موردنیاز را به‌طور خودکار برای‌تان می‌سازد.

این کار کدتان را تمیزتر می‌کند و در عین حال اجازه می‌دهد متدها با نوع‌های مشخصی مرتبط باشند.

## توابع مرتبط

توابع مرتبط شبیه متدها هستند، اما روی نمونه‌ای از یک نوع کار نمی‌کنند. این توابع `self` را به‌عنوان پارامتر نمی‌گیرند.

این توابع اغلب به‌عنوان سازنده یا توابع کمکی مرتبط با نوع به کار می‌روند.

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

توابع مرتبط، مانند `Rectangle::square`، از نحوه‌ی نگارش `::` استفاده می‌کنند و در فضای نام همان نوع قرار می‌گیرند.

این توابع ساختن یا کار کردن با نمونه‌ها را آسان می‌کنند، بدون آنکه به یک شیء موجود نیاز باشد.

Cairo با سازمان‌دهی کارکردهای مرتبط در قالب trait و پیاده‌سازی، ساختارهای کدی تمیز، ماژولار و قابل گسترش را ممکن می‌کند.
