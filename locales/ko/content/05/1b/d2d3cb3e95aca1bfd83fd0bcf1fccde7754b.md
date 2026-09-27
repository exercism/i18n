# JavaScript에서 재귀 이해하기

재귀는 함수가 자기 자신을 호출하는 프로그래밍의 강력한 개념이에요.
처음에는 이해하기가 조금 까다로울 수 있지만, 기본 원리를 한번 이해하고 나면 복잡한 문제를 푸는 데 유용한 도구가 돼요.
쉬운 예제로 JavaScript의 재귀를 살펴봐요.

## 재귀란 무엇일까요?

재귀는 함수가 직접 또는 간접적으로 자기 자신을 호출할 때 일어나요.
루프와 비슷하지만, 문제를 더 작고 다루기 쉬운 하위 문제로 나누는 과정이 포함될 수 있어요.

### 예제 1: 카운트다운

간단한 예제부터 시작해 봐요. 카운트다운 함수예요.

```javascript
function countdown(num) {
  // Base case
  if (num <= 0) {
    console.log('Blastoff!');
    return;
  }

  // Recursive case
  console.log(num);
  countdown(num - 1);
}

// Call the function
countdown(5);
```

이 예제에서는:

- **기본 사례**: `num`이 0보다 작거나 같아지면 함수는 "Blastoff!"를 출력하고 자기 자신을 호출하는 것을 멈춰요.
- **재귀 사례**: 함수는 현재 `num`을 출력하고 `num - 1`로 자기 자신을 호출해요.

### 예제 2: 팩토리얼

이제 재귀의 고전적인 예제를 살펴봐요. 어떤 수의 팩토리얼을 계산하는 거예요.

```javascript
function factorial(n) {
  // Base case
  if (n === 0 || n === 1) {
    return 1;
  }

  // Recursive case
  return n * factorial(n - 1);
}

// Test the function
console.log(factorial(5)); // Output: 120
```

이 예제에서는:

- **기본 사례**: `n`이 0 또는 1이면 함수는 1을 반환해요.
- **재귀 사례**: 함수는 `n`에 `n - 1`의 팩토리얼을 곱해요.

## 핵심 개념

### 기본 사례

모든 재귀 함수에는 자기 자신을 호출하는 것을 멈추는 조건인 기본 사례가 적어도 하나 있어야 해요.
기본 사례가 없으면 재귀가 끝없이 이어져서 스택 오버플로가 발생해요.

### 재귀 사례

재귀 사례는 함수가 문제의 더 작거나 더 단순한 버전으로 자기 자신을 호출하는 방식을 정의해요.

## 재귀의 장단점

**장점:**

- 특정 문제에 대한 우아한 해결책이 돼요.
- 수학적 귀납법 개념을 닮았어요.

**단점:**

- 반복문을 사용한 해결책보다 효율이 떨어질 수 있어요.
- 재귀가 깊어지면 스택 오버플로가 발생할 수 있어요.

## 마무리

재귀는 복잡한 문제를 더 작고 다루기 쉬운 하위 문제로 나누어 단순하게 만들어 주는 유용한 기법이에요.
기본 사례와 재귀 사례를 이해하는 것은 JavaScript에서 효과적인 재귀 해법을 구현하는 데 꼭 필요해요.

**더 알아보기:**

- [MDN: JavaScript의 재귀](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#recursion)
- [Eloquent JavaScript: 3장 - 함수](https://eloquentjavascript.net/03_functions.html)
