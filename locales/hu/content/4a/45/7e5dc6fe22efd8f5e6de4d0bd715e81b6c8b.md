# Bevezetés

A vektorok elemei nevet is kaphatnak, ami néha kényelmesebbé teszi a velük való munkát.

## Létrehozás

Háromféleképpen adhatsz nevet egy vektorhoz.

1) A vektor létrehozásakor

```R
> work_days <- c(Mon = TRUE, Tue = TRUE, Wed = TRUE, Thu = TRUE, Fri = TRUE, Sat = FALSE, Sun = FALSE)
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
```

2) Úgy, hogy egy karaktervektort rendelsz a `names()`-hez

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> names(months) <- month.abb
> months
Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec 
 31  28  31  30  31  30  31  31  30  31  30  31 
```

3) A `setNames()` segítségével

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> setNames(months, month.name)
  January  February     March     April       May      June      July    August September   October  November  December 
       31        28        31        30        31        30        31        31        30        31        30        31 
```

## Eltávolítás

Ha már nincs szükség a nevekre, eltávolíthatod őket, ha a `names()`-et `NULL`-ra állítod.

```R
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
> names(work_days) <- NULL
> work_days
[1]  TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE
```

Az `unname()` függvény ugyanezt éri el, és talán világosabban kifejezi a szándékodat.

## Munka a nevekkel

A `names()` függvény a nevek beállítása mellett azok lekérdezésére is szolgál.

```R
> names(months) <- month.abb
> names(months)[1:3]
[1] "Jan" "Feb" "Mar"
```

Egy név a pozícióindex helyett is használható, ilyenkor viszont idézőjelek közé kell tenni.

```R
> months[c("Jul", "Aug")]
Jul Aug 
 31  31 
```

Ahhoz, hogy az ilyen indexelés megfelelően működjön, a legjobb, ha biztosítod, hogy a nevek egyediek és nem hiányoznak.
Az R azonban nem kényszeríti ki az egyediséget.

A szokásos vektorműveletek továbbra is működnek, és a nevek általában megmaradnak, ha ennek van értelme.

```R
> months[months == 30]
Apr Jun Sep Nov 
 30  30  30  30 

> sum(months)
[1] 365  # no meaningful names possible
```
