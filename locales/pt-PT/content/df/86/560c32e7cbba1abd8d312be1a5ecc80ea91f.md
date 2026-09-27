# Instruções

No teu laboratório de investigação de ADN, tens vindo a explorar várias formas de comprimir os teus dados de investigação para poupar espaço de armazenamento. Um colega de equipa sugere converter os dados de ADN numa representação binária:

| Ácido nucleico | Código |
| ------------ | ----- |
| Adenina      |  `00` |
| Citosina     |  `01` |
| Guanina      |  `10` |
| Timina       |  `11` |

Ficas a pensar no assunto, pois isto pode reduzir os custos de armazenamento de dados, mas à custa da legibilidade humana. Decides escrever um módulo para codificar e descodificar os teus dados e avaliar as poupanças.

## 1. Codificar o ácido nucleico num valor binário

Implementa a função `encode_nucleotide`, que recebe um nucleótido e devolve o valor inteiro do código codificado.

```gleam
encode_nucleotide(Cytosine)
// -> 1
// (which is equal to 0b01)
```

## 2. Descodificar o valor binário no ácido nucleico

Implementa a função `decode_nucleotide`, que recebe o valor inteiro do código codificado e devolve o nucleótido.

```gleam
decode_nucleotide(0b01)
// -> Ok(Cytosine)
```

## 3. Codificar uma lista de ADN

Implementa a função `encode`, que recebe uma lista de nucleótidos e devolve um array de bits com os dados codificados.

```gleam
encode([Adenine, Cytosine, Guanine, Thymine])
// -> <<27>>
```

## 4. Descodificar um array de bits de ADN

Implementa a função `decode`, que recebe um array de bits que representa ácido nucleico e devolve os dados descodificados numa lista de nucleótidos.

```gleam
decode(<<27>>)
// -> Ok([Adenine, Cytosine, Guanine, Thymine])
```
