# 별난 파티 로봇

## 줄거리

창문에 창살이 달린 이상한 집에 사는 별난 프로그래머가 있었어요.
어느 날 그는 온라인 구인 게시판에서 파티 로봇을 만드는 일을 맡았어요. 그
로봇은 사람들을 맞이하고 자리로 안내하는 역할을 맡았어요. 첫 번째 버전은
몹시 기술적이어서 프로그래머가 인간적인 교감에 서툴다는 점이 드러났어요.
그중 일부는 최종 버전에도 그대로 남았어요.

## 작업

- 각 사람을 이렇게 맞이해요:

```
Welcome to my party, <name>!
```

- 오늘이 생일인 손님에게는 로봇이 손님을 얼마나 잘 아는지 자랑하듯 이렇게 인사해요:

```
Happy birthday <name>! You are now <age> years old!
Welcome to my party!
```

- 자기 자리를 물어보는 사람에게는 다음과 같이 테이블 위치를 알려줘요:

```
Welcome to my party, <name>!
You have been assigned to table <table-number-in-hex>. Your table is <direction>, exactly <distance-float> meters from here.
You will be sitting next to <neighbour-name>!
```

## 구현

- [Go: strings][implementation-go] (참조 구현)

## 참고 자료

- [`types/string`][types-string]

[types-string]: https://github.com/exercism/v3/blob/main/reference/types/string.md
[implementation-go]: https://github.com/exercism/go/blob/main/exercises/concept/strings/.docs/instructions.md
