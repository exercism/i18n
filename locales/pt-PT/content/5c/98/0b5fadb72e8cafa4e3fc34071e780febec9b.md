# Introdução

Um número de vírgula flutuante é um número com zero ou mais algarismos depois do separador decimal. São exemplos `-2.4`, `0.1`, `3.14`, `16.984025` e `1024.0`.

Tipos de vírgula flutuante diferentes conseguem armazenar quantidades diferentes de algarismos depois do separador decimal. A isto chama-se precisão.

O C# tem três tipos de números de vírgula flutuante:

- `float`: 4 bytes (precisão de ~6-9 algarismos). Escreve-se `2.45f`.
- `double`: 8 bytes (precisão de ~15-17 algarismos). É o tipo mais comum. Escreve-se `2.45` ou `2.45d`.
- `decimal`: 16 bytes (precisão de 28-29 algarismos). Normalmente usa-se quando se trabalha com dados monetários, pois a sua precisão dá origem a menos erros de arredondamento. Escreve-se `2.45m`.

Como se pode ver, cada tipo consegue armazenar um número diferente de algarismos. Isto significa que, ao tentar armazenar o PI num `float`, só se armazenam os primeiros 6 a 9 algarismos (sendo o último arredondado).
