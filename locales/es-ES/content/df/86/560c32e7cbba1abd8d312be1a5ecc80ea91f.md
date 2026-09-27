# Instrucciones

En tu laboratorio de investigación de ADN, has estado probando distintas formas de comprimir los datos de tu investigación para ahorrar espacio de almacenamiento. Uno de tus compañeros de equipo sugiere convertir los datos de ADN a una representación binaria:

| Ácido nucleico | Código |
| ------------ | ----- |
| Adenine      |  `00` |
| Cytosine     |  `01` |
| Guanine      |  `10` |
| Thymine      |  `11` |

Le das vueltas a la idea, ya que es posible que reduzca los costes de almacenamiento necesarios, pero a costa de la legibilidad para las personas. Decides escribir un módulo para codificar y decodificar tus datos y así medir el ahorro que consigues.

## 1. Codifica un ácido nucleico como valor binario

Implementa `encode_nucleotide` para que acepte un nucleótido y devuelva el valor entero del código codificado.

```gleam
encode_nucleotide(Cytosine)
// -> 1
// (which is equal to 0b01)
```

## 2. Decodifica el valor binario a un ácido nucleico

Implementa `decode_nucleotide` para que acepte el valor entero del código codificado y devuelva el nucleótido.

```gleam
decode_nucleotide(0b01)
// -> Ok(Cytosine)
```

## 3. Codifica un array de ADN

Implementa `encode` para que acepte un array de nucleótidos y devuelva un array de bits con los datos codificados.

```gleam
encode([Adenine, Cytosine, Guanine, Thymine])
// -> <<27>>
```

## 4. Decodifica un array de bits de ADN

Implementa `decode` para que acepte un array de bits que represente un ácido nucleico y devuelva los datos decodificados como un array de nucleótidos.

```gleam
decode(<<27>>)
// -> Ok([Adenine, Cytosine, Guanine, Thymine])
```
