# 지침

이번 연습 문제에서는 로그 줄을 처리해요.

각 로그 줄은 다음과 같은 형식의 문자열이에요: `"[<LEVEL>]: <MESSAGE>"`.

로그 레벨은 세 가지가 있어요:

- `INFO`
- `WARNING`
- `ERROR`

세 가지 과제가 있고, 각 과제에서는 로그 줄 하나를 받아 무언가를 해봐요.

## 1. 로그 줄에서 메시지 가져오기

`message` 함수를 구현해서 로그 줄의 메시지를 반환하게 해요:

```julia-repl
julia> message("[ERROR]: Invalid operation")
"Invalid operation"
```

앞뒤의 공백은 제거해야 해요:

```julia-repl
julia> message("[WARNING]:  Disk almost full\r\n")
"Disk almost full"
```

## 2. 로그 줄에서 로그 레벨 가져오기

`log_level` 함수를 구현해서 로그 줄의 로그 레벨을 반환하게 해요. 로그 레벨은 소문자로 반환해야 해요:

```julia-repl
julia> log_level("[ERROR]: Invalid operation")
"error"
```

## 3. 로그 줄 형식 다시 만들기

`reformat` 함수를 구현해서 로그 줄의 형식을 다시 만들어요. 메시지를 앞에 두고, 그 뒤에 로그 레벨을 괄호 안에 넣어요:

```julia-repl
julia> reformat("[INFO]: Operation completed")
"Operation completed (info)"
```

----

***참고:***  이 연습 문제의 모든 문자열은 영어이고 ASCII 문자 집합으로 제한돼요.
이후 콘셉트에서는 유니코드 문자를 다뤄 볼 기회가 있을 거예요.
