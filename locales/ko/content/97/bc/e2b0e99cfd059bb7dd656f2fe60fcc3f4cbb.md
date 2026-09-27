# 힌트

## 1. 승인 정의하기

- 필요한 옵션에 대한 생성자를 가진 `Approval`을 [대수적 데이터 타입으로 정의해요][ADT].

## 2. 요리 정의하기

- 필요한 옵션에 대한 생성자를 가진 `Cuisine`을 [대수적 데이터 타입으로 정의해요][ADT].

## 3. 영화 장르 정의하기

- 필요한 옵션에 대한 생성자를 가진 `Genre`를 [대수적 데이터 타입으로 정의해요][ADT].

## 4. 활동 정의하기

- 여러 활동을 담아내기 위해 [연관 데이터를 가진 대수적 데이터 타입을 정의해요][ADT-with-data].

## 5. 활동 평가하기

- 활동의 값을 기준으로 로직을 실행하는 가장 좋은 방법은 [case 표현식][case-expression]을 사용하는 거예요.
- 대수적 데이터 타입을 패턴 매칭하면 연관 데이터에 접근할 수 있어요.
- 패턴에 조건을 하나 더 추가하려면 case 안에서 [가드][guards]를 사용하면 돼요.
- 나머지 모든 값을 한 번에 처리하고 싶다면 와일드카드 패턴 `_`를 사용하면 돼요.

[ADT]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#enumeration-types
[ADT-with-data]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#beyond-enumerations
[case-expression]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#case-expessions
[guards]: https://learnyouahaskell.github.io/syntax-in-functions.html#guards-guards
