# Dicas

## 1. Identifique qual aplicação emitiu um log

- A palavra-chave `range` pode ser usada para iterar sobre os runes de uma determinada string.
- Runes podem ser comparados com outros runes usando uma condicional `if`.
- Um caractere entre aspas simples é um `rune` em Go.

## 2. Corrija logs corrompidos

- A concatenação de strings pode ser usada para montar a linha de log modificada rune por rune.
- Para que essa concatenação funcione, pode ser preciso converter cada `rune` para string antes.
- Você pode converter um rune `r` para `string` com `string(r)`.

## 3. Determine se um log pode ser exibido

- Runes podem ter 1, 2, 3 ou 4 bytes, então a função embutida `len` pode não refletir com precisão o número de caracteres de uma string.
