# 자세히 알아보기

Common Lisp은 다른 언어들처럼 두 객체가 '같은지'를 판단하는 규칙을 가지고 있어요.
이 규칙들은 네 가지 수준을 정의하는데, 각 수준마다 그 수준의 검사를 수행하는 함수가 있어요.
수준은 가장 엄격한 것부터 가장 느슨한 것 순서로 나열돼요.

## `eq`

첫 번째 수준은 객체 동일성이에요.
이 동등성은 [`eq`][hyper-eq] 함수로 검사해요.
동등성을 검사하는 두 객체는 완전히 같은 객체여야 해요:

```lisp
(eq 'apples 'apples)  ; => T
(eq 'apples 'oranges) ; => NIL

(eq '(a b c) '(a b c) ; => NIL (these two lists have the same contents but are not the same list)
(let ((list1 '(a b c)) (list2 list1)) 
  (eq list1 list2))   ; => T (these two lists are the same list)
```

## `eql`

두 번째 수준은 숫자와 문자의 동등성을 추가해요.
이 동등성은 [`eql`][hyper-eql] 함수로 검사해요.
검사 방식은 인자의 타입에 따라 달라져요:

- `eq`인 두 객체는 `eql`이에요
- 숫자는 타입과 값이 같으면 `eql`이에요
- 문자는 같은 문자를 나타내면 `eql`이에요

```lisp
(eql 1 1)     ; => T
(eql 1 1/1)   ; => NIL (one number is an integer, the other a rational)
(eql #\c #\c) ; => T
(eql #\c #\C) ; => NIL (case is different)
```

숫자와 문자를 [`eq`][hyper-eq]로 객체 동일성 비교하지 않는 이유가 궁금할 수 있어요.
Common Lisp 표준은 구현체가 원한다면 숫자와 문자를 복사할 수 있도록 허용해요.
그래서 `0`과 `0`은 숫자 `0`의 서로 다른 인스턴스일 수 있기 때문에 [`eq`][hyper-eq]가 아닐 수 있어요.

## `equal`

세 번째 수준은 구조적 유사성을 검사해요.
이 동등성은 [`equal`][hyper-equal]로 검사해요.
검사 방식은 인자의 타입에 따라 달라져요:

- 심볼은 [`eq`][hyper-eq]로 비교한 것처럼 비교해요
- 문자와 숫자는 `eql`로 비교한 것처럼 비교해요
- cons는 원소들이 [`equal`][hyper-equal]이면 [`equal`][hyper-equal]이에요.
이는 재귀적으로 이루어져요.
- 문자열과 비트 벡터는 원소들이 `eql`이면 [`equal`][hyper-equal]이에요
- 다른 타입의 배열은 [`eq`][hyper-eq]로 비교한 것처럼 비교해요
- pathname은 기능적으로 동등하면 [`equal`][hyper-equal]이에요.
(여기에는 pathname의 구성 요소를 이루는 문자열의 대소문자 구분과 관련해 구현체에 따라 달라질 여지가 있어요.)
- 그 밖의 다른 타입의 객체는 [`eq`][hyper-eq]로 비교한 것처럼 비교해요

```lisp
(equal '(a (b c)) '(a (b c)))         ; => T (conses are equal if their contents are equal)
(equal "hello" "hello")               ; => T
(equal "hello" "HELLO")               ; => NIL
(equal #(1 2 3) #(1 2 3))             ; => NIL (arrays are equal only if eq)
(equal #P"foo/bar.md" #P"foo/bar.md") ; => T (pathnames are equal if "functionally equivalent"
```

## `equalp`

네 번째이자 가장 느슨한 수준의 동등성은 [`equalp`][hyper-equalp]로 검사해요.
검사 방식은 타입에 따라 달라져요:

- 두 객체가 [`equalp`][hyper-equalp]이면 [`equalp`][hyper-equalp]이에요
- 숫자는 타입이 다르더라도 값이 같으면 [`equalp`][hyper-equalp]이에요
- 문자와 문자열은 대소문자를 구분하지 않고 비교해요
- cons는 원소들이 [`equalp`][hyper-equalp]이면 [`equalp`][hyper-equalp]이에요.
이는 재귀적으로 이루어져요.
- 배열은 차원 수가 같고 그 차원들이 같으며 각 원소가 [`equalp`][hyper-equalp]이면 [`equalp`][hyper-equalp]이에요.
- 구조체는 같은 클래스와 슬롯을 가지고 있고, 그 슬롯들이 두 구조체 사이에서 각각 [`equalp`][hyper-equalp]이면 [`equalp`][hyper-equalp]이에요.
- 해시 테이블은 둘 다 같은 `:test` 함수를 가지고 있고, 같은 키를 가지며(그 `:test` 함수로 비교했을 때), 그 키들이 [`equalp`][hyper-equalp]로 비교했을 때 같은 값을 가지면 [`equalp`][hyper-equalp]이에요.

```lisp
(equalp 1 1.0)                       ; => T
(equalp #\c #\C)                     ; => T
(equalp "hello" "HELLO")             ; => T
(equalp #(1 2 3) #(1.0 2.0 3.0))     ; => T (arrays contain elements which are `equalp`)
(equal #S(TEST :SLOT1 'a :SLOT2 'b) 
       #S(TEST :SLOT1 'a :SLOT2 'b)) ; => T (structures of the same class with slots that have values which are `equalp`)
```

## 타입별 함수

위에 나온 것들은 '일반적인' 동등성 함수예요.
이 함수들은 정의된 대로 어떤 타입에 대해서도 동작해요.
이는 비교할 객체의 타입을 실행 시점까지 알지 못하는 일반적인 코드를 작성할 때 유용할 수 있어요.
하지만 비교하는 타입을 알고 있을 때는 타입별 동등성 함수를 사용하는 것이 일반적으로 "더 나은 스타일"로 여겨져요.
예를 들어 `equal` 대신 `string=`을 사용하는 것이죠.
이런 함수들은 관련된 개념에서 소개하고 다룰 거예요.

[hyper-eq]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eq.htm
[hyper-eql]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eql.htm
[hyper-equal]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equal.htm
[hyper-equalp]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equalp.htm
