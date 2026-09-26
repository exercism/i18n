# Acerca de

El concepto [SIMD][SIMD] presentó los valores de punto flotante empaquetados: varios números guardados en un solo registro `xmm`, sobre los que se opera por carriles y en paralelo.
Esos mismos registros `xmm` también pueden guardar _enteros_ empaquetados.

## Sintaxis

La mayor parte del modelo de punto flotante de SIMD se traslada sin cambios a los enteros empaquetados:

- Un registro de 128 bits se divide en carriles
- Las instrucciones actúan en paralelo sobre los carriles que están en la misma posición
- Los operandos de memoria siguen las mismas reglas de alineación de 16 bytes

Sin embargo, la sintaxis es un poco diferente:

1. Un _prefijo_ `p` que indica que la instrucción opera sobre datos _empaquetados_.
2. La operación que se realiza, con el mismo nombre que su contraparte no SIMD (también llamada _escalar_) (por ejemplo, `add`, `mul`, etc.).
3. Un sufijo que indica el tamaño de cada carril.

Los enteros empaquetados tienen cuatro tamaños de carril, y cada uno tiene su propio sufijo:

| ancho del carril | bytes | carriles en 128 bits | sufijo |
|------------------|-------|----------------------|--------|
| byte             | 1     | 16                   | b      |
| word             | 2     | 8                    | w      |
| dword            | 4     | 4                    | d      |
| qword            | 8     | 2                    | q      |

Por ejemplo:

| instrucción | significado                          |
|-------------|--------------------------------------|
| `paddb`     | `add` empaquetado, carriles de 8 bits (16 carriles) |
| `paddw`     | `add` empaquetado, carriles de 16 bits (8 carriles) |
| `paddd`     | `add` empaquetado, carriles de 32 bits (4 carriles) |
| `paddq`     | `add` empaquetado, carriles de 64 bits (2 carriles) |

Algunas instrucciones reciben como entrada carriles de un tamaño, pero producen carriles de otro tamaño.
Siguen la misma convención general, pero con _dos_ sufijos de tamaño.
El primero indica el tamaño del carril de entrada y el segundo, el tamaño del carril de salida:

| instrucción  | significado                                       |
|--------------|---------------------------------------------------|
| `pmovsxwd`   | `movsx` empaquetado, de carriles de 16 bits a carriles de 32 bits |
| `pmuldq`     | `mul` empaquetado, de carriles de 32 bits a carriles de 64 bits   |

## Movimientos de memoria

Dos instrucciones con nombre de entero copian 128 bits entre un registro `xmm` y la memoria:

| instrucción | descripción                                             |
|-------------|---------------------------------------------------------|
| `movdqa`    | copia enteros empaquetados desde o hacia una ubicación _alineada_   |
| `movdqu`    | copia enteros empaquetados desde o hacia una ubicación _no alineada_ |

Se comportan como `movaps` y `movups`: `movdqa` genera un fallo con una dirección desalineada, mientras que `movdqu` acepta cualquiera.
Las cuatro copian 128 bits sin interpretarlos.
El par con nombre de entero se usa con datos enteros por convención, no por obligación.

~~~~exercism/note
Aquí `dq` significa `double-qword`, es decir, 128 bits (16 bytes).
~~~~

## Suma y resta

La suma y la resta siguen la regla de nombres:

```x86asm
paddb xmm0, xmm1 ; 16 lanes: each  8-bit, xmm0 += xmm1
paddw xmm2, xmm3 ;  8 lanes: each 16-bit, xmm2 += xmm3

psubd xmm4, xmm5 ;  4 lanes: each 32-bit, xmm4 -= xmm5
psubq xmm6, xmm7 ;  2 lanes: each 64-bit, xmm6 -= xmm7
```

No hay una forma separada para valores con signo y sin signo.
En complemento a dos, la suma y la resta producen los mismos bits tanto si los carriles se leen con signo como si se leen sin signo, así que una sola instrucción sirve para ambos casos.
La interpretación queda a tu criterio, exactamente igual que con los `add` y `sub` escalares.

Estas instrucciones **dan la vuelta** cuando hay desbordamiento, igual que sus equivalentes escalares.
Un carril de 8 bits guarda valores módulo 256, así que un `paddb` de `200 + 100` produce `300 - 256 = 44`, descartando los bits que no caben.

Fíjate en que esos bits extra no se propagan al siguiente carril.
Cada carril se opera por separado de los demás, aunque compartan el mismo registro.

## Suma y resta con saturación

El SIMD de enteros añade una operación que el SIMD de punto flotante no tiene: la suma y la resta [con saturación][saturation], que _limitan_ en lugar de dar la vuelta.
Un resultado por encima del rango del carril se convierte en el valor más grande que el carril puede contener; un resultado por debajo del rango se convierte en el más pequeño.

Las formas con saturación insertan `s` (con signo) o `us` (sin signo) antes del sufijo de tamaño:

| instrucción | significado                                    |
|-------------|--------------------------------------------|
| `paddsb`    | `add`, con saturación, carriles de 8 bits con signo      |
| `paddusb`   | `add`, con saturación, carriles de 8 bits sin signo    |
| `psubsw`    | `sub`, con saturación, carriles de 16 bits con signo     |
| `psubusw`   | `sub`, con saturación, carriles de 16 bits sin signo   |

El rango de limitación es todo el rango representable para un entero del tamaño y el signo correspondientes.
Para un byte:

- Los bytes sin signo se limitan a `[0, 255]`: un `paddusb` de `200 + 100` da `255`, y un `psubusb` de `5 - 10` da `0`.
- Los bytes con signo se limitan a `[-128, 127]`: un `paddsb` de `100 + 50` da `127`.

La saturación importa cuando un carril guarda una cantidad acotada, como el canal de un píxel o una muestra de audio.
Dar la vuelta convertiría un píxel demasiado brillante en uno oscuro, mientras que la limitación lo mantiene en el brillo máximo, que es el resultado que quieres.

~~~~exercism/note
La suma y la resta con saturación existen solo para carriles de byte y word, no para dword ni qword.
~~~~

## Multiplicación

Multiplicar dos valores de N bits puede producir un producto de 2N bits, pero el carril de destino solo tiene N bits de ancho.
Las operaciones SIMD resuelven esto especificando qué mitad del producto conservar: los N bits bajos o los N bits altos.

Para los carriles de 16 bits, se usan tres instrucciones:

| instrucción | significado                                                       |
|-------------|---------------------------------------------------------------|
| `pmullw`    | `mul`, carriles de 16 bits, conserva los 16 bits bajos de cada producto     |
| `pmulhw`    | `mul`, carriles de 16 bits, conserva los 16 bits altos, operandos con signo   |
| `pmulhuw`   | `mul`, carriles de 16 bits, conserva los 16 bits altos, operandos sin signo |

Los 16 bits bajos de un producto son iguales tanto si los operandos se leen con signo como sin signo, así que hay un único `pmullw`.

Los 16 bits altos, en cambio, varían según el signo del resultado.
Por eso la multiplicación de la mitad alta tiene formas separadas para la multiplicación con signo y sin signo:

1. `pmulhw`, para la multiplicación con signo.
2. `pmulhuw`, con una `u` adicional, para la multiplicación sin signo.

Fíjate en la sintaxis:

1. Una `p`, para entero empaquetado.
2. La operación que se realiza, `mul`.
3. Una `h`, que indica que se están seleccionando los bits altos («high») del resultado.
4. Una `u` opcional si el resultado debe interpretarse como sin signo (es decir, no se extiende el signo).
5. Por último, el sufijo de tamaño `w`, que indica que es una operación de word (16 bits).

La multiplicación empaquetada para words sigue la regla anterior al pie de la letra.
La multiplicación de dword (32 bits) también sigue la regla, pero solo existe la variante que selecciona la mitad baja: `pmulld`.

No hay ninguna variante de la multiplicación de dword que seleccione los bits altos.
Sin embargo, hay variantes que _ensanchan_ la multiplicación, guardando el producto completo de 64 bits de los carriles con _índice par_ (es decir, los carriles en las posiciones 0 y 2):

| instrucción | significado                                                                          |
|-------------|----------------------------------------------------------------------------------|
| `pmuludq`   | multiplica los elementos de 32 bits con índice par, sin signo, y produce 2 productos completos de 64 bits |
| `pmuldq`    | multiplica los elementos de 32 bits con índice par, con signo, y produce 2 productos completos de 64 bits   |

Fíjate en que la sintaxis usa `dq`, posiblemente con una `u` delante para la multiplicación sin signo.
Esto se debe a que las instrucciones toman carriles `dword` y producen carriles `qword`.

## División

No existe la división de enteros empaquetados.
El código que la necesita convierte los valores a punto flotante, divide y vuelve a convertir.

## Ensanchar enteros

Existen equivalentes empaquetados para `movsx` y `movzx`.
Siguen la misma sintaxis que mencionamos para las instrucciones que reciben entradas con un tamaño de carril distinto al de su salida:

```x86asm
pmovsxwd xmm0, xmm1   ; 4 words -> 4 dwords, sign-extended
pmovzxbw xmm0, xmm1   ; 8 bytes -> 8 words, zero-extended
```

Fíjate en que el número de carriles lo determina el ancho mayor (el de salida).
La instrucción lee esa cantidad de carriles de la parte baja del origen.
Es la misma semántica que ya vimos para las instrucciones `cvt` empaquetadas entre flotantes de precisión simple y doble.

## Conversión entre enteros y flotantes

Hay instrucciones para convertir entre enteros de 32 bits con signo y carriles de punto flotante.
Siguen la sintaxis habitual de las instrucciones `cvt` y `cvtt`, pero en lugar de `si` un entero empaquetado se representa con `dq`:

```x86asm
cvtdq2ps xmm0, xmm1 ; convert 32-bit signed integers in xmm1 to 32-bit floats in xmm0
cvtdq2pd xmm2, xmm3 ; convert 32-bit signed integers in xmm3 to 64-bit floats in xmm2
cvtps2dq xmm4, xmm5 ; convert 32-bit floats in xmm5 to 32-bit signed integers in xmm4
```

~~~~exercism/caution
Las instrucciones que usan `pi` para representar enteros empaquetados escriben en registros `mmx` heredados y están prácticamente obsoletas en x86-64.
Prefiere las formas con `dq`, que usan registros `xmm`.
~~~~

Los mismos comentarios que hicimos para la conversión escalar entre números de punto flotante y enteros son válidos aquí.
Los números de punto flotante se redondean según un registro especial llamado MXCSR, cuyo modo no puedes dar por sentado al entrar en una función.
Hay una variante `cvtt` (con una `t` adicional) que siempre trunca el resultado.

También es posible usar `round` para dejar los valores de punto flotante empaquetados en un estado conocido antes de convertirlos.
El valor de control de redondeo es el mismo que el del `round` escalar, y la sintaxis también es la misma para los valores de punto flotante empaquetados:

```x86asm
roundps xmm0, xmm1, 1 ; xmm0 = floor(xmm1), packed 32-bit floats
roundpd xmm2, xmm3, 2 ; xmm2 = ceil(xmm3), packed 64-bit floats
```

~~~~exercism/note
Tienes una referencia completa de cada instrucción mencionada aquí en la [referencia de instrucciones de x86][instruction-reference].

[instruction-reference]: https://www.felixcloutier.com/x86/
~~~~

[simd]: https://exercism.org/tracks/x86-64-assembly/concepts/simd
[saturation]: https://en.wikipedia.org/wiki/Saturation_arithmetic
