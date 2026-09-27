# Corrida aos Monitores

És funcionário de uma empresa de software chamada ABC Corp, que tem 97 funcionários. No entanto, um espaço de escritório recém-arrendado só tem 65 cubículos. Todos os funcionários querem trabalhar no novo escritório porque cada cubículo tem monitores de última geração. O departamento de recursos humanos ficou sobrecarregado com tantos pedidos e criou um sistema de atribuição de cubículos com a ajuda da sua equipa de operações digitais.

Atribuíram um número a cada cubículo, de 1 a 65. Os funcionários que querem trabalhar no novo escritório têm de enviar pedidos de atribuição de cubículos até às 7h30 da manhã de cada dia útil. Cada funcionário só pode enviar um pedido de atribuição. Cada pedido pode conter apenas um número de cubículo.

## Enunciado do problema

O departamento de recursos humanos toma as seguintes ações para cada pedido de atribuição de cubículo:

- Se o cubículo pedido estiver disponível, atribui-o a quem o pediu.
- Se o cubículo pedido já estiver atribuído, rejeita o pedido.

És o membro da equipa de operações digitais responsável por automatizar este processo de atribuição. A entrada é um `int[]` chamado request que contém todos os pedidos dos funcionários submetidos até às 7h30. Cada elemento do array representa um número de cubículo. A tua tarefa é devolver um `int[]` com os números dos cubículos que ficaram atribuídos. Depois, ordena os números dos cubículos por ordem crescente.

## Restrições

- 0 <= tamanho do array de entrada <= 97
- Cada elemento do array de entrada estará entre 1 e 65, inclusive

## Exemplo 1

- Entrada: `65 1 56`
- Saída: `1 56 65`

## Exemplo 2

- Entrada: `5 6 18 56 18 8 1`
- Saída: `1 5 6 8 18 56`
- Explicação: Há dois pedidos para o cubículo número 18
