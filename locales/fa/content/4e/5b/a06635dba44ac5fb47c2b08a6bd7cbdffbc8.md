# مقدمه

وقتی با آرایه‌ها کار می‌کنید، گاهی می‌خواهید برای هر مقدار در آرایه کدی را اجرا کنید. به این کار پیمایش یا حلقه زدن روی آرایه می‌گویند.

اینجا حالتی را بررسی می‌کنیم که نمی‌خواهید آرایه را در این میان تغییر دهید. برای تبدیل آرایه‌ها، به‌جای آن [مفهوم تبدیل آرایه][concept-array-transformations] را ببینید.

## حلقه‌ی `for`

ابتدایی‌ترین راه برای پیمایش یک آرایه، استفاده از حلقه‌ی `for` است؛ [مفهوم حلقه‌ی For][concept-for-loops] را ببینید.

```javascript
const numbers = [6.0221515, 10, 23];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
// => 6.0221515
// => 10
// => 23
```

## حلقه‌ی `for...of`

وقتی می‌خواهید در هر تکرار مستقیماً با خود مقدار کار کنید و اصلاً به اندیس نیازی ندارید، می‌توانید از حلقه‌ی `for...of` استفاده کنید.

حلقه‌ی `for...of` مثل همان حلقه‌ی `for` ساده‌ای که بالا دیدیم کار می‌کند، با این تفاوت که به‌جای اینکه مجبور باشید در حلقه با _اندیس_ به‌عنوان یک متغیر سروکار داشته باشید، _مقدار_ مستقیماً در اختیارتان قرار می‌گیرد.

```javascript
const numbers = [6.0221515, 10, 23];

// Because re-assigning number inside the loop will be very
// confusing, disallowing that via const is preferable.
for (const number of numbers) {
  console.log(number);
}
// => 6.0221515
// => 10
// => 23
```

درست مثل حلقه‌های `for` معمولی، می‌توانید از `continue` استفاده کنید تا تکرار جاری را متوقف کنید و از `break` تا اجرای کل حلقه را متوقف کنید.

## متد `forEach`

هر آرایه متدی به نام `forEach` دارد که می‌توان با آن روی عنصرهای آرایه حلقه زد.

`forEach` یک [«callback»][concept-callbacks] را به‌عنوان پارامتر می‌پذیرد.
تابع callback برای هر عنصر آرایه یک بار فراخوانی می‌شود.
عنصر جاری، اندیس آن و کل آرایه به‌عنوان آرگومان به callback داده می‌شوند.
اغلب فقط از عنصر جاری یا اندیس استفاده می‌شود.

```javascript
const numbers = [6.0221515, 10, 23];

numbers.forEach((number, index) => console.log(number, index));
// => 6.0221515 0
// => 10 1
// => 23 2
```

وقتی حلقه‌ی `forEach` شروع شد، دیگر راهی برای متوقف کردن تکرار وجود ندارد.
دستورهای `break` و `continue` در این حالت وجود ندارند.

[concept-array-transformations]: /tracks/javascript/concepts/array-transformations
[concept-for-loops]: /tracks/javascript/concepts/for-loops
[concept-callbacks]: /tracks/javascript/concepts/callbacks
