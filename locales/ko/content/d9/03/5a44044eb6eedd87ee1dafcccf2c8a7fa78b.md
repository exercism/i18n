# 지시 사항

지역 주민회에서 정원 텃밭의 등록 관리를 맡아 달라고 해요. 상태는 두 개의 동적 변수에 저장돼 있어요.

- `registrations` — 현재 누군가에게 배정된 `plot` 튜플의 벡터예요.
- `next-id` — 다음 등록에 사용할 정수예요.

`plot` 튜플에는 두 개의 슬롯이 있어요.

| 슬롯            | 타입     |
| --------------- | -------- |
| `id`            | 정수     |
| `registered-to` | 문자열   |

## 1. 정원을 열고 등록 목록 조회하기

`open-garden`을 정의해 동적 변수를 초기화해요. `registrations`에는 빈 벡터를, `next-id`에는 `1`을 넣어요. 그다음 `list-registrations`를 정의해 현재 `plot` 벡터를 반환하게 해요.

```factor
open-garden
list-registrations .
! => V{ }
```

## 2. 텃밭 등록하기

`register`를 정의해 스택에서 이름을 하나 꺼내고, 다음으로 사용할 id로 새 `plot`을 만들고, `registrations` 벡터에 추가하고, `next-id`를 하나 늘린 뒤, 새 `plot`을 반환해요.

```factor
open-garden
"Emma Balan" register .
! => T{ plot { id 1 } { registered-to "Emma Balan" } }

list-registrations .
! => V{ T{ plot { id 1 } { registered-to "Emma Balan" } } }
```

텃밭 id는 고유해야 하고, 등록을 해제한 뒤에도 계속 커져야 해요. `next-id`는 값을 재사용해서는 안 돼요.

## 3. 텃밭 등록 해제하기

`release`를 정의해 id를 받아 `registrations`에서 해당 항목을 제거해요. 등록되지 않은 id를 해제하면 아무 일도 일어나지 않아요.

```factor
open-garden
"Emma" register drop
1 release
list-registrations .
! => V{ }
```

## 4. 등록된 텃밭 조회하기

`get-registration`을 정의해 id를 받아 해당하는 `plot`을 반환하고, 그 id를 가진 `plot`이 없으면 심볼 `not-found`를 반환해요.

```factor
open-garden
"Emma" register drop
1 get-registration .
! => T{ plot { id 1 } { registered-to "Emma" } }

7 get-registration .
! => not-found
```

## 5. 이름으로 텃밭 찾기

`find-by-name`을 정의해 이름을 받아, 현재 그 사람에게 등록된 모든 `plot`의 벡터를 반환해요.

```factor
open-garden
"Emma" register drop
"Bob" register drop
"Emma" register drop
"Emma" find-by-name .
! => V{ T{ plot { id 1 } { registered-to "Emma" } }
        T{ plot { id 3 } { registered-to "Emma" } } }
```
