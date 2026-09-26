# Instruções

No seu laboratório de pesquisa de DNA, você vem explorando várias formas de comprimir seus dados de pesquisa para economizar espaço de armazenamento. Uma pessoa da equipe sugere converter os dados de DNA para uma representação binária:

| Ácido nucleico | Código |
| ------------ | ----- |
| Adenine      |  `00` |
| Cytosine     |  `01` |
| Guanine      |  `10` |
| Thymine      |  `11` |

Você fica pensando nisso, já que pode reduzir os custos de armazenamento necessários, mas às custas da legibilidade humana. Você decide escrever um módulo para codificar e decodificar seus dados e medir a economia.

## 1. Codificar o ácido nucleico em valor binário

Implemente `encode_nucleotide` para receber um nucleotídeo e retornar o valor inteiro do código codificado.

```gleam
encode_nucleotide(Cytosine)
// -> 1
// (which is equal to 0b01)
```

## 2. Decodificar o valor binário para o ácido nucleico

Implemente `decode_nucleotide` para receber o valor inteiro do código codificado e retornar o nucleotídeo.

```gleam
decode_nucleotide(0b01)
// -> Ok(Cytosine)
```

## 3. Codificar uma lista de DNA

Implemente `encode` para receber uma lista de nucleotídeos e retornar um bit array com os dados codificados.

```gleam
encode([Adenine, Cytosine, Guanine, Thymine])
// -> <<27>>
```

## 4. Decodificar um bit array de DNA

Implemente `decode` para receber um bit array que representa ácido nucleico e retornar os dados decodificados como uma lista de nucleotídeos.

```gleam
decode(<<27>>)
// -> Ok([Adenine, Cytosine, Guanine, Thymine])
```
