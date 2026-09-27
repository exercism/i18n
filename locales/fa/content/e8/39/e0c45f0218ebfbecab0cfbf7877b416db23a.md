# مقدمه

یک «مجموعه‌ی مجزا» (که به آن ساختار union-find هم می‌گویند) گردآورده‌ای از مقادیر را نگه می‌دارد که به گروه‌هایی بدون هم‌پوشانی تقسیم شده‌اند. این ساختار در واژگان [`disjoint-sets`][disjoint-sets] قرار دارد.

`<disjoint-set>` یک ساختار خالی می‌سازد. `add-atom` یک مقدار را به عنوان گروهی مستقل اضافه می‌کند و `add-atoms` همه‌ی مقادیر یک دنباله را:

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

`equate` دو گروهی را که اتم‌هایش در آن‌ها قرار دارند با هم ادغام می‌کند؛ پس از آن دیگر یک گروه‌اند:

```
equate ( atom1 atom2 disjoint-set -- )
```

هر گروه یک عضو کانونی یکتا دارد که «نماینده»ی آن است. `representative` همان را برمی‌گرداند؛ دو اتم دقیقاً زمانی در یک گروه قرار دارند که نماینده‌ی یکسانی داشته باشند. `equiv?` همین را مستقیم بررسی می‌کند:

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

`disjoint-set-members` همه‌ی اتم‌هایی را که اضافه شده‌اند برمی‌گرداند.

[disjoint-sets]: https://docs.factorcode.org/content/vocab-disjoint-sets.html
