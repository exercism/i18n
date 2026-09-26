# Introdução

Vetores podem ter elementos nomeados, o que às vezes torna mais conveniente trabalhar com eles.

## Criação

Há três formas de adicionar nomes a um vetor.

1) Na criação do vetor 

```R
> work_days <- c(Mon = TRUE, Tue = TRUE, Wed = TRUE, Thu = TRUE, Fri = TRUE, Sat = FALSE, Sun = FALSE)
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
```

2) Atribuindo um vetor de caracteres a `names()`

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> names(months) <- month.abb
> months
Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec 
 31  28  31  30  31  30  31  31  30  31  30  31 
```

3) Com `setNames()`

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> setNames(months, month.name)
  January  February     March     April       May      June      July    August September   October  November  December 
       31        28        31        30        31        30        31        31        30        31        30        31 
```

## Remoção

Se você não quiser mais os nomes, pode removê-los definindo-os como `NULL`

```R
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
> names(work_days) <- NULL
> work_days
[1]  TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE
```

A função `unname()` faz a mesma coisa e pode deixar sua intenção mais clara.

## Trabalhando com nomes

A função `names()` pode obter os nomes, assim como defini-los.

```R
> names(months) <- month.abb
> names(months)[1:3]
[1] "Jan" "Feb" "Mar"
```

Um nome pode ser usado no lugar do índice de posição, com aspas obrigatórias nesse caso.

```R
> months[c("Jul", "Aug")]
Jul Aug 
 31  31 
```

Para que esse tipo de indexação funcione corretamente, é melhor garantir que os nomes sejam únicos e não estejam ausentes. No entanto, o R não exige unicidade.

As operações usuais com vetores continuam funcionando, e os nomes geralmente são preservados quando isso faz sentido.

```R
> months[months == 30]
Apr Jun Sep Nov 
 30  30  30  30 

> sum(months)
[1] 365  # no meaningful names possible
```
