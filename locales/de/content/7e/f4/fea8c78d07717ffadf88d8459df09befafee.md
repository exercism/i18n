# Anleitung

Du bist ein Deckshand und verstaust die Frachtkisten am Kai neu. Jede Aufgabe
ist ein einzelnes Wort, das in seinem Inneren nur Shuffle-Wörter verwendet,
keine Arithmetik.

## 1. Tausche die beiden obersten Kisten

Definiere das Wort `swap-crates`. Es nimmt zwei Kisten vom Stapel und lässt
sie in umgekehrter Reihenfolge zurück.

```factor
1 2 swap-crates .s
! 2
! 1
```

## 2. Räume die verschüttete Kiste weg

Definiere das Wort `clear-spill`. Es nimmt drei Kisten vom Stapel und lässt
die unteren beiden zurück, während es die oberste verwirft.

```factor
1 2 3 clear-spill .s
! 1
! 2
```

## 3. Behalte eine Kopie der darunterliegenden Kiste

Definiere das Wort `peek-under`. Es nimmt zwei Kisten vom Stapel und lässt
sie zurück, wobei eine Kopie der unteren Kiste obenauf gelegt wird.

```factor
1 2 peek-under .s
! 1
! 2
! 1
```

## 4. Bring das Deck in Ordnung

Definiere das Wort `tidy-deck`. Es nimmt drei Kisten vom Stapel, und zwar in
der Reihenfolge `x y z`, und lässt `z z y` zurück: Verwirf die unterste
Kiste und lass dann zwei Kopien der obersten Kiste unter der mittleren
liegen.

```factor
1 2 3 tidy-deck .s
! 3
! 3
! 2
```
