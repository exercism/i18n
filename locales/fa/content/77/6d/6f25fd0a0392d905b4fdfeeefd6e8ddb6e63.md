# راهنما

## کلی

- پشته‌ی ماشین‌حساب فقط یک آرایه‌ی Factor است. یک «عمل» همان quotation است: `( stack -- new-stack )`.
- `head*` از [`sequences`][sequences] همه‌چیز را به‌جز `n` عنصر آخر برمی‌گرداند؛ `last2` دو عنصر آخر را برمی‌گرداند.

## 1. پیاده‌سازی جمع

- از `bi` در [`kernel`][kernel] استفاده کنید تا ورودی را به دو محاسبه منشعب کنید: «آرایه منهای دو عنصر آخرش» و «مجموع دو عنصر آخر». سپس `suffix` این دو را به هم می‌چسباند.

## 2. پیاده‌سازی ضرب

- همان شکل وظیفه‌ی ۱، با `*` به‌جای `+`.

## 3. اعمال یک عمل واحد

- اثر quotation همان `( stack -- new-stack )` است. آن را روی `call` اعلام کنید تا کامپایلر بتواند نوعش را بررسی کند: `call( stack -- new-stack )`.

## 4. ارزیابی یک برنامه

- `each` (در [`sequences`][sequences]) یک quotation را روی یک دنباله تکرار می‌کند. هر تکرار پشته‌ی جاری را می‌بیند، عمل بعدی را از برنامه بیرون می‌کشد و آن را اعمال می‌کند.

## 5. ارزیابی با اسم

- هر اسم را با `at` (در [`assocs`][assocs]) در assoc جست‌وجو کنید تا عملش را به‌دست آورید، سپس `evaluate` را دوباره به کار ببرید.
- یک quotation fry به شکل `'[ _ at ]` از [`curry-compose-fry`][fry] روی assoc بسته می‌شود، تا `map` بتواند در یک گذر هر اسم را با عملش عوض کند.

## 6. تقسیم با ایمنی

- `throw` (در [`kernel`][kernel]) یک خطا ایجاد می‌کند. `zero-divisor-error` از قبل اعلام شده است، پس `zero-divisor-error throw` همان فراخوانی است.
- مسیر تقسیم را با یک `if` محافظت کنید که بررسی می‌کند آیا پایین‌ترین مقسوم‌علیه `0` است یا نه.

[sequences]: https://docs.factorcode.org/content/vocab-sequences.html
[kernel]: https://docs.factorcode.org/content/vocab-kernel.html
[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/vocab-fry.html
