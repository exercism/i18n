# Introducción

## Números enteros

C#, al igual que muchos lenguajes de tipado estático, ofrece varios tipos que representan números enteros, cada uno con su propio rango de valores. En el extremo inferior, el tipo `sbyte` tiene un valor mínimo de -128 y un valor máximo de 127. Como en todos los tipos enteros, estos valores están disponibles como `<type>.MinValue` y `<type>.MaxValue`. En el extremo superior, el tipo `long` tiene un valor mínimo de -9,223,372,036,854,775,808 y un valor máximo de 9,223,372,036,854,775,807. Entre ambos se encuentran los tipos `short` e `int`.

Los rangos están determinados por el ancho de almacenamiento que el sistema asigna a cada tipo. Por ejemplo, un `byte` usa 8 bits y un `long` usa 64 bits.

Cada uno de los tipos anteriores tiene su equivalente sin signo: `sbyte`/`byte`, `short`/`ushort`, `int`/`uint` y `long`/`ulong`. En todos los casos, el rango de valores va de 0 al máximo negativo con signo multiplicado por 2 más 1.

| Tipo   | Ancho  | Mínimo                     | Máximo                      |
| ------ | ------ | -------------------------- | --------------------------- |
| sbyte  | 8 bit  | -128                       | +127                        |
| short  | 16 bit | -32_768                    | +32_767                     |
| int    | 32 bit | -2_147_483_648             | +2_147_483_647              |
| long   | 64 bit | -9_223_372_036_854_775_808 | +9_223_372_036_854_775_807  |
| byte   | 8 bit  | 0                          | +255                        |
| ushort | 16 bit | 0                          | +65_535                     |
| uint   | 32 bit | 0                          | +4_294_967_295              |
| ulong  | 64 bit | 0                          | +18_446_744_073_709_551_615 |

Una variable (o expresión) de un tipo se puede convertir fácilmente a otro. Por ejemplo, en una operación de asignación, si el tipo del valor que se asigna (lhs) garantiza que el valor estará dentro del rango del tipo al que se asigna (rhs), entonces hay una asignación simple:

```csharp
uint ui = uint.MaxValue;
ulong ul = ui;    // no problem
```

Por otro lado, si el rango del tipo desde el que se asigna no es un subconjunto del rango de valores del tipo de destino, entonces se requiere una conversión explícita mediante `()`, incluso si el valor concreto está dentro del rango del tipo de destino:

```csharp
short s = 42;
uint ui = (uint)s;
```

### Conversión de bits

La clase `BitConverter` ofrece una forma práctica de convertir tipos enteros desde y hacia array de bytes.
