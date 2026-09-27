# Einführung

Vektoren können benannte Elemente haben, was die Arbeit mit ihnen manchmal erleichtert.

## Erstellen

Es gibt drei Möglichkeiten, einem Vektor Namen zu geben.

1) Beim Erstellen des Vektors

```R
> work_days <- c(Mon = TRUE, Tue = TRUE, Wed = TRUE, Thu = TRUE, Fri = TRUE, Sat = FALSE, Sun = FALSE)
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
```

2) Indem du einen Zeichenvektor an `names()` zuweist

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> names(months) <- month.abb
> months
Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec 
 31  28  31  30  31  30  31  31  30  31  30  31 
```

3) Mit `setNames()`

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> setNames(months, month.name)
  January  February     March     April       May      June      July    August September   October  November  December 
       31        28        31        30        31        30        31        31        30        31        30        31 
```

## Entfernen

Wenn die Namen nicht mehr gebraucht werden, kannst du sie entfernen, indem du sie auf `NULL` setzt.

```R
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
> names(work_days) <- NULL
> work_days
[1]  TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE
```

Die Funktion `unname()` erreicht dasselbe und macht deine Absicht vielleicht klarer.

## Mit Namen arbeiten

Mit der Funktion `names()` kannst du Namen nicht nur setzen, sondern auch abrufen.

```R
> names(months) <- month.abb
> names(months)[1:3]
[1] "Jan" "Feb" "Mar"
```

Ein Name kann anstelle des Positionsindex verwendet werden, wobei in diesem Fall Anführungszeichen nötig sind.

```R
> months[c("Jul", "Aug")]
Jul Aug 
 31  31 
```

Damit diese Indizierung korrekt funktioniert, solltest du am besten sicherstellen, dass die Namen eindeutig und nicht fehlend sind.
R erzwingt die Eindeutigkeit jedoch nicht.

Die üblichen Vektoroperationen funktionieren weiterhin, und die Namen bleiben in der Regel erhalten, wenn das sinnvoll ist.

```R
> months[months == 30]
Apr Jun Sep Nov 
 30  30  30  30 

> sum(months)
[1] 365  # no meaningful names possible
```
