# Bemutatás

A bináris számjegyek végső soron közvetlenül megfelelnek a CPU-d vagy a RAM-od tranzisztorainak, illetve annak, hogy mindegyik „be” vagy „ki” állapotban van-e.

Az alacsony szintű manipuláció, amit köznapi nevén „bit-twiddling”-nek hívnak, különösen fontos a rendszerprogramozási nyelvekben.

A Juliahoz hasonló magas szintű nyelvek általában elfedik e részletek nagy részét.
A nyelv alapszintjén viszont a bitszintű műveletek teljes készlete [elérhető][bitwise].

***Megjegyzés:*** Ahhoz, hogy a REPL-ben ember által olvasható bináris kimenetet láss, az alábbi példák szinte mindegyikét be kell csomagolnod egy [`bitstring()`][bitstring] függvénybe.
Ez vizuálisan zavaró, ezért a legtöbb helyen kihagytuk ezt a függvényt.

## Biteltolási műveletek

Az egésztípusok, akár előjelesek, akár előjel nélküliek, 1-esekből és 0-sokból álló stringként ábrázolhatók.

```julia-repl
julia> bitstring(UInt8(5))
"00000101"
```

A biteltolás egyszerűen mindent balra vagy jobbra mozgat egy megadott számú pozícióval.
`UInt` típusoknál néhány bit leesik az egyik végén, a másik végét pedig nullákkal töltjük fel:

```julia-repl
julia> ux::UInt8 = 5
5

julia> bitstring(ux)
"00000101"

julia> ux << 2 # left by 2
"00010100"

julia> ux >> 1 # right by 1
"00000010"
```

Minden balra tolás megduplázza az értéket, minden jobbra tolás pedig felezi (a csonkítástól függően).
Ez a tízes számrendszerbeli alakban szembetűnőbb:

```julia-repl
julia> 3 << 2
12

julia> 24 >> 3
3
```

Az ilyen biteltolás sokkal gyorsabb, mint a „rendes” aritmetika, ezért ez a technika nagyon népszerű az alacsony szintű programozásban.

Az előjeles egészeknél egy kicsit óvatosabbnak kell lennünk.

A balra tolás viszonylag egyszerű:

```julia-repl
julia> sx = Int8(5)
5

julia> sx # positive integer
"00000101"

julia> sx << 2
"00010100"

julia> -sx # negative integer
"11111011"

julia> -sx << 2
"11101100"
```

A pozitív előjeles egészek balra tolása így ugyanaz, mint az előjel nélküli egészeknél.

A negatív értékek [kettes komplemens][2complement] formájában tárolódnak, ami azt jelenti, hogy a legbaloldalibb bit 1.
Balra tolásnál ez nem gond, de jobbra tolásnál hogyan töltjük fel a bal oldali biteket?

```julia-repl
julia> sx >> 2 # simple for positive values!
"00000001"

julia> -sx # negative integer
"11111011"

julia> -sx >> 2 # pad with repeated sign bit
"11111110"

julia> -sx >>> 2 # pad with 0
"00111110"
```

A `>>` operátor [aritmetikai eltolást][arithmetic] hajt végre, és megőrzi az előjelbitet.

A `>>>` operátor [logikai eltolást][logical] hajt végre, nullákkal feltöltve, mintha a szám előjel nélküli lenne.

Ha ez még mindig kevésnek tűnik, van egy [`bitrotate()`][bitrotate] függvény is.

## Bitenkénti logika

Egy korábbi fogalomban már láttuk, hogy a `&&` (and), `||` (or) és `!` (not) operátorokat Boolean-értékekkel használjuk.

Két egész bitjeinek összehasonlítására ugyanilyen operátorok vannak: `&` (bitenkénti and), `|` (bitenkénti or) és `~` (tilde, bitenkénti not).

```julia-repl
julia> 0b1011 & 0b0010 # bit is 1 in both numbers
"00000010"

julia> 0b1011 | 0b0010 # bit is 1 in at least one number
"00001011"

julia> ~0b1011 # flip all bits
"11110100"

julia> xor(0b1011, 0b0010) # bit is 1 in exactly one number, not both
"00001001"
```

Itt az `xor()` a [kizáró vagy][xor], függvény formájában (lásd alább az alternatív jelölést).

Mellesleg a `&` és `|` operátorok Boolean-értékekkel is használhatók.
A `&&` és `||` operátorokkal ellentétben ilyenkor a kifejezés minden része kiértékelődik, rövidzárlatos kiértékelés nincs.


## Egyéb szimbólumok

A Julia imádja a matematikát, a matematikusok pedig a rejtélyes szimbólumokat, így aztán van még több szimbólum, amivel játszhatunk.

```julia-repl
julia> 0b1011 ⊻ 0b0010 # xor() in infix notation
"00001001"

julia> 0b1011 ⊼ 0b0010 # not and
"11111101"

julia> 0b1011 ⊽ 0b0010 # not or
"11110100"
```

A Juliát ismerő szerkesztőkben ezeket `\xor`, `\nand` és `\nor` formában lehet beírni, mindegyik esetben egy tabulátorral a végén.

Ezek a szimbólumok nem igazán ismertek, még azok körében sem, akik egyetemen tanultak matematikát (e fogalom szerzője korábban soha nem látta őket).
Ha használni akarod őket, légy óvatos, kit kérsz meg, hogy átnézze a kódodat!


[bitwise]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
[bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
[xor]: https://en.wikipedia.org/wiki/Exclusive_or
[2complement]: https://en.wikipedia.org/wiki/Two%27s_complement
[arithmetic]: https://en.wikipedia.org/wiki/Arithmetic_shift
[logical]: https://en.wikipedia.org/wiki/Logical_shift
[bitrotate]: https://docs.julialang.org/en/v1/base/math/#Base.bitrotate
