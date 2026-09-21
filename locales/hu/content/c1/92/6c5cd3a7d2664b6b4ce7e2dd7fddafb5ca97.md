# Lebegőpontos számok

A lebegőpontos számok valós számok: lehet törtrészük. A gép bináris bitek mintázataként ábrázolja őket, az [IEEE-754 specifikáció](https://en.wikipedia.org/wiki/IEEE_754) szerint. A lebegőpontos számokat a köznyelv floatnak nevezi.

A lebegőpontos számok mindig előjelesek. Az előjelesség azt jelenti, hogy a szám egyik bitjét fenntartjuk annak jelzésére, hogy a szám negatív-e vagy sem.

A lebegőpontos számoknak van **bitszélességük**, ami nem más, mint a számot alkotó bitek száma. Ez hatással van arra, hogy az adott típus milyen tartományú és pontosságú értékeket tud ábrázolni.

A Rustnak két primitív lebegőpontos típusa van: `f32` és `f64`. Az `f` utáni szám a bitszélességet jelöli. Más nyelvekben az `f32`-t néha „egyszeres pontosságúnak”, az `f64`-t pedig „kétszeres pontosságúnak” nevezik.

## Melyiket használjam?

Általánosságban használd az `f64`-t: a legtöbb modern fogyasztói hardveren ugyanolyan gyors, mint az `f32`, és jelentősen csökkenti a [lebegőpontos pontatlanság](https://0.30000000000000004.com/) előfordulását.

Ha végtelen pontosságú racionális számokra van szükséged, használhatod a [`num-rational` crate](https://crates.io/crates/num-rational) csomagot, amely `BigRational` típust biztosít. Ha fix pontosságú tizedes törtekre van szükséged, használhatod a [`rust_decimal` crate](https://crates.io/crates/rust_decimal) csomagot, amely `Decimal` típust biztosít.

## Átváltás lebegőpontos számok között

A Rustban nincs automatikus numerikus típuskonverzió. Ha float típusok között kell kasztolnod, két alapvető stratégia kínálkozik: az `as` kulcsszó, valamint a `From` és `TryFrom` trait.

Az `as` kulcsszó használata egyszerű: `expr as Type`. Az `as`-kasztok használatakor azonban számos [buktatóra és finomságra](https://doc.rust-lang.org/nomicon/casts.html) kell figyelned.

A trait-alapú kasztolás kicsit bonyolultabb, de biztonságosabb: a konverziós trait csak ott van implementálva, ahol biztonságos. Például az [`f32`](https://doc.rust-lang.org/std/primitive.f32.html) implementálja a `From<u8>`, `From<u16>`, `From<i8>` és `From<i16>` traitet: bármely érték, amelyet ezen típusok bármelyike ábrázolni tud, garantáltan ábrázolható egy `f32`-ben is. Így használható: `f32::from(expr)` vagy `expr.into()`, ahol az `expr` e típusok egyikét veszi fel.

Lebegőpontos értékek konvertálásakor gyakran inkább az `as`-kasztolást választjuk, egyszerűen azért, mert viszonylag kevés trait-alapú kasztimplementáció létezik. A 2020. októberi állapot szerint a `TryFrom` nincs implementálva a lebegőpontos számokra. Az `as`-kasztolás `f32`-ből `f64`-be veszteségmentes. Fordítva viszont veszteséges, de van egy meghatározott kasztolási protokoll, amelynek célja a veszteség minimalizálása.
