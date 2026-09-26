# Instrucciones

En tu laboratorio de investigación de ADN, has estado explorando distintas formas de comprimir tus datos de investigación para ahorrar espacio de almacenamiento. Un compañero de equipo sugiere convertir los datos de ADN a una representación binaria:

| Ácido nucleico | Código |
| ------------ | ----- |
| Adenine      |  `00` |
| Cytosine     |  `01` |
| Guanine      |  `10` |
| Thymine      |  `11` |

Meditas sobre esto, ya que podría reducir los costos de almacenamiento de datos necesarios, pero a costa de la legibilidad humana. Decides escribir un módulo para codificar y decodificar tus datos y así evaluar tu ahorro.

## 1. Codificar un ácido nucleico a un valor binario

Implementa `encode_nucleotide` para que acepte un nucleótido y devuelva el valor entero del código codificado.

```gleam
encode_nucleotide(Cytosine)
// -> 1
// (which is equal to 0b01)
```

## 2. Decodificar el valor binario al ácido nucleico

Implementa `decode_nucleotide` para que acepte el valor entero del código codificado y devuelva el nucleótido.

```gleam
decode_nucleotide(0b01)
// -> Ok(Cytosine)
```

## 3. Codificar una lista de ADN

Implementa `encode` para que acepte una lista de nucleótidos y devuelva un array de bits con los datos codificados.

```gleam
encode([Adenine, Cytosine, Guanine, Thymine])
// -> <<27>>
```

## 4. Decodificar un array de bits de ADN

Implementa `decode` para que acepte un array de bits que represente ácido nucleico y devuelva los datos decodificados como una lista de nucleótidos.

```gleam
decode(<<27>>)
// -> Ok([Adenine, Cytosine, Guanine, Thymine])
```
