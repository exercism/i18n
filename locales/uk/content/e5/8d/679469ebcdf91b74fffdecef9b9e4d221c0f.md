# Докладніше

TypeScript - це JavaScript із синтаксисом для типів, що робить його строго типізованою мовою програмування, яка підтримує обʼєктно-орієнтований, імперативний і декларативний (наприклад, функціональний) стилі та дає кращий інструментарій за будь-якого масштабу.
У ній є кілька [примітивів][mdn-primitive], а все інше вважається обʼєктом.

Хоча JavaScript найбільше відомий як мова сценаріїв для вебсторінок, його використовують і багато середовищ поза браузером, наприклад Node.js.
Мова активно розвивається, і завдяки своїй мультипарадигмальності дозволяє багато стилів програмування.

TypeScript будується на цьому і також активно розвивається.
У деяких рейтингах 2023 року він популярніший за JavaScript у щоденному використанні.

Оскільки [не можна вивчити TypeScript, не вивчивши JavaScript][handbook-js-or-ts], частина вмісту цього треку присвячена вивченню концепцій JavaScript, а деякі концепції зосереджені лише на можливостях, властивих саме TypeScript.

## (Пере)присвоєння

У TypeScript є кілька основних способів присвоїти значення іменам: за допомогою змінних або констант.
На Exercism змінні завжди записують у стилі [camelCase][wiki-camel-case], а константи - у стилі [SCREAMING_SNAKE_CASE][wiki-snake-case].
Офіційного посібника, якого треба дотримуватися, немає, і різні компанії та організації мають різні стильові настанови.
_Змінні можна записувати так, як зручно_.
Перевага запису їх так, як це зроблено у вправах, полягає в тому, що у вебінтерфейсі та більшості IDE вони будуть виділятися по-різному.

Змінні в TypeScript можна визначати за допомогою ключового слова [`const`][mdn-const], [`let`][mdn-let] або [`var`][mdn-var].

Змінна, оголошена через `let` або `var`, може вказувати на різні значення протягом свого життя.
Наприклад, `myFirstVariable` можна визначати й перевизначати багато разів за допомогою оператора присвоєння `=`:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
myFirstVariable = new SomeComplexClass()
```

На відміну від `let` і `var`, змінним, визначеним через `const`, значення можна присвоїти лише один раз.
Саме так у TypeScript визначають константи.

```typescript
const MY_FIRST_CONSTANT = 10

// Can not be re-assigned.
MY_FIRST_CONSTANT = 20
// => TypeError: Assignment to constant variable.
```

Оскільки TypeScript виявляє це статично, компілятор TypeScript також видасть помилку:

```typescript
// ^? Cannot assign to 'MY_FIRST_CONSTANT' because it is a constant.(2588)
```

Це означає, що не потрібно запускати код, щоб виявити `TypeError`.

<!--prettier-ignore -->
~~~~exercism/note
💡 У пізнішій навчальній вправі ми розглянемо й пояснимо різницю між присвоєнням / звʼязуванням _константи_ та _значенням константи_.
~~~~

## Виведення типу

Не заглиблюючись надто в тему [виведення типу][handbook-type-inference], варто знати, що присвоєна змінна зазвичай має виведений тип, навіть без анотації типу.

```typescript
const MY_FIRST_CONSTANT = 10
// ^? const MY_FIRST_CONSTANT: number
```

Далі цей тип перевіряється в усьому коді.
Це також означає, що код, коректний у JavaScript:

```javascript
let myFirstVariable = 1
myFirstVariable = 'Some string'
```

у TypeScript викликає помилку:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
// ^? Type 'string' is not assignable to type 'number'.(2322)
```

Ця можливість забезпечує типобезпеку, навіть коли анотації типів не використовуються.

### Присвоєння константи

Ключове слово `const` згадується _і_ для змінних, _і_ для констант.
Ще одне поняття, яке часто згадують у звʼязку з константами, - це [(не)змінюваність][wiki-mutability].

Ключове слово `const` робить незмінним лише _звʼязування_, тобто значення `const`-змінній можна присвоїти лише один раз.
У TypeScript незмінними є лише [примітивні][mdn-primitive] значення.
Однак [непримітивні][mdn-primitive] значення все одно можна змінювати.

```typescript
const MY_MUTABLE_VALUE_CONSTANT = { food: 'apple' }

// This is possible
MY_MUTABLE_VALUE_CONSTANT.food = 'pear'

MY_MUTABLE_VALUE_CONSTANT
// => { food: "pear" }
```

### Значення константи (незмінюваність)

Як правило, на Exercism і в багатьох інших організаціях та стильових настановах проєктів не змінюють значення, які мають вигляд `const SCREAMING_SNAKE_CASE`.
Технічно ці значення _можна_ змінити, але задля ясності та передбачуваності на Exercism цього не радять.
Коли цього _необхідно_ дотриматися, використовують [`Object.freeze(value)`][mdn-object-freeze].

Де можливо, для статичного забезпечення незмінності можна використати ключове слово `readonly`, `as const` або узагальнений тип `Readonly<T>`.
Більше про це ми дізнаємося пізніше.

```typescript
const MY_VALUE_CONSTANT = Object.freeze({ food: 'apple' })

MY_VALUE_CONSTANT.food = 'pear'
// ^? Cannot assign to 'food' because it is a read-only property.(2540)

MY_VALUE_CONSTANT
// => { food: "apple" }
```

У реальному коді навряд чи можна побачити `Object.freeze` по всій кодовій базі, але правило ніколи не змінювати значення у стилі `SCREAMING_SNAKE_CASE` - добре правило; його часто забезпечують за допомогою автоматичного аналізу, наприклад лінтера.

## Оголошення функцій

У TypeScript одиниці функціональності інкапсульовані у _функціях_, і функції зазвичай групують в одному файлі, якщо вони повʼязані між собою.
Такі функції можуть приймати параметри (аргументи) і можуть _повертати_ значення за допомогою ключового слова `return`.
Функції викликають за допомогою синтаксису `()`.

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2
}

add(1, 3)
// => 4
```

Параметри функції зазвичай позначають типом за допомогою двокрапки (`:`), після якої йде тип.
Повернене значення функції можна анотувати після закриття списку параметрів за допомогою двокрапки (`:`), після якої йде тип.

Якщо функція не має анотації типу для свого поверненого значення, тип буде виведено.

```typescript
function add(num1: number, num2: number) {
  return num1 + num2
}

add(1, 3)
// ^? function add(num1: number, num2: number): number
```

Тут тип поверненого значення було виведено, бо TypeScript знає, що результат `number + number` завжди має бути `number`.

<!--prettier-ignore -->
~~~~exercism/note
💡 У TypeScript є _багато_ різних способів оголосити функцію.
Ці інші способи відрізняються від використання ключового слова `function`.
Трек намагається поступово їх вводити, але якщо хтось уже знайомий із ними, можна сміливо використовувати будь-який із них.
У більшості випадків використання одного чи іншого не краще й не гірше.
~~~~

## Анотації типів

Як показано в оголошенні функції `add`, параметри мають явну анотацію типу `: number`.
Оголошення змінних, властивості класів, оголошення функцій та багато іншого підтримують анотації типів.

І явні анотації типу, і виведені типи перевіряються засобом перевірки типів.

```typescript
add('foo', 3)
// ^? Argument of type 'string' is not assignable to parameter of type 'number'.(2345)
```

Якщо TypeScript не знаходить явної анотації типу й не може вивести тип, він призначить тип `any`, який [не варто використовувати][handbook-dont-use-any].
Пізніше ми дізнаємося про тип `unknown` як добру альтернативу.

## Експорт та імпорт

Ключові слова `export` та `import` - це потужні інструменти, які перетворюють звичайний файл TypeScript на [модуль TypeScript][mdn-module].
Окрім того, що вони дозволяють коду вибірково відкривати компоненти (наприклад, функції, класи, змінні та константи), вони також уможливлюють цілу низку інших можливостей, як-от:

- [Перейменування експортів та імпортів][mdn-renaming-modules], яке дозволяє уникати конфліктів імен;
- [Динамічний імпорт][mdn-dynamic-imports], який завантажує код на вимогу;
- [Tree shaking][blog-tree-shaking], який зменшує розмір підсумкового коду, усуваючи модулі без побічних ефектів і навіть вміст модулів, _які не використовуються_;
- Експорт [_живих звʼязків_][blog-live-bindings], який дозволяє експортувати значення, що змінюється всюди, де його імпортовано, якщо змінюється початкове значення.

Конкретний приклад: як працюють тести на треку TypeScript в Exercism.
Кожна вправа має щонайменше один файл реалізації, наприклад `lasagna.ts`, і щонайменше один тестовий файл, наприклад `lasagna.test.ts`.
Файл реалізації використовує `export`, щоб відкрити публічний API, а тестовий файл використовує `import`, щоб отримати до нього доступ, і саме так він може перевірити результати роботи реалізації.

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
Оскільки компілятор TypeScript _не переписує шляхи імпорту_, імпорти слід записувати з розширенням `.js` (адже саме таким він стане після транспіляції).
Однак опцію `allowImportingTsExtensions` увімкнено, бо в нас є процес, який переписує шляхи.
Це дозволяє імпортувати з `.ts` (а також із `.js`).

У старішому коді можна знайти імпорти _без розширення файлу_.
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
