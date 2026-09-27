# Suggerimenti

## Generale

## 1. Implementa il metodo `new()`

- Il metodo `new()` riceve gli argomenti con cui vogliamo istanziare un'istanza di `User`.
  Deve restituire un'istanza di `User` con il nome, l'età ed il peso specificati.

- Vedi la [documentazione sulle struct][structs] per esempi di definizione e istanziazione di struct.

## 2. Implementa i metodi getter

- I metodi `name()`, `age()` e `weight()` sono getter.
  In altre parole, si occupano di restituire il campo corrispondente da un'istanza di una struct.

- In Cairo non c'è bisogno di usare un'istruzione `return`, a meno che tu non voglia espressamente che una funzione o un metodo restituisca in anticipo.
  Altrimenti è più idiomatico sfruttare un ritorno _implicito_, omettendo il punto e virgola sul risultato che vogliamo che una funzione o un metodo restituisca.
  Non è _sbagliato_ usare un ritorno esplicito, ma è più pulito approfittare dei ritorni impliciti quando possibile.

```rust
fn foo() -> i32 {
    1
}
```

- Vedi la [documentazione sui metodi][methods] per altri esempi di definizione di metodi sulle struct.

## 3. Implementa i metodi setter

- I metodi `set_age()` e `set_weight()` sono setter, e si occupano di aggiornare il campo corrispondente di un'istanza di una struct con l'argomento di input.

- Come specificano le firme di questi metodi, i metodi setter non devono restituire nulla.

[structs]: https://book.cairo-lang.org/ch05-01-defining-and-instantiating-structs.html
[methods]: https://book.cairo-lang.org/ch05-03-method-syntax.html
