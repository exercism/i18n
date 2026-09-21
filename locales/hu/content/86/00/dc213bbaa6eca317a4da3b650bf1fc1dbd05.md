# Tippek

## Általános

Csak f-stringeket vagy a `format()` metódust használd, hogy elkészíts egy szórólapot egy esemény alapvető adataival.

- [Bevezetés a stringek formázásába Pythonban][str-f-strings-docs]
- [Cikk a realpython.com oldalon][realpython-article]

## 1. A fejléc nagybetűsítése

- A címet a `str` `capitalize` metódusával írd nagy kezdőbetűvel.

## 2. A dátum formázása

- A `date` értékét kézzel kell formázni `f''` vagy `''.format()` használatával.
- A `date` formátuma ez legyen: 'Month day, year'.

## 3. A unicode karakterek megjelenítése ikonként

- A `format`-tal való megjelenítés egyik módja az `u'{}'` unicode előtag használata.

## 4. Az elkészült szórólap megjelenítése

- Találd meg a megfelelő [format_spec mezőt][formatspec-docs], hogy igazítsd a csillagokat és a karaktereket.
- Az 1. szakasz a `header` nagy kezdőbetűvel írt stringként.
- A 2. szakasz a `date`.
- A 3. szakasz a művészek listája, minden művész ahhoz a unicode karakterhez tartozik, amelynek ugyanaz az indexe.
- Minden sor 20 karakterből álljon.
- Írj tömör kódot, amely beilleszti a szükséges üres sorokat az egyes szakaszok közé.
- Ha a dátum nincs megadva, helyettesítsd egy üres sorral.

```python
******************** # 20 asterisks
*                  *
*     'Header'     * # capitalized header
*                  *
* Month day, year  * # Optional date
*                  *
* Artist1       ⑴ * # Artist list from 1 to 4
* Artist2       ⑵ *
* Artist3       ⑶ *
* Artist4       ⑷ *
*                  *
********************
```

[str-f-strings-docs]: https://docs.python.org/3/reference/lexical_analysis.html#f-strings
[realpython-article]: https://realpython.com/python-formatted-output/
[formatspec-docs]: https://docs.python.org/3/library/string.html#formatspec
