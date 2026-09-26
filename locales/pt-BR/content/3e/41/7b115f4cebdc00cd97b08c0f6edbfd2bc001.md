# Sobre

Common Lisp, como outras linguagens, tem um conjunto de regras para decidir se dois objetos são o "mesmo".
Essas regras definem quatro níveis, cada um com uma função que faz esse nível de verificação.
Os níveis estão ordenados do mais rigoroso ao mais permissivo.

## `eq`

O primeiro nível é a identidade do objeto.
Essa igualdade é verificada com a função [`eq`][hyper-eq].
Os dois objetos comparados precisam ser exatamente o mesmo objeto:

```lisp
(eq 'apples 'apples)  ; => T
(eq 'apples 'oranges) ; => NIL

(eq '(a b c) '(a b c) ; => NIL (these two lists have the same contents but are not the same list)
(let ((list1 '(a b c)) (list2 list1)) 
  (eq list1 list2))   ; => T (these two lists are the same list)
```

## `eql`

O segundo nível acrescenta a igualdade de números e caracteres.
Essa igualdade é verificada com a função [`eql`][hyper-eql].
A forma como a verificação é feita depende dos tipos dos argumentos:

- Quaisquer dois objetos que sejam `eq` são `eql`
- Números são `eql` se forem do mesmo tipo e valor
- Caracteres são `eql` se representarem o mesmo caractere.

```lisp
(eql 1 1)     ; => T
(eql 1 1/1)   ; => NIL (one number is an integer, the other a rational)
(eql #\c #\c) ; => T
(eql #\c #\C) ; => NIL (case is different)
```

A gente pode se perguntar por que números e caracteres não são comparados por identidade de objeto com [`eq`][hyper-eq].
O padrão do Common Lisp permite que as implementações copiem números e caracteres, se quiserem.
Por isso, `0` e `0` podem não ser [`eq`][hyper-eq], já que podem ser instâncias diferentes do número `0`.

## `equal`

O terceiro nível verifica a semelhança estrutural.
Essa igualdade é verificada com [`equal`][hyper-equal].
A forma como a verificação é feita depende dos tipos dos argumentos:

- símbolos são comparados como se fosse com [`eq`][hyper-eq]
- caracteres e números são comparados como se fosse com `eql`
- conses são [`equal`][hyper-equal] se seus elementos forem [`equal`][hyper-equal].
Isso é feito de forma recursiva.
- strings e vetores de bits são [`equal`][hyper-equal] se seus elementos forem `eql`
- arrays de outros tipos são comparados como se fosse com [`eq`][hyper-eq]
- pathnames são [`equal`][hyper-equal] se forem funcionalmente equivalentes.
(Há espaço aqui para comportamento dependente da implementação no que diz respeito à diferenciação entre maiúsculas e minúsculas das strings que compõem os componentes dos pathnames.)
- objetos de qualquer outro tipo são comparados como se fosse com [`eq`][hyper-eq]

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

- se os dois objetos forem [`equalp`][hyper-equalp], então eles são [`equalp`][hyper-equalp]
- números são [`equalp`][hyper-equalp] se tiverem o mesmo valor, mesmo que não sejam do mesmo tipo
- caracteres e strings são comparados sem diferenciar maiúsculas de minúsculas
- conses são [`equalp`][hyper-equalp] se seus elementos forem [`equalp`][hyper-equalp].
Isso é feito de forma recursiva.
- arrays são [`equalp`][hyper-equalp] se tiverem o mesmo número de dimensões, se essas dimensões forem iguais e se cada elemento for [`equalp`][hyper-equalp].
- estruturas são [`equalp`][hyper-equalp] se tiverem a mesma classe e os mesmos slots e se cada um desses slots for [`equalp`][hyper-equalp] entre as duas estruturas.
- tabelas hash são [`equalp`][hyper-equalp] se ambas tiverem a mesma função `:test`, se tiverem as mesmas chaves (comparadas com essa função `:test`) e se essas chaves tiverem os mesmos valores quando comparadas com [`equalp`][hyper-equalp].

```lisp
(equalp 1 1.0)                       ; => T
(equalp #\c #\C)                     ; => T
(equalp "hello" "HELLO")             ; => T
(equalp #(1 2 3) #(1.0 2.0 3.0))     ; => T (arrays contain elements which are `equalp`)
(equal #S(TEST :SLOT1 'a :SLOT2 'b) 
       #S(TEST :SLOT1 'a :SLOT2 'b)) ; => T (structures of the same class with slots that have values which are `equalp`)
```

## Funções específicas de tipo

As funções acima são as funções de igualdade "genéricas".
Elas funcionam, conforme definidas, para qualquer tipo.
Isso pode ser útil quando se escreve código genérico que só vai saber os tipos dos objetos que vai comparar em tempo de execução.
No entanto, geralmente se considera "melhor estilo" usar funções de igualdade específicas de tipo quando se conhecem os tipos comparados.
Por exemplo, `string=` em vez de `equal`.
Essas funções serão apresentadas e discutidas nos conceitos relevantes.

[hyper-eq]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eq.htm
[hyper-eql]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eql.htm
[hyper-equal]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equal.htm
[hyper-equalp]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equalp.htm
