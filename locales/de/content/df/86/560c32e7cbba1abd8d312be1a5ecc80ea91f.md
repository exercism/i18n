# Anleitung

In deinem DNA-Forschungslabor hast du verschiedene Wege ausprobiert, um deine Forschungsdaten zu komprimieren und Speicherplatz zu sparen. Ein Teammitglied schlägt vor, die DNA-Daten in eine binäre Darstellung umzuwandeln:

| Nukleinsäure | Code  |
| ------------ | ----- |
| Adenine      |  `00` |
| Cytosine     |  `01` |
| Guanine      |  `10` |
| Thymine      |  `11` |

Du denkst darüber nach, denn es könnte die erforderlichen Speicherkosten senken, allerdings auf Kosten der menschlichen Lesbarkeit. Du beschließt, ein Modul zu schreiben, mit dem du deine Daten kodierst und dekodierst, um deine Einsparungen zu messen.

## 1. Kodiere Nukleinsäure in einen Binärwert

Implementiere `encode_nucleotide`, sodass die Funktion ein Nukleotid entgegennimmt und den Ganzzahlwert des kodierten Codes zurückgibt.

```gleam
encode_nucleotide(Cytosine)
// -> 1
// (which is equal to 0b01)
```

## 2. Dekodiere den Binärwert in eine Nukleinsäure

Implementiere `decode_nucleotide`, sodass die Funktion den Ganzzahlwert des kodierten Codes entgegennimmt und das Nukleotid zurückgibt.

```gleam
decode_nucleotide(0b01)
// -> Ok(Cytosine)
```

## 3. Kodiere eine DNA-Liste

Implementiere `encode`, sodass die Funktion eine Liste von Nukleotiden entgegennimmt und ein Bit-Array der kodierten Daten zurückgibt.

```gleam
encode([Adenine, Cytosine, Guanine, Thymine])
// -> <<27>>
```

## 4. Dekodiere ein DNA-Bit-Array

Implementiere `decode`, sodass die Funktion ein Bit-Array entgegennimmt, das Nukleinsäure repräsentiert, und die dekodierten Daten als Liste von Nukleotiden zurückgibt.

```gleam
decode(<<27>>)
// -> Ok([Adenine, Cytosine, Guanine, Thymine])
```
