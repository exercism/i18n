# 指令补充

## 位运算符

PHP 中有[位运算符](https://www.php.net/manual/en/language.operators.bitwise.php)。

例如，可以用“按位与”运算符（`&`）来检查某个数字的某一位是否已置位：

```php
$number = 89; // 0b01011001
$mask16 = 16; // 0b00010000
$mask32 = 32; // 0b00100000

$isMask16 = ($number & $mask16) > 0; // 0b00010000 > 0 => TRUE
$isMask32 = ($number & $mask32) > 0; // 0b00000000 > 0 => FALSE
```
