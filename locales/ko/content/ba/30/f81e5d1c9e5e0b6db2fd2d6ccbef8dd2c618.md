# 힌트

## 일반

- Factor에서 문자는 정수(유니코드 코드 포인트)예요. 그래서 숫자 비교 연산자인 `<`, `>`, `=`를 그대로 쓸 수 있어요.
- 조건자와 대소문자 변환은 [`unicode`][unicode]에 있어요.
- 반환하는 심볼(`less`, `big`, `alpha`, ...)은 사용하기 전에 선언해야 해요. `SYMBOLS: ... ;`로 묶어 줘요.

## 1. 두 문자를 비교하기

- [`math`][math]의 `<`와 `>`를 사용해요.
- 세 가지 경우를 [`combinators`][combinators]의 `cond`로 감싸요.

## 2. 크기 판별하기

- `LETTER?`는 대문자 조건자이고, `letter?`는 소문자 조건자예요.

## 3. 크기 바꾸기

- `ch>upper`와 `ch>lower`는 문자 단위 변환기예요. (문자열 단위의 `>upper`/`>lower`도 있지만, 여기서는 문자 하나를 다뤄요.)

## 4. 종류 판별하기

- `cond`에서는 순서가 중요해요. `Letter?`는 대문자 *또는* 소문자와 일치하므로, 대소문자별 검사보다 먼저 실행되어야 해요.

[unicode]: https://docs.factorcode.org/content/vocab-unicode.html
[math]: https://docs.factorcode.org/content/vocab-math.html
[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
