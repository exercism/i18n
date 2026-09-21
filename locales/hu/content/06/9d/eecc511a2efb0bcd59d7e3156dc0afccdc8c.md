# Kiegészítés az utasításokhoz

## Tippek

Meg kell valósítanod a `diamond` függvényt, amely egy `A`-tól induló gyémántot rajzol ki, a megadott karakterrel a legszélesebb pontjain. Ha bizonytalan vagy a típusokban, használhatod a megadott szignatúrát, de ne hagyd, hogy korlátozza a kreativitásodat:

```haskell
diamond :: Char -> Maybe [String]
```

Ez a feladat szöveges adatokkal dolgozik. Történelmi okokból a Haskell `String` típusa ugyanazt jelenti, mint a `[Char]`, azaz a karakterek listája. A szöveges adatok hatékonyabb kezeléséhez a `Text` típus használható.

A feladat opcionális kiegészítéseként a következőket teheted:

- Olvass a Haskell [stringtípusairól](https://haskell-lang.org/tutorial/string-types).
- Add hozzá a `- text` sort a package.yaml függőségi listájához.
- Importáld a `Data.Text` modult [a következő módon](https://hackernoon.com/4-steps-to-a-better-imports-list-in-haskell-43a3d868273c):

```haskell
import qualified Data.Text as T
import           Data.Text (Text)
```

- Most már írhatsz például ilyet: `diamond :: Char -> Maybe [Text]`, és hivatkozhatsz a `Data.Text` kombinátoraira, például a `T.pack`-re,
- Nézd meg a [`Data.Text`](https://hackage.haskell.org/package/text/docs/Data-Text.html) dokumentációját,
- Ezután a Diamond.hs fájlban a `String` minden előfordulását lecserélheted `Text`-re:

```haskell
diamond :: Char -> Maybe [Text]
```

Ez a rész teljesen opcionális.
