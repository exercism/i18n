# Dicas

## Geral

- Leia sobre strings na [documentação oficial do tipo string][string-type-documentation].
- Explore as [_funções de string_ disponíveis][string-functions] para descobrir as operações internas com strings.

## 1. Obtenha a primeira letra do nome

- Existe uma [função interna][string-substr] para obter o primeiro caractere de uma string.
- Existem várias [funções internas][string-trim] para remover espaços em branco do início, do fim, ou do início e do fim de uma string.

## 2. Formate a primeira letra como inicial

- Existe uma [função interna][string-upcase] para converter todos os caracteres de uma string para a variante maiúscula.
- Existe um [operador][concat-operator] que concatena duas strings.

## 3. Divida o nome completo em primeiro nome e sobrenome

- Existe uma [função interna][string-explode] que divide uma string por outra string.
- É possível atribuir alguns dos primeiros elementos de uma lista a variáveis por meio de correspondência de padrões na lista.

## 4. Coloque as iniciais dentro do coração

- Existe uma sintaxe especial para [expandir variáveis][string-variables] dentro de uma string.
- Existe uma sintaxe especial para escrever [strings multilinha][heredoc-syntax] sem precisar escapar quebras de linha.

[string-type-documentation]: https://www.php.net/manual/en/language.types.string.php
[string-functions]: https://www.php.net/manual/en/ref.strings.php 
[string-substr]: https://www.php.net/manual/en/function.substr.php 
[string-trim]: https://www.php.net/manual/en/function.trim.php 
[string-upcase]: https://www.php.net/manual/en/function.strtoupper.php
[string-explode]: https://www.php.net/manual/en/function.explode.php
[string-variables]: https://www.php.net/manual/en/language.types.string.php#language.types.string.parsing 
[concat-operator]: https://www.php.net/manual/en/language.operators.string.php
[heredoc-syntax]: https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc
