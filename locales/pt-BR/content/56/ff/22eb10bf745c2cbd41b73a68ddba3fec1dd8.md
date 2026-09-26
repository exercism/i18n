# Sobre

Os arrays são o tipo de sequência de comprimento fixo do Factor: você pode mudar os elementos, mas não o comprimento.
Os literais usam `{ … }` com espaços em branco entre os elementos; o vocabulário `arrays` adiciona pequenos construtores que retiram valores da pilha:

| palavra  | efeito                              |
|----------|-------------------------------------|
| `1array` | `( a     -- { a } )`                |
| `2array` | `( a b   -- { a b } )`              |
| `3array` | `( a b c -- { a b c } )`            |
| `<array>`| `( n elt -- array )`, `n` cópias de `elt` |
| `array?` | `( obj   -- ? )`, predicado de tipo   |

Algumas palavras do [protocolo][sequence-protocol] de `sequences` aparecem tantas vezes com arrays que vale a pena conhecê-las em conjunto:

| palavra   | efeito                                                |
|-----------|-------------------------------------------------------|
| `concat`  | `( seqs -- seq )`, achata uma sequência de sequências |
| `join`    | `( seqs glue -- seq )`, achata com um separador       |
| `reverse` | `( seq -- newseq )`                                   |
| `index`   | `( elt seq -- i/f )`, índice do elemento, ou `f`      |
| `member?` | `( elt seq -- ? )`, teste de pertinência              |

```factor
USING: arrays sequences ;

3 4 2array .                       ! => { 3 4 }
{ { 1 2 } { 3 4 } } concat .       ! => { 1 2 3 4 }
{ 1 2 3 4 } reverse .              ! => { 4 3 2 1 }
"b" { "a" "b" "c" } index .        ! => 1
"b" { "a" "b" "c" } member? .      ! => t
```

`all-unique?` e `members` de [`sets`][sets] também aceitam qualquer sequência, o que é útil quando os elementos de um array precisam ser deduplicados ou verificados em busca de duplicatas sem antes converter para um hash-set.

[sets]: https://docs.factorcode.org/content/vocab-sets.html
[sequence-protocol]: https://docs.factorcode.org/content/article-sequence-protocol.html
