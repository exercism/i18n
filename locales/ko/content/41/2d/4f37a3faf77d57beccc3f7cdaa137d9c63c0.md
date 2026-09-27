# 지침

엘레나는 신문 공장의 새 품질 관리자예요.
회사에 막 합류한 터라, 공장의 여러 공정을 살펴보며 무엇을 개선할 수 있을지 알아보기로 했어요.
그런데 기술자들이 품질 검사를 대부분 손으로 하고 있다는 걸 알게 됐어요. 자동화할 좋은 기회가 보여서, 프리랜서 개발자인 여러분에게 일부 기계를 모니터링할 소프트웨어를 만들어 달라고 부탁해요.

## 1. 방의 습도 수준을 확인해요

첫 번째 임무는 생산실의 습도 수준을 모니터링하는 소프트웨어를 작성하는 거예요. 이미 회사 소프트웨어에 연결된 센서가 있어서 방의 습도 백분율을 주기적으로 알려줘요.

습도 백분율이 너무 높으면 오류를 던지는 함수를 소프트웨어에 구현해야 해요.
습도가 허용 가능한 수준이면 Info 로그가 추가돼요.
함수 이름은 `humiditycheck`로 하고, 습도 백분율을 인자로 받아야 해요.

백분율이 70%를 넘으면 ErrorException과 함께 중단해야 해요(정확한 메시지는 중요하지 않지만, 측정된 습도 수준은 포함해야 해요).
그렇지 않으면 `h`가 습도 백분율인 메시지 `"humidity level check passed: h%"`와 함께 Info 로그를 추가해요.

```julia-repl
julia> humiditycheck(60)
[ Info: humidity level check passed: 60%
```

```julia-repl
julia> humiditycheck(100)
ERROR: humidity check failed: 100%
```

## 2. 과열 여부를 확인해요

엘레나는 첫 번째 작업에 매우 만족해서, 기계의 온도를 모니터링하는 일을 맡아 달라고 부탁해요.
기술자 그렉과 이야기하다 보면, 기계의 온도가 500°C를 넘으면 기술자들이 과열을 걱정하기 시작한다는 걸 알게 돼요.

기계에는 내부 온도를 측정하는 센서가 달려 있어요.
그런데 이 센서는 매우 민감해서 자주 고장 나요.
이 경우 기술자들이 센서를 교체해야 해요.

여러분이 할 일은 온도를 인자로 받는 `temperaturecheck` 함수를 구현하는 거예요. 이 함수는 모든 게 정상이면 로그를 추가하고, 센서가 고장 났거나 기계가 과열되기 시작하면 오류를 던져요.
나중에 오류에 따라 다르게 대응해야 한다는 것을 알고 있으니, 두 종류의 오류를 구분할 방법이 필요해요.

- 센서가 고장 나면 온도가 `nothing`이 돼요.
  이 경우 `ArgumentError`와 함께 중단해야 해요(메시지는 중요하지 않아요).
- 센서가 작동하는데 온도가 500°C를 넘으면, 측정된 온도를 포함하는 `DomainError`를 던져야 해요.
- 그렇지 않으면 모두 정상이므로, `t`가 온도인 메시지 `"temperature check passed: t °C"`와 함께 Info 로그를 추가해요.

```julia-repl
julia> temperaturecheck(nothing)
ERROR: ArgumentError: sensor is broken

julia> temperaturecheck(800)
ERROR: DomainError with 800:
"overheating detected"

julia> temperaturecheck(500)
[ Info: temperature check passed: 500 °C
```

## 3. 사용자 지정 오류를 정의해요

다음 작업을 위해서는 더 일반적인, 모든 상황을 포괄하는 오류를 정의해야 해요.
오류라는 점과 이름이 `MachineError`라는 점 외에는 구현 세부 사항은 중요하지 않아요.
도움이 된다고 생각하는 필드와 메시지를 자유롭게 포함해도 돼요.

## 4. 기계를 모니터링해요

이제 기계가 오류를 감지할 수 있고 사용자 지정 기계 오류도 있으니, 모든 것이 어떻게 동작하는지 보고하는 래퍼 함수를 추가해요.
이 래퍼는 이전 함수들의 로그를 반환하는 것 외에도, 발생하는 실패 유형에 따라 로그를 추가해야 해요.

- 습도와 온도를 확인해요.
- 습도 검사에서 `ErrorException`이 발생하면, `h`가 습도 백분율인 메시지 `"humidity level check failed: h%"`와 함께 Error 로그를 추가해야 해요.
- 온도 검사에서 `ArgumentError`가 발생하면, 메시지 `"sensor is broken"`와 함께 Warn 로그를 추가해야 해요.
- 온도 검사에서 `DomainError`가 발생하면, `t`가 온도인 메시지 `"overheating detected: t °C"`와 함께 Error 로그를 추가해야 해요.
- 두 검사 중 하나라도 또는 둘 다 실패하면, 로그가 추가된 뒤 `MachineError` 하나를 던져야 해요.
- 모두 정상이면 `humiditycheck`와 `temperaturecheck`의 로그만 추가돼요.

습도와 온도를 인자로 받는 `machinemonitor()` 함수를 구현해요.

```julia-repl
julia> machinemonitor(42, 450)
[ Info: humidity level check passed: 42%
[ Info: temperature check passed: 450 °C

julia> machinemonitor(42, 550)
[ Info: humidity level check passed: 42%
┌ Error: overheating detected: 550 °C
└ @ Main # output truncated

Error: MachineError

julia> machinemonitor(82, 521)
┌ Error: humidity level check failed: 82%
└ @ Main # output truncated
┌ Error: overheating detected: 521 °C
└ @ Main # output truncated

Error: MachineError

julia> machinemonitor(42, nothing)
[ Info: humidity level check passed: 42%
┌ Warning: sensor is broken
└ @ Main # output truncated

Error: MachineError
```
