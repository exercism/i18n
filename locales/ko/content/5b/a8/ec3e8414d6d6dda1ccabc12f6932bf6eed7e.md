# 지침 추가

## 비트 연산자

PHP에는 [비트 연산자](https://www.php.net/manual/en/language.operators.bitwise.php)가 있어요.

예를 들어, "비트 AND" 연산자(`&`)를 사용하면 숫자의 특정 비트가 정의되어 있는지 확인할 수 있어요:

```php
$number = 89; // 0b01011001
$mask16 = 16; // 0b00010000
$mask32 = 32; // 0b00100000

$isMask16 = ($number & $mask16) > 0; // 0b00010000 > 0 => TRUE
$isMask32 = ($number & $mask32) > 0; // 0b00000000 > 0 => FALSE
```
