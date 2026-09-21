# Utasítások

A közösségi egyesületed arra kér, hogy kezeld a kert parcelláinak regisztrációit. Az állapot két dinamikus változóban él:

- `registrations`: a jelenleg egy személyhez rendelt `plot` tuple-ök vektora.
- `next-id`: a következő regisztrációhoz használandó egész szám.

A `plot` tuple két mezővel rendelkezik:

| mező            | típus    |
| --------------- | -------- |
| `id`            | egész szám |
| `registered-to` | string   |

## 1. Nyisd meg a kertet, és listázd a regisztrációit

Definiáld az `open-garden` függvényt, amely inicializálja a dinamikus változókat: a `registrations` legyen egy üres vektor, a `next-id` pedig `1`. Ezután definiáld a `list-registrations` függvényt, amely visszaadja a parcellák aktuális vektorát.

```factor
open-garden
list-registrations .
! => V{ }
```

## 2. Regisztrálj egy parcellát

Definiáld a `register` függvényt, amely levesz egy nevet a veremről, létrehoz egy új `plot`-ot a következő szabad azonosítóval, hozzáfűzi a `registrations` vektorhoz, eggyel növeli a `next-id` értékét, és visszaadja az új parcellát.

```factor
open-garden
"Emma Balan" register .
! => T{ plot { id 1 } { registered-to "Emma Balan" } }

list-registrations .
! => V{ T{ plot { id 1 } { registered-to "Emma Balan" } } }
```

A parcella-azonosítóknak egyedinek kell lenniük, és egy felszabadítás után is növekedniük kell. A `next-id` soha ne használjon újra egy értéket.

## 3. Szabadíts fel egy parcellát

Definiáld a `release` függvényt, amely átvesz egy azonosítót, és eltávolítja a hozzá tartozó bejegyzést a `registrations` vektorból. Az ismeretlen azonosító felszabadítása nem változtat semmin.

```factor
open-garden
"Emma" register drop
1 release
list-registrations .
! => V{ }
```

## 4. Kérj le egy regisztrált parcellát

Definiáld a `get-registration` függvényt, amely átvesz egy azonosítót, és visszaadja a hozzá tartozó parcellát, vagy a `not-found` szimbólumot, ha egyetlen parcella sem rendelkezik ezzel az azonosítóval.

```factor
open-garden
"Emma" register drop
1 get-registration .
! => T{ plot { id 1 } { registered-to "Emma" } }

7 get-registration .
! => not-found
```

## 5. Keress parcellákat név alapján

Definiáld a `find-by-name` függvényt, amely átvesz egy nevet, és visszaadja az adott személyhez jelenleg regisztrált összes parcella vektorát.

```factor
open-garden
"Emma" register drop
"Bob" register drop
"Emma" register drop
"Emma" find-by-name .
! => V{ T{ plot { id 1 } { registered-to "Emma" } }
        T{ plot { id 3 } { registered-to "Emma" } } }
```
