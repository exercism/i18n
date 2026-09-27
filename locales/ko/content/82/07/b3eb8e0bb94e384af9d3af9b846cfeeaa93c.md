# 지침 추가

## 출력 형식

`solve()` 메서드는 다음 속성을 가진 객체를 반환해야 해요.

- `moves` - 목표에 도달하는 데 필요한 양동이 동작 수
  (시작 양동이를 채우는 것도 포함해요),
- `goalBucket` - 목표 양에 도달한 양동이의 이름,
- `otherBucket` - 다른 양동이에 들어 있는 양.

예:

```json
{
  "moves": 5,
  "goalBucket": "one",
  "otherBucket": 2
}
```
