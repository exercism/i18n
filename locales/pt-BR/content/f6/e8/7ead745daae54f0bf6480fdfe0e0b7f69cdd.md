# Instruções

Sua nostalgia por cartas Blorkemon™️ não dá sinais de desacelerar: você até voltou a colecioná-las e está chamando seus amigos para entrar nessa também.

Neste exercício, você vai usar a interface `Set` para ajudar a gerenciar sua coleção, já que cartas duplicadas não importam quando o objetivo é conseguir todas as cartas existentes.

## 1. Comece uma coleção

Você acabou de encontrar seu velho estoque de cartas Blorkemon™️!
O estoque tem um monte de cartas duplicadas, então é hora de começar uma nova coleção removendo as duplicatas.

Você quer muito que seus amigos entrem na sua loucura por Blorkemon™️, e a melhor forma é dar o pontapé inicial na coleção deles dando uma carta a cada um.

Implemente o método `newCollection`, que transforma uma lista de cartas em um `Set` que representa sua nova coleção.

```java
GottaSnatchEmAll.newCollection(List.of("Newthree", "Newthree", "Newthree"));
// => {"Newthree"}
```

## 2. Aumente a coleção

Depois que você tem uma coleção, ela ganha vida própria e precisa crescer.

Implemente o método `addCard`, que recebe uma nova carta e seu conjunto atual de cartas colecionadas.
O método deve adicionar a nova carta à coleção caso ela ainda não esteja lá e deve retornar um `boolean`
indicando se a coleção foi atualizada.

```java
Set<String> collection = GottaSnatchEmAll.newCollection("Newthree");
GottaSnatchEmAll.addCard("Scientuna",collection);
// => true

collection.contains("Scientuna");
// => true
```

## 3. Comece a trocar

Você quer muito que seus amigos entrem na sua loucura por Blorkemon™️, então é hora de começar a trocar!

Ao trocar com amigos, nem toda troca vale a pena, ou pode ser feita.
Você só deve trocar se tanto você quanto seu amigo tiverem uma carta que o outro não tem.

Implemente o método `canTrade`, que recebe sua coleção atual e a coleção de um dos seus amigos.
Ele deve retornar um `boolean` indicando se uma troca é possível, seguindo as regras acima.

```java
Set<String> myCollection = Set.of("Newthree");
Set<String> theirCollection = Set.of("Scientuna");
GottaSnatchEmAll.canTrade(myCollection, theirCollection);
// => true
```

## 4. Identifique cartas em comum

Você e seus amigos entusiastas de Blorkemon™️ se reúnem e se perguntam quais cartas são as mais comuns.

Implemente o método `commonCards`, que recebe uma lista de coleções e retorna uma coleção de cartas que todas as coleções
possuem.

```java
GottaSnatchEmAll.commonCards(List.of(Set.of("Scientuna"), Set.of("Newthree","Scientuna")));
// => {"Scientuna"}
```

## 5. Todas as cartas

Você e seus amigos, juntos, possuem todas as cartas Blorkemon™️?

Implemente o método `allCards`, que recebe uma lista de coleções e retorna uma coleção com todas as cartas diferentes de
todas as coleções combinadas.

```java
GottaSnatchEmAll.allCards(List.of(Set.of("Scientuna"), Set.of("Newthree","Scientuna")));
// => {"Newthree", "Scientuna"}
```
