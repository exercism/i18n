# Introdução

Um tipo de dados algébrico (ADT) representa um número fixo de casos nomeados.
Cada valor de um ADT corresponde a exatamente um dos casos nomeados.

Um ADT é definido com a palavra-chave `data`, com os casos separados por barras verticais (`|`).
Se nenhum dos casos tiver dados associados, o ADT é parecido com o que outras linguagens costumam chamar de _enumeração_ (ou _enum_).

```haskell
data Season
  = Spring
  | Summer
  | Autumn
  | Winter
```

Cada caso de um ADT pode ter, opcionalmente, dados associados, e casos diferentes podem ter tipos de dados diferentes. Quando o caso tem dados associados, é necessário um construtor.

```haskell
data Number
  = NInt Int      --'NInt' is the constructor for an Int Number.
  | NFloat Float  --'NFloat' is the constructor for an Float Number.
  | Invalid       --'Invalid' does not have data associated to it.
```

Criar um valor para um caso específico pode ser feito referindo-se ao nome dele (por exemplo, `NInt 22`).
Como os nomes dos casos são apenas funções construtoras, os dados associados podem ser passados como um argumento comum de função.

Os ADTs têm _igualdade estrutural_, o que significa que dois valores do mesmo caso e com os mesmos dados (opcionais) são equivalentes.

Embora você possa usar expressões `if/else` para trabalhar com ADTs, a forma recomendada de trabalhar com eles é o casamento de padrões, usando a instrução _case_:

```haskell
add1 :: Number -> String
add1 number =
    case number of
      NInt    i -> show (i + 1)
      NFloat  f -> show (f + 1.0)
      Invalid   -> error "Invalid input"
```
