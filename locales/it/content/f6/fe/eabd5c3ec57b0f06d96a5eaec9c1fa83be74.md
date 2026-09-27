# Introduzione

## Numeri interi

C#, come molti linguaggi a tipizzazione statica, mette a disposizione diversi tipi che rappresentano numeri interi, ognuno con il proprio intervallo di valori. All'estremo inferiore, il tipo `sbyte` ha un valore minimo di -128 e un valore massimo di 127. Come per tutti i tipi interi, questi valori sono disponibili come `<type>.MinValue` e `<type>.MaxValue`. All'estremo superiore, il tipo `long` ha un valore minimo di -9.223.372.036.854.775.808 e un valore massimo di 9.223.372.036.854.775.807. Nel mezzo ci sono i tipi `short` e `int`.

Gli intervalli dipendono dall'ampiezza di memorizzazione che il sistema assegna al tipo. Ad esempio, un `byte` usa 8 bit e un `long` usa 64 bit.

Ognuno dei tipi precedenti è affiancato da un equivalente senza segno: `sbyte`/`byte`, `short`/`ushort`, `int`/`uint` e `long`/`ulong`. In tutti i casi l'intervallo dei valori va da 0 a due volte il massimo con segno negativo, più 1.

| Tipo   | Ampiezza | Minimo                     | Massimo                     |
| ------ | -------- | -------------------------- | --------------------------- |
| sbyte  | 8 bit    | -128                       | +127                        |
| short  | 16 bit   | -32_768                    | +32_767                     |
| int    | 32 bit   | -2_147_483_648             | +2_147_483_647              |
| long   | 64 bit   | -9_223_372_036_854_775_808 | +9_223_372_036_854_775_807  |
| byte   | 8 bit    | 0                          | +255                        |
| ushort | 16 bit   | 0                          | +65_535                     |
| uint   | 32 bit   | 0                          | +4_294_967_295              |
| ulong  | 64 bit   | 0                          | +18_446_744_073_709_551_615 |

Una variabile (o un'espressione) di un tipo può essere convertita facilmente in un altro tipo. Ad esempio, in un'operazione di assegnazione, se il tipo del valore che viene assegnato (lhs) garantisce che il valore rientri nell'intervallo del tipo a cui viene assegnato (rhs), allora basta una semplice assegnazione:

```csharp
uint ui = uint.MaxValue;
ulong ul = ui;    // no problem
```

Al contrario, se l'intervallo del tipo da cui si assegna non è un sottoinsieme dell'intervallo di valori del tipo di destinazione, serve un'operazione di cast, `()`, anche se il valore in questione rientra nell'intervallo di destinazione:

```csharp
short s = 42;
uint ui = (uint)s;
```

### Conversione di bit

La classe `BitConverter` offre un modo comodo per convertire i tipi interi da e verso array di byte.
