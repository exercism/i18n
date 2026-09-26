# Introdução

A Árvore de Sintaxe Abstrata (AST), também chamada de _expressão citada_, é uma forma de representar código como dados.

Cada nó na AST é uma tupla de três elementos.

```elixir
# AST representation of:
# 2 + 3
{:+, [], [2, 3]}
```

O primeiro elemento, um átomo, é a operação. O segundo elemento, uma lista de palavras-chave, são os metadados. O terceiro elemento é uma lista de argumentos, que contém outros nós. Valores literais como inteiros, átomos e strings são representados na AST como eles mesmos em vez de tuplas de três elementos.

## Transformando código em ASTs

Mudar código Elixir para ASTs e ASTs de volta para código faz parte da biblioteca padrão. Você pode encontrar funções para trabalhar com ASTs nos módulos `Code` (por exemplo, para mudar uma string com código para uma AST) e `Macro` (por exemplo, para percorrer a AST ou mudá-la para uma string).

Observe que todas as funções na biblioteca padrão usam o nome "quoted" para significar a AST (abreviação de _expressão citada_).

A forma especial para transformar código em uma AST é chamada `quote`. Ela aceita um bloco de código e retorna sua AST.

```elixir
quote do
  2 + 3 - 1
end

# => {:-, [], [
#      {:+, [], [2, 3]},
#      1
#    ]}
```

## Casos de uso

A capacidade de representar código como uma AST está no coração da metaprogramação em Elixir. _Macros_, que é uma forma de escrever código Elixir que produz código Elixir, funcionam retornando ASTs como saída.

Outro caso de uso para ASTs é a análise estática de código, como a própria ferramenta do Exercism, o Analyzer, que você talvez já conheça como o pequeno bot que deixa comentários nas suas soluções.
