# Ergänzung zu den Anweisungen

## Rasterformat

Das Raster wird als nullterminierter String dargestellt, mit einem Zeilenumbruch am Ende jeder Zeile.

## Register

| Register | Verwendung   | Typ     | Beschreibung                                                              |
| -------- | ------------ | ------- | ------------------------------------------------------------------------- |
| `$a0`    | Eingabe      | Adresse | nullterminierter Eingabe-String                                           |
| `$a1`    | Eingabe/Ausgabe | Adresse | nullterminierter Ergebnis-String, leer, wenn die Rastermaße ungültig sind |
| `$v0`    | Ausgabe      | Ganzzahl | Rasterstatus (`0` = `ok`, `-1` = `invalid columns`, `-2` = `invalid rows`) |
| `$t0-9`  | temporär     | beliebig | zur temporären Speicherung                                               |
