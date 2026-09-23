# À propos

Common Lisp, comme d'autres langages, possède un ensemble de règles pour décider si deux objets sont « les mêmes ».
Ces règles définissent quatre niveaux, chacun avec une fonction qui effectue ce niveau de vérification.
Ces niveaux sont ordonnés du plus strict au plus permissif.

## `eq`

Le premier niveau est l'identité des objets.
Cette égalité se vérifie avec la fonction [`eq`][hyper-eq].
Les deux objets dont on vérifie l'égalité doivent être exactement le même objet :

```lisp
(eq 'apples 'apples)  ; => T
(eq 'apples 'oranges) ; => NIL

(eq '(a b c) '(a b c) ; => NIL (these two lists have the same contents but are not the same list)
(let ((list1 '(a b c)) (list2 list1)) 
  (eq list1 list2))   ; => T (these two lists are the same list)
```

## `eql`

Le deuxième niveau ajoute l'égalité des nombres et des caractères.
Cette égalité se vérifie avec la fonction [`eql`][hyper-eql].
La façon dont la vérification est effectuée dépend des types des arguments :

- Deux objets quelconques qui sont `eq` sont `eql`
- Les nombres sont `eql` s'ils sont du même type et de la même valeur
- Les caractères sont `eql` s'ils représentent le même caractère.

```lisp
(eql 1 1)     ; => T
(eql 1 1/1)   ; => NIL (one number is an integer, the other a rational)
(eql #\c #\c) ; => T
(eql #\c #\C) ; => NIL (case is different)
```

On peut se demander pourquoi les nombres et les caractères ne sont pas comparés par identité d'objet avec [`eq`][hyper-eq].
La norme Common Lisp autorise les implémentations à copier les nombres et les caractères si elles choisissent de le faire.
Ainsi, `0` et `0` peuvent ne pas être [`eq`][hyper-eq], car il peut s'agir d'instances différentes du nombre `0`.

## `equal`

Le troisième niveau vérifie la similarité structurelle.
Cette égalité se vérifie avec [`equal`][hyper-equal].
La façon dont la vérification est effectuée dépend des types des arguments :

- les symboles sont comparés comme avec [`eq`][hyper-eq]
- les caractères et les nombres sont comparés comme avec `eql`
- les _cons_ sont [`equal`][hyper-equal] si leurs éléments sont [`equal`][hyper-equal].
La comparaison est effectuée récursivement.
- les chaînes de caractères et les vecteurs de bits sont [`equal`][hyper-equal] si leurs éléments sont `eql`
- les tableaux d'autres types sont comparés comme avec [`eq`][hyper-eq]
- les _pathnames_ sont [`equal`][hyper-equal] s'ils sont équivalents du point de vue fonctionnel.
(Le comportement dépendant de l'implémentation est possible ici en ce qui concerne la sensibilité à la casse des chaînes qui constituent les composants des _pathnames_.)
- les objets de tout autre type sont comparés comme avec [`eq`][hyper-eq]

```lisp
(equal '(a (b c)) '(a (b c)))         ; => T (conses are equal if their contents are equal)
(equal "hello" "hello")               ; => T
(equal "hello" "HELLO")               ; => NIL
(equal #(1 2 3) #(1 2 3))             ; => NIL (arrays are equal only if eq)
(equal #P"foo/bar.md" #P"foo/bar.md") ; => T (pathnames are equal if "functionally equivalent"
```

## `equalp`

Le quatrième niveau d'égalité, le plus permissif, se vérifie avec [`equalp`][hyper-equalp].
La façon dont la vérification est effectuée dépend des types :

- si les deux objets sont [`equalp`][hyper-equalp], alors ils sont [`equalp`][hyper-equalp]
- les nombres sont [`equalp`][hyper-equalp] s'ils ont la même valeur, même s'ils ne sont pas du même type
- les caractères et les chaînes de caractères sont comparés sans tenir compte de la casse
- les _cons_ sont [`equalp`][hyper-equalp] si leurs éléments sont [`equalp`][hyper-equalp].
La comparaison est effectuée récursivement.
- les tableaux sont [`equalp`][hyper-equalp] s'ils ont le même nombre de dimensions, que ces dimensions sont identiques et que chaque élément est [`equalp`][hyper-equalp].
- les structures sont [`equalp`][hyper-equalp] si elles ont la même classe et les mêmes _slots_, et si chacun de ces _slots_ est [`equalp`][hyper-equalp] entre les deux structures.
- les tables de hachage sont [`equalp`][hyper-equalp] si elles ont toutes les deux la même fonction `:test`, qu'elles ont les mêmes clés (comparées avec cette fonction `:test`) et que ces clés ont les mêmes valeurs quand on les compare avec [`equalp`][hyper-equalp].

```lisp
(equalp 1 1.0)                       ; => T
(equalp #\c #\C)                     ; => T
(equalp "hello" "HELLO")             ; => T
(equalp #(1 2 3) #(1.0 2.0 3.0))     ; => T (arrays contain elements which are `equalp`)
(equal #S(TEST :SLOT1 'a :SLOT2 'b) 
       #S(TEST :SLOT1 'a :SLOT2 'b)) ; => T (structures of the same class with slots that have values which are `equalp`)
```

## Fonctions spécifiques à un type

Les fonctions ci-dessus sont les fonctions d'égalité « génériques ».
Telles qu'elles sont définies, elles fonctionnent pour n'importe quel type.
Cela peut être utile lorsqu'on écrit du code générique qui ne connaît les types des objets qu'il va comparer qu'à l'exécution.
Cependant, il est généralement considéré comme préférable d'utiliser des fonctions d'égalité spécifiques à un type lorsqu'on connaît les types comparés.
Par exemple `string=` plutôt que `equal`.
Ces fonctions seront présentées et abordées dans les concepts correspondants.

[hyper-eq]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eq.htm
[hyper-eql]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eql.htm
[hyper-equal]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equal.htm
[hyper-equalp]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equalp.htm
