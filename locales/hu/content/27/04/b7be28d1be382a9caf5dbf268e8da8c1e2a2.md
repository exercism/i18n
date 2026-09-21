# Bevezetés

Alapvetően kétféle ciklus létezik:

1. Ismétlés, amíg egy feltétel teljesül.
2. Iterálás egy gyűjtemény elemein.

Mindkettő lehetséges Juliában, bár a második talán gyakoribb.

## A `while` ciklus

Azokra a nyitott végű problémákra, ahol előre nem tudjuk, hányszor fut le a ciklus, a Julia a `while` ciklust kínálja.

Az alapforma meglehetősen egyszerű:

```julia
while condition
    do_something()
end
```

Ebben az esetben a program addig ismétli a ciklust, amíg a `condition` már nem `true`.

Kétféleképpen lehet idő előtt kilépni a ciklusból:

- A `break` hatására a ciklus kilép, és a végrehajtás a ciklus `end` utáni következő soron folytatódik.
- A `return x` leállítja az aktuális függvény végrehajtását, és az `x` visszatérési értéket visszaadja a hívónak.

Ezekkel a lehetőségekkel néha kényelmes egy „végtelen” ciklust létrehozni `while true ... end` formában, majd arra hagyatkozni, hogy a ciklustörzsben találunk egy leállási feltételt, amely `break`-et vagy `return`-t vált ki.

## Iterálás egy gyűjteményen

A legegyszerűbb példa egy tartományon való iterálás.

Ha tízszer szeretnénk végrehajtani valamit:

```julia
for n in 1:10
    do_something(n)
end
```

Ha az aktuális iteráció nem tesz eleget valamilyen feltételnek, a `continue` segítségével azonnal a következő iterációra ugorhatunk:

```julia
for n in 1:10
    if is_useless(n)
        continue
    end
    
    # we decided this iteration could be useful
    do_something_slow(n)
end
```

Rövidebb formában az `if` blokk helyettesíthető ezzel: `is_useless(n) && continue`.

Sok más gyűjteménytípuson is iterálhatunk: tömb elemein, string karakterein, szótár kulcsain…

Az eddigi példák az `1:10` tartományon iterálnak, ahol az érték egyben a ciklusindex is.

Általánosabban előfordulhat, hogy nem csak az értékre, hanem az indexre is szükség van.
Erre az `eachindex()` függvény szolgál, például `for i in eachindex(my_array) ... end`.

## Listakomprehenziók

A kifejezett ciklusok írása a Juliában kevésbé gyakori, mint számos hagyományos nyelvben, mert több tömörebb megoldás is létezik.

Különösen gyakori eset, amikor egy új vektort kell felépítenünk egy másik gyűjtemény (vektor, string, halmaz… sok minden lehet) elemeiből.

Aki szereti a Python listakomprehenzióit, annak jó hír, hogy a Julia hasonló szintaxist használhat.

A lényege, hogy egy nagyon tömör ciklust hozunk létre egy vektoron belül.

A legegyszerűbb szintaxis így néz ki: `result = [f(x) for x in some_collection]`.

Hagyományos ciklussal ezt így írhatnánk le:

```julia
result = []
for x in some_collection
    push!(result, f(x))
end
```

Opcionálisan a végére egy feltétel is tehető, hogy csak a gyűjtemény megfelelő elemeit válasszuk ki:

```julia-repl
# multiples of 3
julia> [n^2 for n in 1:10 if n%3 == 0]
3-element Vector{Int64}:
  9
 36
 81
```
