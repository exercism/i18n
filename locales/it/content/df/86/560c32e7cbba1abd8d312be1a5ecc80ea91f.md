# Istruzioni

Nel tuo laboratorio di ricerca sul DNA, hai sperimentato diversi modi per comprimere i dati delle tue ricerche e risparmiare spazio di archiviazione. Un collega suggerisce di convertire i dati del DNA in una rappresentazione binaria:

| Acido nucleico | Codice |
| ------------ | ----- |
| Adenine      |  `00` |
| Cytosine     |  `01` |
| Guanine      |  `10` |
| Thymine      |  `11` |

Ci rifletti: potrebbe ridurre i costi di archiviazione necessari, ma a scapito della leggibilità per gli esseri umani. Decidi di scrivere un modulo per codificare e decodificare i dati e misurare il risparmio.

## 1. Codifica un acido nucleico in un valore binario

Implementa `encode_nucleotide` in modo che accetti un nucleotide e restituisca il valore intero della codifica.

```gleam
encode_nucleotide(Cytosine)
// -> 1
// (which is equal to 0b01)
```

## 2. Decodifica il valore binario nell'acido nucleico

Implementa `decode_nucleotide` in modo che accetti il valore intero della codifica e restituisca il nucleotide.

```gleam
decode_nucleotide(0b01)
// -> Ok(Cytosine)
```

## 3. Codifica un array di DNA

Implementa `encode` in modo che accetti un array di nucleotidi e restituisca un array di bit dei dati codificati.

```gleam
encode([Adenine, Cytosine, Guanine, Thymine])
// -> <<27>>
```

## 4. Decodifica un array di bit del DNA

Implementa `decode` in modo che accetti un array di bit che rappresenta un acido nucleico e restituisca i dati decodificati come un array di nucleotidi.

```gleam
decode(<<27>>)
// -> Ok([Adenine, Cytosine, Guanine, Thymine])
```
