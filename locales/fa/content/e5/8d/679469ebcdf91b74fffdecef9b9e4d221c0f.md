# درباره

TypeScript همان JavaScript به‌همراه نحوه‌ی نگارش برای نوع‌هاست و همین آن را به یک زبان برنامه‌نویسی به‌شدت نوع‌دار تبدیل می‌کند که از سبک‌های شیءگرا، امری و اعلانی (مثلاً برنامه‌نویسی تابعی) پشتیبانی می‌کند و در هر مقیاسی ابزارهای بهتری در اختیارتان می‌گذارد.
چند [نوع اولیه][mdn-primitive] دارد و بقیه‌ی موارد یک شیء در نظر گرفته می‌شوند.

JavaScript بیشتر به‌عنوان زبان اسکریپت‌نویسی برای صفحات وب شناخته می‌شود، اما بسیاری از محیط‌های غیرمرورگری نیز از آن استفاده می‌کنند، مانند Node.js.
این زبان فعالانه در حال توسعه است و به دلیل چندپارادایمی بودن، سبک‌های گوناگونی از برنامه‌نویسی را ممکن می‌کند.

TypeScript روی همین بنا شده و آن هم فعالانه توسعه می‌یابد.
در برخی رتبه‌بندی‌های سال ۲۰۲۳، در استفاده‌ی روزمره محبوب‌تر از JavaScript است.

از آنجا که [بدون یادگیری JavaScript نمی‌توانید TypeScript را یاد بگیرید][handbook-js-or-ts]، بخشی از محتوای این مسیر بر آموزش مفاهیم JavaScript متمرکز است و بخشی از مفاهیم فقط به ویژگی‌های مخصوص TypeScript می‌پردازند.

## (تجدید) انتساب

در TypeScript چند راه اصلی برای انتساب مقدار به اسم‌ها وجود دارد: استفاده از متغیرها یا ثابت‌ها.
در Exercism، متغیرها همیشه به سبک [camelCase][wiki-camel-case] نوشته می‌شوند و ثابت‌ها به سبک [SCREAMING_SNAKE_CASE][wiki-snake-case].
راهنمای رسمی واحدی برای پیروی وجود ندارد و شرکت‌ها و سازمان‌های مختلف، راهنماهای سبک متفاوتی دارند.
_متغیرها را به هر شکلی که دوست دارید بنویسید_.
مزیت نوشتن آن‌ها به همان شکلی که تمرین‌ها آماده شده‌اند این است که در رابط وب و بیشتر IDEها به شکل متفاوتی برجسته می‌شوند.

متغیرها در TypeScript را می‌توان با «کلیدواژه»ی [`const`][mdn-const]، [`let`][mdn-let] یا [`var`][mdn-var] تعریف کرد.

وقتی از `let` یا `var` استفاده می‌کنید، یک متغیر می‌تواند در طول عمرش به مقدارهای متفاوتی اشاره کند.
برای مثال، `myFirstVariable` را می‌توان با عملگر انتساب `=` بارها تعریف و بازتعریف کرد:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
myFirstVariable = new SomeComplexClass()
```

برخلاف `let` و `var`، متغیرهایی که با `const` تعریف می‌شوند فقط یک بار می‌توان به آن‌ها مقدار داد.
از این ویژگی برای تعریف ثابت‌ها در TypeScript استفاده می‌شود.

```typescript
const MY_FIRST_CONSTANT = 10

// Can not be re-assigned.
MY_FIRST_CONSTANT = 20
// => TypeError: Assignment to constant variable.
```

از آنجا که TypeScript این را به‌صورت ایستا تشخیص می‌دهد، کامپایلر TypeScript نیز خطا صادر می‌کند:

```typescript
// ^? Cannot assign to 'MY_FIRST_CONSTANT' because it is a constant.(2588)
```

این یعنی برای تشخیص `TypeError` نیازی نیست کد را اجرا کنید.

<!--prettier-ignore -->
~~~~exercism/note
💡 در یک تمرین یادگیری بعدی، تفاوت میان انتساب / اتصال _ثابت_ و _مقدار_ ثابت بررسی و توضیح داده می‌شود.
~~~~

## استنتاج نوع

بدون اینکه خیلی عمیق به موضوع [استنتاج نوع][handbook-type-inference] بپردازیم، باید بدانید که یک متغیرِ مقدارگرفته معمولاً حتی بدون حاشیه‌نویسی نوع، نوعی استنتاج‌شده دارد.

```typescript
const MY_FIRST_CONSTANT = 10
// ^? const MY_FIRST_CONSTANT: number
```

این نوع سپس در سراسر کد اعمال می‌شود.
این همچنین یعنی در حالی که کد زیر در JavaScript معتبر است:

```javascript
let myFirstVariable = 1
myFirstVariable = 'Some string'
```

هنگام استفاده از TypeScript خطا می‌دهد:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
// ^? Type 'string' is not assignable to type 'number'.(2322)
```

این ویژگی حتی وقتی از حاشیه‌نویسی نوع استفاده نمی‌شود، ایمنی نوع را تضمین می‌کند.

### انتساب ثابت

کلیدواژه‌ی `const` _هم_ برای متغیرها مطرح می‌شود و _هم_ برای ثابت‌ها.
مفهوم دیگری که اغلب در کنار ثابت‌ها مطرح می‌شود، [(نا)تغییرپذیری][wiki-mutability] است.

کلیدواژه‌ی `const` فقط _اتصال_ را تغییرناپذیر می‌کند، یعنی فقط یک بار می‌توانید به یک متغیر `const` مقدار بدهید.
در TypeScript فقط مقدارهای [اولیه][mdn-primitive] تغییرناپذیرند.
اما مقدارهای [غیراولیه][mdn-primitive] هنوز می‌توانند تغییر کنند.

```typescript
const MY_MUTABLE_VALUE_CONSTANT = { food: 'apple' }

// This is possible
MY_MUTABLE_VALUE_CONSTANT.food = 'pear'

MY_MUTABLE_VALUE_CONSTANT
// => { food: "pear" }
```

### مقدار ثابت (تغییرناپذیری)

به‌عنوان یک قاعده، در Exercism و بسیاری از سازمان‌ها و راهنماهای سبک پروژه‌ها، مقدارهایی را که شبیه `const SCREAMING_SNAKE_CASE` هستند تغییر ندهید.
از نظر فنی این مقدارها _می‌توانند_ تغییر کنند، اما برای شفافیت و مدیریت انتظارات در Exercism، این کار توصیه نمی‌شود.
وقتی _باید_ این را اعمال کنید، از [`Object.freeze(value)`][mdn-object-freeze] استفاده کنید.

در صورت امکان، می‌توان از کلیدواژه‌ی TypeScript یعنی `readonly`، `as const` یا نوع جنریک `Readonly<T>` برای اعمال تغییرناپذیری به‌صورت ایستا استفاده کرد.
بعداً درباره‌ی این موضوع بیشتر یاد می‌گیرید.

```typescript
const MY_VALUE_CONSTANT = Object.freeze({ food: 'apple' })

MY_VALUE_CONSTANT.food = 'pear'
// ^? Cannot assign to 'food' because it is a read-only property.(2540)

MY_VALUE_CONSTANT
// => { food: "apple" }
```

در دنیای واقعی بعید است `Object.freeze` را در سراسر یک کدبیس ببینید، اما این قاعده که هرگز مقدار `SCREAMING_SNAKE_CASE` را تغییر ندهید، قاعده‌ی خوبی است؛ اغلب با تحلیل خودکار مانند linter اعمال می‌شود.

## اعلان تابع

در TypeScript، واحدهای عملکرد در _تابع‌ها_ کپسوله می‌شوند و اگر توابع به هم تعلق داشته باشند، معمولاً در یک فایل کنار هم قرار می‌گیرند.
این توابع می‌توانند پارامتر (آرگومان) بگیرند و با کلیدواژه‌ی `return` یک مقدار _برگردانند_.
توابع با نحوه‌ی نگارش `()` فراخوانی می‌شوند.

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2
}

add(1, 3)
// => 4
```

پارامترهای تابع معمولاً باید با یک دونقطه (`:`) و سپس نوع، حاشیه‌نویسی شوند.
مقدار بازگشتی تابع را می‌توان پس از بستن فهرست پارامترها، با یک دونقطه (`:`) و سپس نوع، حاشیه‌نویسی کرد.

اگر تابعی برای مقدار بازگشتی‌اش حاشیه‌نویسی نوع نداشته باشد، نوع استنتاج می‌شود.

```typescript
function add(num1: number, num2: number) {
  return num1 + num2
}

add(1, 3)
// ^? function add(num1: number, num2: number): number
```

اینجا نوع بازگشتی استنتاج شد، چون TypeScript می‌داند نتیجه‌ی `number + number` همیشه باید `number` باشد.

<!--prettier-ignore -->
~~~~exercism/note
💡 در TypeScript راه‌های _بسیاری_ برای اعلان یک تابع وجود دارد.
این راه‌های دیگر متفاوت از استفاده از کلیدواژه‌ی `function` به نظر می‌رسند.
این مسیر تلاش می‌کند آن‌ها را به‌تدریج معرفی کند، اما اگر از قبل با آن‌ها آشنا هستید، راحت باشید از هر کدامشان استفاده کنید.
در بیشتر موارد، استفاده از یکی یا دیگری بهتر یا بدتر نیست.
~~~~

## حاشیه‌نویسی نوع

همان‌طور که در اعلان تابع `add` نشان داده شد، پارامترها حاشیه‌نویسی نوع صریح `: number` دارند.
اعلان متغیر، ویژگی‌های کلاس، اعلان توابع و موارد بیشتر، همگی از حاشیه‌نویسی نوع پشتیبانی می‌کنند.

هم حاشیه‌نویسی نوع صریح و هم نوع‌های استنتاج‌شده، هر دو توسط بررسی‌کننده‌ی نوع اعمال می‌شوند.

```typescript
add('foo', 3)
// ^? Argument of type 'string' is not assignable to parameter of type 'number'.(2345)
```

اگر TypeScript حاشیه‌نویسی نوع صریحی پیدا نکند و نتواند نوع را استنتاج کند، نوع `any` را اختصاص می‌دهد که [نباید از آن استفاده کنید][handbook-dont-use-any].
بعداً درباره‌ی نوع `unknown` به‌عنوان جایگزینی خوب یاد می‌گیرید.

## صادر کردن و وارد کردن

کلیدواژه‌های `export` و `import` ابزارهای قدرتمندی هستند که یک فایل معمولی TypeScript را به یک [ماژول TypeScript][mdn-module] تبدیل می‌کنند.
علاوه بر اینکه به کد اجازه می‌دهند اجزایی مانند توابع، کلاس‌ها، متغیرها و ثابت‌ها را به‌صورت گزینشی در معرض دید بگذارد، طیف کاملی از ویژگی‌های دیگر را نیز ممکن می‌کنند، مانند:

- [تغییر نام صادرات و واردات][mdn-renaming-modules]، که به شما امکان می‌دهد از تعارض نام‌ها جلوگیری کنید،
- [واردات پویا][mdn-dynamic-imports]، که کد را در صورت نیاز بارگذاری می‌کند،
- [Tree shaking][blog-tree-shaking]، که با حذف ماژول‌های بدون اثر جانبی و حتی محتوای ماژول‌هایی _که استفاده نمی‌شوند_، حجم کد نهایی را کاهش می‌دهد،
- صادر کردن [_اتصال‌های زنده_][blog-live-bindings]، که به شما امکان می‌دهد مقداری را صادر کنید که اگر مقدار اصلی تغییر کند، در هر جایی که وارد شده است نیز تغییر می‌کند.

نمونه‌ی عینی این است که تست‌ها در مسیر TypeScript در Exercism چگونه کار می‌کنند.
هر تمرین حداقل یک فایل پیاده‌سازی دارد، برای مثال `lasagna.ts` و هر تمرین حداقل یک فایل تست دارد، برای مثال `lasagna.test.ts`.
فایل پیاده‌سازی با `export` API عمومی را در معرض دید می‌گذارد و فایل تست با `import` به آن‌ها دسترسی پیدا می‌کند؛ به این ترتیب می‌تواند نتیجه‌های پیاده‌سازی را تست کند.

```typescript
// file.js
export const MY_VALUE = 10

export function add(num1, num2) {
  return num1 + num2
}

// file.spec.js
import { MY_VALUE, add } from './file.js'

add(MY_VALUE, 5)
// => 15
```

<!--prettier-ignore -->
~~~~exercism/advanced
از آنجا که کامپایلر TypeScript مسیرهای import را _بازنویسی نمی‌کند_، واردات باید با پسوند `.js` نوشته شوند (چرا که پس از ترنسپایل به همین تبدیل می‌شود).
اما گزینه‌ی `allowImportingTsExtensions` روشن است، چون فرایندی داریم که مسیرها را بازنویسی می‌کند.
این به شما امکان می‌دهد از `.ts` هم وارد کنید (علاوه بر `.js`).

در کدهای قدیمی‌تر، وارداتی _بدون پسوند فایل_ پیدا می‌کنید.
~~~~

[blog-live-bindings]: https://2ality.com/2015/07/es6-module-exports.html#es6-modules-export-immutable-bindings
[blog-tree-shaking]: https://bitsofco.de/what-is-tree-shaking/
[mdn-const]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
[mdn-dynamic-imports]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports
[mdn-let]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
[mdn-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
[mdn-object-freeze]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
[mdn-primitive]: https://developer.mozilla.org/en-US/docs/Glossary/Primitive
[mdn-renaming-modules]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#Renaming_imports_and_exports
[mdn-var]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var
[handbook-dont-use-any]: https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#any
[handbook-js-or-ts]: https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html#learning-javascript-and-typescript
[handbook-type-inference]: https://www.typescriptlang.org/docs/handbook/type-inference.html
[wiki-mutability]: https://en.wikipedia.org/wiki/Immutable_object
[wiki-camel-case]: https://en.wikipedia.org/wiki/Camel_case
[wiki-snake-case]: https://en.wikipedia.org/wiki/Snake_case
