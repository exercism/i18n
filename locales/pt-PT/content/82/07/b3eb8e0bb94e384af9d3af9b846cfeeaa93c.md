# Anexo às instruções

## Formato da saída

Espera-se que o método `solve()` devolva um objeto com estas propriedades:

- `moves` - o número de ações sobre os baldes necessárias para atingir o objetivo
  (inclui encher o balde inicial),
- `goalBucket` - o nome do balde que atingiu a quantidade pretendida,
- `otherBucket` - a quantidade contida no outro balde.

Exemplo:

```json
{
  "moves": 5,
  "goalBucket": "one",
  "otherBucket": 2
}
```
