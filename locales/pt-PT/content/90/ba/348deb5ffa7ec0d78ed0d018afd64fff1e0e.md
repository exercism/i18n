# Dicas

## 1. Identifica que aplicação emitiu um registo

- Podes usar a palavra-chave `range` para iterar sobre os runes de uma determinada string.
- Podes comparar runes com outros runes usando uma condicional `if`.
- Em Go, um caráter entre plicas é um `rune`.

## 2. Corrige registos corrompidos

- Podes usar a concatenação de strings para construir a linha de registo modificada, rune a rune.
- Para essa concatenação funcionar, pode ser necessário converter cada `rune` em string primeiro.
- Podes converter um rune `r` em `string` com `string(r)`.

## 3. Determina se um registo pode ser mostrado

- Os runes podem ter 1, 2, 3 ou 4 bytes, por isso a função incorporada `len` pode não refletir com exatidão o número de carateres de uma string.
