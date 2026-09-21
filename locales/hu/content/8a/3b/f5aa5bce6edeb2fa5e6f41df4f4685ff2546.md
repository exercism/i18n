# Mi esik az Exercism Rust-kurzusának hatókörén kívül?

Ez a fájl azt hivatott elmagyarázni, hogy az Exercism Rust-kurzusa mit tud és mit nem tud megtanítani a Rust nyelv, közösség és ökoszisztéma keretein belül.

Ha egy adott feladat _design.md_ fájljában a „Out of scope” rész alatt már szerepel valamilyen anyag, azt itt nem kell megismételni, kivéve, ha úgy érezzük, hogy a témának egyébként nincs elég hangsúlya.

## A webes felület korlátai

A webes felületet használó tanuló csak azt teheti meg, amit a webes felület és a tesztfuttató engedélyez, így a webes felület képességei gyakorlatilag külső korlátként szolgálnak a Rust-kurzus számára.

A tanuló a következőket teheti:

- Egyetlen `.rs` fájlt szerkeszthet
- Kimenetet kaphat a `stdout`-ból (például a `dbg!`-tól)

Nevezetesen ez azt jelenti, hogy a Cargo.toml-t nem szerkeszthetik, ezért minden olyan feladatnak, amely külső crate-től függ, már eleve tartalmaznia kell az összes függőséget a Cargo.toml-ban.

## Miről nem szól az Exercism

Az Exercism célja, hogy az ember folyékonyan elsajátítson egy programozási nyelvet, nem pedig az, hogy absztraktabb készségeket tanítson, mint a szoftvertervezés vagy a számítástudomány. Ezért minden olyan téma, amely nem kapcsolódik szorosan a Rust programozási nyelvhez, kívül esik a Rust-kurzus hatókörén.

## Példák a kizárt témákra

Néhány példa a kizárt témákra:

### Cargo

- a Cargo.toml szerkesztése
- CLI-parancsok, például `new`, `update`, `bench`

### Keretrendszerek

- Amethyst
- Yew, Iced, Sauron stb.

### Interoperabilitás

- CFFI
- `asm!`

### Általában:

- Fájlkezelés
- Hálózatkezelés
