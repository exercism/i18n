# Dicas

## Geral

- Use `match` com `[]` e `[card, .. as rest]` para distinguir um baralho vazio da próxima carta e das cartas restantes.

- Atualizações de registro como `{ ..state, pile: new_pile }` podem manter as transições do jogo explícitas sem estado mutável.

- Um `Set` pode armazenar tuplas ou listas como chaves ao acompanhar estados do jogo já vistos.
