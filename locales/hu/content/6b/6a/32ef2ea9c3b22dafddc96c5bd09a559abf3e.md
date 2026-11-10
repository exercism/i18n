# Utasítások

Egy kutatószervezet észrevette, hogy néhány fiatal kutatója kevésbé optimális módszerekkel dolgozott az elemzései során.
Az egyik ilyen módszer, hogy a diszkrét valószínűségeket még a további számítások előtt azonnal tizedes törtekké (vagyis valós számokká) alakítják.

A tapasztalt kutatók inkább racionális számokkal szeretnének számolni, mert azok nagyobb pontosságot nyújthatnak, és szeretnék megtudni, hogy a fiatal kutatók rossz gyakorlata hatással volt-e a vizsgálatok eredményeire.

Kétféle vizsgálatot végeztek:
- Sok tesztet futtattak, amelyek mindegyike egy diszkrét siker-valószínűséget adott vissza, majd kiszámították ezeknek a valószínűségeknek az átlagát.
- Sok független eseményt vizsgáltak, és kiszámították annak a teljes valószínűségét, hogy minden esemény bekövetkezik, a valószínűségek összeszorzásával.

A tapasztalt kutatók arra kérnek, hogy írj függvényeket, amelyek segítenek megállapítani, hogy a tizedes törtekkel végzett számítások miatt vannak-e kerekítési hibák az elemzésekben, és ha vannak, adj meg egy pontos racionális számot az eredményre.

## 1. Add meg a sikerek és a kísérletek arányát

A `rationalize(successes, trials)` függvény két tömböt kap: a `successes`-t és a `trials`-t.
Egy `i` index esetén a `successes[i]` a `trials[i]` számú kísérlet során elért sikerek számát adja meg.
A függvény a sikereknek a kísérletek számához viszonyított arányát adja vissza racionális számok tömbjeként, ugyanabban a sorrendben, mint a bemeneti tömbök.

```julia-repl
julia> rationalize([1, 2, 3], [4, 5, 6])
3-element Vector{Rational{Int64}}:
 1//4
 2//5
 1//2
```

## 2. Keresd meg a sikerekhez tartozó valós valószínűségeket

Hasonlóképpen a `probabilities(successes, trials)` függvény is két tömböt kap: a `successes`-t és a `trials`-t.
A sikereknek a kísérletek számához viszonyított arányát adja vissza tizedes törtek tömbjeként, ugyanabban a sorrendben, mint a bemeneti tömbök.

```julia-repl
julia> probabilities([1, 2, 3], [4, 5, 6])
3-element Vector{Float64}:
 0.25
 0.4
 0.5
```

## 3. Ellenőrizd a valószínűségek átlagát

A `checkmean(successes, trials)` a két tömböt, a `successes`-t és a `trials`-t kapja.
A valós valószínűségek átlagát hasonlítja össze a racionális valószínűségek átlagával.
- Ha a két valószínűség egyenlő, a `checkmean` a `true` értéket adja vissza.
- Ha a két valószínűség különbözik, a `checkmean` a racionális valószínűséget adja vissza.

```julia-repl
julia> successes, trials = [9, 4, 7, 8, 6], [22, 22, 11, 17, 12];
julia> checkmean(successes, trials)
true

julia> successes, trials = [6, 5, 9, 8, 9], [21, 19, 13, 25, 22];
julia> checkmean(successes, trials)
1873629//4754750
```

## 4. Ellenőrizd a független valószínűséget

A `checkprob(successes, trials)` a két tömböt, a `successes`-t és a `trials`-t kapja.
A tizedes tört valószínűségek együttes valószínűségét hasonlítja össze a racionális valószínűségek együttes valószínűségével.
- Ha a két valószínűség egyenlő, a `checkprob` a `true` értéket adja vissza.
- Ha a két valószínűség különbözik, a `checkprob` a racionális valószínűséget adja vissza.

```julia-repl
julia> successes, trials = [2, 9, 4, 4, 5], [15, 11, 17, 19, 15];
julia> checkprob(successes, trials)
true

julia> successes, trials = [9, 8, 5, 4, 3], [22, 14, 19, 25, 18];
julia> checkprob(sucesses, trials)
12//7315
```
