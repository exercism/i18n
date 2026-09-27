# حول

‏TypeScript هي JavaScript مع صياغة للأنواع، ما يجعلها لغة برمجة قوية الأنواع، تدعم الأنماط الكائنية والأمرية والتعريفية (مثل البرمجة الوظيفية)، وتمنحك أدوات أفضل على أي حجم.
ولها عدد قليل من [الأنواع الأولية][mdn-primitive]، وكل ما عداها يُعتبر كائنًا.

وبينما تُعرف JavaScript بأنها لغة البرمجة النصية لصفحات الويب، فإن بيئات كثيرة غير المتصفح تستخدمها أيضًا، مثل Node.js.
واللغة في تطوّر نشط، ولأنها متعددة الأنماط، فهي تتيح أساليب عديدة للبرمجة.

تستند TypeScript إلى ذلك وهي أيضًا في تطوّر نشط.
وفي بعض التصنيفات لعام 2023 كانت أكثر شيوعًا من JavaScript في الاستخدام اليومي.

ولأن [لا يمكنك تعلّم TypeScript دون تعلّم JavaScript][handbook-js-or-ts]، فإن بعض المحتوى في هذا المسار يركّز على تعليم مفاهيم JavaScript، وبعض المفاهيم تركّز على ميزات TypeScript الخاصة فقط.

## الإسناد وإعادة الإسناد

هناك بضع طرق أساسية لإسناد القيم إلى الأسماء في TypeScript، إما باستخدام المتغيرات أو الثوابت.
في Exercism، تُكتب المتغيرات دائمًا بنمط [camelCase][wiki-camel-case]، وتُكتب الثوابت بنمط [SCREAMING_SNAKE_CASE][wiki-snake-case].
لا يوجد دليل رسمي يجب اتباعه، ولدى شركات ومؤسسات مختلفة أدلة أنماط مختلفة.
_لا تتردد في كتابة المتغيرات بالطريقة التي تريدها_.
وميزة كتابتها بالطريقة التي أُعدّت بها التمارين هي أنها ستُبرز بشكل مختلف في واجهة الويب وفي معظم بيئات التطوير.

يمكن تعريف المتغيرات في TypeScript باستخدام الكلمة المفتاحية [`const`][mdn-const] أو [`let`][mdn-let] أو [`var`][mdn-var].

يمكن للمتغير أن يشير إلى قيم مختلفة عبر حياته عند استخدام `let` أو `var`.
على سبيل المثال، يمكن تعريف `myFirstVariable` وإعادة تعريفه مرات عديدة باستخدام عامل الإسناد `=`:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
myFirstVariable = new SomeComplexClass()
```

وعلى عكس `let` و`var`، فإن المتغيرات المعرّفة بـ `const` يمكن إسنادها مرة واحدة فقط.
ويُستخدم هذا لتعريف الثوابت في TypeScript.

```typescript
const MY_FIRST_CONSTANT = 10

// Can not be re-assigned.
MY_FIRST_CONSTANT = 20
// => TypeError: Assignment to constant variable.
```

ولأن TypeScript يستطيع كشف ذلك بشكل ساكن، فإن مترجم TypeScript سيُنتج خطأً أيضًا:

```typescript
// ^? Cannot assign to 'MY_FIRST_CONSTANT' because it is a constant.(2588)
```

وهذا يعني أنك لست بحاجة إلى تشغيل الكود لكشف `TypeError`.

<!--prettier-ignore -->
~~~~exercism/note
💡 في تمرين تعلّمي لاحق، يُستكشف الفرق بين إسناد _الثابت_ / ربطه وقيمة _الثابت_ ويُشرح.
~~~~

## استنتاج النوع

ودون الخوض بعمق في موضوع [استنتاج النوع][handbook-type-inference]، يجدر بك أن تعرف أن المتغير المُسنَد يكون عادةً له نوع مستنتج، حتى دون توصيف النوع.

```typescript
const MY_FIRST_CONSTANT = 10
// ^? const MY_FIRST_CONSTANT: number
```

ثم يُفرض هذا النوع في جميع أنحاء الكود.
وهذا يعني أيضًا أن الكود التالي صالح في JavaScript:

```javascript
let myFirstVariable = 1
myFirstVariable = 'Some string'
```

أما عند استخدام TypeScript فإنه يشتكي:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
// ^? Type 'string' is not assignable to type 'number'.(2322)
```

تضمن هذه الميزة سلامة الأنواع حتى عند عدم استخدام توصيفات النوع.

### إسناد الثابت

تُذكر الكلمة المفتاحية `const` للمتغيرات _والثوابت_ معًا.
ومن المفاهيم التي تُذكر كثيرًا إلى جانب الثوابت [(عدم) القابلية للتغيير][wiki-mutability].

الكلمة المفتاحية `const` تجعل _الربط_ فقط غير قابل للتغيير، أي أنه يمكنك إسناد قيمة إلى متغير `const` مرة واحدة فقط.
وفي TypeScript، القيم [الأولية][mdn-primitive] فقط هي غير القابلة للتغيير.
أما القيم [غير الأولية][mdn-primitive] فيمكن تغييرها رغم ذلك.

```typescript
const MY_MUTABLE_VALUE_CONSTANT = { food: 'apple' }

// This is possible
MY_MUTABLE_VALUE_CONSTANT.food = 'pear'

MY_MUTABLE_VALUE_CONSTANT
// => { food: "pear" }
```

### قيمة الثابت (عدم القابلية للتغيير)

كقاعدة، في Exercism، وفي أدلة الأنماط لدى كثير من المؤسسات والمشاريع، لا تُغيّر القيم التي تبدو بهيئة `const SCREAMING_SNAKE_CASE`.
من الناحية التقنية، _يمكن_ تغيير هذه القيم، لكن من أجل الوضوح وضبط التوقعات في Exercism، لا يُنصح بذلك.
وعندما _يجب_ فرض ذلك، استخدم [`Object.freeze(value)`][mdn-object-freeze].

وحيثما أمكن، يمكن استخدام الكلمة المفتاحية `readonly` أو `as const` أو النوع العام `Readonly<T>` لفرض عدم القابلية للتغيير بشكل ساكن.
وستتعلم المزيد عن هذا الموضوع لاحقًا.

```typescript
const MY_VALUE_CONSTANT = Object.freeze({ food: 'apple' })

MY_VALUE_CONSTANT.food = 'pear'
// ^? Cannot assign to 'food' because it is a read-only property.(2540)

MY_VALUE_CONSTANT
// => { food: "apple" }
```

في الواقع العملي، من غير المرجح أن ترى `Object.freeze` في كل مكان من قاعدة الكود، لكن قاعدة عدم تغيير قيمة `SCREAMING_SNAKE_CASE` أبدًا قاعدة جيدة، وغالبًا ما تُفرض عبر تحليل آلي مثل أداة linter.

## تعريفات الدوال

في TypeScript، تُغلَّف وحدات الوظائف في _دوال_، وعادةً ما تُجمَّع الدوال معًا في الملف نفسه إذا كانت تنتمي إلى بعضها.
ويمكن لهذه الدوال أن تأخذ معاملات (وسائط)، وأن _تُرجع_ قيمة باستخدام الكلمة المفتاحية `return`.
وتُستدعى الدوال باستخدام الأقواس الهلالية `()`.

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2
}

add(1, 3)
// => 4
```

ينبغي عادةً توصيف معاملات الدالة بنوع باستخدام النقطتين (`:`) متبوعتين بالنوع.
ويمكن توصيف قيم إرجاع الدالة بعد إغلاق قائمة المعاملات باستخدام النقطتين (`:`) متبوعتين بالنوع.

وإذا لم يكن للدالة توصيف نوع لقيمة إرجاعها، فسيُستنتج النوع.

```typescript
function add(num1: number, num2: number) {
  return num1 + num2
}

add(1, 3)
// ^? function add(num1: number, num2: number): number
```

هنا استُنتج نوع الإرجاع لأن TypeScript يعرف أن ناتج `number + number` يجب أن يكون دائمًا `number`.

<!--prettier-ignore -->
~~~~exercism/note
💡 في TypeScript هناك _طرق_ عديدة ومختلفة لتعريف دالة.
وتبدو هذه الطرق الأخرى مختلفة عن استخدام الكلمة المفتاحية `function`.
ويحاول المسار تقديمها تدريجيًا، لكن إذا كنت تعرفها بالفعل، فلا تتردد في استخدام أي منها.
وفي معظم الحالات، لا يكون استخدام إحداها أفضل أو أسوأ من الأخرى.
~~~~

## توصيفات النوع

كما هو موضح في تعريف الدالة `add`، فإن للمعاملات توصيف نوع صريحًا هو `: number`.
وتدعم تعريفات المتغيرات وخصائص الأصناف وتعريفات الدوال وغيرها توصيفات النوع.

ويُفرض كل من توصيف النوع الصريح والأنواع المستنتجة بواسطة مدقّق الأنواع.

```typescript
add('foo', 3)
// ^? Argument of type 'string' is not assignable to parameter of type 'number'.(2345)
```

وإذا لم يجد TypeScript توصيف نوع صريحًا ولم يستطع استنتاج النوع، فسيُسند النوع `any`، وهو نوع [لا ينبغي لك استخدامه][handbook-dont-use-any].
وستتعلم لاحقًا عن النوع `unknown` كبديل جيد.

## التصدير والاستيراد

الكلمتان المفتاحيتان `export` و`import` أداتان قويتان تحوّلان ملف TypeScript عاديًا إلى [وحدة TypeScript][mdn-module].
وبالإضافة إلى السماح للكود بكشف مكوّنات مختارة، مثل الدوال والأصناف والمتغيرات والثوابت، فإنه يتيح أيضًا مجموعة كاملة من الميزات الأخرى، مثل:

- [إعادة تسمية الصادرات والواردات][mdn-renaming-modules]، مما يتيح لك تجنّب تعارض الأسماء،
- [الواردات الديناميكية][mdn-dynamic-imports]، التي تحمّل الكود عند الطلب،
- [Tree shaking][blog-tree-shaking]، التي تقلّل حجم الكود النهائي عبر إزالة الوحدات الخالية من الآثار الجانبية وحتى محتويات الوحدات _التي لا تُستخدم_،
- تصدير [_الارتباطات الحية_][blog-live-bindings]، مما يتيح لك تصدير قيمة تتغيّر في كل مكان تُستورد فيه إذا تغيّرت القيمة الأصلية.

ومن الأمثلة الملموسة طريقة عمل الاختبارات في مسار TypeScript على Exercism.
فكل تمرين له ملف تنفيذ واحد على الأقل، مثل `lasagna.ts`، وكل تمرين له ملف اختبار واحد على الأقل، مثل `lasagna.test.ts`.
ويستخدم ملف التنفيذ `export` لكشف الـ API العام، ويستخدم ملف الاختبار `import` للوصول إليها، وهكذا يستطيع اختبار نتائج التنفيذ.

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
لأن مترجم TypeScript _لا يعيد كتابة مسارات الاستيراد_، ينبغي كتابة الاستيرادات باستخدام الامتداد `.js` (فهذا ما ستصير إليه بعد الترجمة).
ومع ذلك، فإن الخيار `allowImportingTsExtensions` مُفعَّل لأن لدينا عملية تعيد كتابة المسارات.
وهذا يتيح الاستيراد من `.ts` (وكذلك من `.js`).

وفي الكود الأقدم ستجد استيرادات _بدون امتداد الملف_.
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
