# 힌트

## 일반

## 1. 새 무선 조종 자동차 구매하기

- [이 페이지에서는 클래스의 새 인스턴스를 만드는 방법을 보여줘요][creating-objects].

## 2. 주행 거리 표시하기

- [필드][fields]에 주행 거리를 기록해요.
- 필드에 어떤 접근 제한자를 사용할지 고려해 봐요 (클래스 외부에서 사용해야 할까요?).
- 반환할 문자열의 형식을 지정할 때 [문자열 보간][string-interpolation]을 사용하는 것도 고려해 봐요.

## 3. 배터리 잔량 표시하기

- [필드][fields]에 최초 배터리 충전량을 기록해요.
- 필드를 예상되는 최초 배터리 충전량에 해당하는 특정 값으로 초기화해요.
- 필드에 어떤 접근 제한자를 사용할지 고려해 봐요 (클래스 외부에서 사용해야 할까요?).
- 반환할 문자열의 형식을 지정할 때 [문자열 보간][string-interpolation]을 사용하는 것도 고려해 봐요.

## 4. 주행할 때 주행한 미터 수 업데이트하기

- 주행 거리를 나타내는 필드를 업데이트해요.

## 5. 주행할 때 배터리 잔량 업데이트하기

- 배터리 잔량을 나타내는 필드를 업데이트해요.

## 6. 배터리가 방전되었을 때 주행 막기

- 배터리가 아직 방전되지 않았다면 주행 거리와 배터리만 업데이트하도록 조건문을 추가해요.
- 배터리가 방전되었다면 배터리 방전 메시지를 표시하도록 조건문을 추가해요.

[creating-objects]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/classes#creating-objects
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[string-interpolation]: https://christianfindlay.com/2019/10/04/c-string-interpolation/
