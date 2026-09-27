# 힌트

## 일반

- 계산기의 스택은 그냥 Factor 배열이에요. *연산*은 쿼테이션 `( stack -- new-stack )`이에요.
- [`sequences`][sequences]의 `head*`는 마지막 `n`개 원소를 제외한 나머지 전부를 반환하고, `last2`는 마지막 두 원소를 반환해요.

## 1. 덧셈 구현하기

- [`kernel`][kernel]의 `bi`를 사용해 입력을 두 계산으로 나눠요: "마지막 두 원소를 제외한 배열"과 "마지막 두 원소의 합". 그런 다음 `suffix`가 둘을 이어 붙여요.

## 2. 곱셈 구현하기

- 1번과 모양은 같고 `+` 자리에 `*`가 들어가요.

## 3. 연산 하나 적용하기

- 쿼테이션의 효과는 `( stack -- new-stack )`예요. 컴파일러가 타입을 검사할 수 있도록 `call`에 이 효과를 선언해요: `call( stack -- new-stack )`.

## 4. 프로그램 평가하기

- [`sequences`][sequences]에 있는 `each`는 쿼테이션을 시퀀스에 대해 반복 실행해요. 각 반복에서는 실행 중인 스택을 보고, 프로그램에서 다음 연산을 꺼내 적용해요.

## 5. 이름으로 평가하기

- [`assocs`][assocs]에 있는 `at`으로 각 이름을 assoc에서 찾아 그 연산을 얻은 다음, `evaluate`를 재사용해요.
- [`curry-compose-fry`][fry]의 fry 쿼테이션 `'[ _ at ]`은 assoc을 클로저로 감싸서, `map`이 한 번의 순회로 각 이름을 그 연산으로 바꿀 수 있게 해요.

## 6. 안전하게 나누기

- [`kernel`][kernel]에 있는 `throw`는 오류를 발생시켜요. `zero-divisor-error`는 이미 선언되어 있으니, `zero-divisor-error throw`를 호출하면 돼요.
- 나눗셈 경로는 맨 아래에 있는 제수가 `0`인지 확인하는 `if`로 보호해요.

[sequences]: https://docs.factorcode.org/content/vocab-sequences.html
[kernel]: https://docs.factorcode.org/content/vocab-kernel.html
[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/vocab-fry.html
