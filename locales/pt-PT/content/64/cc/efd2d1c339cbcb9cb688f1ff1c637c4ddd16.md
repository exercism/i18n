# Introdução

Em C#, um tuplo é uma estrutura de dados que organiza dados e que contém dois ou mais campos de qualquer tipo.

Normalmente, um tuplo cria-se colocando duas ou mais expressões separadas por vírgulas entre parênteses.

```csharp
string boast = "All you need to know";
bool success = !string.IsNullOrWhiteSpace(boast);
(bool, int, string) triple = (success, 42, boast);
```

Um tuplo pode ser usado em operações de atribuição e de inicialização, como valor devolvido ou como argumento de um método.

Os campos são extraídos com a sintaxe de ponto. Por predefinição, o primeiro campo é `Item1`, o segundo `Item2`, etc. Os nomes que não sejam os predefinidos são abordados mais abaixo.

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

Nomes de campos como `Item1` não tornam o código legível. O código abaixo mostra duas formas de dar nome aos campos de um tuplo. Repara também, no código abaixo, que `var` pode ser usado com tuplos e que o tipo é inferido. Isto funciona igualmente bem com tuplos com campos com nome e campos sem nome.

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
