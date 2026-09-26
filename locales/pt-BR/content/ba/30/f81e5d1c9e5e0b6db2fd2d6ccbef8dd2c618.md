# Dicas

## Geral

- Em Factor, caracteres são inteiros (pontos de código Unicode), então os operadores numéricos `<`, `>`, `=` funcionam diretamente.
- Os predicados e a conversão de maiúsculas/minúsculas ficam em [`unicode`][unicode].
- Os símbolos que você retorna (`less`, `big`, `alpha`, ...) precisam ser declarados antes do uso; agrupe-os com `SYMBOLS: ... ;`.

## 1. Compare dois caracteres

- Use `<` e `>` de [`math`][math].
- Envolva os três casos com `cond` de [`combinators`][combinators].

## 2. Determine o tamanho

- `LETTER?` é o predicado de maiúsculas e `letter?` o de minúsculas.

## 3. Mude o tamanho

- `ch>upper` e `ch>lower` são os conversores por caractere (também existem `>upper`/`>lower` no nível de string, mas aqui você tem um único caractere).

## 4. Determine o tipo

- A ordem importa no seu `cond`. `Letter?` corresponde a maiúsculas *ou* minúsculas, então deve vir antes de qualquer teste específico de maiúsculas ou minúsculas.

[unicode]: https://docs.factorcode.org/content/vocab-unicode.html
[math]: https://docs.factorcode.org/content/vocab-math.html
[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
