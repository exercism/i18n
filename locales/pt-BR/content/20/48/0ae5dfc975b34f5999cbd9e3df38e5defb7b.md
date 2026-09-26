# Introdução

O estouro aritmético acontece quando um cálculo, como uma operação aritmética ou uma conversão de tipo, resulta em um valor maior que a capacidade do tipo que o recebe.

Expressões do tipo `int` e `long` e suas versões sem sinal simplesmente dão a volta, silenciosamente, nessas circunstâncias.

O comportamento dos cálculos com inteiros pode ser modificado com a palavra-chave `checked`. Quando ocorre um estouro dentro de um bloco `checked`, uma instância de `OverflowException` é lançada.

```csharp
int one = 1;
checked
{
    int expr = int.MaxValue + one;   // OverflowException is thrown
}

// or

int expr2 = checked(int.MaxValue + one);     // OverflowException is thrown
```

Expressões do tipo `float` e `double` assumem um valor especial: o infinito.

Expressões do tipo `decimal` lançam uma instância de `OverflowException`.
