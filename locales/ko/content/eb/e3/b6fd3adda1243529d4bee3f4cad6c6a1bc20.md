# 힌트

## 일반

- 이 연습 문제의 모든 부분은 비트 연산을 기반으로 해요.
  - Exercism의 [Learning Syllabus][concept-bitwise-operations]에 비트 연산을 부담 없이 시작할 수 있도록 친절하게 소개해 놓았어요.
  - [비트 연산자][ref-bitwise-operators]는 Julia 설명서에 정리되어 있어요.
  - `Base`에는 [count_ones()][count_ones], [trailing_zeros()][trailing_zeros] 같은 비트와 관련된 유용한 함수가 여러 개 들어 있어요.
- 테스트는 타입에 대해 이래라저래라 하려고 하지 않지만, 이 연습 문제는 부호 없는 바이트를 다루는 문제이고 [`UInt8`][uint8] 값은 비교적 생각하기 쉬운 편이에요.
  - 인자와 반환값은 `Vector{UInt8}`이고,
  - `UInt8` 값은 비트 마스크와 중간값에 쓰기 좋아요.
- 십진수는 오히려 방해가 되니, `UInt8` 리터럴에는 16진수(`0xFF`)나 2진수(`0b11111111`)를 쓰는 게 좋아요.
  - [`bitstring()`][bitstring] 함수는 사람이 읽을 수 있는 2진 형식으로 출력해 주기 때문에 디버깅할 때 유용해요.
- 원본 메시지는 8비트 덩어리의 벡터로 주어지는데, 이를 상위 비트에는 7비트 덩어리가 들어가고 최하위 비트(LSB)에는 패리티 비트가 들어가는 형태로 변환해야 해요.
  - `&`나 `|`로 비트 마스크를 만들어 원하는 비트만 뽑아내요.
  - 왼쪽 시프트(`<<`)와 논리 오른쪽 시프트(`>>>`) 연산자가 중요해요.
  - 남는 비트를 다음 처리 단계로 넘기는 방법을 계획해 봐요.
  - 이렇게 비트를 넘겨야 하다 보니 입력 바이트를 서로 독립적으로 처리하기가 어려워요. 그래서 고차 함수를 쓰려고 하기보다는 루프(또는 재귀)로 처리하는 편이 아마 더 쉬울 거예요.
  - 인코딩된 메시지는 바이트마다 패리티 비트가 하나씩 들어가기 때문에 보통 원본 메시지보다 길어요(바이트 수가 더 많아요).


  [concept-bitwise-operations]: https://exercism.org/tracks/julia/concepts/bitwise-operations
  [ref-bitwise-operators]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
  [count_ones]: https://docs.julialang.org/en/v1/base/numbers/#Base.count_ones
  [trailing_zeros]: https://docs.julialang.org/en/v1/base/numbers/#Base.trailing_zeros
  [uint8]: https://docs.julialang.org/en/v1/base/numbers/#Core.UInt8
  [bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
