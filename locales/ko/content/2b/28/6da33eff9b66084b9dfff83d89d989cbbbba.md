# 힌트

## 1. 만나는 공백을 모두 밑줄로 바꾸기

- [이 튜토리얼][chars-tutorial]이 도움이 돼요.
- `char`에 대한 [참고 문서][chars-docs]는 여기 있어요.
- 문자열에서 `char`를 가져오는 방법은 배열에서 원소를 가져오는 방법과 같아요.
- 출력 문자열을 만들려면 [`StringBuilder`][string-builder]를 사용해야 해요.
- 공백을 감지하려면 [이 메서드][iswhitespace]를 참고해요. 정적 메서드라는 점을 기억해요.
- `char` 리터럴은 작은따옴표로 감싸요.

## 2. 제어 문자를 대문자 문자열 "CTRL"로 바꾸기

- 문자가 제어 문자인지 확인하려면 [이 메서드][iscontrol]를 참고해요.

## 3. 케밥 케이스에서 카멜 케이스로 변환하기

- 문자를 대문자로 바꾸려면 [이 메서드][toupper]를 참고해요.

## 4. 그리스 소문자 생략하기

- `char`는 기본 같음 연산자와 비교 연산자를 지원해요.

[chars-docs]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/char
[chars-tutorial]: https://csharp.net-tutorials.com/data-types/the-char-type/
[string-builder]: https://docs.microsoft.com/en-us/dotnet/api/system.text.stringbuilder
[iswhitespace]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iswhitespace
[iscontrol]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iscontrol
[toupper]: https://docs.microsoft.com/en-us/dotnet/api/system.char.toupper
[equality]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/equality-operators
[comparison]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/comparison-operators
