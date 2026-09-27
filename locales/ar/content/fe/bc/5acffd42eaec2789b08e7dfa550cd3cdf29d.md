# تلميحات

## عام

- عند جلب مُدخَل باستخدام الطريقة `entry`، يمكن تعديل هذا المُدخَل في مكانه بعد إلغاء الإشارة إليه.

- تُدرج الطريقة [`or_insert`](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_insert) القيمة المُعطاة في حال كان المُدخَل شاغرًا، وتُرجع مرجعًا قابلًا للتعديل إلى القيمة في المُدخَل.

```rust
*counter.entry(key).or_insert(0) += 1;
```

- تضمن الطريقة [`or_default`](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_default) وجود قيمة في المُدخَل بإدراج القيمة الافتراضية إذا كان فارغًا، وتُرجع مرجعًا قابلًا للتعديل إلى القيمة في المُدخَل.

```rust
*counter.entry(key).or_default() += 1;
```
