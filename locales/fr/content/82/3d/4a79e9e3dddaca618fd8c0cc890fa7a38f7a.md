# Introduction

## Surcharge de méthodes

La surcharge de méthodes permet à plusieurs méthodes d'une même classe de porter le même nom. Les méthodes surchargées doivent différer les unes des autres par :

- Le nombre de paramètres
- Le type des paramètres

Il n'existe pas de surcharge de méthodes en fonction du type de retour.

Le compilateur déduit automatiquement quelle méthode surchargée appeler en fonction du nombre de paramètres et de leur type.

## Arguments nommés

Jusqu'à présent, on a vu que les arguments passés à une méthode sont associés aux paramètres déclarés de la méthode en fonction de leur position. Une autre approche, notamment lorsqu'une routine prend un grand nombre d'arguments, permet à l'appelant de faire correspondre les arguments en précisant l'identifiant du paramètre déclaré.

L'exemple suivant illustre la syntaxe :

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

## Paramètres optionnels

Un paramètre de méthode peut être rendu optionnel en lui attribuant une valeur par défaut. Lorsqu'on appelle une méthode avec des paramètres optionnels, l'appelant n'est pas obligé de passer une valeur pour ceux-ci. Si aucune valeur n'est passée pour un paramètre optionnel, sa valeur par défaut est utilisée.

Les paramètres optionnels _doivent_ se trouver à la fin de la liste de paramètres ; ils ne peuvent pas être suivis de paramètres obligatoires.

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
