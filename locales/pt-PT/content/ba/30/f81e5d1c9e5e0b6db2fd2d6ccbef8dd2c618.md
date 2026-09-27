# Dicas

## Geral

- Em Factor, os carateres são números inteiros (pontos de código Unicode), por isso os operadores numéricos `<`, `>`, `=` funcionam diretamente.
- Os predicados e a conversão de maiúsculas e minúsculas estão em [`unicode`][unicode].
- Os símbolos que devolves (`less`, `big`, `alpha`, ...) têm de ser declarados antes de serem usados; agrupa-os com `SYMBOLS: ... ;`.

## 1. Compara dois carateres

- Usa `<` e `>` de [`math`][math].
- Envolve os três casos com `cond` de [`combinators`][combinators].

## 2. Determina o tamanho

- `LETTER?` é o predicado das maiúsculas, `letter?` o das minúsculas.

## 3. Altera o tamanho

- `ch>upper` e `ch>lower` são os conversores por caráter (também existem `>upper`/`>lower` ao nível da string, mas aqui tens um único caráter).

## 4. Determina o tipo

- A ordem é importante no teu `cond`. `Letter?` corresponde a maiúsculas *ou* minúsculas, por isso deve ser avaliado antes de qualquer teste específico de maiúsculas ou minúsculas.

[unicode]: https://docs.factorcode.org/content/vocab-unicode.html
[math]: https://docs.factorcode.org/content/vocab-math.html
[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
