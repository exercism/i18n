# Utasítások

A barátod épp a Killer Sudoku megoldását tanulja (a szabályokat lentebb találod), de nehezen jön rá, milyen számjegyek kerülhetnek egy ketrecbe. Megkér, hogy segíts neki egy kis programmal, amely felsorolja egy adott ketrec összes érvényes kombinációját, valamint minden olyan megkötést, amely a ketrecre hat.

Hogy a program kimenete könnyen olvasható legyen, a visszaadott kombinációkat rendezett sorrendben kell megadni.

## A Killer Sudoku szabályai

- A [standard Sudoku-szabályok][sudoku-rules] érvényesek.
- A ketrecben lévő számjegyek, amelyeket általában pontozott vonal jelöl, összeadva kiadják a ketrec sarkában látható kis számot.
- Egy számjegy egy ketrecben csak egyszer szerepelhet.

Részletesebb magyarázatért nézd meg [ezt az útmutatót][killer-guide].

## 1. példa: Olyan ketrec, amelynek csak 1 lehetséges kombinációja van

Egy 3 számjegyből álló, 7 összegű ketrecben csak egyetlen érvényes kombináció van: 124.

- 1 + 2 + 4 = 7
- Bármely más kombináció, amelynek összege 7, például a 232, megsértené azt a szabályt, hogy egy ketrecen belül nem ismétlődhetnek a számjegyek.

![Sudoku-rács, három killer ketreccel, amelyek összetartozóként vannak megjelölve.
Az első killer ketrec a rács bal felső sarkában lévő 3×3-as mezőben található.
A mező középső oszlopa alkotja a ketrecet, felülről lefelé a következő cellákkal: az első cella egy 1-est és egy 7-es ceruzajelölést tartalmaz, ami a ketrec 7-es összegét jelzi, a második cella egy 2-est tartalmaz, a harmadik cella egy 5-öst.
A számok pirossal vannak kiemelve, ami hibát jelez.
A második killer ketrec a rács középső 3×3-as mezőjében található.
A mező középső oszlopa alkotja a ketrecet, felülről lefelé a következő cellákkal: az első cella egy 1-est és egy 7-es ceruzajelölést tartalmaz, ami a ketrec 7-es összegét jelzi, a második cella egy 2-est tartalmaz, a harmadik cella egy 4-est.
Ebben a ketrecben egyik szám sincs kiemelve, ezért nem tartalmaznak hibát.
A harmadik killer ketrec a rács középső 3×3-as mezőjének külső sarkát követi.
A következő három cellából áll: a ketrec bal felső cellája egy 2-est tartalmaz, pirossal kiemelve, valamint egy 7-es ketrecösszeget.
A ketrec jobb felső cellája egy 3-ast tartalmaz.
A ketrec jobb alsó cellája egy 2-est tartalmaz, pirossal kiemelve. Minden más cella üres.][one-solution-img]

## 2. példa: Olyan ketrec, amelynek több kombinációja van

Egy 2 számjegyből álló, 10 összegű ketrecben 4 lehetséges kombináció van:

- 19
- 28
- 37
- 46

![Sudoku-rács, minden mező üres, kivéve a középső oszlopot, az 5. oszlopot, amelyben 8 sor van kitöltve.
Minden egymást követő két sor egy killer ketrecet alkot, és egy csoportként van megjelölve.
Felülről lefelé: az első csoport egy 1-es értékű cella és egy ceruzajelölés, ami a ketrec 10-es összegét jelzi, majd egy 9-es értékű cella.
A második csoport egy 2-es értékű cella és egy 10-es ceruzajelölés, majd egy 8-as értékű cella.
A harmadik csoport egy 3-as értékű cella és egy 10-es ceruzajelölés, majd egy 7-es értékű cella.
A negyedik csoport egy 4-es értékű cella és egy 10-es ceruzajelölés, majd egy 6-os értékű cella.
Az oszlop utolsó cellája üres.][four-solutions-img]

## 3. példa: Olyan ketrec, amelynek több kombinációja van, de korlátozott

Egy 2 számjegyből álló, 10 összegű ketrecben, ahol az oszlop már tartalmaz egy 1-est és egy 4-est, 2 lehetséges kombináció van:

- 28
- 37

A 19 és a 46 nem lehetséges az oszlopban lévő 1-es és 4-es miatt, a standard Sudoku-szabályok szerint.

![Sudoku-rács, minden mező üres, kivéve a középső oszlopot, az 5. oszlopot, amelyben 8 sor van kitöltve.
Az első sor egy 4-est tartalmaz, a második üres, a harmadik pedig egy 1-est.
Az 1-es pirossal van kiemelve, ami hibát jelez.
Az oszlop utolsó 6 sora két-két cellából álló killer ketreceket alkot.
Felülről lefelé: az első csoport egy 2-es értékű cella és egy ceruzajelölés, ami a ketrec 10-es összegét jelzi, majd egy 8-as értékű cella.
A második csoport egy 3-as értékű cella és egy 10-es ceruzajelölés, majd egy 7-es értékű cella.
A harmadik csoport egy 1-es értékű, pirossal kiemelt cella és egy 10-es ceruzajelölés, majd egy 9-es értékű cella.][not-possible-img]

## Próbáld ki magad is

Ha szeretnél nekikezdeni egy könnyen megközelíthető Killer Sudokunak, próbáld ki [ezt a feladványt][clover-puzzle], amelyet Clover készített, és amelyet [Mark Goodliffe mutatott be a Cracking The Cryptic csatornán 2021. június 21-én][goodliffe-video].

Killer Sudokukat különböző nehézségi fokozatokban számos újságban, valamint Sudoku-alkalmazásokban, könyvekben és weboldalakon is találhatsz.

## Köszönet

A fenti képernyőképek a [F-Puzzles.com](https://www.f-puzzles.com/) segítségével készültek, amely Eric Fox rejtvénykészítő eszköze.

[sudoku-rules]: https://masteringsudoku.com/sudoku-rules-beginners/
[killer-guide]: https://masteringsudoku.com/killer-sudoku/
[one-solution-img]: https://assets.exercism.org/images/exercises/killer-sudoku-helper/example1.png
[four-solutions-img]: https://assets.exercism.org/images/exercises/killer-sudoku-helper/example2.png
[not-possible-img]: https://assets.exercism.org/images/exercises/killer-sudoku-helper/example3.png
[clover-puzzle]: https://app.crackingthecryptic.com/sudoku/HqTBn3Pr6R
[goodliffe-video]: https://youtu.be/c_NjEbFEeW0?t=1180
