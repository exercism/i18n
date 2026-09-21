# Bevezetés

## Többet a mintákról

Emlékezz rá, hogy az Alapok fogalomból: egy AWK-program **minta-művelet párokból** épül fel.

```awk
pattern1 { action1 }
pattern2 { action2 }
...
```

### Mit értünk „minta” alatt?

A minta bármilyen AWK-kifejezés lehet.
Azt, hogy a művelet végrehajtódik-e, a kifejezés eredményének igazságértéke dönti el.

### Az üres minta

A minta elhagyható.
Ebben az esetben a művelet minden rekordnál végrehajtódik.

A passwd fájlban lévő összes felhasználónevet kiírhatjuk.

```sh
awk -F: '{print $1}' /etc/passwd
```

### Reguláris kifejezések

Az AWK össze tud hasonlítani stringeket reguláris kifejezésekkel, hogy Boolean eredményt kapjunk.

Egy adott mező illesztéséhez a `~` reguláris kifejezés-illesztő operátort használd.
Ez az operátor bal oldali operandusként egy stringet, jobb oldali operandusként pedig egy reguláris kifejezést vár.
A reguláris kifejezés literál `/` jelek közé kerül.

Így keresheted meg a passwd fájlban azokat a felhasználókat, akik bashsel jelentkeznek be:

```sh
awk -F: '$7 ~ /bash/ {print $1}' /etc/passwd
```

A `!~` operátor azt jelenti, hogy a reguláris kifejezés **nem** illeszkedik.

Ha az aktuális rekordra akarsz illeszteni egy reguláris kifejezést, ezt írhatod: `$0 ~ /regex/`.
Ez annyira gyakori, hogy van rá rövidítés: elhagyhatod a `$0`-t és a `~`-t, és egyszerűen csak `/regex/`-et írhatsz.

```sh
awk '/regex/' data.txt
```

~~~~exercism/note
Hasonlítsd össze ezt az egysoros AWK-parancsot a megfelelő grep paranccsal

```sh
grep 'regex' data.txt
```

Az AWK egy teljes programozási nyelvet ad anélkül, hogy feláldoznád a tömörséget.
~~~~

A GNU AWK reguláris kifejezéseinek ízvilágába egy későbbi fogalomnál mélyedünk bele jobban.

### Kifejezések

Az AWK-kifejezéseket (legyenek aritmetikaiak, logikaiak vagy bármilyen más jellegűek) mintaként használhatod.

Az 1000-es vagy annál nagyobb UID-vel rendelkező felhasználók kinyeréséhez:

```sh
awk -F: '$3 >= 1000' /etc/passwd
```

Emlékezz rá, hogy az AWK hamis értékei a nulla szám és az üres string, minden más szám vagy string pedig igaz.
Bármely kifejezés, amelynek kiértékelése egy számot vagy egy stringet ad eredményül, használható mintaként.

### Függvények

Bármely [beépített][builtins] vagy [felhasználó által definiált][user-defined] függvény használható kifejezésben, és így mintában is.
Néhány példa:

```awk
length($1) {print "first field is not empty"}
```
```awk
toupper(substr($1, 1, 1)) ~ /[AEIOU]/ {print "starts with a vowel"}
```

### Konstans minták

Gyakori AWK-idióma:

```sh
{
    xyz()   # some code that transforms each record
}
1
```

Az `1` egy igaznak értékelt minta, amelyhez nem tartozik művelet.
Ez azt jelenti: „írd ki az aktuális rekordot”.

[builtins]: https://www.gnu.org/software/gawk/manual/html_node/Built_002din.html
[user-defined]: https://www.gnu.org/software/gawk/manual/html_node/User_002ddefined.html
