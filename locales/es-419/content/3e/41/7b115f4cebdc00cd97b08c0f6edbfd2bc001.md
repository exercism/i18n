# Acerca de

Common Lisp, al igual que otros lenguajes, tiene un conjunto de reglas sobre cómo decidir si dos objetos son «el mismo». Estas reglas definen cuatro niveles, cada uno con una función que realiza ese nivel de comprobación. Los niveles están ordenados del más estricto al más flexible.

## `eq`

El primer nivel es la identidad de objeto. Esta igualdad se comprueba con la función [`eq`][hyper-eq]. Los dos objetos que se comprueban deben ser exactamente el mismo objeto:

```lisp
(eq 'apples 'apples)  ; => T
(eq 'apples 'oranges) ; => NIL

(eq '(a b c) '(a b c) ; => NIL (these two lists have the same contents but are not the same list)
(let ((list1 '(a b c)) (list2 list1)) 
  (eq list1 list2))   ; => T (these two lists are the same list)
```

## `eql`

El segundo nivel añade la igualdad de números y caracteres. Esta igualdad se comprueba con la función [`eql`][hyper-eql]. La forma de hacer la comprobación depende de los tipos de los argumentos:

- Dos objetos cualesquiera que sean `eq` también son `eql`
- Dos números son `eql` si son del mismo tipo y tienen el mismo valor
- Dos caracteres son `eql` si representan el mismo carácter.

```lisp
(eql 1 1)     ; => T
(eql 1 1/1)   ; => NIL (one number is an integer, the other a rational)
(eql #\c #\c) ; => T
(eql #\c #\C) ; => NIL (case is different)
```

Uno podría preguntarse por qué los números y los caracteres no se comparan por identidad de objeto con [`eq`][hyper-eq]. El estándar de Common Lisp permite que las implementaciones copien los números y los caracteres si así lo deciden. Por eso `0` y `0` pueden no ser [`eq`][hyper-eq], ya que pueden ser instancias distintas del número `0`.

## `equal`

El tercer nivel comprueba la similitud estructural. Esta igualdad se comprueba con [`equal`][hyper-equal]. La forma de hacer la comprobación depende de los tipos de los argumentos:

- los símbolos se comparan como si se usara [`eq`][hyper-eq]
- los caracteres y los números se comparan como si se usara `eql`
- los conses son [`equal`][hyper-equal] si sus elementos son [`equal`][hyper-equal].
Esto se hace de forma recursiva.
- los strings y los vectores de bits son [`equal`][hyper-equal] si sus elementos son `eql`
- los arrays de otros tipos se comparan como si se usara [`eq`][hyper-eq]
- los pathnames son [`equal`][hyper-equal] si son funcionalmente equivalentes.
(Aquí hay margen para un comportamiento que depende de la implementación en lo que respecta a la sensibilidad a mayúsculas y minúsculas de los strings que forman los componentes de los pathnames.)
- los objetos de cualquier otro tipo se comparan como si se usara [`eq`][hyper-eq]

```lisp
(equal '(a (b c)) '(a (b c)))         ; => T (conses are equal if their contents are equal)
(equal "hello" "hello")               ; => T
(equal "hello" "HELLO")               ; => NIL
(equal #(1 2 3) #(1 2 3))             ; => NIL (arrays are equal only if eq)
(equal #P"foo/bar.md" #P"foo/bar.md") ; => T (pathnames are equal if "functionally equivalent"
```

## `equalp`

El cuarto nivel de igualdad, el más flexible, se comprueba con [`equalp`][hyper-equalp]. La forma de hacer la comprobación depende de los tipos:

- si los dos objetos son [`equalp`][hyper-equalp], entonces son [`equalp`][hyper-equalp]
- los números son [`equalp`][hyper-equalp] si tienen el mismo valor aunque no sean del mismo tipo
- los caracteres y los strings se comparan sin distinguir mayúsculas de minúsculas
- los conses son [`equalp`][hyper-equalp] si sus elementos son [`equalp`][hyper-equalp].
Esto se hace de forma recursiva.
- los arrays son [`equalp`][hyper-equalp] si tienen el mismo número de dimensiones, esas dimensiones son las mismas y cada elemento es [`equalp`][hyper-equalp].
- las estructuras son [`equalp`][hyper-equalp] si tienen la misma clase y los mismos slots y cada uno de esos slots es [`equalp`][hyper-equalp] entre las dos estructuras.
- las tablas hash son [`equalp`][hyper-equalp] si ambas tienen la misma función `:test`, si tienen las mismas claves (comparadas con esa función `:test`) y si esas claves tienen los mismos valores al compararlas con [`equalp`][hyper-equalp].

```lisp
(equalp 1 1.0)                       ; => T
(equalp #\c #\C)                     ; => T
(equalp "hello" "HELLO")             ; => T
(equalp #(1 2 3) #(1.0 2.0 3.0))     ; => T (arrays contain elements which are `equalp`)
(equal #S(TEST :SLOT1 'a :SLOT2 'b) 
       #S(TEST :SLOT1 'a :SLOT2 'b)) ; => T (structures of the same class with slots that have values which are `equalp`)
```

## Funciones específicas de tipo

Las anteriores son las funciones de igualdad «genéricas». Funcionan, tal como están definidas, para cualquier tipo. Esto puede resultar útil cuando se escribe código genérico que no sabe qué tipos de objetos va a comparar hasta el momento de la ejecución. Sin embargo, en general se considera «mejor estilo» usar funciones de igualdad específicas del tipo cuando se conocen los tipos que se comparan. Por ejemplo, `string=` en lugar de `equal`. Estas funciones se presentarán y se comentarán en los conceptos correspondientes.

[hyper-eq]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eq.htm
[hyper-eql]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eql.htm
[hyper-equal]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equal.htm
[hyper-equalp]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equalp.htm
