# Introduction

Les vecteurs peuvent avoir des éléments nommés, ce qui les rend parfois plus pratiques à utiliser.

## Création

Il y a trois façons d'ajouter des noms à un vecteur.

1) Au moment de la création du vecteur

```R
> work_days <- c(Mon = TRUE, Tue = TRUE, Wed = TRUE, Thu = TRUE, Fri = TRUE, Sat = FALSE, Sun = FALSE)
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
```

2) En affectant un vecteur de caractères à `names()`

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> names(months) <- month.abb
> months
Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec 
 31  28  31  30  31  30  31  31  30  31  30  31 
```

3) Avec `setNames()`

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> setNames(months, month.name)
  January  February     March     April       May      June      July    August September   October  November  December 
       31        28        31        30        31        30        31        31        30        31        30        31 
```

## Suppression

Si on ne veut plus des noms, on peut les supprimer en les mettant à `NULL`

```R
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
> names(work_days) <- NULL
> work_days
[1]  TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE
```

La fonction `unname()` produit le même résultat, tout en rendant ton intention plus claire.

## Manipuler les noms

La fonction `names()` permet aussi bien de récupérer les noms que de les définir.

```R
> names(months) <- month.abb
> names(months)[1:3]
[1] "Jan" "Feb" "Mar"
```

Un nom peut être utilisé à la place de l'indice de position, avec des guillemets obligatoires dans ce cas.

```R
> months[c("Jul", "Aug")]
Jul Aug 
 31  31 
```

Pour que cette indexation fonctionne correctement, il vaut mieux veiller à ce que les noms soient uniques et qu'aucun ne manque.
Cependant, R n'impose pas l'unicité.

Les opérations habituelles sur les vecteurs fonctionnent toujours, et les noms sont généralement conservés lorsque cela a un sens.

```R
> months[months == 30]
Apr Jun Sep Nov 
 30  30  30  30 

> sum(months)
[1] 365  # no meaningful names possible
```
