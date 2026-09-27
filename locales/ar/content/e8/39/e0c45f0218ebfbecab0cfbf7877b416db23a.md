# مقدمة

تحتفظ *المجموعة المنفصلة* (وتُسمى أيضًا بنية الاتحاد والبحث) بمجموعة من القيم مقسّمة إلى مجموعات غير متداخلة. وتقع في مفردات [`disjoint-sets`][disjoint-sets].

تبني `<disjoint-set>` بنية فارغة. وتضيف `add-atom` قيمة واحدة كمجموعة قائمة بذاتها، بينما تضيف `add-atoms` كل قيمة في متتالية:

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

تدمج `equate` المجموعتين اللتين تحتويان ذرتيها، لتصبحا بعد ذلك مجموعة واحدة:

```
equate ( atom1 atom2 disjoint-set -- )
```

لكل مجموعة عضو واحد معياري يمثلها، وهو *الممثِّل*. وتُرجع `representative` هذا الممثل؛ وتكون ذرتان في المجموعة نفسها تمامًا عندما تشتركان في الممثل نفسه. وتتحقق `equiv?` من ذلك مباشرة:

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

وتُرجع `disjoint-set-members` كل ذرة أُضيفت.

[disjoint-sets]: https://docs.factorcode.org/content/vocab-disjoint-sets.html
