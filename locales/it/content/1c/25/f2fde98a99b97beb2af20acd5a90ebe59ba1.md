# Introduzione

Spesso è utile raggruppare una serie di elementi e trattare questi gruppi come unità. In Cairo, un gruppo di questo tipo si chiama struct, e ogni elemento è uno dei campi della struct. Una struct definisce l'insieme generale dei campi disponibili, ma un esempio particolare di struct si chiama istanza.

Inoltre, le struct possono avere metodi definiti su di esse, che hanno accesso ai campi. In questo caso la struct stessa è indicata con `self`. Quando un metodo usa `ref self: SomeStruct`, i campi possono essere modificati, cioè mutati. Quando un metodo usa `self: SomeStruct` o `self: @SomeStruct`, i campi non possono essere modificati: sono immutabili. Controllare la mutabilità aiuta il borrow-checker a garantire che intere classi di bug di concorrenza semplicemente non si verifichino in Cairo.

In questo esercizio implementerai due tipi di metodi su una struct. I primi sono generalmente noti come getter: espongono i campi della struct al mondo esterno, senza permettere a nessun altro di mutare quel valore.

Implementerai anche metodi di un altro tipo, generalmente noti come setter. Questi cambiano il valore del campo. I setter non sono molto comuni in Cairo: se un campo può essere modificato liberamente, di solito è più comune renderlo semplicemente pubblico. Sono però utili quando aggiornare il campo dovrebbe avere effetti collaterali.

Le struct si definiscono con la parola chiave `struct`, seguita dal nome con l'iniziale maiuscola del tipo che la struct descrive:

```rust
struct Item {}
```

Altri tipi vengono poi portati nel corpo della struct come _campi_ della struct, ognuno con il proprio tipo:

```rust
struct Item {
    name: String,
    weight: f32,
    worth: u32,
}
```

Un trait definisce un insieme di metodi che un tipo può implementare (qui ci concentreremo sulle struct, ma i trait possono essere implementati anche sugli enum). Questi metodi possono essere chiamati sulle istanze del tipo quando questo trait è implementato. I trait si definiscono con la parola chiave `trait` e all'interno dei trait definiamo le firme dei metodi che vogliamo far implementare al nostro tipo.

```rust
trait ImplTrait {
    // Define the method signature
    fn new() -> Item;
}
```

Infine, i metodi si possono definire sulle struct all'interno di un blocco `impl`, che implementa il trait definito:

```rust
impl ItemImpl of ImplTrait {
    // initializes and returns a new instance of our Item struct
    fn new() -> Item {
        Item {}
    }
}
```
