# 關於

TypeScript 是加上型別語法的 JavaScript，這讓它成為一門強型別的程式語言，支援物件導向、命令式與宣告式（例如函式程式設計）等風格，並讓你在任何規模下都能享有更好的工具支援。
它有一些[原始型別][mdn-primitive]，除此之外的一切都算是物件。

雖然 JavaScript 最為人所知的身分是網頁的腳本語言，但許多非瀏覽器環境也在使用它，例如 Node.js。
這門語言仍在積極開發中；也因為它具備多典範的特性，能容納許多不同的程式設計風格。

TypeScript 建立在這之上，同樣也在積極開發中。
在 2023 年的某些排名中，它在日常使用上比 JavaScript 更受歡迎。

由於[不先學 JavaScript 就無法學 TypeScript][handbook-js-or-ts]，這條學習軌道上的部分內容著重於講解 JavaScript 的概念，另一些概念則只聚焦在 TypeScript 獨有的功能上。

## （重新）賦值

在 TypeScript 中，把值指定給名稱有幾種主要方式：使用變數或常數。
在 Exercism 上，變數一律寫成[駝峰式命名][wiki-camel-case]；常數則寫成[全大寫蛇式命名][wiki-snake-case]。
這並沒有官方指南可遵循，各家公司和組織也各有不同的風格指南。
你可以隨意用自己喜歡的方式命名變數。
按照練習準備的方式來命名，好處是它們在網頁介面和大多數 IDE 中會有不同的醒目顯示。

在 TypeScript 中，可以用 [`const`][mdn-const]、[`let`][mdn-let] 或 [`var`][mdn-var] 關鍵字來定義變數。

使用 `let` 或 `var` 時，變數在其生命週期內可以指向不同的值。
例如，可以用賦值運算子 `=` 多次定義和重新定義 `myFirstVariable`：

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
myFirstVariable = new SomeComplexClass()
```

與 `let` 和 `var` 相反，用 `const` 定義的變數只能指定一次。
在 TypeScript 中，這正是用來定義常數的方式。

```typescript
const MY_FIRST_CONSTANT = 10

// Can not be re-assigned.
MY_FIRST_CONSTANT = 20
// => TypeError: Assignment to constant variable.
```

由於 TypeScript 能靜態偵測出這種情況，TypeScript 編譯器也會產生錯誤：

```typescript
// ^? Cannot assign to 'MY_FIRST_CONSTANT' because it is a constant.(2588)
```

這表示你不需要執行程式碼，就能偵測到 `TypeError`。

<!--prettier-ignore -->
~~~~exercism/note
💡 在之後的學習練習中，會探討並說明常數的賦值／綁定與常數值之間的差異。
~~~~

## 型別推論

在不深入鑽研[型別推論][handbook-type-inference]的前提下，你應該要知道：被指定的變數通常會有推論出來的型別，即使沒有寫型別註解也一樣。

```typescript
const MY_FIRST_CONSTANT = 10
// ^? const MY_FIRST_CONSTANT: number
```

這個型別接著會在整份程式碼中強制生效。
這也意味著，下面這段程式碼在 JavaScript 中是合法的：

```javascript
let myFirstVariable = 1
myFirstVariable = 'Some string'
```

但在 TypeScript 中就會報錯：

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
// ^? Type 'string' is not assignable to type 'number'.(2322)
```

這項功能確保了型別安全，即使沒有使用型別註解也一樣。

### 常數賦值

`const` 關鍵字在變數和常數兩者都會被提到。
談到常數時，另一個常被提到的概念是[(不)可變性][wiki-mutability]。

`const` 關鍵字只讓綁定本身不可變，也就是說，你只能對一個 `const` 變數指定值一次。
在 TypeScript 中，只有[原始型別][mdn-primitive]的值是不可變的。
不過，[非原始型別][mdn-primitive]的值仍然可以被改變。

```typescript
const MY_MUTABLE_VALUE_CONSTANT = { food: 'apple' }

// This is possible
MY_MUTABLE_VALUE_CONSTANT.food = 'pear'

MY_MUTABLE_VALUE_CONSTANT
// => { food: "pear" }
```

### 常數值（不可變性）

一般來說，在 Exercism 以及許多其他組織與專案的風格指南中，都不要去改變長得像 `const SCREAMING_SNAKE_CASE` 的值。
嚴格來說，這些值可以被改變，但為了在 Exercism 上保持清楚、符合大家的預期，我們並不鼓勵這麼做。
當非得強制執行時，請使用 [`Object.freeze(value)`][mdn-object-freeze]。

在可行的情況下，可以使用 TypeScript 的 `readonly` 關鍵字、`as const` 或泛型型別 `Readonly<T>`，以靜態方式強制不可變性。
之後你會學到更多關於這個主題的內容。

```typescript
const MY_VALUE_CONSTANT = Object.freeze({ food: 'apple' })

MY_VALUE_CONSTANT.food = 'pear'
// ^? Cannot assign to 'food' because it is a read-only property.(2540)

MY_VALUE_CONSTANT
// => { food: "apple" }
```

在真實世界裡，不太可能看到整個程式碼庫到處都是 `Object.freeze`，但「永遠不要改變 `SCREAMING_SNAKE_CASE` 的值」是一條好規則；通常會透過 linter 之類的自動化分析來強制執行。

## 函式宣告

在 TypeScript 中，功能單位被封裝在函式裡，通常會把屬於同一群的函式放在同一個檔案中。
這些函式可以接受參數（引數），並使用 `return` 關鍵字回傳一個值。
函式透過 `()` 語法來呼叫。

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2
}

add(1, 3)
// => 4
```

函式參數通常應該加上型別註解，寫法是冒號（`:`）後面接著型別。
函式回傳值的型別註解則可以寫在參數列表結尾的括號之後，同樣是冒號（`:`）後面接著型別。

如果函式沒有為回傳值加上型別註解，型別就會被推論出來。

```typescript
function add(num1: number, num2: number) {
  return num1 + num2
}

add(1, 3)
// ^? function add(num1: number, num2: number): number
```

這裡之所以會推論出回傳型別，是因為 TypeScript 知道 `number + number` 的結果一定都是 `number`。

<!--prettier-ignore -->
~~~~exercism/note
💡 在 TypeScript 中，宣告函式有許多不同的方式。這些方式看起來和用 `function` 關鍵字不一樣。本學習軌道會盡量逐步介紹它們，但如果你已經認識它們，歡迎任意使用。在多數情況下，用哪一種都沒有好壞之分。
~~~~

## 型別註解

如 `add` 的函式宣告所示，這些參數有明確的型別註解 `: number`。
變數宣告、類別屬性、函式宣告等等都支援型別註解。

無論是明確的型別註解還是推論出來的型別，都會由型別檢查器強制執行。

```typescript
add('foo', 3)
// ^? Argument of type 'string' is not assignable to parameter of type 'number'.(2345)
```

如果 TypeScript 找不到明確的型別註解，也無法推論出型別，它就會指定 `any` 型別，這是[你不該使用的][handbook-dont-use-any]。
之後你會學到 `unknown` 型別，它會是個不錯的替代方案。

## 匯出與匯入

`export` 和 `import` 關鍵字是強大的工具，能把一般的 TypeScript 檔案變成一個 [TypeScript 模組][mdn-module]。
除了讓程式碼能選擇性地公開元件，例如函式、類別、變數和常數之外，它還帶來了一整系列的其他功能，例如：

- [重新命名匯出與匯入][mdn-renaming-modules]，可以讓你避免命名衝突，
- [動態匯入][mdn-dynamic-imports]，會視需求載入程式碼，
- [Tree shaking][blog-tree-shaking]，透過移除沒有副作用的模組，甚至是沒有用到的模組內容，來縮小最終程式碼的體積，
- 匯出[即時綁定][blog-live-bindings]，讓你可以匯出一個值，當原始值改變時，它在每個匯入的地方也會跟著改變。

一個具體的例子，就是 Exercism 的 TypeScript 學習軌道上測試的運作方式。
每個練習至少有一個實作檔案，例如 `lasagna.ts`，而每個練習也至少有一個測試檔，例如 `lasagna.test.ts`。
實作檔案用 `export` 來公開對外的 API，測試檔則用 `import` 來取用它們，這就是它能測試實作結果的方式。

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
由於 TypeScript 編譯器不會改寫匯入路徑，所以匯入時應該使用 `.js` 副檔名（因為轉譯之後就會變成 `.js`）。不過，由於我們有一個會改寫路徑的流程，`allowImportingTsExtensions` 選項是開啟的。這讓你可以從 `.ts` 匯入（也能從 `.js` 匯入）。

在較舊的程式碼中，你會看到沒有副檔名的匯入。
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
