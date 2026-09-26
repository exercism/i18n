# Dicas

## Geral

- Você vai precisar de [expressões condicionais][concept-conditionals] para estes exercícios.

## 1. Comparando caracteres

- Caracteres podem ser comparados com funções como `char-greaterp`, `char-lessp` e `char=`.

## 2. Determinar o "tamanho" do caractere

- O Common Lisp tem duas funções para determinar se um caractere é maiúsculo ou minúsculo: `upper-case-p` e `lower-case-p`.
- Um caractere pode não ser nem maiúsculo nem minúsculo.

## 3. Mudar o "tamanho" do caractere

- O Common Lisp tem duas funções para mudar o caso de um caractere: `char-upcase` e `char-downcase`.

## 4. Determinar o "tipo" de um caractere

- O Common Lisp tem uma função de predicado `alpha-char-p` para dizer se um caractere é um caractere alfabético.
- O Common Lisp tem uma função de predicado `digit-char-p` para dizer se um caractere é um caractere numérico.
- Você pode usar `char=` para dizer se dois caracteres são iguais.
- O caractere de espaço é escrito #\Space em Common Lisp.
- O caractere de nova linha é escrito #\Newline em Common Lisp.

[concept-conditionals]: /tracks/common-lisp/concepts/conditionals
