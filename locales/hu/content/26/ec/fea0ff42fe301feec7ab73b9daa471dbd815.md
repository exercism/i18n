# Tippek

## Általános

- A mellékelt `Node` típusban a `left : Tree ?? Empty` olyan mezőt deklarál, amelynek az alapértéke `Empty`. Egy csomópont létrehozásakor ezt a mezőt nyugodtan elhagyhatod, olvasáskor pedig így is egy `Tree` értéket kapsz. Ez eltér a `?:`-vel deklarált opcionális mezőtől, ahol ellenőrizni kell, hogy a mező jelen van-e.
