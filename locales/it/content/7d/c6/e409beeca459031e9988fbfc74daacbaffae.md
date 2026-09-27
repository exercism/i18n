# Istruzioni

In questo esercizio, tradurrai alcune regole del classico gioco Pac-Man in funzioni Elixir.

Hai quattro regole da tradurre, tutte legate agli stati del gioco.

> Non preoccuparti di come vengono ricavati gli argomenti: concentrati solo sul combinarli per restituire il risultato voluto.

## 1. Definisci se Pac-Man mangia un fantasma

Definisci la funzione `Rules.eat_ghost?/2` che accetta due argomenti (_se Pac-Man ha una pillola energetica attiva_ e _se Pac-Man sta toccando un fantasma_) e restituisce un valore booleano che indica se Pac-Man è in grado di mangiare il fantasma. La funzione dovrebbe restituire true solo se Pac-Man ha una pillola energetica attiva e sta toccando un fantasma.

```elixir
Rules.eat_ghost?(false, true)
# => false
```

## 2. Definisci se Pac-Man segna

Definisci la funzione `Rules.score?/2` che accetta due argomenti (_se Pac-Man sta toccando una pillola energetica_ e _se Pac-Man sta toccando un pallino_) e restituisce un valore booleano che indica se Pac-Man ha segnato. La funzione dovrebbe restituire true se Pac-Man sta toccando una pillola energetica o un pallino.

```elixir
Rules.score?(true, true)
# => true
```

## 3. Definisci se Pac-Man perde

Definisci la funzione `Rules.lose?/2` che accetta due argomenti (_se Pac-Man ha una pillola energetica attiva_ e _se Pac-Man sta toccando un fantasma_) e restituisce un valore booleano che indica se Pac-Man perde. La funzione dovrebbe restituire true se Pac-Man sta toccando un fantasma e non ha una pillola energetica attiva.

```elixir
Rules.lose?(false, true)
# => true
```

## 4. Definisci se Pac-Man vince

Definisci la funzione `Rules.win?/3` che accetta tre argomenti (_se Pac-Man ha mangiato tutti i pallini_, _se Pac-Man ha una pillola energetica attiva_ e _se Pac-Man sta toccando un fantasma_) e restituisce un valore booleano che indica se Pac-Man vince. La funzione dovrebbe restituire true se Pac-Man ha mangiato tutti i pallini e non ha perso in base agli argomenti definiti nella parte 3.

```elixir
Rules.win?(false, true, false)
# => false
```
