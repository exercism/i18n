# 소개

열거 가능한 값(배열, 비트스트링, 문자열)을 [재귀][exercism-recursion]로 순회할 때는 보통 두 가지 고민이 따라와요:

- 재귀 함수 호출의 흔적을 저장하는 데 메모리가 얼마나 필요한지
- 해답을 얼마나 효율적으로 만들어 낼지

이런 고민을 해결하려면 _누산기_를 사용할 수 있어요.

누산기는 데이터와 함께 전달되는 변수예요. 함수 호출에서 다음 함수 호출로 함수 실행의 현재 상태를 넘겨주는 데 쓰이고, _기저 사례_에 도달할 때까지 이어져요. 기저 사례에서는 누산기를 이용해 재귀 함수 호출의 최종 값을 반환해요.

누산기는 함수를 사용하는 사람이 아니라 함수를 작성한 사람이 초기화해야 해요. 그러려면 함수 두 개를 선언해요. 필요한 데이터만 인자로 받아 누산기를 초기화하는 공개 함수와, 누산기도 함께 받는 비공개 함수예요. Elixir에서는 비공개 함수 이름 앞에 `do_`를 붙이는 것이 흔한 패턴이에요.

```elixir
# Count the length of a list without an accumulator
def count([]), do: 0
def count([_head | tail]), do: 1 + count(tail)

# Count the length of a list with an accumulator
def count(list), do: do_count(list, 0)

defp do_count([], count), do: count
defp do_count([_head | tail], count), do: do_count(tail, count + 1)
```

누산기를 사용하면 재귀 함수를 _꼬리 재귀_ 함수로 바꿀 수 있어요. 함수에서 _마지막_으로 실행되는 것이 자기 자신에 대한 호출이라면, 그 함수는 꼬리 재귀예요.

[exercism-recursion]: https://exercism.org/tracks/elixir/concepts/recursion
