# Bevezetés

A „statisztika” nagy és összetett témakör, amelynek sokféle oldala van.

Néhány szempontját már érintettük a [`Randomness`][randomness] fogalomban, amely különálló, de kapcsolódó témakör.

A legegyszerűbb formájában a statisztika olyan módszereket jelent, amelyekkel egy iterálható adathalmazt egyetlen értékben foglalhatunk össze.
Aki most ismerkedik a Juliával, meglepődhet azon, hogy milyen kevés függvény van alapból beépítve a nyelvbe:

- [`sum`][sum], a számok összeadásához.
- [`min`][min] és [`max`][max], a megadott paraméterek szélsőértékeinek meghatározásához.
- [`extrema`][extrema], egy iterálható objektum (min, max) tuple-jének megadásához.
- [`length`][length], az összes érték megszámolásához.
- [`count`][count], csak a valamilyen feltételnek megfelelő értékek megszámolásához.

```julia-repl
julia> v = collect(1:0.2:3)
11-element Vector{Float64}:
 1.0
 1.2
 ... # display truncated
 3.0

julia> mean(v)
2.0

julia> extrema(v)
(1.0, 3.0)

julia> length(v)
11

julia> min('g', 'a', 'c')
'a': ASCII/Unicode U+0061 (category Ll: Letter, lowercase)

julia> count(isodd, 1:5)  # 1, 3, and 5 are odd
3
```

Ez a korlátozott függvénykészlet szándékos döntés, amelynek célja, hogy a base Julia ne duzzadjon fel: a többi függvényt további modulok és csomagok egész sorába helyezték át.

## A `Statistics` modul

A [`Statistics`][statistics] a standard könyvtár része, így valószínűleg előre telepítve van; ahhoz, hogy bekerüljön a névtérbe, csak a `using Statistics` sort kell a program elejére beírni.

Ez a modul a gyakori függvények következő szintjét tartalmazza, amelyeket valószínűleg a programozók egy szűkebb csoportja használ széles körben.

A `Statistics` számos függvénye feltételez némi háttértudást a témáról.
A legegyszerűbb példák:

- [`mean`][mean], amit sokan átlagnak neveznek (ugyanaz az eredmény, mint a `sum / length` esetén).
- [`median`][median], a rendezés utáni középső érték.
- [`std`][std], [szórás][stddev]: annak mértéke, hogy mennyire szóródnak az értékek.
- [`var`][var], variancia: a `std` négyzete, amelyet általában gyorsabb kiszámítani.

Mindegyik függvénynek általában többféle beállítási lehetősége van, és _sokkal_ több függvény létezik, ezért ha érdekel, nézd meg a [dokumentációt][statistics].

## További csomagok

Ahogy sejthető, a statisztika a Julia egyik nagy felhasználási területe, és sok elérhető csomag támogatja a speciálisabb munkát.

A JuliaStats csoport hasznos [online listát][juliastats] tart fenn.

[statistics]: https://docs.julialang.org/en/v1/stdlib/Statistics/
[randomness]: https://exercism.org/tracks/julia/concepts/randomness
[sum]: https://docs.julialang.org/en/v1/base/collections/#Base.sum
[min]: https://docs.julialang.org/en/v1/base/math/#Base.min
[max]: https://docs.julialang.org/en/v1/base/math/#Base.max
[extrema]: https://docs.julialang.org/en/v1/base/collections/#Base.extrema
[length]: https://docs.julialang.org/en/v1/base/collections/#Base.length
[count]: https://docs.julialang.org/en/v1/base/collections/#Base.count
[mean]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.mean
[median]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.median
[std]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.std
[var]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.var
[stddev]: https://en.wikipedia.org/wiki/Standard_deviation
[juliastats]: https://juliapackages.com/u/juliastats
