# Utasítások kiegészítése

## Kimeneti formátum

A `solve()` metódusnak egy objektumot kell visszaadnia, amely a következő tulajdonságokat tartalmazza:

- `moves` - a cél eléréséhez szükséges vödörműveletek száma
  (a kezdővödör megtöltését is beleértve),
- `goalBucket` - annak a vödörnek a neve, amely elérte a célmennyiséget,
- `otherBucket` - a másik vödörben lévő mennyiség.

Példa:

```json
{
  "moves": 5,
  "goalBucket": "one",
  "otherBucket": 2
}
```
