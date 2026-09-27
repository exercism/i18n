# Introdução

## Números inteiros

O C#, tal como muitas linguagens de tipagem estática, disponibiliza vários tipos que representam números inteiros, cada um com o seu próprio intervalo de valores. No extremo inferior, o tipo `sbyte` tem um valor mínimo de -128 e um valor máximo de 127. Tal como em todos os tipos inteiros, estes valores estão disponíveis como `<type>.MinValue` e `<type>.MaxValue`. No extremo superior, o tipo `long` tem um valor mínimo de -9,223,372,036,854,775,808 e um valor máximo de 9,223,372,036,854,775,807. Entre os dois ficam os tipos `short` e `int`.

Os intervalos são determinados pela largura de armazenamento que o sistema atribui a cada tipo. Por exemplo, um `byte` usa 8 bits e um `long` usa 64 bits.

Cada um dos tipos acima tem um equivalente sem sinal: `sbyte`/`byte`, `short`/`ushort`, `int`/`uint` e `long`/`ulong`. Em todos os casos, o intervalo de valores vai de 0 até ao máximo negativo do tipo com sinal multiplicado por 2 e somado a 1.

| Type   | Width  | Minimum                    | Maximum                     |
| ------ | ------ | -------------------------- | --------------------------- |
| sbyte  | 8 bit  | -128                       | +127                        |
| short  | 16 bit | -32_768                    | +32_767                     |
| int    | 32 bit | -2_147_483_648             | +2_147_483_647              |
| long   | 64 bit | -9_223_372_036_854_775_808 | +9_223_372_036_854_775_807  |
| byte   | 8 bit  | 0                          | +255                        |
| ushort | 16 bit | 0                          | +65_535                     |
| uint   | 32 bit | 0                          | +4_294_967_295              |
| ulong  | 64 bit | 0                          | +18_446_744_073_709_551_615 |

Uma variável (ou expressão) de um tipo pode ser facilmente convertida noutro. Por exemplo, numa operação de atribuição, se o tipo do valor que está a ser atribuído (lhs) garantir que o valor fica dentro do intervalo do tipo a que se atribui (rhs), basta uma atribuição simples:

```csharp
uint ui = uint.MaxValue;
ulong ul = ui;    // no problem
```

Por outro lado, se o intervalo do tipo de origem não for um subconjunto do intervalo de valores do tipo de destino, é necessária uma operação de cast, `()`, mesmo que o valor em questão esteja dentro do intervalo do tipo de destino:

```csharp
short s = 42;
uint ui = (uint)s;
```

### Conversão de bits

A classe `BitConverter` oferece uma forma prática de converter tipos inteiros de e para arrays de bytes.
