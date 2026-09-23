# Ajout aux instructions

## Opérateurs bit à bit

En PHP, il existe des [opérateurs bit à bit](https://www.php.net/manual/en/language.operators.bitwise.php).

Par exemple, l'opérateur « et » bit à bit (`&`) permet de vérifier qu'un bit d'un nombre est défini :

```php
$number = 89; // 0b01011001
$mask16 = 16; // 0b00010000
$mask32 = 32; // 0b00100000

$isMask16 = ($number & $mask16) > 0; // 0b00010000 > 0 => TRUE
$isMask32 = ($number & $mask32) > 0; // 0b00000000 > 0 => FALSE
```
