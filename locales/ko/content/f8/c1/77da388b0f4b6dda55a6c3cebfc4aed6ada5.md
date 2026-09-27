# 지침

여러분은 기업 스파이 활동에 맞서 싸우는 태스크 포스의 일원이에요. 경쟁사의 비밀을 훔치는 게 의심되는 Shady Company X에 비밀 정보원을 심어 두었어요.

여러분의 정보원인 Agent Ex는 엘릭서 개발자예요. 그녀는 자신의 코드에 비밀 메시지를 인코딩해요.

그녀의 비밀 메시지를 해독하려면:

- 정의된 순서대로 모든 함수(공개 함수와 비공개 함수)를 가져와요.
- 각 함수에서 함수 이름의 처음 `n`개 문자를 가져와요. 여기서 `n`은 그 함수의 인자 개수예요.

## 1. 코드를 데이터로 바꾸기

`TopSecret.to_ast/1` 함수를 구현해요. 엘릭서 코드가 담긴 문자열을 받아 그 AST를 반환해야 해요.

```elixir
TopSecret.to_ast("div(4, 3)")
# => {:div, [line: 1], [4, 3]}
```

## 2. AST 노드 하나 파싱하기

`TopSecret.decode_secret_message_part/2` 함수를 구현해요. AST 노드와 비밀 메시지를 위한 누산기(리스트)를 받아요. 첫 번째 요소는 그대로 둔 AST 노드이고 두 번째 요소는 누산기인 튜플을 반환해야 해요.

AST 노드의 연산이 함수를 정의하는 것(`def` 또는 `defp`)이라면, 함수 이름을 문자열로 바꿔 누산기 앞에 붙여요. 연산이 다른 것이라면 누산기를 그대로 반환해요.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b, c), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["cat", "day"]}

ast_node = TopSecret.to_ast("10 + 3")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["day"]}
```

이 함수는 전체 AST를 확인하기 위해 재귀 호출을 할 필요가 없고, 주어진 노드만 확인하면 돼요. 마지막 단계에서 내장 도구로 전체 AST를 순회할 거예요.

## 3. 함수 정의에서 비밀 메시지 조각 해독하기

`TopSecret.decode_secret_message_part/2` 함수를 확장해요. AST 노드의 연산이 함수를 정의하는 것이라면 함수 이름 전체를 반환하지 않아요. 대신 그 함수의 인자 개수를 확인해요. 그런 다음 이름에서 처음 `n`개 문자만 반환해요. 여기서 `n`은 인자 개수예요.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}

ast_node = TopSecret.to_ast("defp cat(), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["", "day"]}
```

## 4. 가드가 있는 함수의 해독 수정하기

`TopSecret.decode_secret_message_part/2` 함수를 확장해요. 가드를 사용하는 함수 정의에서도 함수 이름과 인자 개수가 올바르게 감지되도록 해요.

```elixir
ast_node = TopSecret.to_ast("defp cat(a, b) when is_nil(a), do: nil")
TopSecret.decode_secret_message_part(ast_node, ["day"])
# => {ast_node, ["ca", "day"]}
```

## 5. 전체 비밀 메시지 해독하기

`TopSecret.decode_secret_message/1` 함수를 구현해요. 엘릭서 코드가 담긴 문자열을 받아, 코드에서 찾은 모든 함수 정의에서 해독한 비밀 메시지를 문자열로 반환해야 해요. 이전 단계에서 정의한 함수들을 재사용해야 해요.

```elixir
code = """
defmodule MyCalendar do
  def busy?(date, time) do
    Date.day_of_week(date) != 7 and
      time.hour in 10..16
  end

  def yesterday?(date) do
    Date.diff(Date.utc_today, date)
  end
end
"""

TopSecret.decode_secret_message(code)
# => "buy"
```
