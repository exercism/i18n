# Bevezetés

A Julia-kurzus során végig úgy kell tekintened a megoldásaidra, mint kis könyvtárakra: függvényeket, típusokat és hasonlókat kell definiálnod, amelyeket aztán lefuttatnak egy tesztcsomaggal.
Ezért a legelső fogalom a nevesített függvények lesz.

A Julia dinamikus, erősen típusos programozási nyelv.
Programozási stílusa főként funkcionális, bár rugalmasabb, mint például a Haskellé.

## Változók és értékadás

A változókat nem kell előre deklarálni.
Elég, ha értéket adsz egy megfelelő névnek:

```julia-repl
julia> myvar = 42  # an integer
42

julia> name = "Maria"  # strings are surrounded by double-quotes ""
"Maria"
```

## Konstansok

Ha egy értékre a program egészében szükség van, de nem várható, hogy változik, a legjobb konstansként megjelölni.

Ha az értékadás elé odaírod a `const` kulcsszót, a fordító hatékonyabb kódot tud generálni, mint ami egy változónál lehetséges.

A konstansok segítenek elkerülni a hibákat is.
Ha véletlenül megpróbálod megváltoztatni a `const` értékét, figyelmeztetést kapsz:

```julia-repl
julia> const answer = 42
42

julia> answer = 24
WARNING: redefinition of constant Main.answer. This may fail, cause incorrect answers, or produce other errors.
24
```

Ne feledd, hogy a `const`-ot csak függvényen *kívül* lehet deklarálni.
Ez jellemzően a `*.jl` fájl elején lesz, a függvénydefiníciók előtt.

## Aritmetikai operátorok

Ezek ugyanazok, mint sok más nyelvben:

```julia
2 + 3  # 5 (addition)
2 - 3  # -1 (subtraction)
2 * 3  # 6 (multiplication)
8 / 2  # 4.0 (division with floating-point result)
8 % 3  # 2 (remainder)
```

## Függvények

Két gyakori módja van annak, hogy nevesített függvényt definiálj Juliában:

1. A `function` kulcsszó használatával

    ```julia
    function muladd(x, y, z)
        x * y + z
    end
    ```

    A 4 szóközzel való behúzás az olvashatóság miatt szokásos, de a fordító figyelmen kívül hagyja.
    Az `end` kulcsszó viszont elengedhetetlen.

    Írhattuk volna úgy is, hogy `return x * y + z`.
    A Julia-függvények azonban mindig az utolsó kiértékelt kifejezést adják vissza, ezért a `return` kulcsszó elhagyható.
    Sok programozó mégis inkább kiírja, hogy egyértelműbb legyen a szándéka.

2. Az „értékadó forma” használatával

    ```julia
    muladd(x, y, z) = x * y + z
    ```

    Ezt leggyakrabban tömör, egyetlen kifejezésből álló függvények írására használják.

    Az értékadó formában *soha* nem használunk `return` kulcsszót.

A két forma egyenértékű, és pontosan ugyanúgy használjuk őket, úgyhogy azt válaszd, amelyik olvashatóbb.

Egy függvényt úgy hívunk meg, hogy megadjuk a nevét, és minden paraméteréhez átadunk egy argumentumot:

```julia
# invoking a function
muladd(10, 5, 1)

# and of course you can invoke a function within the body of another function:
square_plus_one(x) = muladd(x, x, 1)
```

## Elnevezési konvenciók

A sok más nyelvhez hasonlóan a Julia megköveteli, hogy a nevek (változóké, függvényeké és sok másé) betűvel kezdődjenek, amit betűk, számjegyek és aláhúzásjelek tetszőleges kombinációja követhet.

A konvenció szerint a változók, konstansok és függvények neve *kisbetűs*, és az aláhúzásjeleket ésszerű minimumon tartjuk.