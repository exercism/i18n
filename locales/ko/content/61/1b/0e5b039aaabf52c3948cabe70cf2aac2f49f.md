# 지시 사항

무용단이 연말 공연을 준비하고 있어요. 무용수를 몇 가지 방식으로 배치할 수 있는지, 그리고 공연 시간이 막마다 어떻게 나뉘는지를 정리하는 중이죠.

다섯 과제는 모두 `FORMATION_COUNT` 클래스 안에 작성해요.

## 1. 줄 세우기는 몇 가지일까요?

무용수가 `n`명이면 줄을 세우는 방법은 `n` 팩토리얼 가지예요. 맨 앞에 올 사람을 `n`명 중에서 고르고, 그다음 자리는 `n-1`명 중에서 고르는 식이죠. 이 값을 `INTI`로 반환해요. 무용수가 한 명도 없을 때도 줄 세우기는 딱 하나 있어요. 바로 빈 줄이죠.

```sather
FORMATION_COUNT::line_ups(5)
-- => 120
FORMATION_COUNT::line_ups(20)
-- => 2432902008176640000
```

## 2. 문자열로 써 보기

같은 수를 문자열로 반환해요. 한 자리도 빠뜨리지 않고요.

```sather
FORMATION_COUNT::line_ups_text(25)
-- => "15511210043330985984000000"
```

`INT`로는 그 수를 담을 수 없어요. 바로 그게 이 과제의 핵심이에요.

## 3. 한 막의 몫

`acts`개의 똑같은 막으로 이루어진 공연은 각 막이 전체 공연 시간의 `1/acts`씩을 가져요. 이 값을 `RAT`로 반환해요.

```sather
FORMATION_COUNT::share(3)
-- => 1/3
```

## 4. 두 막을 합치면

두 몫을 더해서 그 합계를 정확하게 반환해요.

```sather
FORMATION_COUNT::combined(FORMATION_COUNT::share(2), FORMATION_COUNT::share(3))
-- => 5/6
```

## 5. 공연 전체를 채울까요?

어떤 몫이 정확히 공연 전체인지, 즉 정확히 1인지 답해요.

```sather
FORMATION_COUNT::covers_whole_show(#RAT(3, 3))
-- => true
FORMATION_COUNT::covers_whole_show(#RAT(2, 3))
-- => false
```
