# Instruções

Neste exercício vais construir o tratamento de erros para uma calculadora simples de números inteiros. Para simplificar, são fornecidos métodos para calcular a adição, a multiplicação e a divisão.

O objetivo é ter uma calculadora funcional que devolva uma string com o seguinte padrão: `16 + 51 = 67`, quando recebe os argumentos `16`, `51` e `+`.

```csharp
SimpleCalculator.Calculate(16, 51, "+"); // => returns "16 + 51 = 67"

SimpleCalculator.Calculate(32, 6, "*"); // => returns "32 * 6 = 192"

SimpleCalculator.Calculate(512, 4, "/"); // => returns "512 / 4 = 128"
```

## 1. Implementa as operações da calculadora

O método principal a implementar nesta tarefa será o método (_static_) `SimpleCalculator.Calculate()`. Recebe três argumentos. Os dois primeiros argumentos são números inteiros sobre os quais vai ser realizada uma operação. O terceiro argumento é do tipo string e, para este exercício, é necessário implementar as seguintes operações:

- a adição, usando a string `+`
- a multiplicação, usando a string `*`
- a divisão, usando a string `/`

## 2. Trata operações ilegais

Qualquer outro símbolo de operação deve lançar a exceção `ArgumentOutOfRangeException`. Se o argumento da operação for uma string vazia, o método deve lançar a exceção `ArgumentException`. Quando é fornecido `null` como argumento da operação, o método deve lançar a exceção `ArgumentNullException`.

```csharp
SimpleCalculator.Calculate(100, 10, "-"); // => throws ArgumentOutOfRangeException

SimpleCalculator.Calculate(8, 2, ""); // => throws ArgumentException

SimpleCalculator.Calculate(58, 6, null); // => throws ArgumentNullException
```

## 3. Trata erros ao dividir por zero

Ao tentar dividir por `0`, a calculadora deve devolver uma string com o conteúdo `Division by zero is not allowed.`. Qualquer outra exceção não deve ser tratada pelo método `SimpleCalculator.Calculate()`.

```csharp
SimpleCalculator.Calculate(512, 0, "/"); // => returns "Division by zero is not allowed."
```
