# Dicas

## 1. Defina tipos personalizados

Tipos abstratos e herança de tipos foram discutidos no Conceito [Composite Types][composite].

## 2. Obtenha o nome do pet

- Isso é trivial para Dogs e Cats, mas ajuda nos testes dos métodos de fallback.

## 3. Defina o que acontece quando gatos e cães se encontram

- Quantas combinações de encontros entre gatos e cães existem?
- Lembre-se de que um gato que encontra um cão reage de forma diferente de um cão que encontra um gato.
- Precisamos da resposta do primeiro argumento: `a` em `meet(a, b)`.

## 4. Defina um encontro entre duas entidades

- O valor de retorno é uma string mais longa do que a de `meet()`.
- Use apenas um único método para `encounter()`.
- A [interpolação de string][interpolation] é sua aliada na hora de montar um valor de retorno.

## 5. Defina uma reação de fallback para encontros entre pets

- O segundo argumento agora é um `Pet` diferente de `Cat` ou `Dog`, então adicione um método `meet`.
- Declarar tipos abstratos de parâmetro ou restringi-los por meio de métodos paramétricos são duas formas de fazer isso.

## 6. Defina um fallback para quando um pet encontra algo que não conhece

- O segundo argumento agora pode ser qualquer coisa.

## 7. Defina um fallback genérico

- Agora os dois argumentos podem ser qualquer coisa.
- No final do exercício, você terá 7 métodos para `meet`.

[composite]: https://exercism.org/tracks/julia/concepts/composite-types
[interpolation]: https://docs.julialang.org/en/v1/manual/strings/#string-interpolation
