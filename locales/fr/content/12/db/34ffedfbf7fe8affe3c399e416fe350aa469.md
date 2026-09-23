# Instructions

Dans cet exercice, on va mettre en place la gestion des erreurs d'une calculatrice simple pour nombres entiers. Pour simplifier, des méthodes permettant de calculer une addition, une multiplication et une division sont fournies.

L'objectif est d'obtenir une calculatrice fonctionnelle qui renvoie une _string_ selon le modèle suivant : `16 + 51 = 67`, lorsqu'on lui passe les arguments `16`, `51` et `+`.

```csharp
SimpleCalculator.Calculate(16, 51, "+"); // => returns "16 + 51 = 67"

SimpleCalculator.Calculate(32, 6, "*"); // => returns "32 * 6 = 192"

SimpleCalculator.Calculate(512, 4, "/"); // => returns "512 / 4 = 128"
```

## 1. Implémente les opérations de la calculatrice

La principale méthode à implémenter dans cette tâche sera la méthode (_statique_) `SimpleCalculator.Calculate()`. Elle prend trois arguments. Les deux premiers arguments sont des nombres entiers sur lesquels une opération va être effectuée. Le troisième argument est de type _string_ et, pour cet exercice, il est nécessaire d'implémenter les opérations suivantes :

- l'addition avec la _string_ `+`
- la multiplication avec la _string_ `*`
- la division avec la _string_ `/`

## 2. Gère les opérations illégales

Tout autre symbole d'opération doit lever l'exception `ArgumentOutOfRangeException`. Si l'argument d'opération est une _string_ vide, la méthode doit lever l'exception `ArgumentException`. Lorsque `null` est passé comme argument d'opération, la méthode doit lever l'exception `ArgumentNullException`.

```csharp
SimpleCalculator.Calculate(100, 10, "-"); // => throws ArgumentOutOfRangeException

SimpleCalculator.Calculate(8, 2, ""); // => throws ArgumentException

SimpleCalculator.Calculate(58, 6, null); // => throws ArgumentNullException
```

## 3. Gère les erreurs de division par zéro

Lorsqu'on tente de diviser par `0`, la calculatrice doit renvoyer une _string_ contenant `Division by zero is not allowed.`. Toute autre exception ne doit pas être gérée par la méthode `SimpleCalculator.Calculate()`.

```csharp
SimpleCalculator.Calculate(512, 0, "/"); // => returns "Division by zero is not allowed."
```
