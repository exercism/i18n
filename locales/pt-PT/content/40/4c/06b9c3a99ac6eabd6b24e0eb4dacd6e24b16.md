# Introdução

## Mais sobre padrões

Recorda-te do conceito Fundamentals: um programa AWK é composto por **pares padrão-ação**.

```awk
pattern1 { action1 }
pattern2 { action2 }
...
```

### O que queremos dizer com "padrão"?

O "padrão" é qualquer expressão de AWK.
A veracidade do resultado da expressão determina se a ação é executada.

### O padrão vazio

O padrão pode ser omitido.
Neste caso, a ação é executada para cada registo.

Podemos imprimir todos os nomes de utilizador do ficheiro passwd.

```sh
awk -F: '{print $1}' /etc/passwd
```

### Expressões regulares

O AWK consegue comparar strings com expressões regulares para obter um resultado booleano.

Usa o operador de correspondência de expressões regulares `~` para corresponder a um campo em particular.
Este operador recebe uma string como operando da esquerda e uma expressão regular como operando da direita.
Um literal de expressão regular é delimitado por barras `/`.

Para encontrar os utilizadores do ficheiro passwd que iniciam sessão com bash:

```sh
awk -F: '$7 ~ /bash/ {print $1}' /etc/passwd
```

`!~` é o operador de "a expressão regular **não** corresponde".

Para fazer corresponder uma expressão regular ao registo atual, podes usar `$0 ~ /regex/`.
Isto é tão comum que existe uma forma abreviada: podes omitir o `$0` e o `~` e escrever simplesmente `/regex/`

```sh
awk '/regex/' data.txt
```

~~~~exercism/note
Compara essa linha única de AWK com o comando grep equivalente

```sh
grep 'regex' data.txt
```

O AWK dá-te uma linguagem de programação completa sem sacrificar a concisão.
~~~~

Vamos aprofundar a variante de expressões regulares do GNU AWK num conceito mais à frente.

### Expressões

As expressões de AWK (aritméticas, lógicas ou de outro tipo) podem ser usadas como padrões.

Para extrair todos os utilizadores com UID 1000 ou superior:

```sh
awk -F: '$3 >= 1000' /etc/passwd
```

Lembra-te de que os valores falsos do AWK são o número zero e a string vazia, e de que todos os outros números ou strings são verdadeiros.
Qualquer expressão que seja avaliada como um número ou uma string pode ser usada como padrão.

### Funções

Qualquer função [integrada][builtins] ou [definida pelo utilizador][user-defined] pode ser usada numa expressão e, por isso, no padrão.
Alguns exemplos:

```awk
length($1) {print "first field is not empty"}
```
```awk
toupper(substr($1, 1, 1)) ~ /[AEIOU]/ {print "starts with a vowel"}
```

### Padrões constantes

Uma construção habitual em AWK é:

```sh
{
    xyz()   # some code that transforms each record
}
1
```

`1` é um padrão que é verdadeiro e não tem ação associada.
Isto significa "imprime o registo atual".

[builtins]: https://www.gnu.org/software/gawk/manual/html_node/Built_002din.html
[user-defined]: https://www.gnu.org/software/gawk/manual/html_node/User_002ddefined.html
