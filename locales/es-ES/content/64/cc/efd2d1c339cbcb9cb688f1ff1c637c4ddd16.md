# Introducción

En C#, una tupla es una estructura de datos que organiza datos y contiene dos o más campos de cualquier tipo.

Una tupla se suele crear colocando 2 o más expresiones separadas por comas entre paréntesis.

```csharp
string boast = "All you need to know";
bool success = !string.IsNullOrWhiteSpace(boast);
(bool, int, string) triple = (success, 42, boast);
```

Una tupla se puede usar en operaciones de asignación e inicialización, como valor devuelto o como argumento de un método.

Los campos se extraen con la sintaxis de punto. Por defecto, el primer campo es `Item1`, el segundo, `Item2`, etc. Los nombres no predeterminados se explican a continuación.

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

Los nombres de campo `Item1`, etc., no hacen que el código sea legible. El código siguiente muestra 2 formas de nombrar los campos de las tuplas. Fíjate también en que, en el código siguiente, se puede usar `var` con tuplas y el tipo se infiere. Esto funciona igual de bien para tuplas con campos con nombre y sin nombre.

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
