# Bevezetés

A `Complex numbers` nem bonyolult.
Csak egy kevésbé ijesztő névre lenne szükségük.

Annyira hasznosak, különösen a mérnöki tudományokban és a természettudományokban, hogy a Julia a komplex számokat ugyanúgy szabványos numerikus típusként kezeli, mint az egészeket és a lebegőpontos számokat.

## Alapok

Egy `complex` érték a Juliában lényegében két szám párja: általában, de nem mindig lebegőpontos.
Ezeket „valós” és „képzetes” résznek hívják, sajnálatos történelmi okokból.
Ismét csak: a legjobb a mögöttes egyszerűségre összpontosítani, nem a furcsa nevekre.

Ha két valós számból akarsz komplex számot létrehozni, csak fűzd az `im` utótagot a képzetes részhez.

```julia-repl
julia> z = 1.2 + 3.4im
1.2 + 3.4im

julia> typeof(z)
ComplexF64 (alias for Complex{Float64})

julia> zi = 1 + 2im
1 + 2im

julia> typeof(zi)
Complex{Int64}
```

Így többféle `Complex` típus létezik, amelyek a megfelelő egész vagy lebegőpontos típusból származnak.

Ha valós változókból akarsz komplex számot létrehozni, a fenti szintaxis nem működik.
Az `a + bim` írásmód összezavarja az értelmezőt: azt hiszi, hogy a `bim` egy (nem létező) változónév.

A `b*im` is lehetséges, de az ajánlott módszer a `complex()` függvény, amely megkerüli a szorzás és összeadás műveletét.

```julia-repl
julia> a = 1.2; b = 3.4; complex(a, b)
1.2 + 3.4im
```

Egy komplex szám részeit külön is elérheted:

```julia-repl
julia> z = 1.2 + 3.4im
1.2 + 3.4im

julia> real(z)
1.2

julia> imag(z)
3.4
```

Vagy együtt:

```julia-repl
julia> reim(z)
(1.2, 3.4)
```

Bármelyik rész lehet nulla, és a matematikusok ilyenkor „tisztán valós” vagy „tisztán képzetes” számról beszélnek.
A Juliában azonban ez akkor is komplex szám marad.

```julia-repl
julia> zr = 1.2 + 0im
1.2 + 0.0im

julia> typeof(zr)
ComplexF64 (alias for Complex{Float64})

julia> zi = 3.4im
0.0 + 3.4im

julia> typeof(zi)
ComplexF64 (alias for Complex{Float64})
```

Talán hallottad már, hogy „az `i` (vagy `j`) a -1 négyzetgyöke”.

Egyelőre ez csak annyit jelent, hogy a képzetes rész _definíció szerint_ kielégíti a következő egyenlőséget:

```julia-repl
julia> 1im * 1im == -1
true
```

Ez egy egyszerű gondolat, de érdekes következményekkel jár.

## Aritmetika

A lebegőpontos és egész számoknál használt szabványos matematikai `operators` és elemi függvények mind működnek komplex számokkal is. Íme egy kis minta:

```julia-repl
julia> z1 = 1.5 + 2im
1.5 + 2.0im

julia> z2 = 2 + 1.5im
2.0 + 1.5im

julia> z1 + z2  # addition
3.5 + 3.5im

julia> z1 * z2  # multiplication
0.0 + 6.25im

julia> z1 / z2  # division
0.96 + 0.28im

julia> z1^2  # exponentiation
-1.75 + 6.0im

julia> 2^z1  # another exponentiation
0.5188946835878313 + 2.7804223253571183im
```

## Függvények

A `real()` és `imag()` mellett több olyan függvény is van, amely különösen fontos a komplex számok szempontjából.

- A `conj()` egyszerűen megfordítja egy komplex szám képzetes részének előjelét (_+ -ból - lesz, vagy fordítva_).
    - A komplex szorzás működése miatt ez hasznosabb, mint gondolnád.
- Az `abs(<complex number>)` garantáltan olyan valós számot ad vissza, amelynek nincs képzetes része.
- Az `abs2(<complex number>)` az `abs(<complex number>)` négyzetét adja vissza: gyorsabb kiszámolni, mint az `abs()`-t, és a számításokhoz gyakran épp erre van szükség.
- Az `angle(<complex number>)` a fázisszöget adja vissza radiánban.

```julia-repl
julia> z1
1.5 + 2.0im

julia> conj(z1)
1.5 - 2.0im

julia> abs(z1)
2.5

julia> abs2(z1)
6.25

julia> angle(z1)
0.9272952180016122
```
Részleges magyarázat a matematika iránt érdeklődőknek:

- A `z1` `(real, imag)` reprezentációja lényegében derékszögű koordinátákat használ a komplex síkon.
- Ugyanaz a komplex szám `(r, θ)` jelöléssel is ábrázolható, polárkoordinátákkal.
- Itt `r`-et és `θ`-t rendre az `abs(z1)` és az `angle(z1)` adja.

Íme egy példa néhány konstans használatával:

```julia-repl
julia> euler = exp(1im * π)
-1.0 + 1.2246467991473532e-16im

julia> real(euler)
-1.0

julia> round(imag(euler), digits=15)  # round to 15 decimal places
0.0
```

A poláris `(r, θ)` jelölés annyira hasznos, hogy vannak beépített függvények is: a `cis` (a `cos(x) + isin(x)` rövidítése) és a `cispi` (a `cos(πx) + isin(πx)` rövidítése), amelyek segítenek hatékonyabban felépíteni.

A poláris jelölés hasznossága Euler elegáns képletében mutatkozik meg: `ℯ^(iθ) = cos(θ) + isin(θ) = x + iy`, ahol `|x + iy| = 1`.
Ha `|x + iy| = r`, akkor megkapjuk az általánosabb poláris alakot: `r * ℯ^(iθ) = r * (cos(θ) + isin(θ)) = x + iy`.
Vedd észre, hogy különösen az exponenciális alak tömör és könnyen kezelhető.

```julia-repl
julia> exp(1im * π) ≈ cis(π) ≈ cispi(1)
true
```

A fenti közelítő egyenlőség azért van, mert a `cis` és `cispi` függvények szebb numerikus eredményt adhatnak, a `cispi` pedig különösen akkor, ha az argumentuma a π tetszőleges többszöröse (pl. radiánban!).

```julia-repl
julia> cis(π)
-1.0 + 0.0im

julia> cispi(1)
-1.0 + 0.0im

julia> θ = π/2;
julia> exp(im*θ)
6.123233995736766e-17 + 1.0im

julia> cis(θ)
6.123233995736766e-17 + 1.0im

julia> cispi(θ / π)  # θ/π == 1/2
0.0 + 1.0im
```

Mindez egyébként nagyon hasznossá teszi a komplex számokat a 2D-s forgatásokhoz és radiális eltolásokhoz.

Forgatáshoz a `z = x + iy` komplex számot egy egyszerű szorzással elforgathatod a `θ` szöggel az origó körül: `z * ℯ^(iθ)`.
Vedd észre, hogy itt az `x` és az `y` csupán a valós 2D-s derékszögű sík szokásos koordinátái, és egy pozitív szög *óramutató járásával ellentétes*, míg egy negatív szög *óramutató járásával megegyező* forgatást eredményez.

Hasonlóan egyszerűen egy `Δr` radiális eltolás úgy végezhető el, hogy hozzáadjuk a poláris alakban felírt komplex szám `r` nagyságához (pl. `z = r * ℯ^(iθ)` -> `z' = (r + Δr) * ℯ^(iθ)`).
Figyeld meg, hogy a szög rész változatlan marad, és csak az `r` nagyság változik, ahogy az várható.
