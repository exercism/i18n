# Dicas

## Geral

- Vais precisar de [expressões condicionais][concept-conditionals] para estes exercícios.

## 1. Comparar carateres

- Os carateres podem ser comparados com funções como `char-greaterp`, `char-lessp` e `char=`.

## 2. Determinar o "tamanho" do caráter

- O Common Lisp tem duas funções para determinar se um caráter está em maiúsculas ou em minúsculas: `upper-case-p` e `lower-case-p`.
- Um caráter pode não ser nem maiúscula nem minúscula.

## 3. Alterar o "tamanho" do caráter

- O Common Lisp tem duas funções para alterar as maiúsculas e minúsculas de um caráter: `char-upcase` e `char-downcase`.

## 4. Determinar o "tipo" de um caráter

- O Common Lisp tem uma função de predicado, `alpha-char-p`, que diz se um caráter é um caráter alfabético.
- O Common Lisp tem uma função de predicado, `digit-char-p`, que diz se um caráter é um caráter numérico.
- Podes usar `char=` para dizer se dois carateres são iguais.
- O caráter de espaço escreve-se #\Space em Common Lisp.
- O caráter de nova linha escreve-se #\Newline em Common Lisp.

[concept-conditionals]: /tracks/common-lisp/concepts/conditionals
