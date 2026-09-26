# Instruções

Você é um tripulante de convés que está reorganizando caixas de carga no cais. Cada tarefa é uma única palavra cujo corpo usa apenas palavras de embaralhamento, sem aritmética.

## 1. Troque as duas caixas de cima

Defina a palavra `swap-crates`. Ela tira duas caixas da pilha e as deixa em ordem inversa.

```factor
1 2 swap-crates .s
! 2
! 1
```

## 2. Remova a caixa derramada

Defina a palavra `clear-spill`. Ela tira três caixas da pilha e deixa as duas de baixo, descartando a de cima.

```factor
1 2 3 clear-spill .s
! 1
! 2
```

## 3. Guarde uma cópia da caixa de baixo

Defina a palavra `peek-under`. Ela tira duas caixas da pilha e as deixa com uma cópia da caixa de baixo em cima.

```factor
1 2 peek-under .s
! 1
! 2
! 1
```

## 4. Organize o convés

Defina a palavra `tidy-deck`. Ela tira três caixas da pilha, na ordem `x y z`, e deixa `z z y`: descarte a caixa de baixo e depois deixe duas cópias da caixa de cima por baixo da caixa do meio.

```factor
1 2 3 tidy-deck .s
! 3
! 3
! 2
```
