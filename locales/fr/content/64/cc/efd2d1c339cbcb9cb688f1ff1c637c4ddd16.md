# Introduction

En C#, un tuple est une structure de données qui organise des données et contient deux champs ou plus, de n'importe quel type.

On crée généralement un tuple en plaçant deux expressions ou plus, séparées par des virgules, entre parenthèses.

```csharp
string boast = "All you need to know";
bool success = !string.IsNullOrWhiteSpace(boast);
(bool, int, string) triple = (success, 42, boast);
```

Un tuple peut servir dans des opérations d'affectation et d'initialisation, comme valeur de retour ou comme argument de méthode.

On extrait les champs avec la syntaxe point. Par défaut, le premier champ s'appelle `Item1`, le deuxième `Item2`, etc. Les noms non par défaut sont abordés plus bas.

```csharp
// initialization
(int, int, int) vertices = (90, 45, 45);

// assignment
vertices = (60, 60, 60);

//  return value
(bool, int) GetSameOrBigger(int num1, int num2)
{
    return (num1 == num2, num1 > num2 ? num1 : num2);
}

// method argument
int Add((int, int) operands)
{
    return operands.Item1 + operands.Item2;
}
```

Les noms de champs comme `Item1` ne donnent pas un code très lisible. Le code ci-dessous montre deux façons de nommer les champs des tuples. Remarque aussi, dans le code ci-dessous, que `var` peut s'utiliser avec les tuples, le type étant alors inféré. Cela fonctionne tout aussi bien pour les tuples dont les champs sont nommés que pour ceux dont les champs ne le sont pas.

```csharp
// name items in declaration
(bool success, string message) results = (true, "well done!");
bool mySuccess = results.success;
string myMessage = results.message;

// name items in creating expression
var results2 = (success: true, message: "well done!");
bool mySuccess2 = results2.success;
string myMessage2 = results2.message;
```
