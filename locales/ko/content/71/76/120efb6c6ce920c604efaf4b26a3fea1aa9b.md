# 힌트

## 일반

- JSON 문자열을 반환하는 순수 함수를 구현해요. 웹 서버를 실행할 필요는 없어요.

- Roc은 `Json.parse`와 `Json.to_str`을 기본으로 제공해요.
  파싱 도우미 함수의 반환값에 타입 애너테이션을 붙이면 `Json.parse`가 어떤 레코드 구조로 디코딩할지 알 수 있어요.

- `payload ?: Str` 필드는 선택 사항이에요. 스텁의 레코드 패턴에 바인딩된 `payload`는 `Ok(text)` 또는 `Err(MissingField)` 중 하나예요.
