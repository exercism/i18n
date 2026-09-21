# Bevezetés

## Egész számok

A C# a sok statikusan típusos nyelvhez hasonlóan számos olyan típust kínál, amelyek egész számokat reprezentálnak, és mindegyiknek saját értéktartománya van. A tartomány alsó végén az `sbyte` típus minimuma -128, maximuma 127. Ahogy minden egész típusnál, ezek az értékek itt is `<type>.MinValue` és `<type>.MaxValue` formában érhetők el. A felső végén a `long` típus minimuma -9,223,372,036,854,775,808, maximuma pedig 9,223,372,036,854,775,807. A kettő között helyezkedik el a `short` és az `int` típus.

A tartományokat az határozza meg, hogy a rendszer mekkora tárolási szélességet biztosít az adott típusnak. Például a `byte` 8 bitet használ, a `long` pedig 64 bitet.

A fenti típusok mindegyikéhez tartozik egy előjel nélküli megfelelő: `sbyte`/`byte`, `short`/`ushort`, `int`/`uint` és `long`/`ulong`. Mindegyik esetben az értékek tartománya 0-tól a negatív előjeles maximum kétszereséig plusz 1-ig terjed.

| Típus  | Szélesség | Minimum                    | Maximum                     |
| ------ | --------- | -------------------------- | --------------------------- |
| sbyte  | 8 bit     | -128                       | +127                        |
| short  | 16 bit    | -32_768                    | +32_767                     |
| int    | 32 bit    | -2_147_483_648             | +2_147_483_647              |
| long   | 64 bit    | -9_223_372_036_854_775_808 | +9_223_372_036_854_775_807  |
| byte   | 8 bit     | 0                          | +255                        |
| ushort | 16 bit    | 0                          | +65_535                     |
| uint   | 32 bit    | 0                          | +4_294_967_295              |
| ulong  | 64 bit    | 0                          | +18_446_744_073_709_551_615 |

Egy adott típusú változó (vagy kifejezés) könnyedén átalakítható egy másik típusúvá. Egy értékadásnál például, ha a hozzárendelendő érték típusa (lhs) biztosítja, hogy az érték a hozzárendelés céljául szolgáló típus (rhs) tartományába essen, akkor egyszerű értékadásról van szó:

```csharp
uint ui = uint.MaxValue;
ulong ul = ui;    // no problem
```

Másrészt, ha a forrásul szolgáló típus tartománya nem részhalmaza a cél típus értéktartományának, akkor egy cast, azaz `()` műveletre van szükség, még akkor is, ha az adott érték a cél típus tartományán belül van:

```csharp
short s = 42;
uint ui = (uint)s;
```

### Bitkonverzió

A `BitConverter` osztály kényelmes módot kínál arra, hogy az egész típusokat bájtokból álló tömbökké alakítsd, és vissza.
