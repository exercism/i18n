# Sintassi dei metodi

I metodi in Cairo sono simili alle funzioni, ma sono legati a un tipo specifico tramite i trait.

Il loro primo parametro è sempre `self`, che rappresenta l'istanza su cui il metodo viene chiamato.

Sebbene Cairo non permetta di definire metodi direttamente su un tipo, puoi ottenere la stessa funzionalità definendo un trait e implementandolo per il tipo.

Ecco un esempio di come definire un metodo su un tipo `Rectangle` usando un trait:

```rust
#[derive(Copy, Drop)]
struct Rectangle {
    width: u64,
    height: u64,
}

#[generate_trait]
impl RectangleImpl of RectangleTrait {
    fn area(self: @Rectangle) -> u64 {
        (*self.width) * (*self.height)
    }
}

fn main() {
    let rect = Rectangle { width: 30, height: 50 };
    println!("Area is {}", rect.area());
}
```

Nell'esempio sopra, il metodo `area` calcola l'area di un rettangolo.

Usare l'attributo `#[generate_trait]` semplifica il processo, creando automaticamente il trait richiesto.

Questo rende il codice più pulito, consentendo comunque di associare i metodi a tipi specifici.

## Funzioni associate

Le funzioni associate sono simili ai metodi, ma non operano su un'istanza di un tipo: non prendono `self` come parametro.

Queste funzioni sono spesso usate come costruttori o funzioni di utilità legate al tipo.

```rust
#[generate_trait]
impl RectangleImpl of RectangleTrait {
    fn square(size: u64) -> Rectangle {
        Rectangle { width: size, height: size }
    }
}

fn main() {
    let square = RectangleTrait::square(10);
    println!("Square dimensions: {}x{}", square.width, square.height);
}
```

Le funzioni associate, come `Rectangle::square`, usano la sintassi `::` e appartengono allo spazio dei nomi del tipo.

Rendono semplice creare istanze o lavorare con esse senza richiedere un oggetto esistente.

Organizzando la funzionalità correlata in trait e implementazioni, Cairo consente strutture di codice pulite, modulari ed estensibili.
