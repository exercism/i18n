# Apéndice de instrucciones

## Operadores bit a bit

En PHP existen los [operadores bit a bit](https://www.php.net/manual/en/language.operators.bitwise.php).

Por ejemplo, el operador «bitwise and» (`&`) se puede usar para comprobar que un bit de un número está definido:

```php
$number = 89; // 0b01011001
$mask16 = 16; // 0b00010000
$mask32 = 32; // 0b00100000

$isMask16 = ($number & $mask16) > 0; // 0b00010000 > 0 => TRUE
$isMask32 = ($number & $mask32) > 0; // 0b00000000 > 0 => FALSE
```
