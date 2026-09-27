# 지침

Blorkemon™️ 카드에 대한 향수가 좀처럼 사그라들지 않네요. 심지어 다시 카드를 모으기 시작했고, 친구들까지 함께하게 만들고 있어요.

이 연습 문제에서는 컬렉션을 관리하는 데 `Set` 인터페이스를 사용해요. 목표가 존재하는 모든 카드를 모으는 것이니 중복 카드는 중요하지 않거든요.

## 1. 컬렉션 시작하기

예전에 모아두었던 Blorkemon™️ 카드 더미를 방금 발견했어요!
그 더미에는 중복 카드가 잔뜩 들어 있으니, 중복을 제거해서 새 컬렉션을 시작할 때예요.

친구들도 Blorkemon™️ 열풍에 함께하길 바라죠. 가장 좋은 방법은 카드 한 장을 선물해서 친구의 컬렉션을 시작해 주는 거예요.

카드 목록을 새 컬렉션을 나타내는 `Set`으로 변환하는 `newCollection` 메서드를 구현해요.

```java
GottaSnatchEmAll.newCollection(List.of("Newthree", "Newthree", "Newthree"));
// => {"Newthree"}
```

## 2. 컬렉션 키우기

컬렉션은 일단 생기면 스스로의 삶을 살아가며 계속 자라나요.

새 카드와 현재 모아둔 카드 집합을 받는 `addCard` 메서드를 구현해요.
이 메서드는 새 카드가 아직 컬렉션에 없다면 컬렉션에 추가하고, 컬렉션이 갱신되었는지를 나타내는 `boolean`을 반환해야 해요.

```java
Set<String> collection = GottaSnatchEmAll.newCollection("Newthree");
GottaSnatchEmAll.addCard("Scientuna",collection);
// => true

collection.contains("Scientuna");
// => true
```

## 3. 교환 시작하기

친구들도 Blorkemon™️ 열풍에 함께하길 바라니, 이제 교환을 시작할 때예요!

친구와 교환할 때 모든 교환이 가치가 있는 것도, 가능한 것도 아니에요.
나와 친구 모두 서로가 가지고 있지 않은 카드를 하나씩 가지고 있을 때만 교환해야 해요.

현재 컬렉션과 친구 한 명의 컬렉션을 받는 `canTrade` 메서드를 구현해요.
이 메서드는 위 규칙에 따라 교환이 가능한지를 나타내는 `boolean`을 반환해야 해요.

```java
Set<String> myCollection = Set.of("Newthree");
Set<String> theirCollection = Set.of("Scientuna");
GottaSnatchEmAll.canTrade(myCollection, theirCollection);
// => true
```

## 4. 공통 카드 찾기

Blorkemon™️에 열광하는 친구들과 모여서 어떤 카드가 가장 흔한지 궁금해해요.

컬렉션 목록을 받아서 모든 컬렉션이 가지고 있는 카드들의 컬렉션을 반환하는 `commonCards` 메서드를 구현해요.

```java
GottaSnatchEmAll.commonCards(List.of(Set.of("Scientuna"), Set.of("Newthree","Scientuna")));
// => {"Scientuna"}
```

## 5. 모든 카드

나와 친구들이 힘을 합치면 모든 Blorkemon™️ 카드를 가지고 있을까요?

컬렉션 목록을 받아서 모든 컬렉션을 합쳤을 때 나오는 서로 다른 모든 카드의 컬렉션을 반환하는 `allCards` 메서드를 구현해요.

```java
GottaSnatchEmAll.allCards(List.of(Set.of("Scientuna"), Set.of("Newthree","Scientuna")));
// => {"Newthree", "Scientuna"}
```
