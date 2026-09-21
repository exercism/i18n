# Bevezetés

A lebegőpontos szám olyan szám, amelynek a tizedesjel mögött nulla vagy több számjegy áll. Például `-2.4`, `0.1`, `3.14`, `16.984025` és `1024.0`.

A különböző lebegőpontos típusok a tizedesjel mögött különböző számú számjegyet tudnak tárolni. Ezt nevezzük pontosságnak.

A C#-ban három lebegőpontos típus van:

- `float`: 4 bájt (~6-9 számjegy pontosság). Írásmód: `2.45f`.
- `double`: 8 bájt (~15-17 számjegy pontosság). Ez a leggyakoribb típus. Írásmód: `2.45` vagy `2.45d`.
- `decimal`: 16 bájt (28-29 számjegy pontosság). Általában pénzügyi adatok kezelésekor használjuk, mert a pontossága révén kevesebb kerekítési hiba adódik. Írásmód: `2.45m`.

Ahogy látható, mindegyik típus más számú számjegyet tud tárolni. Ez azt jelenti, hogy ha a PI-t egy `float`-ban tárolod, csak az első 6-9 számjegyet fogja megőrizni (az utolsó számjegy kerekítve lesz).
