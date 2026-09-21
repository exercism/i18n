# Utasítások

A DNS-kutatólaborodban már többféle módszert is kipróbáltál, hogy tömörítsd a kutatási adataidat és tárolóhelyet spórolj. Az egyik kollégád azt javasolja, hogy alakítsd át a DNS-adatokat bináris reprezentációvá:

| Nukleinsav | Kód   |
| ---------- | ----- |
| Adenine    | `00`  |
| Cytosine   | `01`  |
| Guanine    | `10`  |
| Thymine    | `11`  |

Elgondolkodsz rajta, hiszen ez csökkentheti a szükséges adattárolási költségeket, igaz, az emberi olvashatóság rovására. Úgy döntesz, hogy írsz egy modult az adataid kódolásához és dekódolásához, hogy felmérd a megtakarítást.

## 1. Nukleinsav kódolása bináris értékké

Valósítsd meg az `encode_nucleotide` függvényt, amely átvesz egy nukleotidot, és visszaadja a kódolt kód int értékét.

```gleam
encode_nucleotide(Cytosine)
// -> 1
// (which is equal to 0b01)
```

## 2. A bináris érték dekódolása nukleinsavvá

Valósítsd meg a `decode_nucleotide` függvényt, amely átveszi a kódolt kód egész értékét, és visszaadja a nukleotidot.

```gleam
decode_nucleotide(0b01)
// -> Ok(Cytosine)
```

## 3. DNS-lista kódolása

Valósítsd meg az `encode` függvényt, amely átvesz egy nukleotidlistát, és visszaad egy bittömböt a kódolt adatokból.

```gleam
encode([Adenine, Cytosine, Guanine, Thymine])
// -> <<27>>
```

## 4. DNS-bittömb dekódolása

Valósítsd meg a `decode` függvényt, amely átvesz egy nukleinsavat reprezentáló bittömböt, és nukleotidok listájaként visszaadja a dekódolt adatokat.

```gleam
decode(<<27>>)
// -> Ok([Adenine, Cytosine, Guanine, Thymine])
```
