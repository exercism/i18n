# Anexo a las instrucciones

## Formato de salida

Se espera que el método `solve()` devuelva un objeto con estas propiedades:

- `moves` - la cantidad de acciones con los baldes necesarias para alcanzar el objetivo
  (incluye llenar el balde inicial),
- `goalBucket` - el nombre del balde que alcanzó la cantidad objetivo,
- `otherBucket` - la cantidad que contiene el otro balde.

Ejemplo:

```json
{
  "moves": 5,
  "goalBucket": "one",
  "otherBucket": 2
}
```
