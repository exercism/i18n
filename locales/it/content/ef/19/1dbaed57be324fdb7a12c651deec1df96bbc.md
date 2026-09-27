# Introduzione

## Espressioni regolari

Le espressioni regolari (regex) sono uno strumento potente per lavorare con le stringhe in Elixir. Le espressioni regolari in Elixir seguono la specifica **PCRE** (**P**erl **C**ompatible **R**egular **E**xpressions). I pattern di stringa che rappresentano il significato dell'espressione regolare vengono prima compilati e poi usati per trovare corrispondenze in tutta o parte di una stringa.

In Elixir, il modo più comune per creare espressioni regolari è usare il sigillo `~r`. I sigilli forniscono scorciatoie di _zucchero sintattico_ per attività comuni in Elixir. Per trovare una _stringa letterale_, possiamo usare la stringa stessa come pattern dopo il sigillo.

```elixir
~r/test/
```

L'operatore `=~/2` è utile per eseguire una corrispondenza regex su una stringa e restituire un risultato `boolean`.

```elixir
"this is a test" =~ ~r/test/
# => true
```

Due note sull'uso dei sigilli:

- si possono usare molti delimitatori diversi a seconda delle tue esigenze, non solo `/`
- i pattern di stringa sono già _sottoposti a escape_; quando scrivi il pattern come stringa senza usare una regex, dovrai _eseguire l'escape_ dei backslash (`\`)

### Classi di caratteri

La corrispondenza di un intervallo di caratteri tramite parentesi quadre (`[]`) definisce una _classe di caratteri_. Questa corrisponde a un singolo carattere qualsiasi tra i caratteri della classe. Puoi anche specificare un intervallo di caratteri come `a-z`, purché l'inizio e la fine rappresentino un intervallo contiguo di punti di codice.

```elixir
regex = ~r/[a-z][ADKZ][0-9][!?]/
"jZ5!" =~ regex
# => true
"jB5?" =~ regex
# => false
```

Le _classi di caratteri abbreviate_ rendono il pattern più conciso. Per esempio:

- `\d` è l'abbreviazione di `[0-9]` (qualsiasi cifra)
- `\w` è l'abbreviazione di `[A-Za-z0-9_]` (qualsiasi carattere «di parola»)
- `\s` è l'abbreviazione di `[ \t\r\n\f]` (qualsiasi carattere di spaziatura)

Quando una _classe di caratteri abbreviata_ viene usata fuori da un sigillo, deve essere sottoposta a escape: `"\\d"`

### Alternanze

Le _alternanze_ usano `|` come carattere speciale per indicare la corrispondenza con uno _o_ l'altro

```elixir
regex = ~r/cat|bat/
"bat" =~ regex
# => true
"cat" =~ regex
# => true
```

### Quantificatori

I _quantificatori_ consentono un pattern ripetuto nella regex. Influenzano il gruppo che precede il quantificatore.

- `{N, M}` dove `N` è il numero minimo di ripetizioni e `M` è il massimo
- `{N,}` corrisponde a `N` o più ripetizioni
  - `{0,}` può anche essere scritto come `*`: corrisponde a zero o più ripetizioni
  - `{1,}` può anche essere scritto come `+`: corrisponde a una o più ripetizioni
- `{,N}` corrisponde fino a `N` ripetizioni

### Gruppi

Le parentesi tonde (`()`) sono usate per indicare _gruppi_ e _catture_. Il gruppo può anche essere _catturato_ in alcuni casi per essere restituito e usato. In Elixir, possono essere con nome o senza nome. Le catture vengono nominate aggiungendo `?<name>` dopo la parentesi aperta. I gruppi funzionano come un'unica unità, come quando sono seguiti da _quantificatori_.

```elixir
regex = ~r/(h)at/
Regex.replace(regex, "hat", "\\1op")
# => "hop"

regex = ~r/(?<letter_b>b)/
Regex.scan(regex, "blueberry", capture: :all_names)
# => [["b"], ["b"]]
```

### Ancore

Le _ancore_ sono usate per ancorare l'espressione regolare all'inizio o alla fine della stringa da confrontare:

- `^` ancora all'inizio della stringa
- `$` ancora alla fine della stringa

### Interpolazione

Poiché `~r` è una scorciatoia per `"pattern" |> Regex.escape() |> Regex.compile!()`, puoi anche usare l'interpolazione di stringhe per costruire dinamicamente un pattern di espressione regolare:

```elixir
anchor = "$"
regex = ~r/end of the line#{anchor}/
"end of the line?" =~ regex
# => false
"end of the line" =~ regex
# => true
```
