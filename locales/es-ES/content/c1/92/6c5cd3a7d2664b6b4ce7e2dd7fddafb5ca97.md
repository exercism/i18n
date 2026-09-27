# Números de coma flotante

Los números de coma flotante son números reales: pueden tener una parte fraccionaria. Se representan en la máquina como un patrón de bits binarios, usando la [especificación IEEE-754](https://en.wikipedia.org/wiki/IEEE_754).
A los números de coma flotante se les llama a menudo «flotantes».

Los números de coma flotante siempre tienen signo. Tener signo significa reservar uno de los bits del número para indicar si ese número es negativo o no.

Los números de coma flotante tienen un **ancho de bits**, que es simplemente el número de bits que componen ese número. Esto afecta al rango y a la precisión de los valores que puede representar ese tipo.

Rust tiene dos tipos primitivos de coma flotante: `f32` y `f64`. El número después de la `f` indica el ancho de bits. En otros lenguajes, `f32` a veces se conoce como «precisión simple», y `f64` a veces se conoce como «precisión doble».

## ¿Cuál debería usar?

En general, usa `f64`: es tan rápido como `f32` en la mayoría del hardware de consumo moderno y reduce significativamente la incidencia de la [imprecisión de la coma flotante](https://0.30000000000000004.com/).

Si necesitas números racionales de precisión infinita, puedes usar el [crate `num-rational`](https://crates.io/crates/num-rational), que proporciona un tipo `BigRational`. Si necesitas números decimales de precisión fija, puedes usar el [crate `rust_decimal`](https://crates.io/crates/rust_decimal), que proporciona un tipo `Decimal`.

## Conversión entre números de coma flotante

Rust no tiene conversiones numéricas implícitas. Si necesitas convertir entre tipos de coma flotante, hay dos estrategias básicas: la palabra clave `as` y los traits `From` y `TryFrom`.

Usar la palabra clave `as` es sencillo: `expr as Type`. Sin embargo, hay una serie de [advertencias y sutilezas](https://doc.rust-lang.org/nomicon/casts.html) que debes tener en cuenta al usar conversiones con `as`.

La conversión basada en traits es un poco más compleja, pero más segura: los traits de conversión solo se implementan donde son seguros. Por ejemplo, [`f32`](https://doc.rust-lang.org/std/primitive.f32.html) implementa `From<u8>`, `From<u16>`, `From<i8>` y `From<i16>`: cualquier valor representable por cualquiera de estos tipos tiene garantizado que puede representarse en un `f32`. Se puede usar como `f32::from(expr)` o `expr.into()`, donde `expr` se resuelve a uno de esos tipos.

Al convertir valores de coma flotante, a menudo se prefiere la conversión con `as` simplemente por la relativa escasez de implementaciones de conversión basadas en traits. A fecha de octubre de 2020, `TryFrom` no está implementado para números de coma flotante. La conversión con `as` de `f32` a `f64` no tiene pérdida. La inversa sí tiene pérdida, pero cuenta con un protocolo de conversión definido destinado a minimizar la pérdida.
