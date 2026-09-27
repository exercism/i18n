# 지침

이 연습 문제에서는 클래식 게임 Pac-Man의 규칙 몇 가지를 Elixir 함수로 옮겨야 해요.

옮겨야 할 규칙은 네 가지이고, 모두 게임 상태와 관련이 있어요.

> 인자가 어떻게 만들어지는지는 걱정하지 말고, 인자들을 조합해 원하는 결과를 반환하는 데만 집중해요.

## 1. Pac-Man이 유령을 먹는지 정의하기

두 개의 인자(_Pac-Man이 파워 펠릿을 활성화한 상태인지_와 _Pac-Man이 유령에 닿아 있는지_)를 받아서, Pac-Man이 유령을 먹을 수 있는지를 나타내는 불리언 값을 반환하는 `Rules.eat_ghost?/2` 함수를 정의해요. 이 함수는 Pac-Man이 파워 펠릿을 활성화한 상태이고 유령에 닿아 있을 때만 true를 반환해야 해요.

```elixir
Rules.eat_ghost?(false, true)
# => false
```

## 2. Pac-Man이 점수를 얻는지 정의하기

두 개의 인자(_Pac-Man이 파워 펠릿에 닿아 있는지_와 _Pac-Man이 점에 닿아 있는지_)를 받아서, Pac-Man이 점수를 얻었는지를 나타내는 불리언 값을 반환하는 `Rules.score?/2` 함수를 정의해요. 이 함수는 Pac-Man이 파워 펠릿이나 점에 닿아 있으면 true를 반환해야 해요.

```elixir
Rules.score?(true, true)
# => true
```

## 3. Pac-Man이 지는지 정의하기

두 개의 인자(_Pac-Man이 파워 펠릿을 활성화한 상태인지_와 _Pac-Man이 유령에 닿아 있는지_)를 받아서, Pac-Man이 지는지를 나타내는 불리언 값을 반환하는 `Rules.lose?/2` 함수를 정의해요. 이 함수는 Pac-Man이 유령에 닿아 있고 파워 펠릿이 활성화되어 있지 않으면 true를 반환해야 해요.

```elixir
Rules.lose?(false, true)
# => true
```

## 4. Pac-Man이 이기는지 정의하기

세 개의 인자(_Pac-Man이 점을 모두 먹었는지_, _Pac-Man이 파워 펠릿을 활성화한 상태인지_, _Pac-Man이 유령에 닿아 있는지_)를 받아서, Pac-Man이 이기는지를 나타내는 불리언 값을 반환하는 `Rules.win?/3` 함수를 정의해요. 이 함수는 Pac-Man이 점을 모두 먹었고, 3번에서 정의한 인자들을 기준으로 봤을 때 지지 않았으면 true를 반환해야 해요.

```elixir
Rules.win?(false, true, false)
# => false
```
