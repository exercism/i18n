# Tippek

## 1. Állapítsd meg, melyik alkalmazás bocsátotta ki a naplóbejegyzést

- A `range` kulcsszóval végigiterálhatsz egy adott string rune-jain.
- A rune-okat `if` elágazással tudod összehasonlítani más rune-okkal.
- Go-ban a szimpla idézőjelek közé írt karakter egy `rune`.

## 2. Javítsd ki a sérült naplókat

- A módosított naplósort rune-onként építheted fel stringek összefűzésével.
- Ahhoz, hogy ez az összefűzés működjön, minden `rune`-t előbb stringgé kell alakítanod.
- Egy `r` rune-t a `string(r)` segítségével `string`-gé alakíthatsz.

## 3. Állapítsd meg, megjeleníthető-e egy napló

- A rune-ok 1, 2, 3 vagy 4 bájtosak lehetnek, ezért a beépített `len` függvény nem feltétlenül tükrözi pontosan egy string karaktereinek számát.
