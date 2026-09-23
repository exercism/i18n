# Instructions

Tu es un matelot qui réarrime des caisses de marchandises sur le quai. Chaque tâche est un mot unique dont le corps n'utilise que des mots de réorganisation de la pile, sans aucune arithmétique.

## 1. Échange les deux caisses du haut

Définis le mot `swap-crates`. Il retire deux caisses de la pile et les repose dans l'ordre inverse.

```factor
1 2 swap-crates .s
! 2
! 1
```

## 2. Élimine la caisse renversée

Définis le mot `clear-spill`. Il retire trois caisses de la pile et laisse les deux du bas, en écartant celle du haut.

```factor
1 2 3 clear-spill .s
! 1
! 2
```

## 3. Garde une copie de la caisse du dessous

Définis le mot `peek-under`. Il retire deux caisses de la pile et les repose en plaçant par-dessus une copie de la caisse inférieure.

```factor
1 2 peek-under .s
! 1
! 2
! 1
```

## 4. Range le pont

Définis le mot `tidy-deck`. Il retire trois caisses de la pile, dans l'ordre `x y z`, et laisse derrière lui `z z y` : écarte la caisse du fond, puis place deux copies de la caisse du haut sous celle du milieu.

```factor
1 2 3 tidy-deck .s
! 3
! 3
! 2
```
