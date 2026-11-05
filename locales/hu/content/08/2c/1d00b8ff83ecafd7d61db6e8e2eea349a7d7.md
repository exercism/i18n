# Utasítások

A barátod épp most küldött neked egy üzenetet egy fontos titokkal. Mivel nem akarta, hogy mások könnyen elolvashassák, az üzenetet bitműveletek sorozatával titkosította. Neked kell megírnod a függvényeket, amelyek segítenek visszafejteni az üzenetet.

## 1. Told vissza a biteket

A visszafejtés első lépése, hogy a titkosítás során végrehajtott eltolást visszafordítsd: a biteket visszatolod jobbra. A visszafejtés további lépései abból indulnak ki, hogy bal oldalról 0-k kerülnek be.

Implementáld a `shiftBack` függvényt, amely egy értéket és az eltolás helyeinek számát kapja, és végrehajtja az eltolást.

```kotlin
shiftBack(0b1001, 2)
# => 0b0010
```

## 2. Állíts be néhány bitet

Ezután van néhány bit, amit 1-re kell állítani.

Implementáld a `setBits` függvényt, amely egy értéket és egy maszkot kap, és visszaadja az eredményét annak, hogy az érték bitjeit 1-re állítja. Az érték egy bitjét ott kell 1-re állítani, ahol a maszkban lévő bit szintén 1. Minden más bit változatlan marad.

```kotlin
setBits(0b0110, 0b0101);
# => 0b0111
```

## 3. Fordíts meg adott biteket

A titkosítás során néhány bit megfordul. Ezeket vissza kell fordítani az üzenet visszafejtéséhez.

Implementáld a `flipBits` függvényt, amely egy értéket és a maszkot kapja. A maszk megmondja, hogy az érték mely bitjeit kell megfordítani. Ha a maszkban egy bit 1, akkor az értékben megfordul az a bit. Minden más bit változatlan marad.

```java
flipBits(0b1100, 0b0101);
# => 0b1001
```

## 4. Nullázd ki az adott biteket

Végül vannak olyan bitek is, amelyek visszafejtés után mindig 0-t adnak.

Implementáld a `clearBits` függvényt, amely egy értéket és egy maszkot kap. A `value` bitjeit ott kell 0-ra állítani, ahol a maszkban lévő bit 1. Minden más bit változatlan marad.

```java
clearBits(0b0110, 0b0101);
# => 0b0010
```
