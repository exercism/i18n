# ملحق التعليمات

## عوامل البتات

توفّر PHP [عوامل البتات](https://www.php.net/manual/en/language.operators.bitwise.php).

على سبيل المثال، يمكن استخدام العامل «و» على مستوى البت (`&`) للتحقق من أن بتًّا معيّنًا في العدد مضبوط على 1:

```php
$number = 89; // 0b01011001
$mask16 = 16; // 0b00010000
$mask32 = 32; // 0b00100000

$isMask16 = ($number & $mask16) > 0; // 0b00010000 > 0 => TRUE
$isMask32 = ($number & $mask32) > 0; // 0b00000000 > 0 => FALSE
```
