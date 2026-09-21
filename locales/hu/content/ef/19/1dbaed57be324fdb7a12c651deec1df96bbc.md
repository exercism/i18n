# Bevezetés

## Reguláris kifejezések

A reguláris kifejezések (regex) hatékony eszközt jelentenek, ha Elixirben stringekkel dolgozunk. Az Elixirben a reguláris kifejezések a **PCRE** specifikációt követik (**P**erl **C**ompatible **R**egular **E**xpressions). A reguláris kifejezés jelentését leíró string-mintákat először lefordítjuk, majd a string egészének vagy egy részének illesztésére használjuk.

Az Elixirben a reguláris kifejezések létrehozásának leggyakoribb módja a `~r` sigil használata. A sigilek _szintaktikai cukor_ rövidítéseket kínálnak az Elixirben gyakori feladatokhoz. Egy _string literál_ illesztéséhez magát a stringet használhatjuk mintaként a sigil után.

```elixir
~r/test/
```

A `=~/2` operátorral reguláris kifejezést illeszthetsz egy stringre, és `boolean` eredményt kapsz.

```elixir
"this is a test" =~ ~r/test/
# => true
```

Két megjegyzés a sigilek használatához:

- az igényeidtől függően sokféle elválasztó karaktert használhatsz a `/` helyett
- a string-minták már _escape-elve_ vannak; ha a mintát regex helyett stringként írod le, akkor magadnak kell _escape-elned_ a fordított perjeleket (`\`)

### Karakterosztályok

A karakterek egy tartományának szögletes zárójellel (`[]`) való illesztése egy _karakterosztályt_ definiál. Ez az osztályban szereplő karakterek bármelyikére illeszkedik. Megadhatsz karaktertartományt is, például `a-z`, feltéve hogy a kezdő és a záró karakter összefüggő kódponttartományt jelöl.

```elixir
regex = ~r/[a-z][ADKZ][0-9][!?]/
"jZ5!" =~ regex
# => true
"jB5?" =~ regex
# => false
```

A _rövidített karakterosztályok_ tömörebbé teszik a mintát. Például:

- `\d` a `[0-9]` rövidítése (bármely számjegy)
- `\w` az `[A-Za-z0-9_]` rövidítése (bármely „szó” karakter)
- `\s` a `[ \t\r\n\f]` rövidítése (bármely whitespace karakter)

Ha egy _rövidített karakterosztályt_ sigilen kívül használsz, escape-elni kell: `"\\d"`

### Alternációk

Az _alternációknál_ a `|` speciális karakter jelzi, hogy az egyik _vagy_ a másik lehetőségre illeszkedünk

```elixir
regex = ~r/cat|bat/
"bat" =~ regex
# => true
"cat" =~ regex
# => true
```

### Kvantifikátorok

A _kvantifikátorok_ ismétlődő mintát tesznek lehetővé a reguláris kifejezésben. A kvantifikátort megelőző csoportra hatnak.

- `{N, M}`, ahol `N` az ismétlődések minimális, `M` pedig a maximális száma
- `{N,}` legalább `N` ismétlődésre illeszkedik
  - `{0,}` felírható `*`-ként is: nulla vagy több ismétlődésre illeszkedik
  - `{1,}` felírható `+`-ként is: egy vagy több ismétlődésre illeszkedik
- `{,N}` legfeljebb `N` ismétlődésre illeszkedik

### Csoportok

A kerek zárójelek (`()`) a _csoportok_ és az _elfogások_ jelölésére szolgálnak. A csoportot az esetek egy részében _el is foghatjuk_, hogy használatra visszakapjuk. Az Elixirben ezek lehetnek nevesítettek vagy névtelenek. Az elfogásokat úgy nevezzük el, hogy a nyitó zárójel után `?<name>`-et írunk. A csoportok egyetlen egységként működnek, például amikor _kvantifikátorok_ követik őket.

```elixir
regex = ~r/(h)at/
Regex.replace(regex, "hat", "\\1op")
# => "hop"

regex = ~r/(?<letter_b>b)/
Regex.scan(regex, "blueberry", capture: :all_names)
# => [["b"], ["b"]]
```

### Horgonyok

A _horgonyok_ ahhoz kellenek, hogy a reguláris kifejezést az illesztendő string elejéhez vagy végéhez kössük:

- `^` a string elejéhez horgonyoz
- `$` a string végéhez horgonyoz

### Interpoláció

Mivel a `~r` a `"pattern" |> Regex.escape() |> Regex.compile!()` rövidítése, string-interpolációval dinamikusan is felépíthetsz egy reguláris kifejezés mintát:

```elixir
anchor = "$"
regex = ~r/end of the line#{anchor}/
"end of the line?" =~ regex
# => false
"end of the line" =~ regex
# => true
```
