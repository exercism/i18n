# Dicas

## Geral

## 1. Compre um carro de controle remoto novo em folha

- [Esta página mostra como criar uma nova instância de uma classe][creating-objects].

## 2. Exiba a distância percorrida

- Acompanhe a distância percorrida em um [campo][fields].
- Considere qual visibilidade usar para o campo (ele precisa ser usado fora da classe?).
- Considere usar [interpolação de strings][string-interpolation] para formatar a string a retornar.

## 3. Exiba a porcentagem da bateria

- Acompanhe a carga inicial da bateria em um [campo][fields].
- Inicialize o campo com um valor específico que corresponda à carga inicial esperada da bateria.
- Considere qual visibilidade usar para o campo (ele precisa ser usado fora da classe?).
- Considere usar [interpolação de strings][string-interpolation] para formatar a string a retornar.

## 4. Atualize o número de metros percorridos ao dirigir

- Atualize o campo que representa a distância percorrida.

## 5. Atualize a porcentagem da bateria ao dirigir

- Atualize o campo que representa a porcentagem da bateria.

## 6. Impeça que o carro ande quando a bateria estiver descarregada

- Adicione uma condicional para atualizar a distância e a bateria apenas se a bateria ainda não estiver descarregada.
- Adicione uma condicional para exibir a mensagem de bateria vazia se a bateria estiver descarregada.

[creating-objects]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/classes#creating-objects
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[string-interpolation]: https://christianfindlay.com/2019/10/04/c-string-interpolation/
