# Introdução

A Árvore de Sintaxe Abstrata (AST), também chamada _expressão citada_, é uma forma de representar código como dados.

Cada nó da AST é um tuplo de três elementos.

```elixir
# AST representation of:
# 2 + 3
{:+, [], [2, 3]}
```

O primeiro elemento, um átomo, é a operação. O segundo elemento, uma lista de palavras-chave, corresponde aos metadados. O terceiro elemento é uma lista de argumentos, que contém outros nós. Valores literais como números inteiros, átomos e strings são representados na AST como eles próprios, em vez de tuplos de três elementos.

## Transformar código em ASTs

Converter código Elixir em ASTs e ASTs de volta em código faz parte da biblioteca padrão. Podes encontrar funções para trabalhar com ASTs nos módulos `Code` (por exemplo, para converter uma string com código numa AST) e `Macro` (por exemplo, para percorrer a AST ou convertê-la numa string).

Repara que todas as funções da biblioteca padrão usam o nome "quoted" para designar a AST (abreviatura de _expressão citada_).

A forma especial para transformar código numa AST chama-se `quote`. Recebe um bloco de código e devolve a sua AST.

```elixir
quote do
  2 + 3 - 1
end

# => {:-, [], [
#      {:+, [], [2, 3]},
#      1
#    ]}
```

## Casos de utilização

A capacidade de representar código como uma AST está no centro da metaprogramação em Elixir. As _macros_, que são uma forma de escrever código Elixir que produz código Elixir, funcionam ao devolver ASTs como resultado.

Outro caso de utilização das ASTs é a análise estática de código, como a ferramenta do próprio Exercism, o Analyzer, que talvez já conheças como o pequeno bot que deixa comentários nas tuas soluções.
