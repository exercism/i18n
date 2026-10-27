# Dicas

## Geral

- Usa `match` com `[]` e `[card, .. as rest]` para distinguir um baralho vazio da carta seguinte e das cartas restantes.

- Atualizações de registo como `{ ..state, pile: new_pile }` mantêm as transições do jogo explícitas, sem estado mutável.

- Um `Set` pode guardar tuplos ou listas como chaves quando acompanhas estados do jogo já vistos.
