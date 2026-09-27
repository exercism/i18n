# Dicas

## Geral

## 1. Compra um carro telecomandado novo em folha

- [Esta página mostra como criar uma nova instância de uma classe][creating-objects].

## 2. Mostra a distância percorrida

- Mantém um registo da distância percorrida num [campo][fields].
- Considera que visibilidade usar para o campo (precisa de ser usado fora da classe?).
- Considera usar [interpolação de strings][string-interpolation] para formatar a string a devolver.

## 3. Mostra a percentagem da bateria

- Mantém um registo da carga inicial da bateria num [campo][fields].
- Inicializa o campo com um valor específico que corresponda à carga inicial esperada da bateria.
- Considera que visibilidade usar para o campo (precisa de ser usado fora da classe?).
- Considera usar [interpolação de strings][string-interpolation] para formatar a string a devolver.

## 4. Atualiza o número de metros percorridos ao conduzir

- Atualiza o campo que representa a distância percorrida.

## 5. Atualiza a percentagem da bateria ao conduzir

- Atualiza o campo que representa a percentagem da bateria.

## 6. Evita conduzir quando a bateria está descarregada

- Adiciona uma condicional para só atualizar a distância e a bateria se a bateria ainda não estiver descarregada.
- Adiciona uma condicional para mostrar a mensagem de bateria vazia se a bateria estiver descarregada.

[creating-objects]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/classes#creating-objects
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[string-interpolation]: https://christianfindlay.com/2019/10/04/c-string-interpolation/
