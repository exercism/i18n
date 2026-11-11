# Tippek

## Általános

- Itt hasznosak lehetnek a korábbi [struct][structs], [map][maps] és [metódus][methods] fogalmak.


## 1. Részvevők nyomon követése

- A [típusdefiníció][type definition] fogalom elmagyarázza, hogyan definiálhatsz új típust.
- A `make()` segítségével hozz létre egy új `map` példányt.
- Ha új értékkel szeretnéd bővíteni a map tartalmát, a `struct{}{}` segítségével hozz létre egy példányt az üres `struct{}` típusból.

## 2. Részvevők ellenőrzése

- Ha egy elem szerepel a map elemei között, akkor a halmaz tartalmazza azt az értéket.
- A [két érték hozzárendelése][two value assignment] segítségével ellenőrizheted, hogy egy map tartalmaz-e egy elemet.

## 3. Részvevők összehasonlítása

- Két halmaz akkor ugyanaz, ha mindkét halmaz minden értéke benne van a másikban is.
- A `range` segítségével ellenőrizheted a halmaz összes elemét.

[maps]: https://exercism.org/tracks/go/concepts/maps
[methods]: https://exercism.org/tracks/go/concepts/methods
[structs]: https://exercism.org/tracks/go/concepts/structs
[two value assignment]: https://go.dev/tour/moretypes/22
[type definition]: https://exercism.org/tracks/go/concepts/type-definitions
