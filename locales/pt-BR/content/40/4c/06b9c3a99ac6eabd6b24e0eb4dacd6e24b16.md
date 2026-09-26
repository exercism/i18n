# Introdução

## Mais sobre padrões

Lembre-se de que, no conceito Fundamentos, um programa AWK é composto de **pares padrão-ação**.

```awk
pattern1 { action1 }
pattern2 { action2 }
...
```

### O que queremos dizer com "padrão"?

O "padrão" é qualquer expressão AWK.
A veracidade do resultado da expressão determina se a ação é executada.

### O padrão vazio

O padrão pode ser omitido.
Nesse caso, a ação é executada para cada registro.

Podemos imprimir todos os nomes de usuário do arquivo passwd.

```sh
awk -F: '{print $1}' /etc/passwd
```

### Expressões regulares

O AWK pode comparar strings com expressões regulares para obter um resultado booleano.

Use o operador de correspondência de regex `~` para encontrar um campo específico.
Esse operador recebe uma string como operando à esquerda e uma expressão regular como operando à direita.
Um literal de expressão regular fica entre barras `/`.

Para encontrar os usuários do arquivo passwd que fazem login com bash:

```sh
awk -F: '$7 ~ /bash/ {print $1}' /etc/passwd
```

`!~` é o operador "a regex **não** corresponde".

Para corresponder uma regex ao registro atual, você pode usar `$0 ~ /regex/`.
Isso é tão comum que existe uma forma abreviada: você pode omitir o `$0` e o `~` e simplesmente escrever `/regex/`

```sh
awk '/regex/' data.txt
```

~~~~exercism/note
Compare esse one-liner AWK com o comando grep equivalente

```sh
grep 'regex' data.txt
```

O AWK oferece uma linguagem de programação inteira sem abrir mão da concisão.
~~~~

Vamos nos aprofundar mais no sabor de expressões regulares do GNU AWK em um conceito mais adiante.

### Expressões

Expressões AWK (aritméticas, lógicas ou de outro tipo) podem ser usadas como padrões.

Para extrair todos os usuários com UID 1000 ou mais:

```sh
awk -F: '$3 >= 1000' /etc/passwd
```

Lembre-se de que os valores falsos do AWK são o número zero e a string vazia, e todos os outros números ou strings são verdadeiros.
Qualquer expressão que resulte em um número ou em uma string pode ser usada como padrão.

### Funções

Qualquer função [interna][builtins] ou [definida pelo usuário][user-defined] pode ser usada em uma expressão e, portanto, no padrão.
Alguns exemplos:

```awk
length($1) {print "first field is not empty"}
```
```awk
toupper(substr($1, 1, 1)) ~ /[AEIOU]/ {print "starts with a vowel"}
```

### Padrões constantes

Uma construção comum em AWK é:

```sh
{
    xyz()   # some code that transforms each record
}
1
```

O `1` é um padrão verdadeiro sem ação associada.
Isso significa "imprimir o registro atual".

[builtins]: https://www.gnu.org/software/gawk/manual/html_node/Built_002din.html
[user-defined]: https://www.gnu.org/software/gawk/manual/html_node/User_002ddefined.html
