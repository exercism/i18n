# 소개

프로토콜은 데이터 타입에 따라 동작을 다르게 만들고 싶을 때 Elixir에서 다형성을 구현하는 방법이에요.

프로토콜은 `defprotocol`로 정의하며, 하나 이상의 함수 헤더를 담고 있어요.

```elixir
defprotocol Reversible do
  def reverse(term)
end
```

프로토콜은 `defimpl`로 구현할 수 있어요.

```elixir
defimpl Reversible, for: List do
  def reverse(term) do
    Enum.reverse(term)
  end
end
```

프로토콜은 기존의 모든 Elixir 데이터 타입이나 구조체에 대해 구현할 수 있어요.

프로토콜 함수를 호출하면 첫 번째 인자의 타입에 따라 알맞은 구현이 자동으로 선택돼요.
