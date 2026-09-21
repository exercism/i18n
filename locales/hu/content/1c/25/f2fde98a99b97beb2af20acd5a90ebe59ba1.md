# Bevezetés

Gyakran hasznos, ha elemek egy csoportját összefogjuk, és ezeket a csoportokat egységként kezeljük.
Caióban egy ilyen csoportot struct-nak, az egyes elemeket pedig a struct mezőinek nevezzük.
A struct az elérhető mezők általános körét definiálja, egy konkrét példányát viszont példánynak nevezzük.

Ráadásul a struct-okhoz metódusokat is definiálhatunk, amelyek hozzáférnek a mezőkhöz.
Ilyenkor magára a structra `self`-ként hivatkozunk.
Amikor egy metódus `ref self: SomeStruct` formát használ, a mezők megváltoztathatók, azaz mutálhatók.
Amikor egy metódus `self: SomeStruct` vagy `self: @SomeStruct` formát használ, a mezők nem változtathatók meg: változtathatatlanok.
A változtathatóság szabályozása segít a borrow-checkernek biztosítani, hogy a konkurenciával kapcsolatos hibák egész kategóriái egyszerűen elő se forduljanak Caióban.

Ebben a feladatban kétféle metódust fogsz megvalósítani egy structon.
Az első típust általában getternek nevezik: ezek hozzáférhetővé teszik a struct mezőit a külvilág számára, anélkül hogy bárki más módosíthatná azt az értéket.

Emellett egy másik típusú metódust is megvalósítasz, amelyeket általában setternek neveznek.
Ezek megváltoztatják a mező értékét.
A setterek nem túl gyakoriak Caióban (ha egy mező szabadon módosítható, gyakoribb, hogy egyszerűen nyilvánossá tesszük), de akkor hasznosak, ha a mező frissítésének mellékhatásai vannak.

A struct-okat a `struct` kulcsszóval definiáljuk, amelyet a struct által leírt típus nagy kezdőbetűs neve követ:

```rust
struct Item {}
```

Ezután további típusokat viszünk be a struct testébe a struct _mezőiként_, mindegyiket a saját típusával:

```rust
struct Item {
    name: String,
    weight: f32,
    worth: u32,
}
```

A trait olyan metódusok halmazát definiálja, amelyeket egy típus implementálhat (itt most a structokra összpontosítunk, de trait-eket enumokon is implementálhatunk).
Ezeket a metódusokat a típus példányain hívhatjuk meg, ha ezt a trait-et implementáltuk.
A trait-eket a `trait` kulcsszóval definiáljuk, és a trait-eken belül adjuk meg azokat a metódusszignatúrákat, amelyeket a típusunknak implementálnia kell.

```rust
trait ImplTrait {
    // Define the method signature
    fn new() -> Item;
}
```

Végül a metódusokat structokon is definiálhatjuk egy `impl` blokkon belül, amely a megadott trait-et implementálja:

```rust
impl ItemImpl of ImplTrait {
    // initializes and returns a new instance of our Item struct
    fn new() -> Item {
        Item {}
    }
}
```
