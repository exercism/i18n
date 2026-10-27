# 힌트

## 일반

- `match`를 사용해 `Closed`와 `Open(balance)`를 구분해요.

- 연산은 전달받은 계정을 수정하는 대신 업데이트된 계정을 반환해요.
  업데이트가 성공하면 `Ok(updated_account)`를, 연산이 거부되면 `Err(...)`를 사용해요.
