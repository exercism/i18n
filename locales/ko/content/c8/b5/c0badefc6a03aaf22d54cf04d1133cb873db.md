# 힌트

## 일반

- [세트][sets]는 변경할 수 있고 순서가 없으며 중복 요소가 없는 컬렉션이에요.
- 세트에는 모든 요소가 [해시 가능][hashable]하기만 하면 어떤 데이터 타입이든 담을 수 있어요.
- 세트는 [반복 가능][iterable]해요.
- 세트는 다른 컬렉션의 중복을 빠르게 제거하거나 특정 요소가 들어 있는지 확인할 때 가장 많이 사용해요.
- 세트는 `union`, `intersection`, `difference`, `symmetric difference` 같은 수학 연산도 지원해요.

## 1. 접시 재료 손질하기

- `set()` 생성자는 어떤 [반복 가능한][iterable] 객체든 인자로 받을 수 있어요. [개념: 배열](/tracks/python/concepts/lists)은 반복 가능해요.
- 기억하세요: [개념: 튜플](/tracks/python/concepts/tuples)은 `(<element_1>, <element_2>)` 형태로 만들거나 `tuple()` 생성자로 만들 수 있어요.

## 2. 칵테일과 무알코올 칵테일

- 두 세트가 공유하는 요소를 하나도 갖지 않으면, 한 `set`은 다른 세트와 _서로소_예요.
- `set()` 생성자는 어떤 [반복 가능한][iterable] 객체든 인자로 받을 수 있어요. [개념: 배열](/tracks/python/concepts/lists)은 반복 가능해요.
- Python에서는 [개념: 문자열](/tracks/python/concepts/strings)을 `+` 기호로 이어 붙일 수 있어요.

## 3. 요리 분류하기

- 사용할 수 있는 식사 카테고리를 순회할 때 [개념: 루프](/tracks/python/concepts/loops)를 사용하면 도움이 될 거예요.
- `<set_1>`의 모든 요소가 `<set_2>`에 포함되어 있으면 `<set_1> <= <set_2>`예요.
- `<=`에 해당하는 메서드는 `<set>.issubset(<iterable>)`예요.
- [개념: 튜플](/tracks/python/concepts/tuples)에는 다른 튜플을 포함해 어떤 데이터 타입이든 담을 수 있어요. 튜플은 `(<element_1>, <element_2>)` 형태로 만들거나 `tuple()` 생성자로 만들 수 있어요.
- [개념: 튜플](/tracks/python/concepts/tuples)의 요소는 왼쪽에서부터는 0부터 시작하는 인덱스 번호로, 오른쪽에서부터는 -1부터 시작하는 인덱스 번호로 접근할 수 있어요.
- `set()` 생성자는 어떤 [반복 가능한][iterable] 객체든 인자로 받을 수 있어요. [개념: 배열](/tracks/python/concepts/lists)은 반복 가능해요.
- [개념: 문자열](/tracks/python/concepts/strings)은 `+` 기호로 이어 붙일 수 있어요.

## 4. 알레르기 유발 성분과 제한 음식 표시하기

- 세트 _교집합_은 `<set_1>`과 `<set_2>`가 공유하는 요소예요.
- `&`에 해당하는 세트 메서드는 `<set>.intersection(<iterable>)`예요.
- [개념: 튜플](/tracks/python/concepts/tuples)의 요소는 왼쪽에서부터는 0부터 시작하는 인덱스 번호로, 오른쪽에서부터는 -1부터 시작하는 인덱스 번호로 접근할 수 있어요.
- `set()` 생성자는 어떤 [반복 가능한][iterable] 객체든 인자로 받을 수 있어요. [개념: 배열](/tracks/python/concepts/lists)은 반복 가능해요.
- [개념: 튜플](/tracks/python/concepts/tuples)은 `(<element_1>, <element_2>)` 형태로 만들거나 `tuple()` 생성자로 만들 수 있어요.

## 5. 재료 "마스터 목록" 만들기

- 세트 _합집합_은 `<set_1`>과 `<set_2>`를 하나의 `set`으로 합친 것이에요.
- `|`에 해당하는 세트 메서드는 `<set>.union(<iterable>)`예요.
- 여러 요리를 순회할 때 [개념: 루프](/tracks/python/concepts/loops)를 사용하면 도움이 될 거예요.

## 6. 쟁반에 올릴 애피타이저 골라내기

- 세트 _차집합_은 `<set_1>`에서 `<set_2>`의 요소를 제거한 것이에요. 예: `<set_1> - <set_2>`.
- `-`에 해당하는 세트 메서드는 `<set>.difference(<iterable>)`예요.
- `set()` 생성자는 어떤 [반복 가능한][iterable] 객체든 인자로 받을 수 있어요. [개념: 배열](/tracks/python/concepts/lists)은 반복 가능해요.
- [개념: 배열](/tracks/python/concepts/lists) 생성자는 어떤 [반복 가능한][iterable] 객체든 인자로 받을 수 있어요. 세트도 반복 가능해요.

## 7. 한 가지 레시피에만 쓰인 재료 찾기

- 세트 _대칭 차집합_은 `<set_1>`이나 `<set_2>`에는 있지만 **_둘 다_**에는 없는 요소로 이루어져요.
- 세트 _대칭 차집합_은 `set` _합집합_에서 `set` _교집합_을 빼는 것과 같아요. 예: `(<set_1> | <set_2>) - (<set_1> & <set_2>)`.
- `sets`가 세 개 이상일 때의 _대칭 차집합_에는 입력 `sets` 전체에서 두 번 넘게 나타나는 요소가 포함돼요. 이렇게 세트를 넘나들며 반복되는 요소를 없애려면, 세트 쌍 사이의 _교집합_을 대칭 차집합에서 빼야 해요.
- 여러 요리를 순회할 때 [개념: 루프](/tracks/python/concepts/loops)를 사용하면 도움이 될 거예요.


[hashable]: https://docs.python.org/3.7/glossary.html#term-hashable
[iterable]: https://docs.python.org/3/glossary.html#term-iterable
[sets]: https://docs.python.org/3/tutorial/datastructures.html#sets