# 힌트

## 일반

- [csharp.net의 날짜와 시간 튜토리얼][csharp.net-datetimes-working-with-datetimes-time]

## 1. 약속 날짜 파싱하기

- `DateTime` 클래스에는 `string`을 `DateTime`으로 [파싱][docs.microsoft.com_parsing-date]하는 여러 메서드가 있어요.

## 2. 약속 시간이 이미 지났는지 확인하기

- `DateTime` 객체는 기본 [비교 연산자][docs.microsoft.com_datetime-operators]로 비교할 수 있어요.
- 현재 날짜와 시간을 가져오는 [속성][docs.microsoft.com_datetime-properties]이 있어요.

## 3. 약속이 오후인지 확인하기

- `DateTime` 객체의 시간 부분에 접근하려면 [속성][docs.microsoft.com_datetime-properties] 중 하나를 사용하면 돼요.

## 4. 약속의 시간과 날짜 설명하기

- 테스트는 미국에 있는 컴퓨터에서 실행되는 것처럼 동작해요. 즉, `DateTime`을 `string`으로 변환하면 날짜와 시간이 미국 형식으로 반환돼요.
- `DateTime` 인스턴스를 `string`으로 변환할 때는 [표준 형식 문자열][docs.microsoft.com_standard-date-and-time-format-strings]이나 [사용자 지정 형식 문자열][docs.microsoft.com_custom-date-and-time-format-strings]을 사용할 수 있어요.

## 5. 기념일 날짜 반환하기

- 다양한 `DateTime` [생성자][constructors] 중 하나를 사용해 새로운 `DateTime` 인스턴스를 만들어요.
- 현재 날짜와 시간의 [속성][docs.microsoft.com_datetime-properties] 중 하나를 사용해 올해 연도를 가져올 수 있어요.

[docs.microsoft.com_parsing-date]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/parsing-datetime
[docs.microsoft.com_datetime-operators]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_datetime-properties]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_standard-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings
[docs.microsoft.com_custom-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings
[csharp.net-datetimes-working-with-datetimes-time]: https://csharp.net-tutorials.com/data-types/working-with-dates-time//
[constructors]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
