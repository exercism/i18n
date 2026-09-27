# Numeri in virgola mobile

I numeri in virgola mobile sono numeri reali: possono avere una parte frazionaria. Vengono rappresentati nella macchina come una sequenza di bit binari, secondo la [specifica IEEE-754](https://en.wikipedia.org/wiki/IEEE_754). Nel linguaggio comune, i numeri in virgola mobile vengono chiamati «float».

I numeri in virgola mobile hanno sempre un segno. Avere il segno significa riservare uno dei bit del numero per indicare se quel numero è negativo oppure no.

I numeri in virgola mobile hanno una **larghezza in bit**, che è semplicemente il numero di bit che compongono il numero. Questo influisce sull'intervallo e sulla precisione dei valori che quel tipo può rappresentare.

Rust ha 2 tipi primitivi in virgola mobile: `f32` e `f64`. Il numero dopo la `f` indica la larghezza in bit. In altri linguaggi, `f32` è talvolta chiamato «precisione singola», e `f64` «precisione doppia».

## Quale usare?

In generale, usa `f64`: è veloce quanto `f32` sulla maggior parte dell'hardware di consumo moderno e riduce notevolmente l'incidenza delle [imprecisioni in virgola mobile](https://0.30000000000000004.com/).

Se ti servono numeri razionali a precisione infinita, puoi usare il [crate `num-rational`](https://crates.io/crates/num-rational), che fornisce un tipo `BigRational`. Se ti servono numeri decimali a precisione fissa, puoi usare il [crate `rust_decimal`](https://crates.io/crates/rust_decimal), che fornisce un tipo `Decimal`.

## Convertire tra numeri in virgola mobile

Rust non ha conversioni numeriche implicite. Se ti serve fare un cast tra tipi in virgola mobile, ci sono due strategie di base: la parola chiave `as` ed i trait `From` e `TryFrom`.

Usare la parola chiave `as` è semplice: `expr as Type`. Tuttavia, ci sono diversi [casi particolari e sottigliezze](https://doc.rust-lang.org/nomicon/casts.html) da tenere a mente quando usi i cast con `as`.

I cast basati sui trait sono un po' più complicati, ma più sicuri: i trait di conversione sono implementati solo dove sono sicuri. Per esempio, [`f32`](https://doc.rust-lang.org/std/primitive.f32.html) implementa `From<u8>`, `From<u16>`, `From<i8>` e `From<i16>`: qualsiasi valore rappresentabile da uno di questi tipi è garantito essere rappresentabile in un `f32`. Si può usare la forma `f32::from(expr)`, oppure `expr.into()`, dove `expr` corrisponde a uno di quei tipi.

Quando si convertono valori in virgola mobile, spesso si preferisce il cast con `as`, semplicemente per la relativa scarsità di implementazioni di cast basate sui trait. A ottobre 2020, `TryFrom` non è implementato per i numeri in virgola mobile. Il cast con `as` da `f32` a `f64` è senza perdita di dati. Il contrario è con perdita, ma ha un protocollo di cast definito che mira a ridurre al minimo la perdita.
