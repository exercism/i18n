# Tippek

## 1. Az előforduló szóközöket cseréld aláhúzásjelekre

- [Ez az útmutató][chars-tutorial] hasznos lehet.
- A `char`-ok [referenciadokumentációja][chars-docs] itt található.
- A `char`-okat ugyanúgy kinyerheted egy stringből, mint egy tömb elemeit.
- A kimeneti string összeállításához [`StringBuilder`][string-builder]-t érdemes használni.
- A szóközök felismeréséhez nézd meg [ezt a metódust][iswhitespace]. Ne feledd, hogy statikus metódus.
- A `char` literálokat aposztrófok közé zárjuk.

## 2. A vezérlőkaraktereket cseréld a nagybetűs „CTRL” stringre

- Ha ellenőrizni szeretnéd, hogy egy karakter vezérlőkarakter-e, nézd meg [ezt a metódust][iscontrol].

## 3. A kebab-case-t alakítsd camel-case-re

- A karakter nagybetűvé alakításához nézd meg [ezt a metódust][toupper].

## 4. Hagyd ki a görög kisbetűket

- A `char`-ok támogatják az alapértelmezett egyenlőség- és összehasonlítási operátorokat.

[chars-docs]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/char
[chars-tutorial]: https://csharp.net-tutorials.com/data-types/the-char-type/
[string-builder]: https://docs.microsoft.com/en-us/dotnet/api/system.text.stringbuilder
[iswhitespace]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iswhitespace
[iscontrol]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iscontrol
[toupper]: https://docs.microsoft.com/en-us/dotnet/api/system.char.toupper
[equality]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/equality-operators
[comparison]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/comparison-operators
