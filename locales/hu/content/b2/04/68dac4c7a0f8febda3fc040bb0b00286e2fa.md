# Utasítások

Ebben a feladatban egy autógyár összeszerelősorának a termelését elemző kódot fogsz írni.
Az összeszerelősor sebessége `0` (kikapcsolva) és `10` (maximum) között lehet.

A leglassabb sebességén (`1`) óránként `221` autó készül.
A termelés lineárisan növekszik a sebességgel.
Tehát `4`-es sebesség mellett óránként `4 * 221 = 884` autót kell gyártania.
A nagyobb sebesség azonban megnöveli annak a valószínűségét, hogy hibás autók készülnek, amelyeket aztán ki kell selejtezni.
Az alábbi táblázat megmutatja, hogyan befolyásolja a sebesség a sikerességi arányt:

- `1`-től `4`-ig: 100%-os sikerességi arány.
- `5`-től `8`-ig: 90%-os sikerességi arány.
- `9`: 80%-os sikerességi arány.
- `10`: 77%-os sikerességi arány.

Két részfeladatod van.

## 1. Számítsd ki az óránkénti termelési rátát

Számítsd ki az összeszerelősor óránkénti termelési rátáját, figyelembe véve a sikerességi arányát.

## 2. Számítsd ki a percenként legyártott működő darabok számát

Számítsd ki, hány **elkészült, működő autó** készül percenként.
