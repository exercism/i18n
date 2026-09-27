# Istruzioni

Sei un marinaio di coperta che sta rimettendo a posto le casse di carico sulla banchina. Ogni attività è una singola parola il cui corpo usa solo parole di riordino dello stack: niente aritmetica.

## 1. Scambia le due casse in cima

Definisci la parola `swap-crates`. Prende due casse dallo stack e le lascia in ordine inverso.

```factor
1 2 swap-crates .s
! 2
! 1
```

## 2. Elimina la cassa rovesciata

Definisci la parola `clear-spill`. Prende tre casse dallo stack e lascia sul posto le due in basso, scartando quella in cima.

```factor
1 2 3 clear-spill .s
! 1
! 2
```

## 3. Conserva una copia della cassa sottostante

Definisci la parola `peek-under`. Prende due casse dallo stack e le lascia sul posto con una copia della cassa più in basso messa in cima.

```factor
1 2 peek-under .s
! 1
! 2
! 1
```

## 4. Riordina il ponte

Definisci la parola `tidy-deck`. Prende tre casse dallo stack, nell'ordine `x y z`, e lascia `z z y`: scarta la cassa in basso, poi lascia due copie della cassa in cima sotto quella centrale.

```factor
1 2 3 tidy-deck .s
! 3
! 3
! 2
```
