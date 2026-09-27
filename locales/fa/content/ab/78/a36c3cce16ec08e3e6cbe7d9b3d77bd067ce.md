# تست در ترک Pyret

## نصب پیش‌نیازها

پس از اینکه تمرین را با موفقیت دانلود کردید، برای اجرای تست‌ها باید ماژول‌های Node.js را نصب کنید:

```sh
cd /path/to/exercise
npm install
```

سپس پوشه‌ای را که ابزار خط فرمان `pyret` در آن قرار دارد به `$PATH` خود اضافه کنید

```sh
# bash
PATH="./node_modules/.bin:$PATH"

# zsh
path=(./node_modules/.bin $path)

# fish
fish_add_path ./node_modules/.bin
```

## شروع کار

در پوشه‌ی تمرین چندین فایل وجود خواهد داشت، اما مهم‌ترین آن‌ها دو فایل هستند: فایل راه‌حل و فایل تست شما.
در مثال زیر، تمرین Leap را دانلود کرده‌ایم.

```bash
leap/
├── leap.arr       # Solution file - your code goes here
├── leap-test.arr  # Test cases for the exercise
```

برای اجرای تست‌ها، یا اگر CLI رسمی Exercism را دانلود کرده‌اید از `exercism test` استفاده کنید، یا `pyret leap-test.arr` را اجرا کنید.
Pyret مجموعه‌ی تست را اجرا می‌کند؛ این مجموعه از تعدادی «بلوک» `check` برچسب‌دار تشکیل شده است که فایل راه‌حل شما را با ورودی‌های مشخص و نتایج مورد انتظار می‌سنجد.
بخش مهمی از این فرایند این است که بخش‌هایی از کد خود را به‌طور صریح صادر کنید تا مجموعه‌ی تست بتواند آن‌ها را ببیند.

## provide

تست‌ها در این ترک فایل شما را `import` می‌کنند و به این ترتیب به هر چیزی که به‌طور صریح از کد شما صادر شده باشد دسترسی خواهند داشت.

برای صادر کردن متغیرها، باید در ابتدای فایل خود یک [دستور provide][provide-statement] اضافه کنید.

قطعه‌کدهای زیر دو روش معتبر برای صادر کردن `a`، `b` و `c` هستند.

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

روش سوم، `provide *`، کوتاه‌نویسی برای صادر کردن همه‌ی اتصال‌های سطح بالا به‌جز انواع داده‌ی سفارشی است
با این حال، معمولاً توصیه نمی‌شود، چون Pyret سخت‌گیرانه اجازه‌ی [سایه‌اندازی][shadowing] را نمی‌دهد.

## provide-types

برخی تمرین‌ها نیاز دارند که یک [نوع داده‌ی سفارشی][data-definition] برای اهداف تست صادر شود.
در چنین مواردی می‌توانید از یک [دستور provide-types][provide-types-statement] استفاده کنید.
از آنجا که یک نوع داده توابع دیگری هم دارد که ممکن است صادر نشده باشند، توصیه می‌شود با وجود نگرانی مربوط به سایه‌اندازی از `provide-types *` استفاده کنید.

```pyret
provide-types *

data MyPoint:
  | two-dim(x, y)
  | three-dim(x, y, z)
end
```

در همه‌ی اسکلت‌های تمرین، دستور `provide` یا `provide-types` برای استفاده‌ی شما آماده شده است.

[provide-statement]: https://pyret.org/docs/latest/Provide_Statements.html
[shadowing]: https://pyret.org/docs/latest/Bindings.html#%28part._s~3ashadowing%29
[data-definition]: https://pyret.org/docs/latest/s_declarations.html#%28elem._%28bnf-prod._%28.Pyret._data-decl%29%29%29
[provide-types-statement]: https://pyret.org/docs/latest/Provide_Statements.html
