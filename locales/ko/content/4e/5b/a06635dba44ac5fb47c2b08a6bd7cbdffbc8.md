# 소개

배열을 다루다 보면 배열의 각 값에 대해 코드를 실행하고 싶을 때가 있어요.
이것을 배열을 순회하거나 루프를 도는 것이라고 해요.

여기서는 그 과정에서 배열을 수정하지 않는 경우를 살펴볼게요.
배열을 변환하는 방법은 [배열 변환 개념][concept-array-transformations]을 참고해요.

## `for`문

배열을 순회하는 가장 기본적인 방법은 `for`문을 사용하는 것이에요. [`for`문 개념][concept-for-loops]을 참고해요.

```javascript
const numbers = [6.0221515, 10, 23];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
// => 6.0221515
// => 10
// => 23
```

## `for...of`문

각 반복에서 값을 직접 다루고 싶고 인덱스가 전혀 필요 없다면, `for...of`문을 사용할 수 있어요.

`for...of`는 위에서 본 기본 `for`문과 비슷하게 동작하지만, 루프 안에서 변수로 _인덱스_를 다룰 필요 없이 _값_을 바로 받을 수 있어요.

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

일반적인 `for`문과 마찬가지로, `continue`를 사용해 현재 반복을 건너뛰고 `break`를 사용해 루프 실행을 완전히 멈출 수 있어요.

## `forEach` 메서드

모든 배열에는 배열의 원소를 순회하는 데 사용할 수 있는 `forEach` 메서드가 있어요.

`forEach`는 [콜백][concept-callbacks]을 매개변수로 받아요.
콜백 함수는 배열의 각 원소마다 한 번씩 호출돼요.
현재 원소, 그 원소의 인덱스, 그리고 전체 배열이 콜백에 인자로 전달돼요.
보통은 현재 원소나 인덱스만 사용해요.

```javascript
const numbers = [6.0221515, 10, 23];

numbers.forEach((number, index) => console.log(number, index));
// => 6.0221515 0
// => 10 1
// => 23 2
```

`forEach` 루프가 시작된 뒤에는 반복을 멈출 방법이 없어요.
이 문맥에서는 `break`문과 `continue`문이 존재하지 않아요.

[concept-array-transformations]: /tracks/javascript/concepts/array-transformations
[concept-for-loops]: /tracks/javascript/concepts/for-loops
[concept-callbacks]: /tracks/javascript/concepts/callbacks
