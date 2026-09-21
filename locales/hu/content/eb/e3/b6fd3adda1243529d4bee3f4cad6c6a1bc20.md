# Tippek

## Általános

- A feladat minden része bitműveletekre támaszkodik.
  - Az Exercism [tanulási tanterve][concept-bitwise-operations] szelíd bevezetést nyújt.
  - A [bitműveletek][ref-bitwise-operators] fel vannak sorolva a Julia kézikönyvében.
  - A `Base` számos hasznos, bitekkel kapcsolatos függvényt tartalmaz, köztük a [count_ones()][count_ones] és a [trailing_zeros()][trailing_zeros] függvényt.
- A tesztek igyekeznek nem előíróak lenni a típusokkal kapcsolatban, de a feladat az előjel nélküli bájtokról szól, és a [`UInt8`][uint8] értékekről viszonylag könnyű okoskodni.
  - Az argumentumok és a visszatérési értékek `Vector{UInt8}` típusúak,
  - A `UInt8` értékek hasznosak bitmaszkokhoz és köztes értékekhez.
- A tízes számok csak elterelnék a figyelmet, ezért a `UInt8` literáloknál a hexadecimális (`0xFF`) vagy a bináris (`0b11111111`) formát részesítsd előnyben.
  - A [`bitstring()`][bitstring] függvény hasznos lehet a hibakeresésnél, mert ember által olvasható bináris formátumot ad ki.
- A nyers üzenet 8 bites darabok vektoraként érkezik, és 7 bites darabokká kell alakítani úgy, hogy a felső bitekbe kerüljenek, a legkisebb helyiértékű bit pedig paritásbit legyen.
  - A `&` vagy `|` operátorral készített bitmaszkokkal különítsd el a kívánt biteket.
  - A balra toló (`<<`) és a logikai jobbra toló (`>>>`) operátorok fontosak.
  - Tervezz meg egy módot arra, hogy a felesleges biteket átvidd a feldolgozás következő körébe.
  - Az átvitel miatt nehéz a bemeneti bájtokat egymástól függetlenül kezelni, ezért a ciklus (vagy esetleg a rekurzió) valószínűleg könnyebb, mint a magasabb rendű függvények használata.
  - A kódolt üzenetek jellemzően hosszabbak (több bájtból állnak), mint a nyers üzenet, mert bájtonként egy paritásbitet kell elhelyezni.


  [concept-bitwise-operations]: https://exercism.org/tracks/julia/concepts/bitwise-operations
  [ref-bitwise-operators]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
  [count_ones]: https://docs.julialang.org/en/v1/base/numbers/#Base.count_ones
  [trailing_zeros]: https://docs.julialang.org/en/v1/base/numbers/#Base.trailing_zeros
  [uint8]: https://docs.julialang.org/en/v1/base/numbers/#Core.UInt8
  [bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
