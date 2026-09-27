# Einführung

## Methodenüberladung

_Methodenüberladung_ ermöglicht es, dass mehrere Methoden in derselben Klasse denselben Namen haben. Überladene Methoden müssen sich in mindestens einem der folgenden Punkte voneinander unterscheiden:

- Die Anzahl der Parameter
- Der Typ der Parameter

Eine Methodenüberladung anhand des Rückgabetyps gibt es nicht.

Der Compiler leitet automatisch ab, welche überladene Methode aufgerufen werden soll, und zwar anhand der Anzahl der Parameter und ihres Typs.

## Benannte Argumente

Bisher haben wir gesehen, dass die Argumente, die an eine Methode übergeben werden, anhand ihrer Position den deklarierten Parametern der Methode zugeordnet werden. Eine alternative Vorgehensweise, insbesondere wenn eine Routine eine große Anzahl von Argumenten entgegennimmt, besteht darin, dass der Aufrufer Argumente zuordnen kann, indem er den Bezeichner des deklarierten Parameters angibt.

Das Folgende veranschaulicht die Syntax:

```csharp
class Card
{
    static string NewYear(int year, int month, int day)
    {
        return $"Happy {year}-{month}-{day}!";
    }
}

Card.NewYear(month: 1, day: 1, year: 2020);  // => "Happy 2020-1-1!"
```

## Optionale Parameter

Ein Methodenparameter kann optional gemacht werden, indem man ihm einen Standardwert zuweist. Beim Aufruf einer Methode mit optionalen Parametern ist der Aufrufer nicht verpflichtet, einen Wert für sie zu übergeben. Wird kein Wert für einen optionalen Parameter übergeben, wird sein Standardwert verwendet.

Optionale Parameter _müssen_ am Ende der Parameterliste stehen; auf sie dürfen keine nicht-optionalen Parameter folgen.

```csharp
class Card
{
    static string NewYear(int year = 2020)
    {
        return $"Happy {year}!";
    }
}

Card.NewYear();     // => "Happy 2020!"
Card.NewYear(1999); // => "Happy 1999!"
```
