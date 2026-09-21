# Metódusok szintaxisa

A metódusok a Cairoban hasonlítanak a függvényekhez, de a trait-eken keresztül egy adott típushoz kötődnek.

Első paraméterük mindig a `self`, amely azt a példányt jelöli, amelyen a metódust meghívják.

Bár a Cairoban nem definiálhatsz metódusokat közvetlenül egy típuson, ugyanezt a funkcionalitást elérheted úgy, hogy definiálsz egy trait-et, és implementálod a típusra.

Íme egy példa arra, hogyan definiálhatsz metódust egy `Rectangle` típuson egy trait segítségével:

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

A fenti példában az `area` metódus egy téglalap területét számítja ki.

A `#[generate_trait]` attribútum használata leegyszerűsíti a folyamatot, mert automatikusan létrehozza neked a szükséges trait-et.

Ez tisztábbá teszi a kódodat, miközben továbbra is lehetővé teszi, hogy a metódusok adott típusokhoz kapcsolódjanak.

## Társított függvények

A társított függvények hasonlítanak a metódusokhoz, de nem egy típus példányán működnek, és nem vesznek fel `self` paramétert.

Ezeket a függvényeket gyakran konstruktorként vagy a típushoz kapcsolódó segédfüggvényként használjuk.

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

A társított függvények, például a `Rectangle::square`, a `::` szintaxist használják, és a típus névterébe tartoznak.

Megkönnyítik a példányok létrehozását vagy kezelését anélkül, hogy már létező objektumra lenne szükség.

Azzal, hogy a Cairo a kapcsolódó funkcionalitást trait-ekbe és implementációkba rendezi, letisztult, moduláris és bővíthető kódszerkezeteket tesz lehetővé.
