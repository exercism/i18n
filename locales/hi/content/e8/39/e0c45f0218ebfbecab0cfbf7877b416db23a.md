# परिचय

*डिसजॉइंट सेट* (जिसे यूनियन-फाइंड स्ट्रक्चर भी कहा जाता है) वैल्यू के एक संग्रह को ऐसे समूहों में विभाजित रखता है जो एक-दूसरे में नहीं मिलते। यह [`disjoint-sets`][disjoint-sets] वोकैबुलरी में रहता है।

`<disjoint-set>` एक खाली स्ट्रक्चर बनाता है। `add-atom` एक वैल्यू को उसके अपने अलग समूह के रूप में जोड़ता है, और `add-atoms` एक सीक्वेंस में मौजूद हर वैल्यू को जोड़ता है:

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

`equate` उन दो समूहों को मिला देता है जिनमें उसके एटम हैं। इसके बाद वे एक ही समूह हो जाते हैं:

```
equate ( atom1 atom2 disjoint-set -- )
```

हर समूह का एक ही मानक सदस्य होता है, उसका *प्रतिनिधि*। `representative` उस प्रतिनिधि को लौटाता है; दो एटम ठीक तब एक ही समूह में होते हैं जब उनका प्रतिनिधि एक ही हो। `equiv?` इसकी सीधे जाँच करता है:

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

`disjoint-set-members` हर उस एटम को लौटाता है जो जोड़ा गया है।

[disjoint-sets]: https://docs.factorcode.org/content/vocab-disjoint-sets.html
