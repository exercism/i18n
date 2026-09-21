# Utasítások kiegészítése

## Megvalósítás

A `RestAPI` osztály `get` és `post` metódusát valósítsd meg.

Csak a kezelőfüggvényeket írd meg, valódi HTTP-szervert nem kell megvalósítanod.
Az adatbázist utánozhatod egy memóriabeli objektummal, ami az összes tárolt felhasználót fogja tartalmazni.
A `RestAPI` osztály konstruktorának argumentumként el kell fogadnia az adatbázis egy példányát (és be kell állítania neki egy alapértelmezett értéket, ha nem adtak át argumentumot).

Ennél a megvalósításnál egy `GET` kérésnél a hasznos tartalomnak az URL részét kell képeznie, és úgy kell kezelni, mint a lekérdezési paramétereket, például `/users?users=Adam,Bob`.
