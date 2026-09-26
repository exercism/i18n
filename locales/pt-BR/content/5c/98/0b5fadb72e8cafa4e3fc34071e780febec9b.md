# Introdução

Um número de ponto flutuante é um número com zero ou mais dígitos depois do separador decimal. Alguns exemplos são `-2.4`, `0.1`, `3.14`, `16.984025` e `1024.0`.

Tipos diferentes de ponto flutuante podem armazenar quantidades diferentes de dígitos depois do separador decimal, e a isso damos o nome de precisão.

O C# tem três tipos de ponto flutuante:

- `float`: 4 bytes (precisão de ~6 a 9 dígitos). Escrito como `2.45f`.
- `double`: 8 bytes (precisão de ~15 a 17 dígitos). É o tipo mais comum. Escrito como `2.45` ou `2.45d`.
- `decimal`: 16 bytes (precisão de 28 a 29 dígitos). Normalmente usado ao trabalhar com dados monetários, pois sua precisão leva a menos erros de arredondamento. Escrito como `2.45m`.

Como dá para ver, cada tipo pode armazenar uma quantidade diferente de dígitos. Isso significa que tentar armazenar PI em um `float` vai armazenar apenas os primeiros 6 a 9 dígitos (com o último dígito arredondado).
