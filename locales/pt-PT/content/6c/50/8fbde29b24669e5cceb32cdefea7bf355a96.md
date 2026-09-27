# Introdução

Em Cairo, os arrays são estruturas de dados fundamentais, concebidas para armazenar coleções de elementos do mesmo tipo de forma estruturada.
Tal como as listas de outras linguagens de programação, cada elemento de um array é acedido pelo seu índice, o que permite uma consulta e uma manipulação eficientes.

Os arrays de Cairo são estruturas de dados imutáveis.
Os elementos só podem ser acrescentados ao fim ou removidos do início do array.
Este modelo garante a integridade e a estabilidade dos dados, em linha com a abordagem do Cairo à gestão de memória.
Os arrays são inicializados com `ArrayTrait::new()` e suportam declarações específicas de tipo para armazenar os elementos.
Podes aceder aos elementos com os métodos `get()` ou `at()`, ou então com o operador de indexação `arr[index]`.
Só podes remover elementos do início de um array com a função `pop_front()`.
Estas características tornam os arrays de Cairo adequados a tarefas de armazenamento e consulta de dados estruturados.
