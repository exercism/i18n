# Sobre

Os arrays são o tipo de sequência de comprimento fixo do Factor: podes alterar os elementos, mas não o comprimento.
Os literais usam `{ … }` com espaços em branco entre os elementos; o vocabulário `arrays` acrescenta pequenos construtores que retiram valores da pilha:

| palavra  | efeito                              |
|----------|-------------------------------------|
| `1array` | `( a     -- { a } )`                |
| `2array` | `( a b   -- { a b } )`              |
| `3array` | `( a b c -- { a b c } )`            |
| `<array>`| `( n elt -- array )`: `n` cópias de `elt` |
| `array?` | `( obj   -- ? )`: predicado de tipo |

Algumas palavras de [protocolo][sequence-protocol] do vocabulário `sequences` aparecem tantas vezes com arrays que vale a pena conhecê-las em conjunto:

| palavra   | efeito                                                |
|-----------|-------------------------------------------------------|
| `concat`  | `( seqs -- seq )`: achatar uma sequência de sequências |
| `join`    | `( seqs glue -- seq )`: achatar com um separador      |
| `reverse` | `( seq -- newseq )`                                   |
| `index`   | `( elt seq -- i/f )`: índice do elemento, ou `f`      |
| `member?` | `( elt seq -- ? )`: teste de pertença                 |

```factor
USING: arrays sequences ;

3 4 2array .                       ! => { 3 4 }
{ { 1 2 } { 3 4 } } concat .       ! => { 1 2 3 4 }
{ 1 2 3 4 } reverse .              ! => { 4 3 2 1 }
"b" { "a" "b" "c" } index .        ! => 1
"b" { "a" "b" "c" } member? .      ! => t
```

O `all-unique?` e o `members` de [`sets`][sets] também aceitam qualquer sequência, o que dá jeito quando se quer remover os duplicados dos elementos de um array ou verificar se há elementos repetidos, sem primeiro converter para um hash-set.

[sets]: https://docs.factorcode.org/content/vocab-sets.html
[sequence-protocol]: https://docs.factorcode.org/content/article-sequence-protocol.html
