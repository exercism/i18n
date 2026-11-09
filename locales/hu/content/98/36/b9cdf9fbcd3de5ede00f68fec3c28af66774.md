# Tippek

Ne feledd, a teknősök hidegvérű állatok, ezért mindenképpen melegítsd fel őket, mielőtt paplant vagy pulóvert adnál rájuk.

## 1. Rendezd a mennyiséget!

- A visszaadott rendezési permutációnak csökkenő sorrendben kell lennie.
- Ügyelj rá, hogy a mennyiségeket helyben, csökkenő sorrendbe rendezd.
- A `sortperm` a `sort`-hoz hasonló argumentumokat fogadhat.
- Nagyon számít, milyen sorrendben végzed el a fenti két műveletet!

## 2. Rendezd az ügyfeleket!

- Új tömböt kell visszaadni a sorba rendezett ügyfelekkel (azaz ne helyben rendezz).
- Ne feledd, a rendezési permutáció (azaz az indextömb) indexekként használható.

## 3. Gyártási ütemterv!

- Itt használhatod a `sortquantity!()` és `sortcustomer()` függvényeidet.
- Ne feledd, hogy a rendezési permutáció nem más, mint az indexek permutációja.
- Az [inverz rendezési permutációhoz][invperm]:
    - Gondold át, mi az indexek eredeti sorrendje egy tetszőleges `Vector` esetén.
    - Mit lehet tenni az indexek *bármely* permutációjával, hogy visszakerüljön ebbe a kiindulási pontba?
    - Utolsó tipp... Mit csinál egy rendezési permutáció rendezési permutációja?
 
[invperm]: https://docs.julialang.org/en/v1/base/arrays/#Base.invperm
