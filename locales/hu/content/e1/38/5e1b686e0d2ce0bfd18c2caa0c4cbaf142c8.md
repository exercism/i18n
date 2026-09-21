# Ismertető

## Általános szintaxis

A `for` ciklus az egyik leggyakrabban használt utasítás, amellyel ismételten végrehajthatunk valamilyen logikát.
Go-ban a `for` kulcsszóból, egy fejlécből és egy kódblokkból áll, amely a ciklus törzsét tartalmazza, kapcsos zárójelek közé zárva.
A fejléc három részből áll, amelyeket pontosvessző `;` választ el: init, condition és post.

```go
for init; condition; post {
  // loop body - code that is executed repeatedly as long as the condition is true
}
```

- Az **init** rész olyan kód, amely csak egyszer fut le, mielőtt a ciklus elindul.
- A **condition** rész egy olyan kifejezés kell legyen, amely Boolean értékre értékelődik ki, és szabályozza, mikor álljon le a ciklus.
  A cikluson belüli kód addig fut, amíg ez a feltétel igaz.
  Amint ez a kifejezés hamisra értékelődik ki, a ciklus már egyetlen további iterációt sem hajt végre.
- A **post** rész olyan kód, amely minden iteráció végén lefut.

**Megjegyzés:** Más nyelvekkel ellentétben a fejléc három összetevőjét nem veszik körbe zárójelek `()`.
Sőt, ha mégis odaírsz ilyen zárójelet, az fordítási hiba.
A ciklustörzset körülvevő kapcsos zárójelek `{ }` viszont mindig kötelezőek.

## For ciklusok - egy példa

Az init rész általában beállít egy számlálóváltozót, a condition rész ellenőrzi, hogy folytatódjon-e a ciklus vagy álljon le, a post rész pedig általában minden ismétlés végén lépteti a számlálót.

```go
for i := 1; i < 10; i++ {
  fmt.Println(i)
}
```

Ez a ciklus kiírja az `1`-től `9`-ig tartó számokat (a `9`-et is beleértve).
A lépésköz megadása gyakran növelő vagy csökkentő utasítással történik, ahogy a fenti példa is mutatja.

## A fejléc opcionális részei

A fejléc init és post része elhagyható:

```go
var sum = 1
for sum < 1000 {
	sum += sum
}
fmt.Println(sum)
// Output: 1024
```

Ha a fentihez hasonlóan elhagyod egy for ciklus init és post részét, azzal egy while ciklust hozol létre Go-ban.
Nincs `while` kulcsszó.
Ez jól példázza Go azon elvét, hogy a fogalmak legyenek ortogonálisak.
Mivel már létezik egy fogalom a while ciklus viselkedésének elérésére, mégpedig a for ciklus, a `while` nem került be további fogalomként.

## Break és Continue

A ciklustörzsön belül a `break` kulcsszóval teljesen leállíthatod a ciklus végrehajtását:

```go
for n := 0; n <= 5; n++ {
  if n == 3 {
    break
  }
  fmt.Println(n)
}
// Output:
// 0
// 1
// 2
```

Ezzel szemben a `continue` kulcsszó csak az aktuális iteráció végrehajtását állítja le, és a következővel folytatja:

```go
for n := 0; n <= 5; n++ {
  if n%2 == 0 {
    continue
  }
  fmt.Println(n)
}
// Output:
// 1
// 3
// 5
```

## Végtelen for ciklus

A ciklusfejléc feltétel része szintén elhagyható.
Sőt, írhatsz ciklust fejléc nélkül is:

```go
for {
  // Endless loop...
}
```

Ez a ciklus csak akkor fejeződik be, ha a program kilép, vagy ha van egy `break` a törzsében.

## Címkék és goto

Amikor `break`-et használunk, Go a legbelső ciklust állítja le.
Hasonlóképpen, amikor `continue`-t használunk, Go a legbelső ciklus következő iterációját futtatja.

Ez azonban nem mindig kívánatos.
Címkékkel együtt használhatjuk a `break`-et és a `continue`-t, hogy pontosan megadjuk, melyik ciklusból akarunk kilépni, illetve melyiket akarjuk folytatni.

Ebben a példában létrehozunk egy `OuterLoop` címkét, amely a legkülső ciklusra hivatkozik.
A legbelső ciklusban, hogy jelezzük, a legkülső ciklusból akarunk kilépni, a `break` után a legkülső ciklus címkéjének nevét írjuk:

```go
OuterLoop:
    for i := 0; i < 10; i++ {
        for j := 0; j < 10; j++ {
            // ...
            break OuterLoop
        }
    }
```

A címkék `continue`-nal is működnének; ilyenkor Go a címke által hivatkozott ciklus következő iterációjában folytatná.

Go-nak van egy `goto` kulcsszava is, amely hasonlóképpen működik, és lehetővé teszi, hogy az egyik kódrészletről egy másik, címkével ellátott kódrészletre ugorjunk.

**Figyelem:** Bár Go engedi, hogy egy címkével megjelölt kódrészletre ugorjunk, a nyelv ezen funkciójának használata könnyen nagyon nehezen olvashatóvá teheti a kódot.
Ezért a címkék használata gyakran nem ajánlott.
