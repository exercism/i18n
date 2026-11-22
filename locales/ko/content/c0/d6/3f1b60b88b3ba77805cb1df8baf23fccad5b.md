# 소개

`jq` 프로그램이 값을 처리하다가 문제를 만나면 **런타임 오류**가 발생해요. 숫자 값을 문자열로 인덱싱하거나, 잘못된 JSON 텍스트를 파싱하거나, 함수를 잘못된 타입의 인자로 호출할 때처럼요.
잡히지 않은 런타임 오류가 발생하면 `jq`는 *표준 오류*에 메시지를 출력하고 종료 코드 `5`로 끝나요.

## 오류 발생시키기: `error`와 `error(message)`

- `error`는 **입력** 값을 오류 값으로 하는 오류를 발생시켜요.
- `error(message)`는 `message`의 결과를 오류 값으로 하는 오류를 발생시켜요.

오류 값은 문자열만이 아니라 *어떤* JSON 값이든 될 수 있어요.

```jq
42 | error("invalid value: \(.)")
# => "invalid value: 42"

42 | error
(not a string): 42
```

## 오류 잡기: `try`와 `catch`

`try EXP catch HANDLER`로 오류를 잡을 수 있어요.
첫 번째 식이 실행돼요. 오류가 발생하면 `HANDLER` 식이 **오류 값을 입력으로 받아** 실행돼요.
`try catch`의 출력은 마지막으로 실행된 식(`EXP` 또는 `HANDLER`)의 출력이에요.

```jq
{a: 42} | try .a catch "no index a in \(.)"
# => 42

true | try .a catch "cannot index a \(type)"
# => "cannot index a boolean"

true | try error("some exception") catch .
# => "some exception"
```

더 짧은 형태인 `try EXP`는 `try EXP catch empty`와 같아요. 오류는 버려지고 아무 출력도 나오지 않아요.

```jq
[{}, true, {"a": 1}] | [.[] | try .a]
# => [null, 1]
```

## 오류 무시하기: `?` 연산자

`?` 연산자를 `EXP?` 형태로 쓰면 `try EXP`의 줄임 표현이 돼요.
이 연산자는 오류가 나는 식을 아무 출력도 내지 않는 식으로 바꿔 줘요.

```jq
["1", "invalid", "3", 4] | [.[] | tonumber?]
# => [1, 3, 4]
```

인덱싱 연산자에 붙어 있는 모습을 자주 볼 수 있어요. `.foo?`와 `.[]?`처럼요.

## 프로그램 중단하기: `halt_error`와 `halt`

`halt_error`는 프로그램을 멈추고, 입력을 가공하지 않은 텍스트로 *표준 오류*에 출력한 뒤, 주어진 종료 코드로 끝나요. 기본값은 `5`예요.
관련 필터인 `halt`는 프로그램을 조용히 멈추고 종료 코드 `0`으로 끝나요.

```jq
"Error: something went wrong" | halt_error(1)
```
