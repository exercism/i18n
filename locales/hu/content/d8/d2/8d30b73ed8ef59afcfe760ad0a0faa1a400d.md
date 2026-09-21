# Tippek

## 1. A robot tájolása
- Fontos, hogy milyen sorrendben hajtod végre a műveleteket.
- Többféleképpen is átalakíthatsz egy vektorokból álló vektort mátrixszá.
- Néhány ötlet, ami segíthet a mátrix létrehozásában: comprehensionok, for-ciklusok, [`hcat`][hcat-ref], [`reshape`][reshape-ref], [`stack`][stack-ref], stb...

## 2. A robot forgatása
- A mátrix forgatásáról a Bevezetésben olvashatsz.
- Ehhez nem kell más, mint egy egyszerű mátrixszorzás.

## 3. A helyes tájolás ellenőrzése
- Ne feledd, a mátrix *második* oszlopa mutatja a tájolást.
- Ezt skaláris szorzattal ellenőrizheted.
- Hasznos lehet, ha normalizálod a vektorokat.
- Ha a lebegőpontos értékek eltérnek, elég, ha a tájolás [körülbelül][isapprox-ref] egyenlő, nagyjából `~1e-7` pontossággal.
- A következő azonosság hasznos lehet: `x⋅y = ||x||*||y||cos(θ)`, ahol [`||x|| = norm(x)`][norm-ref]

## 4. A robot testkoordinátái
- Ez nagyon egyszerű, de az elemenkénti műveletek fontosak.
- Ne feledd, a tájolási mátrix az origóból induló három helyzetvektorként is felfogható.

[hcat-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.hcat
[reshape-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.reshape
[stack-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.stack
[isapprox-ref]: https://docs.julialang.org/en/v1/base/math/#Base.isapprox
[norm-ref]: https://docs.julialang.org/en/v1/stdlib/LinearAlgebra/#LinearAlgebra.norm
