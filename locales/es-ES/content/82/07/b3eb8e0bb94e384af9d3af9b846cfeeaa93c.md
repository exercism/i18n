# Apéndice de las instrucciones

## Formato de salida

Se espera que el método `solve()` devuelva un objeto con estas propiedades:

- `moves` - el número de acciones con los cubos necesarias para alcanzar el objetivo
  (incluye llenar el cubo de partida),
- `goalBucket` - el nombre del cubo que alcanzó la cantidad objetivo,
- `otherBucket` - la cantidad que contiene el otro cubo.

Ejemplo:

```json
{
  "moves": 5,
  "goalBucket": "one",
  "otherBucket": 2
}
```
