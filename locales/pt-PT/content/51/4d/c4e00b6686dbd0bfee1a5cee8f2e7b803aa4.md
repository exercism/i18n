# Introdução

As tabelas de hash em Factor são *arrays associativos*: coleções de pares
`key/value` com consulta em O(1). Fazem parte da família mais ampla dos
[`assocs`][assocs].

## Literais de tabelas de hash

```factor
H{ { "coal" 1 } { "wood" 2 } } .
```

`H{ }` é uma tabela de hash vazia. As tabelas de hash são *mutáveis*: crescem e
encolhem à medida que adicionas e removes chaves. Faz `clone` primeiro se
precisares de deixar a original intacta. Imprimir uma tabela de hash mostra as
suas entradas, mas a ordem não segue a ordem de inserção: as tabelas de hash
não são ordenadas.

## Leitura

`at` (em [`assocs`][assocs]) lê um valor e devolve `f` se a chave não existir:

```
at      ( key assoc -- value/f )
key?    ( key assoc -- ? )
```

```factor
"coal" H{ { "coal" 1 } { "wood" 2 } } at .   ! => 1
"gold" H{ { "coal" 1 } { "wood" 2 } } at .   ! => f
```

## Escrita

`set-at` adiciona ou substitui; `delete-at` remove; `change-at` executa uma
quotation sobre o valor atual. As três *mutam*:

```
set-at     ( value key assoc -- )
delete-at  ( key assoc -- )
change-at  ( key assoc quot: ( old -- new ) -- )
```

```factor
H{ } clone 5 "coal" pick set-at .
! => H{ { "coal" 5 } }
```

## `inc-at`: o atalho para contabilizar

`inc-at` (também em [`assocs`][assocs]) soma 1 ao valor existente de uma chave e
insere-a com 1 quando não existe. É perfeito para contabilizar:

```
inc-at ( key assoc -- )
```

```factor
H{ } clone "coal" over inc-at .
! => H{ { "coal" 1 } }
```

## Iteração e inserção preguiçosa

`assoc-each` percorre cada par `( key value -- )`; `cache`
devolve o valor de uma chave e calcula-o uma única vez com a
quotation fornecida, se a chave não existir.

```
assoc-each ( assoc quot: ( key value -- ) -- )
cache      ( key assoc quot: ( key -- value ) -- value )
```

`cache` é o padrão «consultar ou criar» numa única palavra, o que
dá jeito quando estás a construir uma tabela de hash a partir de um
fluxo de chaves e não queres tratar do caso da entrada em falta
em cada local de chamada.

## Aplicar uma atualização a uma tabela de hash ao longo de uma sequência de chaves

Quando a entrada é uma sequência de chaves e queres atualizar a
tabela de hash uma vez por chave, itera a *sequência* com `each` e usa
uma quotation frita `'[ _ … ]` (do [`fry`][fry]) para incorporar a
tabela de hash no corpo do ciclo. Por exemplo, para remover uma lista de chaves:

```factor
{ "wood" "iron" } H{ { "coal" 5 } { "wood" 3 } { "iron" 2 } } clone
[ '[ _ delete-at ] each ] keep .
! => H{ { "coal" 5 } }
```

`'[ _ delete-at ]` captura a tabela de hash que está por cima na pilha, para
que em cada iteração `each` só tenha de fornecer a chave.
`keep` executa a quotation e preserva a tabela de hash para o
`.` final.

## Construir uma tabela de hash a partir de uma sequência

`map>assoc` (em [`assocs`][assocs]) mapeia uma quotation sobre uma sequência
e reúne os resultados `( elt -- key value )` num assoc do tipo do
exemplar:

```
map>assoc ( seq quot: ( elt -- key value ) exemplar -- assoc )
```

```factor
{ "wood" } [ dup length ] H{ } map>assoc .
! => H{ { "wood" 4 } }
```

## Chaves, valores e pares

`keys` e `values` (em [`assocs`][assocs]) devolvem apenas as chaves ou
apenas os valores; `>alist` devolve os pares `{ key value }`.

```
keys   ( assoc -- keys )
values ( assoc -- values )
>alist ( assoc -- alist )
```

```factor
H{ { "wood" 11 } { "coal" 7 } } keys .     ! the keys (order not guaranteed)
H{ { "wood" 11 } { "coal" 7 } } values .   ! the matching values
```

`keys` e `values` correspondem-se: o valor numa dada posição pertence à
chave na mesma posição.

`sort-keys` (em [`sorting`][sorting]) devolve os pares `{ key value }`
ordenados pela chave:

```factor
H{ { "wood" 11 } { "coal" 7 } } sort-keys .
! => { { "coal" 7 } { "wood" 11 } }
```

## De pares de volta a uma tabela de hash

`>hashtable` (em [`hashtables`][hashtables]) é o inverso de
`>alist`: transforma qualquer assoc, habitualmente um alist de
pares `{ key value }`, numa tabela de hash com consulta em O(1).

```
>hashtable ( assoc -- hashtable )
```

```factor
{ { "coal" 7 } { "wood" 11 } } >hashtable .
! => H{ { "wood" 11 } { "coal" 7 } }   (entry order not guaranteed)
```

Dá jeito quando reuniste ou transformaste uma lista de pares e
queres voltar a transformá-la numa tabela de hash para consultar
entradas pela chave.

[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/article-fry.html
[hashtables]: https://docs.factorcode.org/content/vocab-hashtables.html
[sorting]: https://docs.factorcode.org/content/vocab-sorting.html
