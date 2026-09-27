# Instruções

Neste exercício, precisas de traduzir algumas regras do clássico jogo Pac-Man para funções de Elixir.

Tens quatro regras para traduzir, todas relacionadas com os estados do jogo.

> Não te preocupes com a forma como os argumentos são obtidos, concentra-te apenas em combinar os argumentos para devolver o resultado pretendido.

## 1. Define se o Pac-Man come um fantasma

Define a função `Rules.eat_ghost?/2`, que recebe dois argumentos (_se o Pac-Man tem uma pastilha de energia ativa_ e _se o Pac-Man está a tocar num fantasma_) e devolve um valor Boolean que indica se o Pac-Man consegue comer o fantasma. A função só deve devolver true se o Pac-Man tiver uma pastilha de energia ativa e estiver a tocar num fantasma.

```elixir
Rules.eat_ghost?(false, true)
# => false
```

## 2. Define se o Pac-Man pontua

Define a função `Rules.score?/2`, que recebe dois argumentos (_se o Pac-Man está a tocar numa pastilha de energia_ e _se o Pac-Man está a tocar num ponto_) e devolve um valor Boolean que indica se o Pac-Man pontuou. A função deve devolver true se o Pac-Man estiver a tocar numa pastilha de energia ou num ponto.

```elixir
Rules.score?(true, true)
# => true
```

## 3. Define se o Pac-Man perde

Define a função `Rules.lose?/2`, que recebe dois argumentos (_se o Pac-Man tem uma pastilha de energia ativa_ e _se o Pac-Man está a tocar num fantasma_) e devolve um valor Boolean que indica se o Pac-Man perde. A função deve devolver true se o Pac-Man estiver a tocar num fantasma e não tiver uma pastilha de energia ativa.

```elixir
Rules.lose?(false, true)
# => true
```

## 4. Define se o Pac-Man ganha

Define a função `Rules.win?/3`, que recebe três argumentos (_se o Pac-Man comeu todos os pontos_, _se o Pac-Man tem uma pastilha de energia ativa_ e _se o Pac-Man está a tocar num fantasma_) e devolve um valor Boolean que indica se o Pac-Man ganha. A função deve devolver true se o Pac-Man tiver comido todos os pontos e não tiver perdido, de acordo com os argumentos definidos na parte 3.

```elixir
Rules.win?(false, true, false)
# => false
```
