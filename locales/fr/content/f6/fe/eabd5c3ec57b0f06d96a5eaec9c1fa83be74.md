# Introduction

## Nombres entiers

C#, comme beaucoup de langages à typage statique, fournit un certain nombre de types qui représentent des entiers, chacun avec sa propre plage de valeurs. À l'extrémité basse, le type `sbyte` a une valeur minimale de -128 et une valeur maximale de 127. Comme pour tous les types entiers, ces valeurs sont disponibles sous la forme `<type>.MinValue` et `<type>.MaxValue`. À l'extrémité haute, le type `long` a une valeur minimale de -9 223 372 036 854 775 808 et une valeur maximale de 9 223 372 036 854 775 807. Entre les deux se trouvent les types `short` et `int`.

Les plages sont déterminées par la largeur de stockage du type, telle qu'allouée par le système. Par exemple, un `byte` utilise 8 bits et un `long` utilise 64 bits.

Chacun des types ci-dessus est associé à un équivalent non signé : `sbyte`/`byte`, `short`/`ushort`, `int`/`uint` et `long`/`ulong`. Dans tous les cas, la plage de valeurs va de 0 au maximum signé négatif multiplié par 2, plus 1.

| Type   | Largeur | Minimum                    | Maximum                     |
| ------ | ------- | -------------------------- | --------------------------- |
| sbyte  | 8 bit   | -128                       | +127                        |
| short  | 16 bit  | -32_768                    | +32_767                     |
| int    | 32 bit  | -2_147_483_648             | +2_147_483_647              |
| long   | 64 bit  | -9_223_372_036_854_775_808 | +9_223_372_036_854_775_807  |
| byte   | 8 bit   | 0                          | +255                        |
| ushort | 16 bit  | 0                          | +65_535                     |
| uint   | 32 bit  | 0                          | +4_294_967_295              |
| ulong  | 64 bit  | 0                          | +18_446_744_073_709_551_615 |

Une variable (ou une expression) d'un type peut facilement être convertie en un autre. Par exemple, dans une affectation, si le type de la valeur affectée (lhs) garantit que cette valeur se situera dans la plage du type de destination (rhs), alors une simple affectation suffit :

```csharp
uint ui = uint.MaxValue;
ulong ul = ui;    // no problem
```

En revanche, si la plage du type source n'est pas un sous-ensemble de la plage de valeurs du type de destination, une opération de _cast_, `()`, est nécessaire, même si la valeur particulière se trouve dans la plage du type de destination :

```csharp
short s = 42;
uint ui = (uint)s;
```

### Conversion en bits

La classe `BitConverter` offre un moyen pratique de convertir des types entiers vers des tableaux d'octets et inversement.
