# 소개

## Use

`use` 매크로를 사용하면 다른 모듈이 제공하는 기능으로 우리 모듈을 빠르게 확장할 수 있어요. 모듈을 `use`하면 그 모듈이 우리 모듈에 코드를 주입할 수 있어요. 예를 들어 함수를 정의하거나, 다른 모듈을 `import` 또는 `alias`하거나, 모듈 속성을 설정할 수 있죠.

Exercism에서 Elixir 연습 문제의 테스트 파일을 본 적이 있다면, 대부분 `use ExUnit.Case`로 시작한다는 걸 눈치챘을 거예요. 이 한 줄의 코드가 테스트 모듈에서 `test`와 `assert` 매크로를 사용할 수 있게 해줘요.

```elixir
defmodule LasagnaTest do
  use ExUnit.Case

  test "expected minutes in oven" do
    assert Lasagna.expected_minutes_in_oven() === 40
  end
end
```

### `__using__/1` 매크로

모듈을 `use`할 때 정확히 무슨 일이 일어나는지는 그 모듈의 `__using__/1` 매크로가 결정해요. 이 매크로는 옵션이 담긴 키워드 리스트를 인자 하나로 받고, [인용된 표현식][concept-ast]을 반환해요. 이 인용된 표현식에 담긴 코드는 `use`를 호출할 때 우리 모듈에 삽입돼요.

```elixir
defmodule ExUnit.Case do
  defmacro __using__(opts) do
    # some real-life ExUnit code omitted here
    quote do
      import ExUnit.Assertions
      import ExUnit.Case, only: [describe: 2, test: 1, test: 2, test: 3]
    end
  end
end
```

옵션은 `use`를 호출할 때 두 번째 인자로 넘겨줄 수 있어요. 예를 들어 `use ExUnit.Case, async: true`처럼요. 명시적으로 넘겨주지 않으면 빈 리스트가 기본값이에요.

## Behaviours

behaviour를 이용하면 _behaviour 모듈_에 인터페이스(함수와 매크로의 집합)를 정의해 두고, 나중에 여러 _콜백 모듈_에서 구현할 수 있어요. 인터페이스를 공유하기 때문에 그 콜백 모듈들은 서로 바꿔 쓸 수 있죠.

~~~~exercism/note
참고로 "behaviours"는 영국식 철자예요.
~~~~

### behaviour 정의하기

behaviour를 정의하려면 새 모듈을 만들고, 원하는 인터페이스에 속하는 함수들의 목록을 지정해야 해요. 각 함수는 `@callback` 모듈 속성으로 정의해요. 문법은 [함수 타입스펙][concept-typespecs](`@spec`)과 똑같아요. 함수 이름, 인자 타입의 목록, 그리고 가능한 모든 반환 타입을 지정해야 해요.

```elixir
defmodule Countable do
  @callback count(collection :: any) :: pos_integer
end
```

### behaviour 구현하기

기존 behaviour를 우리 모듈에 추가하려면(콜백 모듈을 만들려면) `@behaviour` 모듈 속성을 사용해요. 값은 추가하려는 behaviour 모듈의 이름이에요.

그다음에는 그 behaviour 모듈이 요구하는 모든 함수(콜백)를 정의해야 해요. Elixir에 내장된 `Access`나 `GenServer` behaviour처럼 다른 사람이 만든 behaviour를 구현한다면, behaviour의 모든 콜백 목록은 [hexdocs.pm][hexdocs] 문서에서 찾을 수 있어요.

콜백 모듈이 자기 behaviour에 속한 함수만 구현해야 하는 건 아니에요. 하나의 모듈이 여러 behaviour를 구현할 수도 있어요.

어떤 함수가 어떤 behaviour에서 온 것인지 표시하려면 각 함수 앞에 `@impl` 모듈 속성을 사용해요. 값은 이 콜백을 정의한 behaviour 모듈의 이름이에요.

```elixir
defmodule BookCollection do
  @behaviour Countable

  defstruct [:list, :owner]

  @impl Countable
  def count(collection) do
    Enum.count(collection.list)
  end

  def mark_as_read(collection, book) do
    # other function unrelated to the Countable behaviour
  end
end
```

### 기본 콜백 구현

behaviour를 정의할 때 콜백의 기본 구현을 제공할 수 있어요. 이 구현은 `__using__/1` 매크로의 인용된 표현식 안에 정의해요. behaviour 모듈을 사용하는 쪽에서 기본 구현을 재정의할 수 있게 하려면, 함수 구현 뒤에 `defoverridable/1` 매크로를 호출해요. 이 매크로는 함수 이름을 키로, 함수의 인자 개수를 값으로 하는 키워드 리스트를 받아요.

```elixir
defmodule Countable do
  @callback count(collection :: any) :: pos_integer

  defmacro __using__(_) do
    quote do
      @behaviour Countable
      def count(collection), do: Enum.count(collection)
      defoverridable count: 1
    end
  end
end
```

`__using__/1` 안에 함수를 정의하는 건 기본 콜백 구현을 정의할 때를 빼고는 권장하지 않아요. 하지만 언제든 다른 모듈에 함수를 정의하고 `__using__/1` 매크로에서 import할 수 있어요.

[concept-ast]: https://exercism.org/tracks/elixir/concepts/ast
[concept-typespecs]: https://exercism.org/tracks/elixir/concepts/typespecs
[hexdocs]: https://hexdocs.pm
