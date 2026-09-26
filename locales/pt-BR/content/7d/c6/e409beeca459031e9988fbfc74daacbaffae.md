# Instruções

Neste exercício, você precisa traduzir algumas regras do clássico jogo Pac-Man para funções de Elixir.

Você tem quatro regras para traduzir, todas relacionadas aos estados do jogo.

> Não se preocupe com a forma como os argumentos são obtidos, apenas foque em combinar os argumentos para retornar o resultado esperado.

## 1. Defina se o Pac-Man come um fantasma

Defina a função `Rules.eat_ghost?/2`, que recebe dois argumentos (_se o Pac-Man tem uma pastilha de poder ativa_ e _se o Pac-Man está encostando em um fantasma_) e retorna um valor Boolean indicando se o Pac-Man consegue comer o fantasma. A função deve retornar true apenas se o Pac-Man tiver uma pastilha de poder ativa e estiver encostando em um fantasma.

```elixir
Rules.eat_ghost?(false, true)
# => false
```

## 2. Defina se o Pac-Man pontua

Defina a função `Rules.score?/2`, que recebe dois argumentos (_se o Pac-Man está encostando em uma pastilha de poder_ e _se o Pac-Man está encostando em uma pastilha_) e retorna um valor Boolean indicando se o Pac-Man pontuou. A função deve retornar true se o Pac-Man estiver encostando em uma pastilha de poder ou em uma pastilha.

```elixir
Rules.score?(true, true)
# => true
```

## 3. Defina se o Pac-Man perde

Defina a função `Rules.lose?/2`, que recebe dois argumentos (_se o Pac-Man tem uma pastilha de poder ativa_ e _se o Pac-Man está encostando em um fantasma_) e retorna um valor Boolean indicando se o Pac-Man perdeu. A função deve retornar true se o Pac-Man estiver encostando em um fantasma e não tiver uma pastilha de poder ativa.

```elixir
Rules.lose?(false, true)
# => true
```

## 4. Defina se o Pac-Man vence

Defina a função `Rules.win?/3`, que recebe três argumentos (_se o Pac-Man comeu todas as pastilhas_, _se o Pac-Man tem uma pastilha de poder ativa_ e _se o Pac-Man está encostando em um fantasma_) e retorna um valor Boolean indicando se o Pac-Man venceu. A função deve retornar true se o Pac-Man tiver comido todas as pastilhas e não tiver perdido com base nos argumentos definidos na parte 3.

```elixir
Rules.win?(false, true, false)
# => false
```
