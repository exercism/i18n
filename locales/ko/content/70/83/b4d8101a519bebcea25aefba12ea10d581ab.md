# 힌트

## 일반

- 이 연습 문제들을 풀려면 [조건 표현식][concept-conditionals]이 필요해요.

## 1. 문자 비교하기

- 문자는 `char-greaterp`, `char-lessp`, `char=` 같은 함수로 비교할 수 있어요.

## 2. 문자의 "크기" 판별하기

- Common Lisp에는 문자가 대문자인지 소문자인지 판별하는 두 가지 함수가 있어요: `upper-case-p`와 `lower-case-p`.
- 문자는 대문자도 소문자도 아닐 수 있어요.

## 3. 문자의 "크기" 바꾸기

- Common Lisp에는 문자의 대소문자를 바꾸는 두 가지 함수가 있어요: `char-upcase`와 `char-downcase`.

## 4. 문자의 "유형" 판별하기

- Common Lisp에는 문자가 알파벳 문자인지 판별하는 `alpha-char-p`라는 함수가 있어요.
- Common Lisp에는 문자가 숫자 문자인지 판별하는 `digit-char-p`라는 함수가 있어요.
- `char=`를 사용하면 두 문자가 같은지 알 수 있어요.
- 공백 문자는 Common Lisp에서 #\Space로 써요.
- 줄바꿈 문자는 Common Lisp에서 #\Newline으로 써요.

[concept-conditionals]: /tracks/common-lisp/concepts/conditionals
