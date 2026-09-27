# Hinweise

## 1. Ersetze alle vorkommenden Leerzeichen durch Unterstriche

- [Dieses Tutorial][chars-tutorial] ist hilfreich.
- Die [Referenzdokumentation][chars-docs] zu `char` findest du hier.
- Du kannst `char`s genauso aus einem String herauslesen wie Elemente aus einem Array.
- Um den Ausgabe-String aufzubauen, solltest du einen [`StringBuilder`][string-builder] verwenden.
- Sieh dir [diese Methode][iswhitespace] an, um Leerzeichen zu erkennen. Denk daran, dass es eine statische Methode ist.
- `char`-Literale stehen in einfachen Anführungszeichen.

## 2. Ersetze Steuerzeichen durch den String „CTRL“ in Großbuchstaben

- Sieh dir [diese Methode][iscontrol] an, um zu prüfen, ob ein Zeichen ein Steuerzeichen ist.

## 3. Wandle Kebab-Case in Camel-Case um

- Sieh dir [diese Methode][toupper] an, um ein Zeichen in einen Großbuchstaben umzuwandeln.

## 4. Lass griechische Kleinbuchstaben weg

- `char`s unterstützen die Standardoperatoren für Gleichheit und Vergleich.

[chars-docs]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/char
[chars-tutorial]: https://csharp.net-tutorials.com/data-types/the-char-type/
[string-builder]: https://docs.microsoft.com/en-us/dotnet/api/system.text.stringbuilder
[iswhitespace]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iswhitespace
[iscontrol]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iscontrol
[toupper]: https://docs.microsoft.com/en-us/dotnet/api/system.char.toupper
[equality]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/equality-operators
[comparison]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/comparison-operators
