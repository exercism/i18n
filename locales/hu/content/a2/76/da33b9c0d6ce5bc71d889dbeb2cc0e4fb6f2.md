# Utasítások

Kódot fogsz írni, hogy segíts elkészíteni egy lasagnát a kedvenc szakácskönyvedből.

Öt részfeladatod van, amelyek mind a recepted elkészítéséhez kapcsolódnak.

## 1. Határozd meg a várható sütőidőt percben

Állítsd be a `$Lasagna::ExpectedMinutesInOven` változót arra, hogy hány percig kell a lasagnának a sütőben lennie. A szakácskönyv szerint a várható sütőidő percben 40:

```perl
$Lasagna::ExpectedMinutesInOven
# => 40
```

## 2. Számítsd ki a hátralévő sütőidőt percben

Módosítsd a `Lasagna::remaining_minutes_in_oven` szubrutint, amely argumentumként megkapja, hogy a lasagna hány perce van már a sütőben, és adja vissza, hogy hány percig kell még a sütőben maradnia, az előző részfeladatban megadott várható sütőidő alapján.

```perl
Lasagna::remaining_minutes_in_oven(30)
# => 10
```

## 3. Számítsd ki az előkészítési időt percben

Módosítsd a `Lasagna::preparation_time_in_minutes` szubrutint, amely argumentumként megkapja, hogy hány réteget adtál a lasagnához, és adja vissza, hogy hány percet töltöttél a lasagna előkészítésével, feltételezve, hogy minden réteg elkészítése 2 percet vesz igénybe.

```perl
Lasagna::preparation_time_in_minutes(2)
# => 4
```

## 4. Számítsd ki a teljes munkával töltött időt percben

Módosítsd a `Lasagna::total_time_in_minutes` szubrutint, amely két argumentumot vár: az első argumentum a lasagnához adott rétegek száma, a második pedig az, hogy hány perce van a lasagna a sütőben.
A szubrutin adja vissza, hogy összesen hány percet dolgoztál a lasagna elkészítésén, ami az előkészítési idő és a lasagna által a sütőben jelenleg eltöltött idő összege.

```perl
Lasagna::total_time_in_minutes(3, 20)
# => 26
```

## 5. Készíts értesítést arról, hogy a lasagna elkészült

Módosítsd a `Lasagna::oven_alarm` szubrutint, amely nem vár argumentumot, és adjon vissza egy üzenetet, amely jelzi, hogy a lasagna fogyasztásra kész.

```perl
Lasagna::oven_alarm()
# => "Ding!"
```
