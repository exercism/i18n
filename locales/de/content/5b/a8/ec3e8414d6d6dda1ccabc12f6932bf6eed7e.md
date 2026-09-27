# Ergänzung zu den Anweisungen

## Bit-Operatoren

In PHP gibt es [Bit-Operatoren](https://www.php.net/manual/en/language.operators.bitwise.php).

Zum Beispiel kannst du den Operator „bitweises UND“ (`&`) verwenden, um zu prüfen, ob ein Bit einer Zahl gesetzt ist:

```php
$number = 89; // 0b01011001
$mask16 = 16; // 0b00010000
$mask32 = 32; // 0b00100000

$isMask16 = ($number & $mask16) > 0; // 0b00010000 > 0 => TRUE
$isMask32 = ($number & $mask32) > 0; // 0b00000000 > 0 => FALSE
```
