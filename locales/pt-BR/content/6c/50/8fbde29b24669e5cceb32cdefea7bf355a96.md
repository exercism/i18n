# Introdução

No Cairo, os arrays são estruturas de dados fundamentais, projetadas para armazenar coleções de elementos do mesmo tipo de forma estruturada.
Assim como as listas em outras linguagens de programação, cada elemento de um array é acessado pelo seu índice, o que permite recuperar e manipular dados com eficiência.

Os arrays do Cairo são estruturas de dados imutáveis.
Elementos só podem ser adicionados ao final ou removidos do início do array.
Esse design garante integridade e estabilidade dos dados, alinhado com a forma como o Cairo lida com o gerenciamento de memória.
Os arrays são inicializados com `ArrayTrait::new()` e aceitam declarações de tipo específicas para o armazenamento dos elementos.
O acesso aos elementos pode ser feito com os métodos `get()` ou `at()`, ou ainda com o operador de indexação `arr[index]`.
Você só pode remover elementos do início de um array usando a função `pop_front()`.
Essas características tornam os arrays do Cairo adequados para tarefas de armazenamento e recuperação de dados estruturados.
