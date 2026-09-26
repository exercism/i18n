# Dicas

## 1. Defina a aprovação

- [Defina o tipo de dados algébrico][ADT] `Approval` com construtores para as opções necessárias.

## 2. Defina a culinária

- [Defina o tipo de dados algébrico][ADT] `Cuisine` com construtores para as opções necessárias.

## 3. Defina os gêneros de filme

- [Defina o tipo de dados algébrico][ADT] `Genre` com construtores para as opções necessárias.

## 4. Defina a atividade

- [Defina um tipo de dados algébrico com dados associados][ADT-with-data] para encapsular as diferentes atividades.

## 5. Avalie a atividade

- A melhor forma de executar a lógica com base no valor da atividade é usar [expressões case][case-expression].
- Fazer casamento de padrões em um caso de tipo de dados algébrico dá acesso aos dados associados a ele.
- Para adicionar uma condição extra a um padrão, você pode usar uma [guarda][guards] dentro de um case.
- Se você quiser capturar todos os outros valores possíveis em um único caso, pode usar o padrão curinga `_`.

[ADT]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#enumeration-types
[ADT-with-data]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#beyond-enumerations
[case-expression]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#case-expessions
[guards]: https://learnyouahaskell.github.io/syntax-in-functions.html#guards-guards
