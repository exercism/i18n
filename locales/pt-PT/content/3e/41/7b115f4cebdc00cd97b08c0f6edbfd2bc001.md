# Sobre

O Common Lisp, tal como outras linguagens, tem um conjunto de regras para decidir se dois objetos são o 'mesmo'.
Estas regras definem quatro níveis, cada um com uma função que faz esse nível de verificação.
Os níveis estão ordenados do mais estrito para o mais permissivo.

## `eq`

O primeiro nível é a identidade de objetos.
Esta igualdade é verificada com a função [`eq`][hyper-eq].
Os dois objetos cuja igualdade se verifica têm de ser exatamente o mesmo objeto:

```lisp
(eq 'apples 'apples)  ; => T
(eq 'apples 'oranges) ; => NIL

(eq '(a b c) '(a b c) ; => NIL (these two lists have the same contents but are not the same list)
(let ((list1 '(a b c)) (list2 list1)) 
  (eq list1 list2))   ; => T (these two lists are the same list)
```

## `eql`

O segundo nível acrescenta a igualdade de números e carateres.
Esta igualdade é verificada com a função [`eql`][hyper-eql].
A forma como a verificação é feita depende dos tipos dos argumentos:

- Quaisquer dois objetos que sejam `eq` são `eql`
- Os números são `eql` se forem do mesmo tipo e tiverem o mesmo valor
- Os carateres são `eql` se representarem o mesmo caráter.

```lisp
(eql 1 1)     ; => T
(eql 1 1/1)   ; => NIL (one number is an integer, the other a rational)
(eql #\c #\c) ; => T
(eql #\c #\C) ; => NIL (case is different)
```

Podes perguntar-te porque é que os números e os carateres não são comparados por identidade de objetos com [`eq`][hyper-eq].
A norma do Common Lisp permite que as implementações copiem números e carateres, se assim o entenderem.
Por isso, `0` e `0` podem não ser [`eq`][hyper-eq], uma vez que podem ser instâncias diferentes do número `0`.

## `equal`

O terceiro nível verifica a semelhança estrutural.
Esta igualdade é verificada com [`equal`][hyper-equal].
A forma como a verificação é feita depende dos tipos dos argumentos:

- os símbolos são comparados como se fosse com [`eq`][hyper-eq]
- os carateres e os números são comparados como se fosse com `eql`
- os conses são [`equal`][hyper-equal] se os seus elementos forem [`equal`][hyper-equal].
Isto é feito de forma recursiva.
- as strings e os vetores de bits são [`equal`][hyper-equal] se os seus elementos forem `eql`
- os arrays de outros tipos são comparados como se fosse com [`eq`][hyper-eq]
- os pathnames são [`equal`][hyper-equal] se forem funcionalmente equivalentes.
(Há aqui margem para comportamento dependente da implementação no que diz respeito à distinção entre maiúsculas e minúsculas nas strings que compõem os componentes dos pathnames.)
- os objetos de qualquer outro tipo são comparados como se fosse com [`eq`][hyper-eq]

```lisp
(equal '(a (b c)) '(a (b c)))         ; => T (conses are equal if their contents are equal)
(equal "hello" "hello")               ; => T
(equal "hello" "HELLO")               ; => NIL
(equal #(1 2 3) #(1 2 3))             ; => NIL (arrays are equal only if eq)
(equal #P"foo/bar.md" #P"foo/bar.md") ; => T (pathnames are equal if "functionally equivalent"
```

## `equalp`

O quarto e mais permissivo nível de igualdade é verificado com [`equalp`][hyper-equalp].
A forma como a verificação é feita depende dos tipos:

- se os dois objetos forem [`equalp`][hyper-equalp], então são [`equalp`][hyper-equalp]
- os números são [`equalp`][hyper-equalp] se tiverem o mesmo valor, mesmo que não sejam do mesmo tipo
- os carateres e as strings são comparados sem distinguir maiúsculas de minúsculas
- os conses são [`equalp`][hyper-equalp] se os seus elementos forem [`equalp`][hyper-equalp].
Isto é feito de forma recursiva.
- os arrays são [`equalp`][hyper-equalp] se tiverem o mesmo número de dimensões, se essas dimensões forem iguais e se cada elemento for [`equalp`][hyper-equalp].
- as estruturas são [`equalp`][hyper-equalp] se tiverem a mesma classe e os mesmos slots e se cada um desses slots for [`equalp`][hyper-equalp] entre as duas estruturas.
- as tabelas de dispersão são [`equalp`][hyper-equalp] se ambas tiverem a mesma função `:test`, se tiverem as mesmas chaves (comparadas com essa função `:test`) e se essas chaves tiverem os mesmos valores quando comparados com [`equalp`][hyper-equalp].

```lisp
(equalp 1 1.0)                       ; => T
(equalp #\c #\C)                     ; => T
(equalp "hello" "HELLO")             ; => T
(equalp #(1 2 3) #(1.0 2.0 3.0))     ; => T (arrays contain elements which are `equalp`)
(equal #S(TEST :SLOT1 'a :SLOT2 'b) 
       #S(TEST :SLOT1 'a :SLOT2 'b)) ; => T (structures of the same class with slots that have values which are `equalp`)
```

## Funções específicas por tipo

As funções acima são as funções de igualdade 'genéricas'.
Funcionam, tal como estão definidas, para qualquer tipo.
Isto pode ser útil quando escreves código genérico que não sabe quais os tipos dos objetos que vai comparar até ao momento da execução.
No entanto, considera-se geralmente "melhor estilo" usar funções de igualdade específicas por tipo quando conheces os tipos que estão a ser comparados.
Por exemplo, `string=` em vez de `equal`.
Estas funções serão apresentadas e discutidas nos conceitos relevantes.

[hyper-eq]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eq.htm
[hyper-eql]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eql.htm
[hyper-equal]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equal.htm
[hyper-equalp]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equalp.htm
