# Utasítások

Ebben a feladatban a klasszikus Pac-Man játék néhány szabályát kell Elixir-függvényekké alakítanod.

Négy szabályt kell lefordítanod, amelyek mind a játék állapotaihoz kapcsolódnak.

> Ne foglalkozz azzal, hogyan származnak az argumentumok, csak arra összpontosíts, hogy az argumentumok kombinálásával a kívánt eredményt add vissza.

## 1. Határozd meg, hogy Pac-Man megeszik-e egy szellemet

Definiáld a `Rules.eat_ghost?/2` függvényt, amely két argumentumot vár (_hogy Pac-Mannek aktív-e az energiagolyója_, és _hogy Pac-Man éppen hozzáér-e egy szellemhez_), és egy boolean értéket ad vissza arról, hogy Pac-Man meg tudja-e enni a szellemet. A függvény csak akkor adjon vissza igazat, ha Pac-Mannek aktív az energiagolyója, és éppen hozzáér egy szellemhez.

```elixir
Rules.eat_ghost?(false, true)
# => false
```

## 2. Határozd meg, hogy Pac-Man pontot szerez-e

Definiáld a `Rules.score?/2` függvényt, amely két argumentumot vár (_hogy Pac-Man éppen hozzáér-e egy energiagolyóhoz_, és _hogy Pac-Man éppen hozzáér-e egy ponthoz_), és egy boolean értéket ad vissza arról, hogy Pac-Man pontot szerzett-e. A függvény akkor adjon vissza igazat, ha Pac-Man éppen hozzáér egy energiagolyóhoz vagy egy ponthoz.

```elixir
Rules.score?(true, true)
# => true
```

## 3. Határozd meg, hogy Pac-Man veszít-e

Definiáld a `Rules.lose?/2` függvényt, amely két argumentumot vár (_hogy Pac-Mannek aktív-e az energiagolyója_, és _hogy Pac-Man éppen hozzáér-e egy szellemhez_), és egy boolean értéket ad vissza arról, hogy Pac-Man veszít-e. A függvény akkor adjon vissza igazat, ha Pac-Man éppen hozzáér egy szellemhez, és nincs aktív energiagolyója.

```elixir
Rules.lose?(false, true)
# => true
```

## 4. Határozd meg, hogy Pac-Man nyer-e

Definiáld a `Rules.win?/3` függvényt, amely három argumentumot vár (_hogy Pac-Man megette-e az összes pontot_, _hogy Pac-Mannek aktív-e az energiagolyója_, és _hogy Pac-Man éppen hozzáér-e egy szellemhez_), és egy boolean értéket ad vissza arról, hogy Pac-Man nyer-e. A függvény akkor adjon vissza igazat, ha Pac-Man megette az összes pontot, és a 3. részben meghatározott argumentumok alapján nem veszített.

```elixir
Rules.win?(false, true, false)
# => false
```
