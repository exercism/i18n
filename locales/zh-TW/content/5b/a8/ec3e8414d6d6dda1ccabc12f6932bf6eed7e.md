# 指令補充

## 位元運算子

PHP 有[位元運算子](https://www.php.net/manual/en/language.operators.bitwise.php)。

舉例來說，「位元 AND」運算子（`&`）可以用來檢查數字中的某個位元是否已設定：

```php
$number = 89; // 0b01011001
$mask16 = 16; // 0b00010000
$mask32 = 32; // 0b00100000

$isMask16 = ($number & $mask16) > 0; // 0b00010000 > 0 => TRUE
$isMask32 = ($number & $mask32) > 0; // 0b00000000 > 0 => FALSE
```
