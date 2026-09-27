# 힌트

## 일반

- 하루 동안의 새 수는 `birdsPerDay`라는 [필드][fields]에 저장돼요.
- 하루 동안의 새 수는 정확히 7개의 정수를 담은 배열이에요.

## 1. 지난주 새 수 확인하기

- 이 메서드는 이번 주의 새 수에 _의존하지 않기_ 때문에 [`static` 메서드][static-members]로 정의돼요.
- 배열을 정의하는 방법에는 [여러 가지가 있어요][single-dimensional-arrays].

## 2. 오늘 몇 마리의 새가 찾아왔는지 확인하기

- 새 수는 가장 오래된 날부터 가장 최근 날 순서로 나열되고, 마지막 요소가 오늘을 나타낸다는 걸 기억해요.
- 마지막 요소에는 (고정된) 인덱스로 접근할 수도 있고, [배열의 크기][array-length]를 이용해 인덱스를 계산해서 접근할 수도 있어요. 인덱스는 0부터 시작한다는 걸 기억해요.

## 3. 오늘의 새 수 증가시키기

- 오늘의 새 수를 나타내는 요소를 오늘의 새 수에 1을 더한 값으로 설정해요.

## 4. 새가 찾아오지 않은 날이 있었는지 확인하기

- `Array` 클래스에는 요소가 처음 발견된 인덱스를 반환하는 [내장 메서드][array-indexof]가 있어요. 일치하는 요소가 없으면 -1을 반환해요.

## 5. 처음 며칠 동안 찾아온 새의 수 계산하기

- 변수를 사용해 찾아온 새의 수를 담을 수 있어요.
- [`for`문][for-statement]으로 배열을 순회할 수 있어요.
- 루프 안에서 변수를 갱신할 수 있어요.
- 기억해요: 배열의 인덱스는 `0`부터 시작해요.

## 6. 바쁜 날의 수 계산하기

- 변수를 사용해 바쁜 날의 수를 담을 수 있어요.
- [`foreach`문][array-foreach]으로 배열을 순회할 수 있어요.
- 루프 안에서 변수를 갱신할 수 있어요.
- 루프 안에서 [조건문][if-statement]을 사용할 수 있어요.

[array-foreach]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/using-foreach-with-arrays
[single-dimensional-arrays]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/single-dimensional-arrays
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[static-members]: https://www.oreilly.com/library/view/programming-c/0596001177/ch04s03.html
[array-indexof]: https://docs.microsoft.com/en-us/dotnet/api/system.array.indexof
[if-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/if-else
[array-length]: https://docs.microsoft.com/en-us/dotnet/api/system.array.length
[for-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/for
