# 힌트

## 1. 로봇의 방향 설정하기
- 연산을 수행하는 순서가 중요해요.
- 벡터의 벡터를 행렬로 변환하는 방법은 여러 가지가 있어요.
- 행렬을 만드는 데 도움이 될 만한 아이디어로는 컴프리헨션, `for`문, [`hcat`][hcat-ref], [`reshape`][reshape-ref], [`stack`][stack-ref] 등이 있어요.

## 2. 로봇 회전시키기
- 행렬을 회전하는 방법은 소개 부분을 참고해요.
- 단순한 행렬 곱셈만으로 충분해요.

## 3. 올바른 방향인지 확인하기
- 방향을 나타내는 것은 행렬의 *두 번째* 열이라는 점을 기억해요.
- 내적으로 확인할 수 있어요.
- 벡터를 정규화하면 도움이 될 거예요.
- 부동소수점 차이가 있을 때는 방향이 `~1e-7` 정도로 [거의][isapprox-ref] 같기만 하면 돼요.
- 다음 항등식이 도움이 될 거예요: `x⋅y = ||x||*||y||cos(θ)` (여기서 [`||x|| = norm(x)`][norm-ref])

## 4. 로봇 몸체 좌표
- 아주 간단하지만, 원소별 연산이 중요해요.
- 방향 행렬은 원점에서 출발하는 세 개의 위치 벡터로 볼 수 있다는 점을 기억해요.

[hcat-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.hcat
[reshape-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.reshape
[stack-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.stack
[isapprox-ref]: https://docs.julialang.org/en/v1/base/math/#Base.isapprox
[norm-ref]: https://docs.julialang.org/en/v1/stdlib/LinearAlgebra/#LinearAlgebra.norm
