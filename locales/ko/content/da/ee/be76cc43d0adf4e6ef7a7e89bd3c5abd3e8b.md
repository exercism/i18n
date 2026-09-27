# 지침

넷볼 시즌이 끝났고, 이제 순위표가 누가 결승에 나갈지 결정해요.

스텁에는 `TEAM` 클래스가 주어져 있어요. 그 아래에 `FINALS_LADDER`를 작성해요.

## 1. 누가 누구 위에 있을까요?

`higher`는 두 팀을 받아서 첫 번째 팀이 두 번째 팀보다 위에 있어야 하는지 답해요.
점수가 더 많은 팀이 앞서요. 점수가 같은 팀은 골 득실로 순위를 가르는데, 골 득실이
높은 팀이 먼저예요.

```sather
FINALS_LADDER::higher(#TEAM("Vixens", 24, 40), #TEAM("Magpies", 20, 90))
-- => true
```

## 2. 순위표

`ladder`는 팀을 아무 순서로나 받아서 순위를 매겨 답해요. 넘겨받은 배열은 원래대로
남아 있어야 해요.

```sather
FINALS_LADDER::ladder(teams)
-- => the same teams, best first
```

## 3. 순위표를 읽어 내기

`names`은 팀 배열을 받아서 팀 이름들을 `", "`로 이어 붙여 답해요.

```sather
FINALS_LADDER::names(FINALS_LADDER::ladder(teams))
-- => "Vixens, Magpies, Swifts"
```

## 4. 우승 팀

`premiers`은 팀을 아무 순서로나 받아서 맨 위에 있는 팀의 이름을 답해요. 팀이 하나도
없으면 답은 `""`예요.

```sather
FINALS_LADDER::premiers(teams)
-- => "Vixens"
```

## 5. 완전히 다른 순서

`shortest_first`은 문자열 배열을 받아서 길이 순으로, 짧은 것부터 답해요. 길이가
같은 문자열은 알파벳 순으로 가요.

```sather
FINALS_LADDER::shortest_first(|"Magpies", "Vixens", "Swifts"|)
-- => "Swifts", "Vixens", "Magpies"
```

동점 처리 규칙은 장식이 아니에요. 정렬은 안정적이지 않아서, 이 규칙이 없으면 길이가
같은 두 이름이 어느 쪽으로든 나올 수 있어요.

이것은 2번 문제와 같은 정렬 루틴인데, 다른 규칙을 넘겨받은 거예요. 그게 이 연습
문제의 핵심이에요.
