# Dicas

## Geral

Usa apenas f-strings ou o método `format()` para construir um folheto com informação básica sobre um evento.

- [Introdução à formatação de strings em Python][str-f-strings-docs]
- [Artigo no realpython.com][realpython-article]

## 1. Coloca a primeira letra do cabeçalho em maiúscula

- Coloca a primeira letra do título em maiúscula com o método `capitalize` das strings.

## 2. Formata a data

- A `date` deve ser formatada manualmente com `f''` ou `''.format()`.
- A `date` deve usar este formato: 'Month day, year'.

## 3. Apresenta os caracteres Unicode como ícones

- Uma forma de fazer isso com `format` seria usar o prefixo Unicode `u'{}'`.

## 4. Mostra o folheto finalizado

- Encontra o [campo format_spec][formatspec-docs] certo para alinhar os asteriscos e os carateres.
- A secção 1 é o `header` como string com a primeira letra em maiúscula.
- A secção 2 é a `date`.
- A secção 3 é a lista de artistas, cada artista está associado ao caráter Unicode com o mesmo índice.
- Cada linha deve conter 20 carateres.
- Escreve código conciso para adicionar as linhas vazias necessárias entre cada secção.
- Se a data não for indicada, substitui-a por uma linha vazia.

```python
******************** # 20 asterisks
*                  *
*     'Header'     * # capitalized header
*                  *
* Month day, year  * # Optional date
*                  *
* Artist1       ⑴ * # Artist list from 1 to 4
* Artist2       ⑵ *
* Artist3       ⑶ *
* Artist4       ⑷ *
*                  *
********************
```

[str-f-strings-docs]: https://docs.python.org/3/reference/lexical_analysis.html#f-strings
[realpython-article]: https://realpython.com/python-formatted-output/
[formatspec-docs]: https://docs.python.org/3/library/string.html#formatspec
