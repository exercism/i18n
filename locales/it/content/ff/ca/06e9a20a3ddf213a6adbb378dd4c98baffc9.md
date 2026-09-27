# Informazioni

Quando una variante di un tipo personalizzato contiene dati, si chiama record, e ogni valore contenuto risiede in un _campo_.

```gleam
pub type Rectangle {
  Rectangle(
    Float, // The first field
    Float, // The second field
  )
}
```

Per migliorare la leggibilità, Gleam consente di etichettare i campi con un nome.

```gleam
pub type Rectangle {
  Rectangle(
    width: Float,
    height: Float,
  )
}
```

Le etichette possono essere usate per passare gli argomenti in qualsiasi ordine al costruttore di un record.

```gleam
let a = Rectangle(height: 10.0, width: 20.0)
let b = Rectangle(width: 20.0, height: 10.0)

a == b
// -> True
```

Quando un tipo personalizzato ha una sola variante, si può usare la sintassi di accesso `.label` per ottenere i campi di un record.

```gleam
let rect = Rectangle(height: 10.0, width: 20.0)

rect.height // -> 10.0
rect.width  // -> 20.0
```

La sintassi di aggiornamento dei record si può usare quando un tipo personalizzato ha una sola variante, per creare un nuovo record a partire da uno esistente, ma con alcuni dei campi sostituiti da nuovi valori.

```gleam
let rect = Rectangle(height: 10.0, width: 20.0)
let tall_rect = Rectangle(..rect, height: 50.0)

tall_rect.height // -> 50.0
tall_rect.width  // -> 20.0
```

Le etichette si possono usare anche durante il pattern matching per estrarre valori dai record.

```gleam
pub fn is_tall(rect: Rectangle) {
  case rect {
    Rectangle(height: h, width: _) if h > 20.0 -> True
    _ -> False
  }
}
```

Se vogliamo eseguire il match solo su alcuni dei campi, possiamo usare l'operatore spread `..` per ignorare tutti i campi rimanenti.

```gleam
pub fn is_tall(rect: Rectangle) {
  case rect {
    Rectangle(height: h, ..) if h > 20.0 -> True
    _ -> False
  }
}
```
