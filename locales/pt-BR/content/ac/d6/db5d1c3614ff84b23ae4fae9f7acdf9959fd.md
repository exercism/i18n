# Corrida pelos monitores

Você é funcionário de uma empresa de software chamada ABC Corp, com 97 funcionários. O escritório recém-alugado, porém, tem apenas 65 cubículos. Todos os funcionários querem trabalhar no novo escritório, porque cada cubículo tem monitores de última geração. O departamento de Recursos Humanos ficou sobrecarregado com tantos pedidos e criou, com a ajuda da equipe de operações digitais, um sistema de alocação de cubículos.

Eles numeraram cada cubículo de 1 a 65. Os funcionários que querem trabalhar no novo escritório precisam enviar pedidos de alocação de cubículos até as 7h30 de cada dia útil. Cada funcionário só pode enviar um pedido de alocação. Cada pedido pode conter apenas um número de cubículo.

## Enunciado do problema

O departamento de Recursos Humanos toma as seguintes decisões para cada pedido de alocação de cubículo:

- Se o cubículo pedido estiver disponível, atribua-o a quem fez o pedido.
- Se o cubículo pedido já estiver atribuído, recuse o pedido.

Você é o membro da equipe de operações digitais responsável por automatizar esse processo de alocação. A entrada é um `int[]` request com todos os pedidos enviados pelos funcionários até as 7h30. Cada elemento do array representa um número de cubículo. Sua tarefa é retornar um `int[]` com os números atribuídos aos cubículos alocados. Em seguida, ordene os números dos cubículos em ordem crescente.

## Restrições

- 0 <= tamanho do array de entrada <= 97
- Cada elemento do array de entrada estará entre 1 e 65, inclusive

## Exemplo 1

- Entrada: `65 1 56`
- Saída: `1 56 65`

## Exemplo 2

- Entrada: `5 6 18 56 18 8 1`
- Saída: `1 5 6 8 18 56`
- Explicação: há dois pedidos para o cubículo número 18
