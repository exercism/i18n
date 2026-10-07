# Kiegészítés az utasításokhoz

Számold meg a betűket, a kis- és nagybetűk közti különbségtől és a nem betűktől eltekintve, majd adj vissza egy szótárt, amely minden kisbetűhöz hozzárendeli a darabszámát.

A megadott `items` feldolgozásához használd a [roc-parallel platform](https://github.com/ageron/roc-parallel) `pf.Parallel.map!(items, { workers, task })` függvényét, amely egy tiszta `task` függvény segítségével, párhuzamosan, több szálon (amelyeket a `workers` ad meg) dolgozza fel az elemeket. Az eredményeket az összes elem feldolgozása után, a bemeneti sorrendben kapod vissza. Csak a `ParallelLetterFrequency.roc` fájlt kell szerkesztened.

Tipp: a kis- és nagybetűk közötti átalakításhoz és a betűk felismeréséhez a [Unicode könyvtár](https://github.com/roc-lang/unicode) használatát javasoljuk. Különösen nézd meg ezeket: `unicode.Case.to_lower`, `unicode.GeneralCategory.of_scalar`, `unicode.Scalar.iter` és `unicode.Scalar.to_str`. A betűket Unicode skalárértékként kezeld; Unicode-normalizálásra nincs szükség.

Megjegyzés: a legtöbb feladattól eltérően ez a feladat effektusos függvényeket használ. Egyelőre a Roc `expect` utasítása nem tud effektusos függvényeket meghívni, ezért ebben a feladatban a tesztek egyáltalán nem használják az `expect` utasítást vagy a `roc test` parancsot. Helyette a tesztek a `roc --opt=speed` paranccsal futnak, és a Roc-kód által visszaadott hibát a platform jelenti, a szokásostól eltérő formátumban.

Érdemes lehet megnézned a `bank-account` feladatot is, amely a párhuzamosság egy másik oldalát járja körül: hogyan lehet biztonságosan frissíteni a megosztott állapotot.
