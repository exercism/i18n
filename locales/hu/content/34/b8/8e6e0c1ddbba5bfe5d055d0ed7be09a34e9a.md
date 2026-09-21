# Bemutatkozás

A redukálás nem más, mint egy függvény ismételt alkalmazása egy sorozat minden elemére, miközben az eredményeket valamilyen módon felhalmozzuk.
Az alkalmazott függvény két paramétert kap: az aktuális felhalmozott értéket és a feldolgozandó elemet.
A függvény eredménye az új felhalmozott érték kell legyen.

Néhány programozási nyelvben ezt accumulate vagy fold néven ismerik.

Common Lispben a folyamatot a `reduce` függvény végzi.
A legegyszerűbb formájában így néz ki:

`(reduce #'function-to-apply sequence :initial-value value)`

Figyeld meg, hogy megadtunk egy kezdőértéket: ez lesz az „aktuális felhalmozott érték”, amelyet a függvény megkap, amikor az első elemet feldolgozza.

Íme egy példa, amely összeadja a lista számait, 10-es kezdőértékkel:

`(reduce #'+ '(1 2 3 4) :initial-value 10) ; => 20`

Vedd észre, hogy ha a sorozat üres, a függvény soha nem hívódik meg, és a kifejezés értéke a kezdőérték lesz.

## A kezdőérték megadása vagy elhagyása

A `:initial-value` argumentum nem kötelező, és a `reduce` viselkedése attól függ, hogy megadtuk-e, illetve hogy van-e eleme a sorozatnak.

1. Ha nem adunk meg kezdőértéket, és a sorozatnak egynél több eleme van, akkor a függvényt először a sorozat első két elemével hívjuk meg.
2. Ha nem adunk meg kezdőértéket, és a sorozat egyetlen elemből áll, akkor a kifejezés értéke ez az elem lesz, a függvény pedig nem hívódik meg.
3. Ha megadunk kezdőértéket, és a sorozat üres, akkor a kifejezés értéke a kezdőérték lesz, a függvény pedig nem hívódik meg.
4. Ha nem adunk meg kezdőértéket, és a sorozat üres, akkor a függvényt *nulla* argumentummal hívjuk meg.

Az utolsó eset az, amelyik könnyen megzavarhatja az embert.
Általában könnyű megadni egy kezdőértéket, így a program sosem jut el ebbe a furcsa esetbe.

## További kulcsszóargumentumok

A `reduce` fogad néhány további kulcsszóargumentumot is, amelyek bizonyos esetekben hasznosak lehetnek.

* `:start` és `:end`: ezek a sorozat indexeit adják meg, amitől a `reduce` egy részsorozaton dolgozik. Alapértékük `0`, illetve `nil`, ami a sorozat elejét és végét jelenti.
* `:from-end`: ha ez az általánosított logikai érték igazra értékelődik, akkor a redukálás nem balról jobbra, hanem jobbról balra történik.
* `:key`: egy függvényt ad meg, amelyet minden elemre meghívunk, *mielőtt* átadnánk a redukáló függvénynek. Ez a függvény *nem* kerül alkalmazásra a `:initial-value` értékre.

Néhány példa:

```lisp
(reduce #'+ '(1 2 3 4 5 6 7 8 9 10) 
        :start 2 :end 5)               ; => 12 (only adds 3, 4, 5)
(reduce #'cons '(1 2 3))               ; => ((1 . 2) . 3)
(reduce #'cons '(1 2 3) :from-end t)   ; => (1 2 . 3)
(reduce #'+ '((1) (2) (3)) :key #'car) ; => 6
```
