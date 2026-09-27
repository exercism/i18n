# ভূমিকা

একটি *ডিসজয়েন্ট সেট* (যাকে ইউনিয়ন-ফাইন্ড স্ট্রাকচারও বলা হয়) মানের একটি সংগ্রহকে ওভারল্যাপ না হওয়া দলগুলোতে ভাগ করে রাখে। এটি [`disjoint-sets`][disjoint-sets] ভোকাবুলারিতে থাকে।

`<disjoint-set>` একটি খালি স্ট্রাকচার তৈরি করে। `add-atom` একটি মানকে আলাদা দল হিসেবে যোগ করে, আর `add-atoms` একটি সিকোয়েন্সের প্রতিটি মান যোগ করে:

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

`equate` তার অ্যাটমগুলো যে দুটি দলে আছে সেই দুটো দলকে একত্রিত করে, এরপর তারা এক দল হয়ে যায়:

```
equate ( atom1 atom2 disjoint-set -- )
```

প্রতিটি দলের একটি মাত্র ক্যানোনিকাল সদস্য থাকে, যাকে তার *রিপ্রেজেনটেটিভ* বলা হয়। `representative` সেটি রিটার্ন করে; দুটি অ্যাটম ঠিক তখনই একই দলে থাকে যখন তারা একটি রিপ্রেজেনটেটিভ শেয়ার করে। `equiv?` সেটি সরাসরি যাচাই করে:

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

`disjoint-set-members` যোগ করা প্রতিটি অ্যাটম রিটার্ন করে।

[disjoint-sets]: https://docs.factorcode.org/content/vocab-disjoint-sets.html
