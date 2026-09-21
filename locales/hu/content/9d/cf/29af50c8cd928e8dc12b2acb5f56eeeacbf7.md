# Utasítások

Ebben a feladatban olyan kódot írsz majd, amely segít elkészíteni egy ragyogó lasagnét a kedvenc szakácskönyvedből.

Három részfeladat vár rád, és mindegyik a lasagne elkészítésével töltött időhöz kapcsolódik.

## 1. Határozd meg a várható sütési időt percben

Definiáld az `expectedMinutesInOven` értéket, amely kiszámítja, hány percig kell a lasagnének a sütőben lennie. A szakácskönyv szerint a várható sütési idő 40 perc:

```elm
expectedMinutesInOven
    --> 40
```

## 2. Számítsd ki az előkészítési időt percben

Definiáld a `preparationTimeInMinutes` függvényt, amely paraméterként megkapja a lasagne rétegeinek számát, és visszaadja, hány percbe telik a lasagne előkészítése, feltéve hogy minden réteg előkészítése 2 percet vesz igénybe.

```elm
preparationTimeInMinutes 3
    --> 6
```

## 3. Számítsd ki az eltelt időt percben

Definiáld az `elapsedTimeInMinutes` függvényt, amely két paramétert kap: az első paraméter a lasagne rétegeinek száma, a második pedig az, hogy hány percet töltött már a lasagne a sütőben. A függvény adja vissza, hány percet dolgoztál a lasagne elkészítésén, ami nem más, mint az előkészítési idő és a lasagne által a sütőben eddig eltöltött idő összege.

```elm
elapsedTimeInMinutes 3 20
    --> 26
```
