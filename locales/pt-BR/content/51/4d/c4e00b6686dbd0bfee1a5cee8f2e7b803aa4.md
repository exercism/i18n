# Introdução

As tabelas hash no Factor são *arrays associativos*: coleções de pares `key/value` com consulta O(1). Elas fazem parte da família mais ampla [`assocs`][assocs].

## Literais de tabela hash

```factor
H{ { "coal" 1 } { "wood" 2 } } .
```

`H{ }` é uma tabela hash vazia. As tabelas hash são *mutáveis*: crescem e diminuem conforme você adiciona e remove chaves. Faça `clone` primeiro se precisar deixar a tabela original intacta. Imprimir uma tabela hash mostra suas entradas, mas a ordem não está ligada à ordem de inserção: as tabelas hash não têm ordem definida.

## Leitura

`at` (em [`assocs`][assocs]) lê um valor e retorna `f` se a chave não existir:

```
at      ( key assoc -- value/f )
key?    ( key assoc -- ? )
```

```factor
"coal" H{ { "coal" 1 } { "wood" 2 } } at .   ! => 1
"gold" H{ { "coal" 1 } { "wood" 2 } } at .   ! => f
```

## Escrita

`set-at` adiciona ou sobrescreve; `delete-at` remove; `change-at` executa uma quotation sobre o valor atual. As três *modificam* a tabela:

```
set-at     ( value key assoc -- )
delete-at  ( key assoc -- )
change-at  ( key assoc quot: ( old -- new ) -- )
```

```factor
H{ } clone 5 "coal" pick set-at .
! => H{ { "coal" 5 } }
```

## `inc-at`: o atalho para contagem

`inc-at` (também em [`assocs`][assocs]) soma 1 ao valor existente de uma chave e insere 1 quando a chave não existe. Perfeito para contabilizar:

```
inc-at ( key assoc -- )
```

```factor
H{ } clone "coal" over inc-at .
! => H{ { "coal" 1 } }
```

## Iteração e inserção preguiçosa

`assoc-each` percorre cada par `( key value -- )`; `cache` retorna o valor de uma chave, calculando-o uma vez com a quotation fornecida se a chave não existir.

```
assoc-each ( assoc quot: ( key value -- ) -- )
cache      ( key assoc quot: ( key -- value ) -- value )
```

`cache` é o padrão "consultar ou criar" em uma única palavra: útil quando você está construindo uma tabela hash a partir de um fluxo de chaves e não quer tratar o caso de entrada ausente em cada ponto de chamada.

## Aplicando uma atualização de tabela hash em uma sequência de chaves

Quando a entrada é uma sequência de chaves e você quer atualizar a tabela hash uma vez por chave, itere sobre a *sequência* com `each` e use uma fried quotation `'[ _ … ]` (de [`fry`][fry]) para embutir a tabela hash no corpo do laço. Por exemplo, removendo uma lista de chaves:

```factor
{ "wood" "iron" } H{ { "coal" 5 } { "wood" 3 } { "iron" 2 } } clone
[ '[ _ delete-at ] each ] keep .
! => H{ { "coal" 5 } }
```

`'[ _ delete-at ]` captura a tabela hash que está acima dela na pilha, de modo que, a cada iteração, `each` só precisa fornecer a chave. `keep` executa a quotation preservando a tabela hash para o `.` final.

## Construindo uma tabela hash a partir de uma sequência

`map>assoc` (em [`assocs`][assocs]) mapeia uma quotation sobre uma sequência e coleta os resultados `( elt -- key value )` em um assoc do tipo do exemplar:

```
map>assoc ( seq quot: ( elt -- key value ) exemplar -- assoc )
```

```factor
{ "wood" } [ dup length ] H{ } map>assoc .
! => H{ { "wood" 4 } }
```

## Chaves, valores e pares

`keys` e `values` (em [`assocs`][assocs]) retornam apenas as chaves ou apenas os valores; `>alist` retorna os pares `{ key value }`.

```
keys   ( assoc -- keys )
values ( assoc -- values )
>alist ( assoc -- alist )
```

```factor
H{ { "wood" 11 } { "coal" 7 } } keys .     ! the keys (order not guaranteed)
H{ { "wood" 11 } { "coal" 7 } } values .   ! the matching values
```

`keys` e `values` ficam alinhados: o valor em uma dada posição pertence à chave na mesma posição.

`sort-keys` (em [`sorting`][sorting]) retorna os pares `{ key value }` ordenados pela chave:

```factor
H{ { "wood" 11 } { "coal" 7 } } sort-keys .
! => { { "coal" 7 } { "wood" 11 } }
```

## De pares de volta para uma tabela hash

`>hashtable` (em [`hashtables`][hashtables]) é o inverso de `>alist`: transforma qualquer assoc, na maioria das vezes uma alist de pares `{ key value }`, em uma tabela hash com consulta O(1).

```
>hashtable ( assoc -- hashtable )
```

```factor
{ { "coal" 7 } { "wood" 11 } } >hashtable .
! => H{ { "wood" 11 } { "coal" 7 } }   (entry order not guaranteed)
```

Útil quando você montou ou transformou uma lista de pares e quer reuni-la de volta em uma tabela hash para consultar as entradas pela chave.

[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/article-fry.html
[hashtables]: https://docs.factorcode.org/content/vocab-hashtables.html
[sorting]: https://docs.factorcode.org/content/vocab-sorting.html
