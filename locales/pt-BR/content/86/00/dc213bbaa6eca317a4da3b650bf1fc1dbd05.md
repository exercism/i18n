# Dicas

## Geral

Use apenas f-strings ou o método `format()` para montar um folheto com informações básicas sobre um evento.

- [Introdução à formatação de strings em Python][str-f-strings-docs]
- [Artigo no realpython.com][realpython-article]

## 1. Deixe o cabeçalho com a primeira letra maiúscula

- Deixe o título com a primeira letra maiúscula usando o método `capitalize` de str.

## 2. Formate a data

- A `date` deve ser formatada manualmente usando `f''` ou `''.format()`.
- A `date` deve usar este formato: 'Month day, year'.

## 3. Renderize os caracteres unicode como ícones

- Uma forma de renderizar com `format` seria usar o prefixo unicode `u'{}'`.

## 4. Exiba o folheto finalizado

- Encontre o [campo format_spec][formatspec-docs] certo para alinhar os asteriscos e os caracteres.
- A seção 1 é o `header` como uma string com inicial maiúscula.
- A seção 2 é a `date`.
- A seção 3 é a lista de artistas, e cada artista está associado ao caractere unicode de mesmo índice.
- Cada linha deve conter 20 caracteres.
- Escreva um código conciso para adicionar as linhas vazias necessárias entre cada seção.
- Se a data não for informada, substitua-a por uma linha em branco.

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
