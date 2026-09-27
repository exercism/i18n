# Dicas

## 1. Define tipos personalizados

Os tipos abstratos e a herança de tipos foram abordados no conceito [Composite Types][composite].

## 2. Obtém o nome do animal de estimação.

- Isto é trivial para Dog e Cat, mas é útil para os testes dos métodos de fallback.

## 3. Define o que acontece quando gatos e cães se encontram

- Quantas combinações há para encontros entre gatos e cães?
- Lembra-te de que um gato que encontra um cão reage de forma diferente de um cão que encontra um gato.
- Precisamos da resposta do primeiro argumento: `a` em `meet(a, b)`.

## 4. Define um encontro entre duas entidades.

- O valor devolvido é uma string mais longa do que em `meet()`.
- Usa apenas um único método para `encounter()`.
- A [interpolação de strings][interpolation] é a tua amiga quando estás a montar um valor devolvido.

## 5. Define uma reação de fallback para encontros entre animais de estimação

- O segundo argumento é agora um `Pet` que não é `Cat` nem `Dog`, por isso acrescenta um método `meet`.
- Declarar tipos de parâmetro abstratos ou restringi-los através de métodos paramétricos são duas formas de conseguir isto.

## 6. Define um fallback para quando um animal de estimação encontra algo que não conhece

- O segundo argumento pode agora ser qualquer coisa.

## 7. Define um fallback genérico

- Ambos os argumentos podem agora ser qualquer coisa.
- No final do exercício, vais ter 7 métodos para `meet`.

[composite]: https://exercism.org/tracks/julia/concepts/composite-types
[interpolation]: https://docs.julialang.org/en/v1/manual/strings/#string-interpolation
