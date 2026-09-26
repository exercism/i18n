# Instruções

Neste exercício você vai construir o tratamento de erros para uma calculadora simples de números inteiros. Para simplificar, os métodos para calcular adição, multiplicação e divisão já são fornecidos.

O objetivo é ter uma calculadora funcionando que retorna uma string com o seguinte padrão: `16 + 51 = 67`, quando receber os argumentos `16`, `51` e `+`.

```csharp
SimpleCalculator.Calculate(16, 51, "+"); // => returns "16 + 51 = 67"

SimpleCalculator.Calculate(32, 6, "*"); // => returns "32 * 6 = 192"

SimpleCalculator.Calculate(512, 4, "/"); // => returns "512 / 4 = 128"
```

## 1. Implemente as operações da calculadora

O principal método a implementar nesta tarefa será o método (_static_) `SimpleCalculator.Calculate()`. Ele recebe três argumentos. Os dois primeiros argumentos são números inteiros sobre os quais uma operação será realizada. O terceiro argumento é do tipo string e, para este exercício, é necessário implementar as seguintes operações:

- adição usando a string `+`
- multiplicação usando a string `*`
- divisão usando a string `/`

## 2. Trate operações inválidas

Qualquer outro símbolo de operação deve lançar a exceção `ArgumentOutOfRangeException`. Se o argumento de operação for uma string vazia, o método deve lançar a exceção `ArgumentException`. Quando `null` for passado como argumento de operação, o método deve lançar a exceção `ArgumentNullException`.

```csharp
SimpleCalculator.Calculate(100, 10, "-"); // => throws ArgumentOutOfRangeException

SimpleCalculator.Calculate(8, 2, ""); // => throws ArgumentException

SimpleCalculator.Calculate(58, 6, null); // => throws ArgumentNullException
```

## 3. Trate erros ao dividir por zero

Ao tentar dividir por `0`, a calculadora deve retornar uma string com o conteúdo `Division by zero is not allowed.`. Qualquer outra exceção não deve ser tratada pelo método `SimpleCalculator.Calculate()`.

```csharp
SimpleCalculator.Calculate(512, 0, "/"); // => returns "Division by zero is not allowed."
```
