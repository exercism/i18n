# 힌트

## 일반

- 모든 과제를 함수 본문 안의 문 하나로 해결할 수도 있지만, 꼭 그래야 하는 것은 아니에요.


## 1. 카드가 있는지 판단하기

- 카드가 스택 [안에][ref-match] 있나요?

## 2. 카드의 위치 찾기

- 카드가 스택에 있나요?
- 그렇다면 [어느][ref-which] 위치에 있나요?
- 카드가 모두 서로 다르다는 것이 보장되어 있어서 과제가 더 간단해요.
- 위치를 반환하거나 `-1`을 반환해요.
  - 어떤 것이 `TRUE`인지 `FALSE`인지에 따라 분기하는 여러 방법은 [조건문 개념][concept-conditionals]을 참고해요.
  - [`if_else`][ref-if_else]를 사용한다면(가장 현대적인 방법이지만 여기서 꼭 필요한 것은 아니에요), 두 분기 모두 같은 타입의 결과를 반환해야 한다는 점을 알아두세요. 비어 있을 수도 있는 벡터 대신 단일 원소를 명시적으로 반환해야 할 수도 있어요.
  - 벡터의 첫 번째 원소를 얻으려면, 벡터를 반환하는 것 뒤에 `[1]`을 붙이면 돼요.

## 3. 각 카드가 짝수인지 판단하기

- 나머지 연산자는 `%%`예요.
- `x %% 2 == 0`이면 `x`는 짝수예요.
- [모든][ref-all] 카드가 이 기준에 맞나요?

## 4. 스택에 홀수 값 카드가 있는지 확인하기

- 카드는 짝수가 아니면 홀수이니, 이전 과제를 참고해요.
- 이 기준에 맞는 카드가 [하나라도][ref-any] 있나요?

## 5. 스택에서 첫 번째 홀수 카드 가져오기

- 스택에 홀수 카드가 있나요?
- 그렇다면 첫 번째 _카드_를 반환해요 (위치가 아니에요).

## 6. 짝수인 첫 번째 카드의 위치 판단하기

- 스택에 짝수 카드가 있나요?
- 그렇다면 첫 번째 짝수 카드의 _위치_를 반환해요.

[ref-match]: https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/match
[ref-which]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/which
[concept-conditionals]: https://exercism.org/tracks/r/concepts/conditionals
[ref-all]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/all
[ref-any]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/any
[ref-if_else]: https://dplyr.tidyverse.org/reference/if_else.html
