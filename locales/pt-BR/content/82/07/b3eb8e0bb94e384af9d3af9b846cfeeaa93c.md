# Complemento das instruções

## Formato da saída

Espera-se que o método `solve()` retorne um objeto com estas propriedades:

- `moves` - o número de ações com os baldes necessárias para atingir o objetivo
  (inclui encher o balde inicial),
- `goalBucket` - o nome do balde que alcançou a quantidade do objetivo,
- `otherBucket` - a quantidade contida no outro balde.

Exemplo:

```json
{
  "moves": 5,
  "goalBucket": "one",
  "otherBucket": 2
}
```
