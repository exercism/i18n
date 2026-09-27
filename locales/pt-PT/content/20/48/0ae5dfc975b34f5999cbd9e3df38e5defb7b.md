# Introdução

O transbordo aritmético ocorre quando um cálculo, como uma operação aritmética ou uma conversão de tipo, resulta num valor superior à capacidade do tipo que o recebe.

As expressões do tipo `int` e `long` e os seus equivalentes sem sinal dão a volta silenciosamente nestas circunstâncias.

O comportamento dos cálculos com números inteiros pode ser alterado com a palavra-chave `checked`. Quando ocorre um transbordo dentro de um bloco `checked`, é lançada uma instância de `OverflowException`.

```csharp
int one = 1;
checked
{
    int expr = int.MaxValue + one;   // OverflowException is thrown
}

// or

int expr2 = checked(int.MaxValue + one);     // OverflowException is thrown
```

As expressões do tipo `float` e `double` assumem um valor especial de infinito.

As expressões do tipo `decimal` lançam uma instância de `OverflowException`.
