# 개요

- Elixir는 동적 타입 언어예요.
  - 변수의 타입은 실행 시점에만 검사해요.
- 매치 [`=`][match] 연산자를 사용하면 어떤 타입의 값이든 변수 이름에 바인딩할 수 있어요:
  - 변수를 다시 바인딩할 수도 있어요.
  - 변수에는 어떤 타입의 값이든 바인딩할 수 있어요.

## 모듈

- [모듈][modules]은 Elixir에서 코드를 구성하는 기본 단위예요.
  - 모듈은 다른 모든 모듈에서 볼 수 있어요.
  - 모듈은 [`defmodule`][defmodule]로 정의해요.

## 이름 있는 함수

- [이름 있는 함수][functions]는 모두 모듈 안에 정의해야 해요.

  - 이름 있는 함수는 [`def`][def]로 정의해요.
  - 이름 있는 함수는 [`defp`][defp]를 사용해 비공개로 만들 수도 있어요.
  - 함수의 마지막 표현식 값은 _암묵적으로 반환돼요_.
  - 짧은 함수는 한 줄짜리 문법으로 작성할 수도 있어요.

  ```elixir
  def increment(n) do
    n + 1
  end

  defp private_increment(n) do
    n + 1
  end

  def short_increment(n), do: n + 1
  ```

- 함수는 모듈 이름을 포함한 전체 이름으로 호출해요.
  - 같은 모듈 안에서 호출한다면 모듈 이름은 생략할 수 있어요.
- 이름 있는 함수를 가리킬 때는 함수의 인자 개수를 자주 사용해요.

  - 인자 개수는 함수가 받는 인자의 수를 말해요.

  ```elixir
  # add/3, because the arity is 3
  def add(x, y, z), do: x + y + z
  ```

## 명명 규칙

모듈 이름은 `PascalCase`를 사용해야 해요. 모듈 이름은 대문자 `A-Z`로 시작해야 하고, 문자 `a-zA-Z`, 숫자 `0-9`, 밑줄 `_`를 포함할 수 있어요.

변수와 함수 이름은 `snake_case`를 사용해야 해요. 변수나 함수 이름은 소문자 `a-z`나 밑줄 `_`로 시작해야 하고, 문자 `a-zA-Z`, 숫자 `0-9`, 밑줄 `_`를 포함할 수 있으며, 물음표 `?`나 느낌표 `!`로 끝날 수도 있어요.

## 정수

정수 값은 하나 이상의 숫자로 이루어진 수예요. 정수에는 [기본 수학 연산][operators]을 적용할 수 있어요.

## 문자열

[문자열][string] 리터럴은 큰따옴표로 감싼 문자들의 나열이에요.

```elixir
string = "this is a string! 1, 2, 3!"
```

## 표준 라이브러리

- 문서는 [hexdocs.pm/elixir][docs]에서 온라인으로 볼 수 있어요.
- 대부분의 내장 데이터 타입에는 대응하는 모듈이 있어요. 예를 들어 `Integer`, `Float`, `String`, `Tuple`, `List` 같은 것들이요.
- `Kernel` 모듈은 특별한 모듈이에요.
  - 표준 라이브러리의 나머지가 그 위에 구축되는 기본 기능을 제공해요.
  - 자동으로 임포트돼요.
  - `Kernel.` 접두사 없이 함수를 사용할 수 있어요.

## 코드 주석

주석은 소스 코드를 읽는 다른 개발자에게 메모를 남기는 데 사용할 수 있어요. Elixir에서 한 줄 주석은 `#`으로 시작해요.

[match]: https://elixirschool.com/en/lessons/basics/pattern_matching/
[operators]: https://hexdocs.pm/elixir/basic-types.html#basic-arithmetic
[modules]: https://elixirschool.com/en/lessons/basics/modules/#modules
[functions]: https://elixirschool.com/en/lessons/basics/functions/#named-functions
[def]: https://hexdocs.pm/elixir/Kernel.html#def/2
[defp]: https://hexdocs.pm/elixir/Kernel.html#defp/2
[defmodule]: https://hexdocs.pm/elixir/Kernel.html#defmodule/2
[string]: https://hexdocs.pm/elixir/basic-types.html#strings
[docs]: https://hexdocs.pm/elixir/Kernel.html#content
