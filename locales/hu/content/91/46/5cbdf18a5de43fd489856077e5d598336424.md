# Tippek

## Általános

- Lehetséges, de nem kötelező, hogy minden részfeladatot egyetlen utasítással oldj meg a függvény törzsén belül.


## 1. Annak meghatározása, hogy jelen van-e egy kártya

- A kártya [benne van][ref-match] a pakliban?

## 2. Egy kártya pozíciójának megkeresése

- A kártya benne van a pakliban?
- Ha igen, [melyik][ref-which] pozícióban?
- A kártyák garantáltan mind különbözőek, ami egyszerűbbé teszi a feladatot.
- Add vissza a pozíciót vagy a `-1`-et.
  - Nézd meg a [feltételes elágazások fogalmát][concept-conditionals], ahol megtudhatod, hogyan lehet elágazni, ha valami `TRUE` vagy `FALSE`.
  - Ha az [`if_else`][ref-if_else] függvényt használod (a legmodernebb megközelítés, de itt valójában nem kötelező), tartsd szem előtt, hogy szigorúan megköveteli, hogy mindkét ág ugyanolyan típusú eredményt adjon vissza. Lehet, hogy kifejezetten egyetlen elemet kell visszaadnod egy olyan vektor helyett, amely esetleg üres.
  - Egy vektor első elemét úgy kapod meg, hogy minden olyan dolog után beírsz egy `[1]`-et, ami vektort ad vissza.

## 3. Annak meghatározása, hogy minden kártya páros-e

- A maradékos osztás operátora a `%%`.
- Az `x` akkor páros, ha `x %% 2 == 0`.
- Az [összes][ref-all] kártya megfelel ennek a kritériumnak?

## 4. Annak ellenőrzése, hogy a pakliban van-e páratlan értékű kártya

- Egy kártya akkor páratlan, ha nem páros, ezért nézd meg az előző részfeladatot.
- Van [olyan][ref-any] kártya, amely megfelel ennek a kritériumnak?

## 5. Az első páratlan kártya lekérése a pakliból

- Van páratlan kártya a pakliban?
- Ha igen, az első _kártyát_ add vissza (nem a pozíciót).

## 6. Az első páros kártya pozíciójának meghatározása

- Van páros kártya a pakliban?
- Ha igen, az első páros kártya _pozícióját_ add vissza.

[ref-match]: https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/match
[ref-which]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/which
[concept-conditionals]: https://exercism.org/tracks/r/concepts/conditionals
[ref-all]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/all
[ref-any]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/any
[ref-if_else]: https://dplyr.tidyverse.org/reference/if_else.html
