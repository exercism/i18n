# 지시 사항 추가

대소문자와 글자가 아닌 문자는 무시하고 글자 수를 세고, 소문자를 키로 하고 개수를 값으로 하는 딕셔너리를 반환해요.

[roc-parallel 플랫폼](https://github.com/ageron/roc-parallel)의 `pf.Parallel.map!(items, { workers, task })`를 사용하면 순수 함수인 `task`로 주어진 `items`를 여러 스레드(`workers`로 지정)에서 병렬로 처리할 수 있어요. 모든 항목의 처리가 끝나면 결과는 입력 순서대로 반환돼요. `ParallelLetterFrequency.roc` 파일만 수정하면 돼요.

힌트: 대소문자 변환과 글자 판별에는 [Unicode 라이브러리](https://github.com/roc-lang/unicode)를 사용하는 걸 권장해요. 특히 `unicode.Case.to_lower`, `unicode.GeneralCategory.of_scalar`, `unicode.Scalar.iter`, `unicode.Scalar.to_str`를 살펴봐요. 글자는 유니코드 스칼라 값으로 취급하고, 유니코드 정규화는 필요하지 않아요.

참고: 다른 대부분의 연습 문제와 달리, 이 연습 문제는 이펙트가 있는 함수를 사용해요. 현재 Roc의 `expect` 문으로는 이펙트가 있는 함수를 호출할 수 없어서, 이 연습 문제의 테스트는 `expect`나 `roc test`를 전혀 사용하지 않아요. 대신 테스트는 `roc --opt=speed`로 실행되고, Roc 코드가 반환한 오류는 플랫폼이 평소와 다른 형식으로 보고해요.

공유 상태에 안전하게 업데이트를 적용하는 방법, 즉 동시성의 또 다른 측면을 다루는 `bank-account` 연습 문제도 살펴보면 좋아요.
