# Instrucciones

Tu nostalgia por las cartas Blorkemon™️ no muestra signos de estar amainando; incluso has vuelto a coleccionarlas y estás consiguiendo que tus amigos se unan a ti.

En este ejercicio usarás la interfaz `Set` para gestionar tu colección, ya que las cartas duplicadas no son importantes cuando tu objetivo es conseguir todas las cartas existentes.

## 1. Empieza una colección

¡Acabas de encontrar tu viejo alijo de cartas Blorkemon™️!
El alijo contiene un montón de cartas duplicadas, así que es hora de empezar una nueva colección eliminando los duplicados.

Quieres de verdad que tus amigos se unan a tu locura por Blorkemon™️, y la mejor manera es poner en marcha su colección regalándoles una carta.

Implementa el método `newCollection`, que transforma un array de cartas en un `Set` que representa tu nueva colección.

```java
GottaSnatchEmAll.newCollection(List.of("Newthree", "Newthree", "Newthree"));
// => {"Newthree"}
```

## 2. Haz crecer la colección

Una vez que tienes una colección, cobra vida propia y debe crecer.

Implementa el método `addCard`, que recibe una carta nueva y tu conjunto actual de cartas coleccionadas.
El método debe añadir la carta nueva a la colección si aún no está presente, y debe devolver un `boolean` que indica si la colección se ha actualizado.

```java
Set<String> collection = GottaSnatchEmAll.newCollection("Newthree");
GottaSnatchEmAll.addCard("Scientuna",collection);
// => true

collection.contains("Scientuna");
// => true
```

## 3. Empieza a intercambiar

Quieres de verdad que tus amigos se unan a tu locura por Blorkemon™️, ¡así que es hora de empezar a intercambiar!

Al intercambiar con amigos, no todos los intercambios merecen la pena, ni siempre se pueden hacer.
Solo deberías intercambiar si tanto tú como tu amigo tenéis una carta que el otro no tiene.

Implementa el método `canTrade`, que recibe tu colección actual y la colección de uno de tus amigos.
Debe devolver un `boolean` que indica si un intercambio es posible, siguiendo las reglas anteriores.

```java
Set<String> myCollection = Set.of("Newthree");
Set<String> theirCollection = Set.of("Scientuna");
GottaSnatchEmAll.canTrade(myCollection, theirCollection);
// => true
```

## 4. Identifica las cartas comunes

Tú y tus amigos aficionados a Blorkemon™️ os reunís y os preguntáis qué cartas son las más comunes.

Implementa el método `commonCards`, que recibe un array de colecciones y devuelve una colección con las cartas que tienen todas las colecciones.

```java
GottaSnatchEmAll.commonCards(List.of(Set.of("Scientuna"), Set.of("Newthree","Scientuna")));
// => {"Scientuna"}
```

## 5. Todas las cartas

¿Tenéis tú y tus amigos, entre todos, todas las cartas de Blorkemon™️?

Implementa el método `allCards`, que recibe un array de colecciones y devuelve una colección con todas las cartas distintas de todas las colecciones combinadas.

```java
GottaSnatchEmAll.allCards(List.of(Set.of("Scientuna"), Set.of("Newthree","Scientuna")));
// => {"Newthree", "Scientuna"}
```
