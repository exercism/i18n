# 指示の補足

## ビット演算子

PHPには、[ビット演算子](https://www.php.net/manual/en/language.operators.bitwise.php)があります。

たとえば、ビットAND演算子（`&`）を使うと、数値のあるビットが立っているかどうかを確認できます。

```php
$number = 89; // 0b01011001
$mask16 = 16; // 0b00010000
$mask32 = 32; // 0b00100000

$isMask16 = ($number & $mask16) > 0; // 0b00010000 > 0 => TRUE
$isMask32 = ($number & $mask32) > 0; // 0b00000000 > 0 => FALSE
```
