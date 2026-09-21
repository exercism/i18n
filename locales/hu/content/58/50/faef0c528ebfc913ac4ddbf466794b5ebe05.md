# Bevezetés

A Go szeletei hasonlóak más nyelvek listáihoz vagy tömbjeihez.
Egy adott típus (vagy interfész) több elemét tárolják.

A Go szeletei tömbökre épülnek.
A tömbök mérete rögzített.
A szelet ezzel szemben egy tömb elemeire adott dinamikus méretű, rugalmas nézet.

A szeletet így írjuk le: `[]T`, ahol a `T` a szelet elemeinek típusa:

```go
var empty []int                 // an empty slice
withData := []int{0,1,2,3,4,5}  // a slice pre-filled with some data
```

Egy elem lekérhető vagy beállítható egy adott nulla alapú indexen a szögletes zárójeles jelöléssel:

```go
withData[1] = 5
x := withData[1] // x is now 5
```

Új szeletet hozhatsz létre egy meglévő szeletből egy elemtartomány kiválasztásával.
Ehhez megint a szögletes zárójeles jelölést használod, de megadod a kezdő (befoglaló) és a záró (kizáró) indexet is.
Ha nem adod meg a kezdő indexet, az alapértelmezés szerint 0.
Ha nem adod meg a záró indexet, az alapértelmezés szerint a szelet hossza.

```go
newSlice := withData[2:4]
// => []int{2,3}
newSlice := withData[:2]
// => []int{0,1}
newSlice := withData[2:]
// => []int{2,3,4,5}
newSlice := withData[:]
// => []int{0,1,2,3,4,5}
```

Elemeket adhatsz a szelethez az `append` függvénnyel.
Az alábbiakban a `4` és a `2` értéket fűzzük az `a` szelethez.

```go
a := []int{1, 3}
a = append(a, 4, 2)
// => []int{1,3,4,2}
```

Az `append` mindig új szeletet ad vissza, és amikor csak elemeket szeretnénk hozzáfűzni egy meglévő szelethez, gyakori, hogy visszaértékeljük abba a szeletváltozóba, amelyet első argumentumként adtunk át, ahogy fent is tettük.

Az `append` két szelet összefűzésére is használható:

```go
nextSlice := []int{100,101,102}
newSlice  := append(withData, nextSlice...)
// => []int{0,1,2,3,4,5,100,101,102}
```

## Indexek a szeletekben

A szeletek indexeivel való munkát mindig védeni kell valamilyen ellenőrzéssel, amely biztosítja, hogy az index valóban létezik.
Ha ezt elmulasztod, az egész alkalmazás összeomlik.

## Üres szeletek

A `nil` szeletek az alapértelmezett üres szeletek.
Nincs semmilyen hátrányuk egyetlen értéket sem tartalmazó szelettel szemben.
A `len` függvény működik `nil` szeleteken, elemek adhatók hozzá anélkül, hogy inicializálnánk, és így tovább.
Új szelet létrehozásakor a `var s []int` (`nil` szelet) előnyben részesítendő az `s := []int{}` (üres, nem `nil` szelet) helyett.

## Teljesítmény

Amikor iteratívan feltöltendő szeleteket hozunk létre, van egy könnyen elérhető lehetőség a teljesítmény javítására, ha ismerjük a szelet végleges méretét.
A kulcs, hogy minimalizáljuk a memóriafoglalások számát, ami meglehetősen költséges, és akkor fordul elő, ha a szelet túlnő a számára lefoglalt memóriaterületen.
Ennek a legbiztonságosabb módja, ha megadod a szelet `cap` kapacitását az `s := make([]int, 0, cap)` hívással, majd a szokásos módon az `append` függvénnyel fűzöl hozzá elemeket.
Így azonnal lefoglaljuk `cap` darab elem helyét, miközben a szelet hossza nulla.
A gyakorlatban a `cap` gyakran egy másik szelet hossza: `s := make([]int, 0, len(otherSlice))`.

## Az `append` nem tiszta függvény

A Go `append` függvénye a teljesítményre van optimalizálva, ezért nem készít másolatot a bemeneti szeletről.
Ez azt jelenti, hogy az eredeti szelet (az `append` első paramétere) néha megváltozik.
