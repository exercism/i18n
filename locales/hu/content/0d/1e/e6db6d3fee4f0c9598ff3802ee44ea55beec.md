# Bevezetés

## Fájl

A fájlokkal való munkához szükséges függvényeket a `File` modul biztosítja.

Egy teljes fájl beolvasásához használd a `File.read/1` függvényt. Fájlba íráshoz a `File.write/2` függvényt használd.

Valahányszor `File.write/2`-vel írsz fájlba, megnyílik egy fájlleíró, és elindul egy új Elixir [folyamat][exercism-processes]. Ezért érdemes elkerülni, hogy ciklusban `File.write/2`-vel írj fájlba.

Ehelyett a fájlt a `File.open/2` függvénnyel nyithatod meg. A `File.open/2` második argumentuma a módok listája, amellyel megadhatod, hogy olvasásra vagy írásra szeretnéd megnyitni a fájlt.

A `File.open/2` egy folyamat PID-jét adja vissza, amely kezeli a fájlt. A fájl olvasásához és írásához az `IO` modul függvényeit használd, és add át ezt a PID-et IO-eszközként.

Amikor végeztél a fájllal, zárd be a `File.close/1` függvénnyel.

A `File` modul összes említett függvényének van egy `!` jelű változata is, amely hibát dob ahelyett, hogy egy hibát jelző tuple-t adna vissza (például `File.read!/1`). Ezt a változatot akkor használd, ha nem akarod kezelni az olyan hibákat, mint a hiányzó fájlok vagy a hiányzó jogosultságok.

[exercism-processes]: https://exercism.org/tracks/elixir/concepts/processes
