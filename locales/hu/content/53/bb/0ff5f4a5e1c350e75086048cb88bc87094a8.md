# Bevezetés

## Változók és értékadás

Az R dinamikusan típusos nyelv, ezért általában nem kell megadni egy változó típusát. Az ajánlott értékadó operátor a `<-`.

```R
x <- 42
avogadro <- 6.02e23
mystr <- "Hello, World!"
```

Ha a `<-` helyett `=`-t használsz, az gyakran, de nem mindig működik, és rossz stílusnak számít. Ha RStudio-ban dolgozol, a `Alt-minus` billentyűparanccsal írhatod be.

Az operátorok többnyire megszokottak, de figyelj a `%/%` és a `%%` operátorra:

```R
2 + 3   # 5
2 - 3   # -1
2 * 3   # 6
2 / 3   # 0.6666667
8 %/% 3 # 2 (integer division)
8 %% 3  # 2 (remainder)
2 ^ 3   # 8 (exponential)
```

Az R-ben a `#` egysoros megjegyzést indít. A többsoros megjegyzésekhez nincs külön szintaxis.

## Függvények

Így definiálhatsz egy függvényt:

```R
squareit <- function(x) {
    x * x
}
```

A függvényeknek nulla vagy több argumentuma lehet, amelyeket vessző választ el. A `function()` után akkor is kellenek a zárójelek `()`, ha egyetlen paraméter sincs.

A függvény argumentumaihoz megadhatsz alapértelmezett értéket, ezeknek azonban minden alapértelmezés nélküli argumentum után kell következniük, és az alapértelmezett érték megadásához `=`-t kell használni, nem `<-`-ot. Egy meglehetősen értelmetlen példa:

```R
squareit <- function(x = 42) {
    x * x
}

squareit()
#> [1] 1764
```

Az egysoros függvénytestekhez a kapcsos zárójelek `{ }` szigorúan véve nem kötelezőek, de a használatuk jó stílusnak számít.

Az R automatikusan visszaadja a függvény utolsó értékét, ahogy a fenti példákban is látszik.

A `return()` a függvénytest bármely pontján használható, hogy a visszatérési értéket explicit módon megadd.

Egy függvény meghívása ugyanúgy néz ki, mint sok más nyelvben:

```R
squareit(3)
#> [1] 9
```
