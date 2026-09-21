# Kiegészítés az utasításokhoz

## Bitenkénti operátorok

A PHP-ben vannak [bitenkénti operátorok](https://www.php.net/manual/en/language.operators.bitwise.php).

Például a „bitenkénti és” operátor (`&`) használható annak ellenőrzésére, hogy egy szám egy bitje be van állítva:

```php
$number = 89; // 0b01011001
$mask16 = 16; // 0b00010000
$mask32 = 32; // 0b00100000

$isMask16 = ($number & $mask16) > 0; // 0b00010000 > 0 => TRUE
$isMask32 = ($number & $mask32) > 0; // 0b00000000 > 0 => FALSE
```
