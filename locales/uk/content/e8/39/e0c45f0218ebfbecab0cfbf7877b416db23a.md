# Вступ

*Неперетинна множина* (її ще називають структурою union-find) зберігає
набір значень, розбитих на групи, що не перетинаються. Вона живе
у словнику [`disjoint-sets`][disjoint-sets].

`<disjoint-set>` створює порожню структуру. `add-atom` додає одне
значення як окрему групу, а `add-atoms` додає кожне значення
з послідовності:

```
<disjoint-set> ( -- disjoint-set )
add-atom       ( atom disjoint-set -- )
add-atoms      ( seq disjoint-set -- )
```

```factor
USING: disjoint-sets ;

<disjoint-set>            ! a new, empty disjoint set
{ 1 2 3 } over add-atoms  ! 1, 2 and 3 each start in their own group
```

`equate` обʼєднує дві групи, що містять його атоми, і після цього
вони стають однією групою:

```
equate ( atom1 atom2 disjoint-set -- )
```

У кожної групи є один канонічний елемент, її *представник*.
`representative` повертає його; два атоми належать до однієї групи
тоді й лише тоді, коли в них спільний представник. `equiv?` перевіряє
це безпосередньо:

```
representative ( atom disjoint-set -- representative )
equiv?         ( atom1 atom2 disjoint-set -- ? )
```

```factor
USING: disjoint-sets ;

<disjoint-set>
{ 1 2 3 } over add-atoms
1 2 pick equate          ! merge the groups of 1 and 2
1 over representative .   ! => 1
2 over representative .   ! => 1  (same representative as 1)
1 2 pick equiv? .         ! => t
1 3 pick equiv? .         ! => f
```

`disjoint-set-members` повертає всі атоми, які було додано.

[disjoint-sets]: https://docs.factorcode.org/content/vocab-disjoint-sets.html
