# Istruzioni appendice

## Formato dell'output

Il metodo `solve()` deve restituire un oggetto con queste proprietà:

- `moves`: il numero di azioni necessarie per raggiungere l'obiettivo (include il riempimento del secchio iniziale),
- `goalBucket`: il nome del secchio che ha raggiunto la quantità obiettivo,
- `otherBucket`: la quantità contenuta nell'altro secchio.

Esempio:

```json
{
  "moves": 5,
  "goalBucket": "one",
  "otherBucket": 2
}
```
