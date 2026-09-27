# 소개

## 문서

Elixir에서는 문서를 일급 시민으로 대접해요.

코드를 문서화할 때 흔히 쓰는 모듈 속성이 두 개 있어요. 모듈을 문서화하는 `@moduledoc`과, 바로 뒤에 오는 함수를 문서화하는 `@doc`이에요. `@moduledoc` 속성은 보통 모듈의 첫 줄에 오고, `@doc` 속성은 보통 함수 정의 바로 앞에 오는데, 함수에 타입스펙이 있다면 그 타입스펙 바로 앞에 와요. 문서는 보통 히어독 문법을 사용한 여러 줄 문자열로 작성해요.

Elixir 문서는 [**Markdown**][markdown]으로 작성해요.

```elixir
defmodule String do
  @moduledoc """
  Strings in Elixir are UTF-8 encoded binaries.
  """

  @doc """
  Converts all characters in the given string to uppercase according to `mode`.

  ## Examples

      iex> String.upcase("abcd")
      "ABCD"

      iex> String.upcase("olá")
      "OLÁ"
  """
  def upcase(string, mode \\ :default)
end
```

## 타입스펙

Elixir는 동적으로 타입이 정해지는 언어라서 컴파일 시점의 타입 검사를 제공하지 않아요. 그래도 타입스펙은 문서의 한 형태로 사용할 수 있어요.

타입스펙은 `@spec` 모듈 속성을 함수 정의 바로 앞에 두어 추가할 수 있어요. `@spec` 뒤에는 함수 이름과, 괄호 안에 쉼표로 구분한 모든 인자의 타입 목록이 와요. 반환값의 타입은 함수의 인자와 이중 콜론 `::`으로 구분해요.

```elixir
@spec longer_than?(String.t(), non_neg_integer()) :: boolean()
def longer_than?(string, length), do: String.length(string) > length
```

### 타입

가장 흔히 쓰는 타입은 다음과 같아요:

- 불리언: `boolean()`
- 문자열: `String.t()`
- 숫자: `integer()`, `non_neg_integer()`, `pos_integer()`, `float()`
- 배열: `list()`
- 모든 타입의 값: `any()`

일부 타입은 매개변수화할 수 있어요. 예를 들어 `list(integer)`는 정수 배열이에요.

리터럴 값도 타입으로 사용할 수 있어요.

타입의 합집합은 파이프 `|`로 나타낼 수 있어요. 예를 들어 `integer() | :error`는 정수이거나 아톰 리터럴 `:error`라는 뜻이에요.

모든 타입의 전체 목록은 [공식 문서의 "Typespecs" 섹션][types]에서 볼 수 있어요.

### 인자 이름 짓기

타입스펙의 인자에는 이름을 붙일 수도 있는데, 같은 타입의 인자가 여러 개일 때 구분하기 좋아요. 인자 이름 뒤에 이중 콜론을 붙여서 인자의 타입 앞에 써요.

```elixir
@spec to_hex({hue :: integer, saturation :: integer, lightness :: integer}) :: String.t()
```

### 사용자 정의 타입

타입스펙은 내장 타입에만 국한되지 않아요. `@type` 모듈 속성으로 사용자 정의 타입을 만들 수 있어요. 사용자 정의 타입 정의는 타입의 이름으로 시작하고, 그 뒤에 이중 콜론, 그리고 타입 자체가 와요.

```elixir
@type color :: {hue :: integer, saturation :: integer, lightness :: integer}

@spec to_hex(color()) :: String.t()
```

사용자 정의 타입은 정의한 모듈 안에서도, 다른 모듈에서도 사용할 수 있어요.

[markdown]: https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax
[types]: https://hexdocs.pm/elixir/typespecs.html#types-and-their-syntax
