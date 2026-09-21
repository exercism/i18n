# Kiegészítés az utasításokhoz

## A rács formátuma

A rácsot nullával lezárt stringként ábrázoljuk, minden sor végén egy újsor karakter áll.

## Regiszterek

| Regiszter | Használat    | Típus   | Leírás                                                                    |
| --------- | ------------ | ------- | ------------------------------------------------------------------------- |
| `$a0`     | bemenet      | cím     | nullával lezárt bemeneti string                                           |
| `$a1`     | bemenet/kimenet | cím  | nullával lezárt eredmény string, üres, ha a rács méretei érvénytelenek    |
| `$v0`     | kimenet      | egész szám | a rács állapota (`0` = `ok`, `-1` = `invalid columns`, `-2` = `invalid rows`) |
| `$t0-9`   | ideiglenes   | bármilyen | ideiglenes tárolásra                                                    |
