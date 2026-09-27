# Introdução

Os vetores podem ter elementos com nomes, o que por vezes os torna mais práticos de usar.

## Criação

Há três formas de adicionar nomes a um vetor.

1) No momento da criação do vetor 

```R
> work_days <- c(Mon = TRUE, Tue = TRUE, Wed = TRUE, Thu = TRUE, Fri = TRUE, Sat = FALSE, Sun = FALSE)
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
```

2) Atribuindo um vetor de carateres a `names()`

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

Se já não quiseres os nomes, podes removê-los definindo-os como `NULL`

```R
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
> names(work_days) <- NULL
> work_days
[1]  TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE
```

A função `unname()` faz o mesmo e pode tornar a tua intenção mais clara.

## Trabalhar com nomes

A função `names()` tanto pode obter nomes como defini-los.

```R
> names(months) <- month.abb
> names(months)[1:3]
[1] "Jan" "Feb" "Mar"
```

Podes usar um nome em vez do índice da posição; neste caso, as aspas são obrigatórias.

```R
> months[c("Jul", "Aug")]
Jul Aug 
 31  31 
```

Para que este tipo de indexação funcione corretamente, o melhor é garantir que os nomes são únicos e que não estão em falta.
No entanto, o R não obriga a que sejam únicos.

As operações habituais com vetores continuam a funcionar, e os nomes são normalmente preservados se isso fizer sentido.

```R
> months[months == 30]
Apr Jun Sep Nov 
 30  30  30  30 

> sum(months)
[1] 365  # no meaningful names possible
```
