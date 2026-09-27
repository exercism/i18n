# 소개

TypeScript는 타입을 위한 문법을 갖춘 JavaScript예요. 그래서 강타입 프로그래밍 언어이며, 객체 지향, 명령형, 선언형(예: 함수형 프로그래밍) 스타일을 지원하고, 어떤 규모에서든 더 나은 도구의 도움을 받을 수 있게 해줘요.
몇 가지 [원시 타입][mdn-primitive]이 있고, 나머지는 모두 객체로 취급해요.

JavaScript는 웹 페이지의 스크립트 언어로 가장 잘 알려져 있지만, Node.js처럼 브라우저 밖의 환경에서도 많이 사용해요.
이 언어는 활발하게 개발되고 있고, 여러 패러다임을 지원하는 특성 덕분에 다양한 프로그래밍 스타일을 쓸 수 있어요.

TypeScript는 JavaScript 위에 세워졌고, 역시 활발하게 개발되고 있어요.
2023년의 일부 순위에서는 일상적인 사용에서 JavaScript보다 더 인기가 많았어요.

[JavaScript를 배우지 않고는 TypeScript를 배울 수 없기][handbook-js-or-ts] 때문에, 이 트랙의 일부 내용은 JavaScript 개념을 가르치는 데 초점을 맞추고, 일부 개념은 TypeScript만의 기능에 초점을 맞춰요.

## (재)할당

TypeScript에서 이름에 값을 할당하는 주요 방법은 몇 가지가 있어요. 변수나 상수를 사용하는 거예요.
Exercism에서는 변수를 항상 [camelCase][wiki-camel-case]로 쓰고, 상수는 [SCREAMING_SNAKE_CASE][wiki-snake-case]로 써요.
따라야 할 공식 가이드는 없고, 회사와 조직마다 스타일 가이드가 달라요.
_변수는 원하는 방식으로 자유롭게 작성해도 돼요_.
연습 문제가 준비된 방식대로 작성하면 웹 인터페이스와 대부분의 IDE에서 다르게 강조 표시된다는 장점이 있어요.

TypeScript에서 변수는 [`const`][mdn-const], [`let`][mdn-let], [`var`][mdn-var] 키워드로 정의할 수 있어요.

`let`이나 `var`를 사용하면 변수는 생명 주기 동안 서로 다른 값을 참조할 수 있어요.
예를 들어 `myFirstVariable`은 할당 연산자 `=`를 사용해 여러 번 정의하고 다시 정의할 수 있어요:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
myFirstVariable = new SomeComplexClass()
```

`let`과 `var`와 달리, `const`로 정의한 변수는 한 번만 할당할 수 있어요.
TypeScript에서는 이렇게 상수를 정의해요.

```typescript
const MY_FIRST_CONSTANT = 10

// Can not be re-assigned.
MY_FIRST_CONSTANT = 20
// => TypeError: Assignment to constant variable.
```

TypeScript는 이를 정적으로 감지할 수 있기 때문에, TypeScript 컴파일러도 오류를 내요:

```typescript
// ^? Cannot assign to 'MY_FIRST_CONSTANT' because it is a constant.(2588)
```

덕분에 `TypeError`를 감지하기 위해 코드를 실행할 필요가 없어요.

<!--prettier-ignore -->
~~~~exercism/note
💡 나중에 나오는 학습 연습 문제에서는 _상수_ 할당/바인딩과 _상수_ 값의 차이를 살펴보고 설명해요.
~~~~

## 타입 추론

[타입 추론][handbook-type-inference] 주제를 너무 깊이 파고들지 않고도, 값을 할당한 변수는 타입 애너테이션이 없어도 보통 추론된 타입을 가진다는 점을 알아두면 좋아요.

```typescript
const MY_FIRST_CONSTANT = 10
// ^? const MY_FIRST_CONSTANT: number
```

이 타입은 코드 전체에서 강제돼요.
따라서 다음 코드는 유효한 JavaScript지만:

```javascript
let myFirstVariable = 1
myFirstVariable = 'Some string'
```

TypeScript에서는 오류를 내요:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
// ^? Type 'string' is not assignable to type 'number'.(2322)
```

이 기능은 타입 애너테이션을 사용하지 않아도 타입 안전성을 보장해요.

### 상수 할당

`const` 키워드는 변수와 상수 _양쪽_에서 언급돼요.
상수와 함께 자주 언급되는 또 다른 개념은 [(불)변경 가능성][wiki-mutability]이에요.

`const` 키워드는 _바인딩_만 불변으로 만들어요. 즉, `const` 변수에는 값을 한 번만 할당할 수 있어요.
TypeScript에서는 [원시 타입][mdn-primitive] 값만 불변이에요.
하지만 [비원시 타입][mdn-primitive] 값은 여전히 변경할 수 있어요.

```typescript
const MY_MUTABLE_VALUE_CONSTANT = { food: 'apple' }

// This is possible
MY_MUTABLE_VALUE_CONSTANT.food = 'pear'

MY_MUTABLE_VALUE_CONSTANT
// => { food: "pear" }
```

### 상수 값 (불변성)

원칙적으로 Exercism과 여러 조직, 프로젝트 스타일 가이드에서는 `const SCREAMING_SNAKE_CASE`처럼 보이는 값을 변경하지 않아요.
기술적으로는 값을 _변경할 수 있지만_, Exercism에서는 명확성과 기대치 관리를 위해 권장하지 않아요.
이를 _반드시_ 강제해야 할 때는 [`Object.freeze(value)`][mdn-object-freeze]를 사용해요.

가능하다면 TypeScript의 `readonly` 키워드, `as const`, 또는 `Readonly<T>` 제네릭 타입을 사용해 불변성을 정적으로 강제할 수 있어요.
이 주제는 나중에 더 자세히 배워요.

```typescript
const MY_VALUE_CONSTANT = Object.freeze({ food: 'apple' })

MY_VALUE_CONSTANT.food = 'pear'
// ^? Cannot assign to 'food' because it is a read-only property.(2540)

MY_VALUE_CONSTANT
// => { food: "apple" }
```

실제 코드베이스 전체에 `Object.freeze`가 널려 있는 경우는 드물지만, `SCREAMING_SNAKE_CASE` 값을 절대 변경하지 않는다는 규칙은 좋은 규칙이에요. 보통 린터 같은 자동 분석 도구로 강제해요.

## 함수 선언

TypeScript에서는 기능 단위가 _함수_로 캡슐화돼요. 보통 함께 속한 함수들은 같은 파일에 모아 둬요.
이 함수들은 매개변수(인자)를 받을 수 있고, `return` 키워드로 값을 _반환_할 수 있어요.
함수는 `()` 문법으로 호출해요.

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2
}

add(1, 3)
// => 4
```

함수 매개변수에는 보통 콜론(`:`)과 타입을 붙여 타입을 표시해요.
함수의 반환 값에는 매개변수 목록을 닫은 뒤 콜론(`:`)과 타입을 붙여 표시할 수 있어요.

함수에 반환 값에 대한 타입 애너테이션이 없으면 타입이 추론돼요.

```typescript
function add(num1: number, num2: number) {
  return num1 + num2
}

add(1, 3)
// ^? function add(num1: number, num2: number): number
```

여기서는 `number + number`의 결과가 항상 `number`라는 것을 TypeScript가 알고 있기 때문에 반환 타입이 추론됐어요.

<!--prettier-ignore -->
~~~~exercism/note
💡 TypeScript에는 함수를 선언하는 _여러_ 가지 방법이 있어요.
이런 다른 방법들은 `function` 키워드를 사용하는 것과 모양이 달라요.
트랙에서는 이들을 점진적으로 소개하려고 하지만, 이미 알고 있다면 아무거나 편하게 사용해도 돼요.
대부분의 경우 어느 쪽을 쓰든 더 낫거나 나쁘지 않아요.
~~~~

## 타입 애너테이션

`add`의 함수 선언에서 볼 수 있듯이, 매개변수에는 명시적인 타입 애너테이션 `: number`가 있어요.
변수 선언, 클래스 속성, 함수 선언 등은 모두 타입 애너테이션을 지원해요.

명시적 타입 애너테이션과 추론된 타입 모두 타입 검사기가 강제해요.

```typescript
add('foo', 3)
// ^? Argument of type 'string' is not assignable to parameter of type 'number'.(2345)
```

TypeScript가 명시적 타입 애너테이션을 찾지 못하고 타입을 추론할 수도 없으면 `any` 타입을 할당하는데, [이 타입은 사용하지 않는 게 좋아요][handbook-dont-use-any].
나중에 좋은 대안인 `unknown` 타입에 대해 배워요.

## 내보내기와 가져오기

`export`와 `import` 키워드는 평범한 TypeScript 파일을 [TypeScript 모듈][mdn-module]로 바꿔 주는 강력한 도구예요.
코드에서 함수, 클래스, 변수, 상수 같은 구성 요소를 선택적으로 노출할 수 있게 해 주는 것 외에도, 다음과 같은 다양한 기능을 가능하게 해요:

- [내보내기와 가져오기 이름 바꾸기][mdn-renaming-modules], 이름 충돌을 피할 수 있어요.
- [동적 가져오기][mdn-dynamic-imports], 필요할 때 코드를 불러와요.
- [트리 셰이킹][blog-tree-shaking], 부작용이 없는 모듈과 _사용되지 않는_ 모듈 내용까지 제거해서 최종 코드의 크기를 줄여요.
- [_라이브 바인딩_][blog-live-bindings] 내보내기, 원본 값이 변경되면 그 값을 가져온 모든 곳에서도 함께 변경되는 값을 내보낼 수 있어요.

구체적인 예로 Exercism의 TypeScript 트랙에서 테스트가 어떻게 동작하는지 살펴봐요.
각 연습 문제에는 최소한 하나의 구현 파일(예: `lasagna.ts`)이 있고, 최소한 하나의 테스트 파일(예: `lasagna.test.ts`)이 있어요.
구현 파일은 `export`로 공개 API를 노출하고, 테스트 파일은 `import`로 이를 가져와요. 이렇게 해서 구현의 결과를 테스트할 수 있는 거예요.

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
TypeScript 컴파일러는 _가져오기 경로를 다시 쓰지 않기_ 때문에, 가져오기는 `.js` 확장자를 사용해 작성해야 해요(트랜스파일 후에 그렇게 되기 때문이에요).
하지만 경로를 다시 쓰는 과정이 있어서 `allowImportingTsExtensions` 옵션이 켜져 있어요.
덕분에 (`.js`뿐만 아니라) `.ts`에서도 가져올 수 있어요.

예전 코드에서는 _파일 확장자 없이_ 가져오는 경우를 볼 수 있어요.
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
