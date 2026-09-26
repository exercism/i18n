# 关于

TypeScript 是 JavaScript 加上类型语法，因此是一门强类型编程语言。它支持面向对象、命令式和声明式（例如函数式编程）等风格，无论规模大小都能为你提供更好的工具支持。TypeScript 有一些[原始类型][mdn-primitive]，除此之外的一切都被视为对象。

JavaScript 作为网页的脚本语言最为人熟知，但许多非浏览器环境也在使用它，比如 Node.js。这门语言仍在积极开发中；由于它支持多种范式，因此允许许多种编程风格。

TypeScript 在此基础上构建，同样也在积极开发中。在 2023 年的某些排行榜中，它在日常使用中比 JavaScript 更受欢迎。

因为[不学 JavaScript 就没法学会 TypeScript][handbook-js-or-ts]，本轨道的部分内容侧重讲解 JavaScript 概念，另一些概念则只聚焦 TypeScript 特有的功能。

## （重新）赋值

在 TypeScript 中，给名字赋值主要有几种方式：使用变量或常量。
在 Exercism 上，变量总是写成 [camelCase][wiki-camel-case]，常量则写成 [SCREAMING_SNAKE_CASE][wiki-snake-case]。
并没有必须遵循的官方指南，各家公司和组织都有各自的风格指南。
_你完全可以按自己喜欢的方式命名变量_。
按照练习准备好的方式来写，好处是它们在网页界面和大多数 IDE 中会有不同的高亮显示。

TypeScript 中的变量可以用 [`const`][mdn-const]、[`let`][mdn-let]或 [`var`][mdn-var]关键字来定义。

使用`let`或`var`时，变量在其生命周期内可以指向不同的值。
例如，可以用赋值运算符`=`多次定义和重新定义`myFirstVariable`：

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
myFirstVariable = new SomeComplexClass()
```

与`let`和`var`不同，用`const`定义的变量只能赋值一次。
在 TypeScript 中，常量就是这样定义的。

```typescript
const MY_FIRST_CONSTANT = 10

// Can not be re-assigned.
MY_FIRST_CONSTANT = 20
// => TypeError: Assignment to constant variable.
```

因为 TypeScript 能静态地检测到这一点，TypeScript 编译器也会报错：

```typescript
// ^? Cannot assign to 'MY_FIRST_CONSTANT' because it is a constant.(2588)
```

这意味着你不需要运行代码就能发现这个`TypeError`。

<!--prettier-ignore -->
~~~~exercism/note
💡 在后面的学习练习中，会探讨并解释*常量*赋值/绑定与*常量*值之间的区别。
~~~~

## 类型推断

这里不深入探讨[类型推断][handbook-type-inference]，但你要知道：被赋值的变量通常会带有一个推断出的类型，即使没有写类型注解。

```typescript
const MY_FIRST_CONSTANT = 10
// ^? const MY_FIRST_CONSTANT: number
```

这个类型会在整段代码中强制生效。
这也意味着，下面这段代码在 JavaScript 中是合法的：

```javascript
let myFirstVariable = 1
myFirstVariable = 'Some string'
```

但换成 TypeScript 就会报错：

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
// ^? Type 'string' is not assignable to type 'number'.(2322)
```

即使不使用类型注解，这一特性也能保证类型安全。

### 常量赋值

`const`关键字在变量和常量中_都_会被提到。
围绕常量经常出现的另一个概念是[（不）可变性][wiki-mutability]。

`const`关键字只让_绑定_不可变，也就是说，你只能给一个`const`变量赋值一次。
在 TypeScript 中，只有[原始类型][mdn-primitive]的值是不可变的。
不过，[非原始类型][mdn-primitive]的值仍然可以被修改。

```typescript
const MY_MUTABLE_VALUE_CONSTANT = { food: 'apple' }

// This is possible
MY_MUTABLE_VALUE_CONSTANT.food = 'pear'

MY_MUTABLE_VALUE_CONSTANT
// => { food: "pear" }
```

### 常量的值（不可变性）

一般来说，在 Exercism 以及许多其他组织和项目的风格指南中，不要修改看起来像`const SCREAMING_SNAKE_CASE`的值。
从技术上说，这些值_可以_被修改，但为了清晰，也为了符合 Exercism 的预期，不鼓励这么做。
如果_必须_强制这一点，请使用 [`Object.freeze(value)`][mdn-object-freeze]。

在可能的情况下，可以用 TypeScript 的`readonly`关键字、`as const`或`Readonly<T>`泛型来静态地强制不可变性。
稍后你会更深入地了解这个主题。

```typescript
const MY_VALUE_CONSTANT = Object.freeze({ food: 'apple' })

MY_VALUE_CONSTANT.food = 'pear'
// ^? Cannot assign to 'food' because it is a read-only property.(2540)

MY_VALUE_CONSTANT
// => { food: "apple" }
```

在实际项目中，不太可能看到`Object.freeze`遍布整个代码库，但永远不要修改`SCREAMING_SNAKE_CASE`的值是一条好规则；通常会借助 linter 之类的自动化分析来强制实施。

## 函数声明

在 TypeScript 中，功能单元被封装在_函数_里；如果几个函数属于同一组，通常会把它们放在同一个文件中。
函数可以接收参数（也就是实参），并可以用`return`关键字_返回_一个值。
函数通过`()`语法调用。

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2
}

add(1, 3)
// => 4
```

函数的形参通常应当标注类型，写法是先写冒号（`:`），再写类型。
函数的返回值可以在参数列表的右括号之后标注类型，写法同样是先写冒号（`:`），再写类型。

如果函数没有为返回值写类型注解，类型会被推断出来。

```typescript
function add(num1: number, num2: number) {
  return num1 + num2
}

add(1, 3)
// ^? function add(num1: number, num2: number): number
```

这里的返回类型是推断出来的，因为 TypeScript 知道`number + number`的结果必定是`number`。

<!--prettier-ignore -->
~~~~exercism/note
💡 在 TypeScript 中，声明函数有_很多_种不同方式。
这些方式看起来和使用`function`关键字不一样。
本轨道会逐步介绍它们，但如果你已经了解，随便用哪一种都可以。
大多数情况下，用哪种方式都没有好坏之分。
~~~~

## 类型注解

正如`add`的函数声明所示，形参带有显式的类型注解`: number`。
变量声明、类的属性、函数声明等等都支持类型注解。

无论是显式的类型注解还是推断出的类型，都会由类型检查器强制执行。

```typescript
add('foo', 3)
// ^? Argument of type 'string' is not assignable to parameter of type 'number'.(2345)
```

如果 TypeScript 找不到显式的类型注解，也无法推断出类型，它就会赋予`any`类型，[你不应该使用它][handbook-dont-use-any]。
稍后你会学到`unknown`类型，它是一个不错的替代方案。

## 导出与导入

`export`和`import`关键字是把普通 TypeScript 文件变成[TypeScript 模块][mdn-module]的强大工具。
除了让代码有选择地暴露组件（比如函数、类、变量和常量）之外，它还带来了一系列其他特性，例如：

- [重命名导出和导入][mdn-renaming-modules]，可以帮你避免命名冲突，
- [动态导入][mdn-dynamic-imports]，按需加载代码，
- [Tree shaking][blog-tree-shaking]，通过剔除无副作用的模块、甚至_未被使用_的模块内容，来减小最终代码的体积，
- 导出[_实时绑定_][blog-live-bindings]，让你可以在原值发生变化时，导出的值在所有导入它的地方也跟着变化。

一个具体的例子是 Exercism TypeScript 轨道上测试的工作方式。
每个练习至少有一个实现文件，例如`lasagna.ts`，并且至少有一个测试文件，例如`lasagna.test.ts`。
实现文件用`export`暴露公共 API，测试文件用`import`访问这些内容，从而测试实现的结果。

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
因为 TypeScript 编译器_不会重写导入路径_，所以导入应当使用`.js`扩展名（因为转译之后它就是这个样子）。
不过，由于我们有一个会重写路径的流程，`allowImportingTsExtensions`选项是开启的。
这样就能从`.ts`（以及`.js`）导入。

在较早的代码中，你会看到_不带文件扩展名_的导入。
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
