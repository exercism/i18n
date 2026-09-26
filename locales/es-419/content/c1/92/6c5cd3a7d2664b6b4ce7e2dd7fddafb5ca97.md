# Números de punto flotante

Los números de punto flotante son números reales: pueden tener una parte fraccionaria. Se representan en la máquina como un patrón de bits binarios, utilizando la [especificación IEEE-754](https://en.wikipedia.org/wiki/IEEE_754).
A los números de punto flotante se les llama flotantes.

Los números de punto flotante siempre tienen signo. Tener signo significa reservar uno de los bits del número para indicar si el número es negativo o no.

Los números de punto flotante tienen un **ancho de bits**, que es simplemente el número de bits que componen el número. Esto afecta el rango y la precisión de los valores que puede representar ese tipo.

Rust tiene 2 tipos primitivos de punto flotante: `f32` y `f64`. El número después de la `f` indica el ancho de bits. En otros lenguajes,`f32` a veces se conoce como "precisión simple", y `f64` a veces se conoce como "precisión doble".

## ¿Cuál deberías usar?

En general, usa `f64`: es tan rápido como `f32` en la mayoría del hardware de consumo moderno, y reduce significativamente la incidencia de [imprecisión de punto flotante](https://0.30000000000000004.com/).

Si necesitas números racionales de precisión infinita, podrías usar el [`num-rational` crate](https://crates.io/crates/num-rational), que proporciona un tipo `BigRational`. Si necesitas números decimales de precisión fija, podrías usar el [`rust_decimal` crate](https://crates.io/crates/rust_decimal), que proporciona un tipo `Decimal`.

## Conversión entre números de punto flotante

Rust no tiene conversiones numéricas implícitas. Si necesitas convertir entre tipos de punto flotante, hay dos estrategias básicas: la palabra clave `as`, y los traits `From` y `TryFrom`.

Usar la palabra clave `as` es simple: `expr as Type`. Sin embargo, hay una serie de [advertencias y sutilezas](https://doc.rust-lang.org/nomicon/casts.html) que debes tener en cuenta al usar conversiones con `as`.

La conversión basada en traits es un poco más compleja, pero más segura: los traits de conversión solo se implementan donde son seguros. Por ejemplo, [`f32`](https://doc.rust-lang.org/std/primitive.f32.html) implementa `From<u8>`, `From<u16>`, `From<i8>`, y `From<i16>`: cualquier valor representable por cualquiera de estos tipos está garantizado que es representable en un `f32`. Se puede usar como `f32::from(expr)`, o `expr.into()`, donde `expr` se resuelve a uno de esos tipos.

Al convertir valores de punto flotante, a menudo se prefiere la conversión con `as` simplemente debido a la relativa escasez de implementaciones de conversión basadas en traits. A partir de octubre de 2020, `TryFrom` no está implementado para números de punto flotante. La conversión con `as` de `f32` a `f64` es sin pérdida. Lo contrario tiene pérdida, pero tiene un protocolo de conversión definido destinado a minimizar la pérdida.
