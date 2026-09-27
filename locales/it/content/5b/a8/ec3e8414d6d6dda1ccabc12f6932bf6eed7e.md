# Appendice alle istruzioni

## Operatori bit a bit

In PHP esistono gli [operatori bit a bit](https://www.php.net/manual/en/language.operators.bitwise.php).

Ad esempio, l'operatore «bitwise and» (`&`) può essere usato per verificare che un bit di un numero sia definito:

```php
$number = 89; // 0b01011001
$mask16 = 16; // 0b00010000
$mask32 = 32; // 0b00100000

$isMask16 = ($number & $mask16) > 0; // 0b00010000 > 0 => TRUE
$isMask32 = ($number & $mask32) > 0; // 0b00000000 > 0 => FALSE
```
