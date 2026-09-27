# Instruções

A tua nostalgia pelas cartas Blorkemon™️ não dá sinais de abrandar, chegaste mesmo a voltar a colecioná-las e estás a convencer os teus amigos a juntarem-se a ti.

Neste exercício, vais usar a interface `Set` para te ajudar a gerir a tua coleção, já que as cartas duplicadas não são importantes quando o teu objetivo é obter todas as cartas existentes.

## 1. Iniciar uma coleção

Acabaste de encontrar a tua antiga reserva de cartas Blorkemon™️!
A reserva contém imensas cartas duplicadas, por isso está na hora de começares uma nova coleção, removendo as duplicadas.

Queres mesmo que os teus amigos se juntem à tua loucura Blorkemon™️, e a melhor forma é dar o pontapé de saída na coleção deles, dando-lhes uma carta.

Implementa o método `newCollection`, que transforma uma lista de cartas num `Set` que representa a tua nova coleção.

```java
GottaSnatchEmAll.newCollection(List.of("Newthree", "Newthree", "Newthree"));
// => {"Newthree"}
```

## 2. Aumentar a coleção

Assim que tens uma coleção, ela ganha vida própria e tem de crescer.

Implementa o método `addCard`, que recebe uma nova carta e o teu conjunto atual de cartas colecionadas.
O método deve adicionar a nova carta à coleção se esta ainda não estiver presente e deve devolver um `boolean` que indica se a coleção foi atualizada.

```java
Set<String> collection = GottaSnatchEmAll.newCollection("Newthree");
GottaSnatchEmAll.addCard("Scientuna",collection);
// => true

collection.contains("Scientuna");
// => true
```

## 3. Começar a trocar

Queres mesmo que os teus amigos se juntem à tua loucura Blorkemon™️, por isso está na hora de começar a trocar!

Quando trocas com amigos, nem todas as trocas valem a pena, nem sequer são possíveis.
Só deves trocar se tanto tu como o teu amigo tiverem uma carta que o outro não tem.

Implementa o método `canTrade`, que recebe a tua coleção atual e a coleção de um dos teus amigos.
Deve devolver um `boolean` que indica se é possível fazer uma troca, seguindo as regras acima.

```java
Set<String> myCollection = Set.of("Newthree");
Set<String> theirCollection = Set.of("Scientuna");
GottaSnatchEmAll.canTrade(myCollection, theirCollection);
// => true
```

## 4. Identificar cartas comuns

Tu e os teus amigos entusiastas de Blorkemon™️ reúnem-se e interrogam-se sobre quais são as cartas mais comuns.

Implementa o método `commonCards`, que recebe uma lista de coleções e devolve uma coleção das cartas que todas as coleções têm.

```java
GottaSnatchEmAll.commonCards(List.of(Set.of("Scientuna"), Set.of("Newthree","Scientuna")));
// => {"Scientuna"}
```

## 5. Todas as cartas

Será que tu e os teus amigos têm, no conjunto, todas as cartas Blorkemon™️?

Implementa o método `allCards`, que recebe uma lista de coleções e devolve uma coleção com todas as cartas diferentes de todas as coleções combinadas.

```java
GottaSnatchEmAll.allCards(List.of(Set.of("Scientuna"), Set.of("Newthree","Scientuna")));
// => {"Newthree", "Scientuna"}
```
