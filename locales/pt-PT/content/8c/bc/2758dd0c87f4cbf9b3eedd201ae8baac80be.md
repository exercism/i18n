# Dicas

## Geral

- Lê sobre strings na [documentação oficial do tipo string][string-type-documentation].
- Explora as [_funções de string_ disponíveis][string-functions] para descobrires as operações incorporadas sobre strings.

## 1. Obter a primeira letra do nome

- Há uma [função incorporada][string-substr] para obter o primeiro caráter de uma string.
- Há várias [funções incorporadas][string-trim] para remover espaços em branco no início, no fim, ou tanto no início como no fim de uma string.

## 2. Formatar a primeira letra como inicial

- Há uma [função incorporada][string-upcase] para converter todos os carateres de uma string na sua variante maiúscula.
- Há um [operador][concat-operator] que concatena duas strings.

## 3. Dividir o nome completo no primeiro nome e no apelido

- Há uma [função incorporada][string-explode] que divide uma string por outra string.
- Alguns dos primeiros elementos de uma lista podem ser atribuídos a variáveis através de correspondência de padrões na lista.

## 4. Colocar as iniciais dentro do coração

- Há uma sintaxe especial para [expandir variáveis][string-variables] dentro de uma string.
- Há uma sintaxe especial para escrever [strings com várias linhas][heredoc-syntax] sem precisares de escapar as quebras de linha.

[string-type-documentation]: https://www.php.net/manual/en/language.types.string.php
[string-functions]: https://www.php.net/manual/en/ref.strings.php 
[string-substr]: https://www.php.net/manual/en/function.substr.php 
[string-trim]: https://www.php.net/manual/en/function.trim.php 
[string-upcase]: https://www.php.net/manual/en/function.strtoupper.php
[string-explode]: https://www.php.net/manual/en/function.explode.php
[string-variables]: https://www.php.net/manual/en/language.types.string.php#language.types.string.parsing 
[concat-operator]: https://www.php.net/manual/en/language.operators.string.php
[heredoc-syntax]: https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc
