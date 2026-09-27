# 소개

## 산술 연산자

JavaScript는 숫자에 대한 기본 산술 연산을 수행하는 6개의 서로 다른 연산자를 제공해요.

- `+`: 덧셈 연산자는 숫자의 합을 구할 때 사용해요.
- `-`: 뺄셈 연산자는 두 숫자의 차를 구할 때 사용해요
- `*`: 곱셈 연산자는 두 숫자의 곱을 구할 때 사용해요.
- `/`: 나눗셈 연산자는 두 숫자를 나눌 때 사용해요.

```javascript
2 - 1.5; //=> 0.5
19 / 2; //=> 9.5
```

- `%`: 나머지 연산자는 나눗셈을 수행한 나머지를 구할 때 사용해요.

  ```javascript
  40 % 4; // => 0
  -11 % 4; // => -3
  ```

- `**`: 거듭제곱 연산자는 숫자를 거듭제곱할 때 사용해요.

  ```javascript
  4 ** 3; // => 64
  4 ** 1 / 2; // => 2
  ```

## 연산 순서

한 줄에서 여러 연산자를 사용할 때, JavaScript는 [이 우선순위 표][mdn-operator-precedence]에 나온 대로 우선순위를 따라요.
이걸 우리 맥락에 맞게 단순화하면, JavaScript는 초등학교 수학 시간에 배운 PEDMAS 규칙(괄호, 지수, 나눗셈/곱셈, 덧셈/뺄셈)을 사용해요.

<!-- prettier-ignore-start -->
```javascript
const result = 3 ** 3 + 9 * 4 / (3 - 1);
// => 3 ** 3 + 9 * 4/2
// => 27 + 9 * 4/2
// => 27 + 18
// => 45
```
<!-- prettier-ignore-end -->

## 복합 대입 연산자

복합 대입 연산자는 변수에 산술 연산을 수행하고 그 새로운 값을 같은 변수에 할당하는 코드를 더 짧게 쓰는 방법이에요.
예를 들어, 두 변수 `x`와 `y`가 있다고 해봐요.
그러면 `x += y`는 `x = x + y`와 같아요.
흔히 변수 `y` 대신 숫자와 함께 사용해요.
나머지 5개 연산도 비슷한 방식으로 수행할 수 있어요.

```javascript
let x = 5;
x += 25; // x is now 30

let y = 31;
y %= 3; // y is now 1
```

[mdn-operator-precedence]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#table
