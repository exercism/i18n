# 힌트

## 1. 운전면허가 필요한지 판단하기

- 입력값이 특정 문자열과 같은지 확인하려면 [엄격한 동등 연산자][mdn-equality-operators]를 사용해요.
- 불리언 개념에서 배운 두 [논리 연산자][mdn-logical-operators] 중 하나를 사용해 두 조건을 결합해요.
- 이 문제를 풀기 위해 `if`문은 필요하지 **않아요**. 직접 만든 불리언 표현식을 그대로 반환하면 돼요.

## 2. 구매할 두 후보 차량 중 하나 고르기

- 어떤 선택지가 사전 순으로 먼저 오는지 판단하려면 [관계 연산자][mdn-relational-operators]를 사용해요.
- 그런 다음 [if-else문][mdn-if-statement]을 사용해 비교 결과에 따라 보조 변수의 값을 설정해요.
- 마지막으로 추천 문장을 만들어요. 두 문자열을 이어 붙이려면 [덧셈 연산자][mdn-addition]를 사용하면 돼요.

## 3. 중고차 가격 추정값 계산하기

- 먼저 차량의 연식을 기준으로 백분율을 결정해요. 보조 변수에 저장해요. 안내에 나온 대로 [if-else if-else문][mdn-if-statement]을 사용해요.
- 두 `if` 조건에서는 [관계 연산자][mdn-relational-operators]를 사용해 차량의 연식과 기준값을 비교해요.
- 결과를 계산하려면 원래 가격에 백분율을 적용해요. 예를 들어 `30% of x`는 `30`을 `100`으로 나눈 뒤 `x`를 곱하면 계산할 수 있어요.

[mdn-equality-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#equality_operators
[mdn-logical-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#binary_logical_operators
[mdn-relational-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#relational_operators
[mdn-addition]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition
[mdn-if-statement]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
