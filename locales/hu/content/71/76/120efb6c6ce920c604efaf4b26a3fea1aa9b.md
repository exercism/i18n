# Tippek

## Általános

- Tiszta függvényeket írj, amelyek JSON stringeket adnak vissza; nem kell webkiszolgálót futtatnod.

- A Roc beépített függvényként biztosítja a `Json.parse` és a `Json.to_str` függvényt.
  Ha egy elemző segédfüggvény visszatérési értékére típusannotációt írsz, azzal megmondod a `Json.parse`-nak, hogy milyen record-szerkezetet dekódoljon.

- A `payload ?: Str` mező opcionális: a stub record-mintájában kötött `payload` értéke vagy `Ok(text)`, vagy `Err(MissingField)`.
