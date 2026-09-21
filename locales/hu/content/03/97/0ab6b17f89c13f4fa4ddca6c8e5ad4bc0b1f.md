# Tippek

## Általános

## 1. Valósítsd meg a `new()` metódust

- A `new()` metódus azokat az argumentumokat kapja, amelyekkel egy `User` példányt szeretnénk létrehozni.
  Egy `User` példányt kell visszaadnia a megadott névvel, életkorral és testsúllyal.

- A structok definiálására és példányosítására a [structok dokumentációjában][structs] találsz példákat.

## 2. Valósítsd meg a getter metódusokat

- A `name()`, `age()` és `weight()` metódusok getterek.
  Más szóval azért felelősek, hogy visszaadják a megfelelő mezőt egy structpéldányból.

- Caióban nem kell `return` utasítást használnod, hacsak nem szeretnéd, hogy egy függvény vagy metódus korán térjen vissza.
  Egyébként idiomatikusabb az _implicit_ visszatérést használni: egyszerűen elhagyod a pontosvesszőt annál az eredménynél, amelyet a függvény vagy metódus visszaad.
  Nem _hiba_ explicit `return`-t használni, de tisztább, ha lehetőség szerint kihasználod az implicit visszatéréseket.

```rust
fn foo() -> i32 {
    1
}
```

- A metódusok structokon való definiálására a [metódusok dokumentációjában][methods] találsz további példákat.

## 3. Valósítsd meg a setter metódusokat

- A `set_age()` és `set_weight()` metódusok setterek, amelyek a bemeneti argumentummal frissítik a structpéldány megfelelő mezőjét.

- Ahogy ezeknek a metódusoknak a szignatúrája is mutatja, a setter metódusok nem adnak vissza semmit.

[structs]: https://book.cairo-lang.org/ch05-01-defining-and-instantiating-structs.html
[methods]: https://book.cairo-lang.org/ch05-03-method-syntax.html
