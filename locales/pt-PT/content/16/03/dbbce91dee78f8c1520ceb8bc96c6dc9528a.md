# Instruções

Cria uma implementação da cifra afim, um antigo sistema de encriptação criado no Médio Oriente.

A cifra afim é um tipo de cifra de substituição monoalfabética.
Cada caráter é associado ao seu equivalente numérico, encriptado com uma função matemática e convertido depois na letra correspondente ao seu novo valor numérico.
Embora todas as cifras monoalfabéticas sejam fracas, a cifra afim é muito mais forte do que a cifra Atbash, porque tem muito mais chaves.

[//]: # " monoalphabetic as spelled by Merriam-Webster, compare to polyalphabetic "

## Encriptação

A função de encriptação é:

```text
E(x) = (ai + b) mod m
```

Onde:

- `i` é o índice da letra, de `0` ao comprimento do alfabeto menos 1.
- `m` é o comprimento do alfabeto.
  Para o alfabeto latino, `m` é `26`.
- `a` e `b` são números inteiros que constituem a chave de encriptação.

Os valores `a` e `m` têm de ser _primos entre si_ (ou _relativamente primos_) para que a desencriptação automática funcione, ou seja, têm o número `1` como único fator comum (podes encontrar mais informações no [artigo da Wikipédia sobre números primos entre si][coprime-integers]).
Se `a` e `m` não forem primos entre si, o teu programa deve indicar que se trata de um erro.
Caso contrário, deve encriptar ou desencriptar com a chave fornecida.

Para efeitos deste exercício, os algarismos são válidos como dados de entrada, mas não são encriptados.
Os espaços e os sinais de pontuação são excluídos.
O texto cifrado é escrito em grupos de comprimento fixo separados por espaços, sendo o tamanho tradicional do grupo `5` letras.
Isto serve para tornar mais difícil adivinhar o texto encriptado com base nos limites das palavras.

## Desencriptação

A função de desencriptação é:

```text
D(y) = (a^-1)(y - b) mod m
```

Onde:

- `y` é o valor numérico de uma letra encriptada, ou seja, `y = E(x)`
- é importante notar que `a^-1` é o inverso multiplicativo modular (IMM) de `a mod m`
- o inverso multiplicativo modular só existe se `a` e `m` forem primos entre si.

O IMM de `a` é `x` tal que o resto da divisão de `ax` por `m` é `1`:

```text
ax mod m = 1
```

Podes encontrar mais informações sobre como determinar um inverso multiplicativo modular e o que ele significa no [artigo relacionado da Wikipédia][mmi].

## Exemplos gerais

- Encriptar `"test"` dá `"ybty"` com a chave `a = 5`, `b = 7`
- Desencriptar `"ybty"` dá `"test"` com a chave `a = 5`, `b = 7`
- Desencriptar `"ybty"` dá `"lqul"` com a chave errada `a = 11`, `b = 7`
- Desencriptar `"kqlfd jzvgy tpaet icdhm rtwly kqlon ubstx"` dá `"thequickbrownfoxjumpsoverthelazydog"` com a chave `a = 19`, `b = 13`
- Encriptar `"test"` com a chave `a = 18`, `b = 13` é um erro, porque `18` e `26` não são primos entre si

## Exemplo de como determinar um inverso multiplicativo modular (IMM)

Determinar o IMM de `a = 15`:

- `(15 * x) mod 26 = 1`
- `(15 * 7) mod 26 = 1`, ou seja, `105 mod 26 = 1`
- `7` é o IMM de `15 mod 26`

[mmi]: https://en.wikipedia.org/wiki/Modular_multiplicative_inverse
[coprime-integers]: https://en.wikipedia.org/wiki/Coprime_integers
