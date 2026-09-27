# Dicas

## 1. Define a aprovação

- [Define o tipo de dados algébrico][ADT] `Approval` com construtores para as opções necessárias.

## 2. Define a cozinha

- [Define o tipo de dados algébrico][ADT] `Cuisine` com construtores para as opções necessárias.

## 3. Define os géneros de filmes

- [Define o tipo de dados algébrico][ADT] `Genre` com construtores para as opções necessárias.

## 4. Define a atividade

- [Define um tipo de dados algébrico com dados associados][ADT-with-data] para encapsular as diferentes atividades.

## 5. Avalia a atividade

- A melhor forma de executar lógica com base no valor da atividade é usar [expressões case][case-expression].
- A correspondência de padrões sobre um case de um tipo de dados algébrico dá acesso aos seus dados associados.
- Para adicionar uma condição adicional a um padrão, podes usar uma [guarda][guards] dentro de um case.
- Se quiseres capturar todos os outros valores possíveis num único case, podes usar o padrão universal `_`.

[ADT]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#enumeration-types
[ADT-with-data]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#beyond-enumerations
[case-expression]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#case-expessions
[guards]: https://learnyouahaskell.github.io/syntax-in-functions.html#guards-guards
