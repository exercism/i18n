# Ergänzung der Anweisungen

## Hinweise

Du musst die Funktion `diamond` implementieren, die einen Diamanten ausgibt, der bei `A` beginnt und an seinen breitesten Stellen das gegebene Zeichen hat. Du kannst die vorgegebene Signatur verwenden, wenn du dir bei den Typen unsicher bist, aber lass dich dadurch nicht in deiner Kreativität einschränken:

```haskell
diamond :: Char -> Maybe [String]
```

Diese Übung arbeitet mit Textdaten. Aus historischen Gründen ist der `String`-Typ von Haskell synonym mit `[Char]`, einer Liste von Zeichen. Für eine effizientere Verarbeitung von Textdaten kannst du den `Text`-Typ verwenden.

Als optionale Erweiterung dieser Übung kannst du:

- dich über [String-Typen](https://haskell-lang.org/tutorial/string-types) in Haskell informieren.
- `- text` zu deiner Liste der Abhängigkeiten in package.yaml hinzufügen.
- `Data.Text` auf die [folgende Weise](https://hackernoon.com/4-steps-to-a-better-imports-list-in-haskell-43a3d868273c) importieren:

```haskell
import qualified Data.Text as T
import           Data.Text (Text)
```

- jetzt z. B. `diamond :: Char -> Maybe [Text]` schreiben und `Data.Text`-Kombinatoren als z. B. `T.pack` verwenden,
- die Dokumentation für [`Data.Text`](https://hackage.haskell.org/package/text/docs/Data-Text.html) nachschlagen,
- anschließend alle Vorkommen von `String` in Diamond.hs durch `Text` ersetzen:

```haskell
diamond :: Char -> Maybe [Text]
```

Dieser Teil ist völlig optional.
