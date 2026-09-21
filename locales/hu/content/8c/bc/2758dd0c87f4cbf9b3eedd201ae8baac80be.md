# Tippek

## Általános

- Olvass a stringekről a hivatalos [string típus dokumentációban][string-type-documentation].
- Böngészd a [rendelkezésre álló _string függvényeket_][string-functions], hogy megismerd a stringek beépített műveleteit.

## 1. Kérd le a név első betűjét

- Van egy [beépített függvény][string-substr], amivel lekérheted egy string első karakterét.
- Több [beépített függvény][string-trim] is létezik, amelyek eltávolítják a whitespace karaktereket a string elejéről, a végéről, vagy mindkettőről.

## 2. Formázd az első betűt kezdőbetűvé

- Van egy [beépített függvény][string-upcase], amely a string összes karakterét nagybetűsre alakítja.
- Van egy [operátor][concat-operator], amely összefűz két stringet.

## 3. Bontsd fel a teljes nevet keresztnévre és vezetéknévre

- Van egy [beépített függvény][string-explode], amely egy stringet egy másik string mentén bont fel.
- A lista első néhány eleme változókhoz rendelhető mintaillesztéssel.

## 4. Tedd a kezdőbetűket a szív belsejébe

- Van egy speciális szintaxis, amellyel [változókat helyettesíthetsz be][string-variables] egy stringen belül.
- Van egy speciális szintaxis a [többsoros stringek][heredoc-syntax] írására, amivel nem kell escape-elni a sortöréseket.

[string-type-documentation]: https://www.php.net/manual/en/language.types.string.php
[string-functions]: https://www.php.net/manual/en/ref.strings.php 
[string-substr]: https://www.php.net/manual/en/function.substr.php 
[string-trim]: https://www.php.net/manual/en/function.trim.php 
[string-upcase]: https://www.php.net/manual/en/function.strtoupper.php
[string-explode]: https://www.php.net/manual/en/function.explode.php
[string-variables]: https://www.php.net/manual/en/language.types.string.php#language.types.string.parsing 
[concat-operator]: https://www.php.net/manual/en/language.operators.string.php
[heredoc-syntax]: https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc
