# 지침

어느 연구 기관은 신입 연구원 일부가 분석에서 최선이 아닌 방법을 사용해 왔다는 것을 알아챘어요.
그중 하나는 추가 계산을 하기 전에 이산 확률을 실수(즉, 부동소수점 수)로 곧바로 변환하는 방법이에요.

선임 연구원들은 더 높은 정밀도를 얻을 수 있는 유리수를 계산에 사용하는 쪽을 선호하고, 신입 연구원들의 좋지 않은 관행이 연구 결과에 영향을 주었는지 알고 싶어 해요.

수행된 연구에는 두 가지 유형이 있었어요.
- 많은 시험을 실행해 각 시험에서 성공에 대한 이산 확률을 얻은 다음, 이 확률들의 평균을 계산했어요.
- 많은 독립 사건을 시험하고, 모든 사건이 일어날 전체 확률을 각 확률을 곱해서 계산했어요.

선임 연구원들은 실수를 사용한 분석에 반올림 오류가 있는지 판단하는 데 도움이 될 함수를 작성해 달라고 요청해요.
그리고 오류가 있다면 결과에 대한 정확한 유리수를 제공해 달라고도 해요.

## 1. 성공 횟수와 시행 횟수의 비율 구하기

`rationalize(successes, trials)` 함수는 `successes`와 `trials` 두 배열을 받아요.
인덱스 `i`에 대해, `successes[i]`는 `trials[i]`번의 시행에서 일어난 성공 횟수에 해당해요.
이 함수는 입력 배열과 같은 순서로, 시행 횟수에 대한 성공 횟수의 유리수 배열을 반환해요.

```julia-repl
julia> rationalize([1, 2, 3], [4, 5, 6])
3-element Vector{Rational{Int64}}:
 1//4
 2//5
 1//2
```

## 2. 성공 횟수와 시행 횟수에 대응하는 실수 확률 구하기

마찬가지로, `probabilities(successes, trials)` 함수는 `successes`와 `trials` 두 배열을 받아요.
입력 배열과 같은 순서로, 시행 횟수에 대한 성공 횟수의 실수 배열을 반환해요.

```julia-repl
julia> probabilities([1, 2, 3], [4, 5, 6])
3-element Vector{Float64}:
 0.25
 0.4
 0.5
```

## 3. 확률의 평균 확인하기

`checkmean(successes, trials)`는 `successes`와 `trials` 두 배열을 받아요.
실수 확률의 평균과 유리수 확률의 평균을 비교해요.
- 두 확률이 같으면, `checkmean`은 `true`를 반환해요.
- 두 확률이 다르면, `checkmean`은 유리수 확률을 반환해요.

```julia-repl
julia> successes, trials = [9, 4, 7, 8, 6], [22, 22, 11, 17, 12];
julia> checkmean(successes, trials)
true

julia> successes, trials = [6, 5, 9, 8, 9], [21, 19, 13, 25, 22];
julia> checkmean(successes, trials)
1873629//4754750
```

## 4. 독립 확률 확인하기

`checkprob(successes, trials)`는 `successes`와 `trials` 두 배열을 받아요.
실수 확률의 전체 확률과 유리수 확률의 전체 확률을 비교해요.
- 두 확률이 같으면, `checkprob`은 `true`를 반환해요.
- 두 확률이 다르면, `checkprob`은 유리수 확률을 반환해요.

```julia-repl
julia> successes, trials = [2, 9, 4, 4, 5], [15, 11, 17, 19, 15];
julia> checkprob(successes, trials)
true

julia> successes, trials = [9, 8, 5, 4, 3], [22, 14, 19, 25, 18];
julia> checkprob(sucesses, trials)
12//7315
```
