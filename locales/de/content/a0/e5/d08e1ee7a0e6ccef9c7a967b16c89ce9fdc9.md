# Über

Das [SIMD][SIMD]-Konzept hat gepackte Gleitkommawerte eingeführt: mehrere Zahlen in einem einzigen `xmm`-Register, die Lane-weise und parallel verarbeitet werden.
Dieselben `xmm`-Register können auch gepackte _Ganzzahlen_ aufnehmen.

## Syntax

Das meiste am SIMD-Gleitkommamodell überträgt sich unverändert auf gepackte Ganzzahlen:

- Ein 128-Bit-Register wird in Lanes aufgeteilt
- Befehle wirken parallel auf Lanes an derselben Position
- Speicheroperanden folgen denselben 16-Byte-Ausrichtungsregeln

Die Syntax ist jedoch etwas anders:

1. Ein _Präfix_ `p`, das angibt, dass der Befehl auf _gepackten_ Daten arbeitet.
2. Die ausgeführte Operation, benannt wie ihr Gegenstück außerhalb von SIMD (auch _skalar_ genannt), z. B. `add`, `mul` usw.
3. Ein Suffix, das die Größe jeder Lane angibt.

Gepackte Ganzzahlen haben vier Lane-Größen, und jede hat ihr eigenes Suffix:

| Lane-Breite | Bytes | Lanes in 128 Bit | Suffix |
|-------------|-------|------------------|--------|
| Byte        | 1     | 16               | b      |
| Word        | 2     | 8                | w      |
| Dword       | 4     | 4                | d      |
| Qword       | 8     | 2                | q      |

Zum Beispiel:

| Befehl  | Bedeutung                                |
|---------|------------------------------------------|
| `paddb` | gepacktes `add`, 8-Bit-Lanes (16 Lanes)  |
| `paddw` | gepacktes `add`, 16-Bit-Lanes (8 Lanes)  |
| `paddd` | gepacktes `add`, 32-Bit-Lanes (4 Lanes)  |
| `paddq` | gepacktes `add`, 64-Bit-Lanes (2 Lanes)  |

Manche Befehle nehmen Lanes einer Größe als Eingabe, geben aber Lanes einer anderen Größe aus.
Sie folgen derselben allgemeinen Konvention, aber mit _zwei_ Größen-Suffixen.
Das erste gibt die Größe der Eingabe-Lane an, das zweite die Größe der Ausgabe-Lane:

| Befehl     | Bedeutung                                         |
|------------|---------------------------------------------------|
| `pmovsxwd` | gepacktes `movsx`, von 16-Bit-Lanes zu 32-Bit-Lanes |
| `pmuldq`   | gepacktes `mul`, von 32-Bit-Lanes zu 64-Bit-Lanes   |

## Speicherbewegungen

Zwei nach Ganzzahlen benannte Befehle kopieren 128 Bit zwischen einem `xmm`-Register und dem Speicher:

| Befehl   | Beschreibung                                                     |
|----------|------------------------------------------------------------------|
| `movdqa` | kopiert gepackte Ganzzahlen in einen _ausgerichteten_ Speicherort oder von dort |
| `movdqu` | kopiert gepackte Ganzzahlen in einen _nicht ausgerichteten_ Speicherort oder von dort |

Sie verhalten sich wie `movaps` und `movups`: `movdqa` löst bei einer nicht ausgerichteten Adresse einen Fehler aus, während `movdqu` jede Adresse akzeptiert.
Alle vier kopieren 128 Bit, ohne sie zu interpretieren.
Das nach Ganzzahlen benannte Paar wird konventionsgemäß mit Ganzzahldaten verwendet, nicht weil es vorgeschrieben wäre.

~~~~exercism/note
Das `dq` steht hier für `double-qword`, also für 128 Bit (16 Byte).
~~~~

## Addition/Subtraktion

Addition und Subtraktion folgen der Namensregel:

```x86asm
paddb xmm0, xmm1 ; 16 lanes: each  8-bit, xmm0 += xmm1
paddw xmm2, xmm3 ;  8 lanes: each 16-bit, xmm2 += xmm3

psubd xmm4, xmm5 ;  4 lanes: each 32-bit, xmm4 -= xmm5
psubq xmm6, xmm7 ;  2 lanes: each 64-bit, xmm6 -= xmm7
```

Es gibt keine getrennte Form für vorzeichenbehaftet und vorzeichenlos.
Im Zweierkomplement erzeugen Addition und Subtraktion dieselben Bits, egal ob die Lanes als vorzeichenbehaftet oder vorzeichenlos gelesen werden, also dient ein einziger Befehl beiden.
Die Interpretation bleibt dir überlassen, genauso wie beim skalaren `add` und `sub`.

Diese Befehle **laufen bei einem Überlauf um**, wie ihre skalaren Gegenstücke.
Eine 8-Bit-Lane hält Werte modulo 256, also ergibt ein `paddb` von `200 + 100` den Wert `300 - 256 = 44`, wobei die Bits verworfen werden, die nicht hineinpassen.

Beachte, dass diese zusätzlichen Bits nicht in die nächste Lane übergehen.
Jede Lane wird getrennt von den anderen verarbeitet, obwohl sie sich dasselbe Register teilen.

## Sättigende Addition/Subtraktion

Das SIMD für Ganzzahlen bringt eine Operation mit, die es beim SIMD für Gleitkommazahlen nicht gibt: [sättigende][saturation] Addition und Subtraktion, die _begrenzen_ statt umzulaufen.
Ein Ergebnis über dem Wertebereich der Lane wird zum größten Wert, den die Lane halten kann; ein Ergebnis unter dem Wertebereich wird zum kleinsten.

Die sättigenden Formen setzen `s` (vorzeichenbehaftet) oder `us` (vorzeichenlos) vor das Größen-Suffix:

| Befehl    | Bedeutung                                  |
|-----------|--------------------------------------------|
| `paddsb`  | `add`, sättigend, vorzeichenbehaftete 8-Bit-Lanes  |
| `paddusb` | `add`, sättigend, vorzeichenlose 8-Bit-Lanes       |
| `psubsw`  | `sub`, sättigend, vorzeichenbehaftete 16-Bit-Lanes |
| `psubusw` | `sub`, sättigend, vorzeichenlose 16-Bit-Lanes      |

Der Begrenzungsbereich ist der gesamte darstellbare Bereich für eine Ganzzahl der entsprechenden Größe und Vorzeichenbehaftung.
Für ein Byte:

- Vorzeichenlose Bytes werden auf `[0, 255]` begrenzt: ein `paddusb` von `200 + 100` ergibt `255`, und ein `psubusb` von `5 - 10` ergibt `0`.
- Vorzeichenbehaftete Bytes werden auf `[-128, 127]` begrenzt: ein `paddsb` von `100 + 50` ergibt `127`.

Die Sättigung ist wichtig, wenn eine Lane eine begrenzte Größe hält, etwa einen Pixelkanal oder einen Abtastwert.
Ein Umlauf würde ein zu helles Pixel dunkel machen, während die Begrenzung es bei maximaler Helligkeit hält, was das gewünschte Ergebnis ist.

~~~~exercism/note
Sättigende Addition und Subtraktion gibt es nur für Byte- und Word-Lanes, nicht für Dword- oder Qword-Lanes.
~~~~

## Multiplikation

Die Multiplikation zweier N-Bit-Werte kann ein 2N-Bit-Produkt ergeben, aber die Ziel-Lane ist nur N Bit breit.
SIMD-Operationen lösen das, indem sie angeben, welche Hälfte des Produkts behalten wird, entweder die unteren N Bits oder die oberen N Bits.

Für 16-Bit-Lanes werden drei Befehle verwendet:

| Befehl    | Bedeutung                                                     |
|-----------|---------------------------------------------------------------|
| `pmullw`  | `mul`, 16-Bit-Lanes, behält die unteren 16 Bits jedes Produkts |
| `pmulhw`  | `mul`, 16-Bit-Lanes, behält die oberen 16 Bits, vorzeichenbehaftete Operanden |
| `pmulhuw` | `mul`, 16-Bit-Lanes, behält die oberen 16 Bits, vorzeichenlose Operanden |

Die unteren 16 Bits eines Produkts sind gleich, egal ob die Operanden als vorzeichenbehaftet oder vorzeichenlos gelesen werden, deshalb gibt es nur ein einziges `pmullw`.

Die oberen 16 Bits hängen jedoch von der Vorzeichenbehaftung des Ergebnisses ab.
Deshalb hat die Multiplikation der oberen Hälfte getrennte Formen für vorzeichenbehaftete und vorzeichenlose Multiplikation:

1. `pmulhw`, für vorzeichenbehaftete Multiplikation.
2. `pmulhuw`, mit einem zusätzlichen `u`, für vorzeichenlose Multiplikation.

Beachte die Syntax:

1. Ein `p`, für gepackte Ganzzahl.
2. Die ausgeführte Operation, `mul`.
3. Ein `h`, das angibt, dass die oberen („high“) Bits des Ergebnisses ausgewählt werden.
4. Ein optionales `u`, wenn das Ergebnis als vorzeichenlos interpretiert werden soll (d. h. es wird nicht vorzeichenerweitert).
5. Schließlich das Größen-Suffix `w`, das angibt, dass es sich um eine Word-Operation (16 Bit) handelt.

Die gepackte Multiplikation mit Word-Lanes folgt genau der obigen Regel.
Die Dword-Multiplikation (32 Bit) folgt ebenfalls der Regel, es gibt aber nur die Variante, die die untere Hälfte auswählt: `pmulld`.

Es gibt keine Variante der Dword-Multiplikation, die die oberen Bits auswählt.
Es gibt jedoch Varianten, die die Multiplikation _verbreitern_ und das volle 64-Bit-Produkt der Lanes mit _geradem Index_ speichern (d. h. der Lanes an Position 0 und 2):

| Befehl    | Bedeutung                                                                        |
|-----------|------------------------------------------------------------------------------------|
| `pmuludq` | multipliziert die 32-Bit-Elemente mit geradem Index, vorzeichenlos, zu 2 vollen 64-Bit-Produkten |
| `pmuldq`  | multipliziert die 32-Bit-Elemente mit geradem Index, vorzeichenbehaftet, zu 2 vollen 64-Bit-Produkten |

Beachte: Die Syntax verwendet `dq`, bei vorzeichenloser Multiplikation eventuell mit einem `u` davor.
Das liegt daran, dass die Befehle `dword`-Lanes entgegennehmen und `qword`-Lanes ausgeben.

## Division

Es gibt keine gepackte Ganzzahldivision.
Code, der sie braucht, wandelt die Werte in Gleitkommazahlen um, dividiert und wandelt sie wieder zurück.

## Verbreitern von Ganzzahlen

Es gibt gepackte Entsprechungen für `movsx` und `movzx`.
Sie folgen derselben Syntax, die wir für Befehle erwähnt haben, deren Eingaben eine andere Lane-Größe haben als ihre Ausgabe:

```x86asm
pmovsxwd xmm0, xmm1   ; 4 words -> 4 dwords, sign-extended
pmovzxbw xmm0, xmm1   ; 8 bytes -> 8 words, zero-extended
```

Beachte, dass die Anzahl der Lanes durch die größere (Ausgabe-)Breite festgelegt wird.
Der Befehl liest entsprechend viele Lanes aus dem unteren Teil der Quelle.
Das ist dieselbe Semantik, die wir bereits bei gepackten `cvt`-Befehlen zwischen Gleitkommazahlen einfacher und doppelter Genauigkeit gesehen haben.

## Umwandlung zwischen Ganzzahlen und Gleitkommazahlen

Es gibt Befehle, um zwischen vorzeichenbehafteten 32-Bit-Ganzzahlen und Gleitkomma-Lanes umzuwandeln.
Sie folgen der üblichen Syntax für `cvt`- und `cvtt`-Befehle, aber statt `si` wird eine gepackte Ganzzahl durch `dq` dargestellt:

```x86asm
cvtdq2ps xmm0, xmm1 ; convert 32-bit signed integers in xmm1 to 32-bit floats in xmm0
cvtdq2pd xmm2, xmm3 ; convert 32-bit signed integers in xmm3 to 64-bit floats in xmm2
cvtps2dq xmm4, xmm5 ; convert 32-bit floats in xmm5 to 32-bit signed integers in xmm4
```

~~~~exercism/caution
Die Befehle, die `pi` zur Darstellung gepackter Ganzzahlen verwenden, schreiben in ältere `mmx`-Register und sind auf x86-64 praktisch veraltet.
Bevorzuge die `dq`-Formen, die `xmm`-Register verwenden.
~~~~

Dieselben Anmerkungen, die für die skalare Umwandlung zwischen Gleitkommazahlen und Ganzzahlen gemacht wurden, gelten auch hier.
Gleitkommazahlen werden gemäß einem speziellen Register namens MXCSR gerundet, dessen Modus du beim Eintritt in eine Funktion nicht voraussetzen kannst.
Es gibt eine `cvtt`-Variante (mit einem zusätzlichen `t`), die das Ergebnis immer abschneidet.

Du kannst auch `round` verwenden, um gepackte Gleitkommawerte vor der Umwandlung in einen bekannten Zustand zu bringen.
Der Rundungssteuerwert ist derselbe wie beim skalaren `round`, und die Syntax ist für gepackte Gleitkommawerte ebenfalls dieselbe:

```x86asm
roundps xmm0, xmm1, 1 ; xmm0 = floor(xmm1), packed 32-bit floats
roundpd xmm2, xmm3, 2 ; xmm2 = ceil(xmm3), packed 64-bit floats
```

~~~~exercism/note
Eine vollständige Referenz für jeden hier erwähnten Befehl findest du in der [x86-Befehlsreferenz][instruction-reference].

[instruction-reference]: https://www.felixcloutier.com/x86/
~~~~

[simd]: https://exercism.org/tracks/x86-64-assembly/concepts/simd
[saturation]: https://en.wikipedia.org/wiki/Saturation_arithmetic
