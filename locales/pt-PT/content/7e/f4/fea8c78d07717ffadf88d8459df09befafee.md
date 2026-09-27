# Instruções

És um marinheiro a voltar a arrumar as caixas de carga no cais. Cada tarefa é
uma única palavra cujo corpo usa apenas palavras de baralhamento, sem
aritmética.

## 1. Troca as duas caixas de cima

Define a palavra `swap-crates`. Retira duas caixas da pilha e deixa-as ficar
na ordem oposta.

```factor
1 2 swap-crates .s
! 2
! 1
```

## 2. Limpa a caixa entornada

Define a palavra `clear-spill`. Retira três caixas da pilha e deixa ficar as
duas de baixo, descartando a de cima.

```factor
1 2 3 clear-spill .s
! 1
! 2
```

## 3. Guarda uma cópia da caixa de baixo

Define a palavra `peek-under`. Retira duas caixas da pilha e deixa-as ficar
com uma cópia da caixa de baixo colocada por cima.

```factor
1 2 peek-under .s
! 1
! 2
! 1
```

## 4. Arruma o convés

Define a palavra `tidy-deck`. Retira três caixas da pilha, na ordem
`x y z`, e deixa ficar `z z y`: descarta a caixa de baixo e deixa duas
cópias da caixa de cima debaixo da do meio.

```factor
1 2 3 tidy-deck .s
! 3
! 3
! 2
```
