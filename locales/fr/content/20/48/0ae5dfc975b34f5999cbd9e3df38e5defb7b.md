# Introduction

Un dépassement arithmétique se produit lorsqu'un calcul, comme une opération arithmétique ou une conversion de type, donne une valeur supérieure à la capacité du type de destination.

Les expressions de type `int` et `long`, ainsi que leurs homologues non signés, boucleront silencieusement dans ce cas de figure.

Le comportement des calculs sur les entiers peut être modifié à l'aide du mot-clé `checked`. Lorsqu'un dépassement se produit à l'intérieur d'un bloc `checked`, une instance de `OverflowException` est levée.

```csharp
int one = 1;
checked
{
    int expr = int.MaxValue + one;   // OverflowException is thrown
}

// or

int expr2 = checked(int.MaxValue + one);     // OverflowException is thrown
```

Les expressions de type `float` et `double` prendront une valeur spéciale, l'infini.

Les expressions de type `decimal` lèveront une instance de `OverflowException`.
