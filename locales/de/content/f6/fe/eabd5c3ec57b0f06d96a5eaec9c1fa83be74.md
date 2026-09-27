# Einführung

## Ganzzahlen

C# bietet wie viele statisch typisierte Sprachen eine Reihe von Typen, die Ganzzahlen darstellen, jeder mit seinem eigenen Wertebereich. Am unteren Ende hat der Typ `sbyte` einen Minimalwert von -128 und einen Maximalwert von 127. Wie bei allen Ganzzahltypen stehen diese Werte als `<type>.MinValue` und `<type>.MaxValue` zur Verfügung. Am oberen Ende hat der Typ `long` einen Minimalwert von -9.223.372.036.854.775.808 und einen Maximalwert von 9.223.372.036.854.775.807. Dazwischen liegen die Typen `short` und `int`.

Die Wertebereiche ergeben sich aus der Speicherbreite, die das System dem Typ zuweist. Ein `byte` belegt zum Beispiel 8 Bits und ein `long` 64 Bits.

Zu jedem der obigen Typen gibt es ein vorzeichenloses Gegenstück: `sbyte`/`byte`, `short`/`ushort`, `int`/`uint` und `long`/`ulong`. In allen Fällen reicht der Wertebereich von 0 bis zum Zweifachen des negativen Maximums des vorzeichenbehafteten Typs plus 1.

| Typ    | Breite | Minimum                    | Maximum                     |
| ------ | ------ | -------------------------- | --------------------------- |
| sbyte  | 8 Bit  | -128                       | +127                        |
| short  | 16 Bit | -32_768                    | +32_767                     |
| int    | 32 Bit | -2_147_483_648             | +2_147_483_647              |
| long   | 64 Bit | -9_223_372_036_854_775_808 | +9_223_372_036_854_775_807  |
| byte   | 8 Bit  | 0                          | +255                        |
| ushort | 16 Bit | 0                          | +65_535                     |
| uint   | 32 Bit | 0                          | +4_294_967_295              |
| ulong  | 64 Bit | 0                          | +18_446_744_073_709_551_615 |

Eine Variable (oder ein Ausdruck) eines Typs lässt sich leicht in einen anderen umwandeln. Bei einer Zuweisung genügt zum Beispiel eine einfache Zuweisung, wenn der Typ des Wertes, der zugewiesen wird (lhs), sicherstellt, dass der Wert im Wertebereich des Typs liegt, dem zugewiesen wird (rhs):

```csharp
uint ui = uint.MaxValue;
ulong ul = ui;    // no problem
```

Andererseits ist ein Cast nötig, also eine `()`-Operation, wenn der Wertebereich des Ausgangstyps keine Teilmenge des Wertebereichs des Zieltyps ist, selbst wenn der konkrete Wert im Wertebereich des Zieltyps liegt:

```csharp
short s = 42;
uint ui = (uint)s;
```

### Bitkonvertierung

Die Klasse `BitConverter` bietet eine bequeme Möglichkeit, Ganzzahltypen in Byte-Arrays und zurück umzuwandeln.
