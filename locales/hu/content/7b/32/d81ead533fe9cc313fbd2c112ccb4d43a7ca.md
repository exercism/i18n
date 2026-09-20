# A versklub ajtószabályzata

## Történet

A városban új versklub nyílt, és épp azon gondolkodsz, hogy elmész oda. Mivel a múltban
voltak már incidensek, a klubnak nagyon konkrét ajtószabályzata van, amelyet el kell
sajátítanod, mielőtt megpróbálsz bejutni.

A versklubban két ajtó van, és mindkettőt őrzik. A belépéshez ki kell találnod az aznapi
jelszót:

### Elülső ajtó

1. Az őr felmond egy verset, egyszerre egy sort;
   - A megfelelő betűvel kell válaszolnod.
2. Az őr egyszerre megmondja az összes betűt, amivel válaszoltál;
   - A betűket nagy kezdőbetűs szóvá kell alakítanod.

Például egyik kedvenc írójuk Michael Lockwood, aki a következő _akrosztichon_ verset írta;
ez azt jelenti, hogy minden mondat első betűje egy szót alkot:

```text
Stands so high
Huge hooves too
Impatiently waits for
Reins and harness
Eager to leave
```

Amikor az őr a **Stands so high** sort mondja, **S**-sel válaszolsz, amikor pedig a
**Huge hooves too** sort, **H**-val.

Végül a jelszó, amit leírsz, a `Shire`, és bejutsz.

### Hátsó ajtó

A klub hátuljában találod a legnevesebb költőket, ez olyan, mint a VIP-részleg. Mivel ez
nem mindenkinek jár, a hátsó ajtós folyamat kicsit bonyolultabb.

1. Az őr felmond egy verset, egyszerre egy sort;
   - A megfelelő betűvel kell válaszolnod.
2. Az őr egyszerre megmondja az összes betűt, amivel válaszoltál, _de néha szóközök vannak
   az egyes mondatok után_:
   - A betűket nagy kezdőbetűs szóvá kell alakítanod
   - és illedelmesen meg kell kérned, úgy, hogy a végére fűzöd: `, please`

Például a korábban említett vers egyben _telestichon_ is, ami azt jelenti, hogy minden
mondat utolsó betűje egy szót alkot:

```text
Stands so high
Huge hooves too
Impatiently waits for
Reins and harness
Eager to leave
```

Amikor az őr a **Stands so high** sort mondja, **h**-val válaszolsz, amikor pedig a
**Huge hooves too** sort, **o**-val.

Végül a jelszó, amit leírsz, a `Horse, please`, és együtt bulizhatsz a neves költőkkel.

## Implementációk

- [JavaScript: strings][implementation-javascript] (referenciamegvalósítás)
- [Swift: string-components][implementation-swift]

## Referencia

- [`types/string`][types-string]

[types-string]: https://github.com/exercism/v3/blob/main/reference/types/string.md
[implementation-javascript]: https://github.com/exercism/javascript/blob/main/exercises/concept/strings/.docs/instructions.md
[implementation-swift]: https://github.com/exercism/swift/blob/main/exercises/concept/poetry-club/.docs/instructions.md
