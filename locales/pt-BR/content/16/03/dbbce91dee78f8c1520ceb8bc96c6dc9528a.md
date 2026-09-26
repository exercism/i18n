# Instruções

Crie uma implementação da cifra afim, um antigo sistema de criptografia criado no Oriente Médio.

A cifra afim é um tipo de cifra de substituição monoalfabética.
Cada caractere é mapeado para o seu equivalente numérico, cifrado com uma função matemática e depois convertido na letra correspondente ao seu novo valor numérico.
Embora todas as cifras monoalfabéticas sejam fracas, a cifra afim é muito mais forte do que a cifra Atbash, porque tem muito mais chaves.

[//]: # " monoalphabetic as spelled by Merriam-Webster, compare to polyalphabetic "

## Cifragem

A função de cifragem é:

```text
E(x) = (ai + b) mod m
```

Onde:

- `i` é o índice da letra, de `0` até o comprimento do alfabeto menos 1.
- `m` é o comprimento do alfabeto.
  Para o alfabeto latino, `m` é `26`.
- `a` e `b` são números inteiros que formam a chave de cifragem.

Os valores `a` e `m` devem ser _coprimos_ (ou _primos entre si_) para que a decifragem automática funcione, ou seja, eles têm o número `1` como único fator comum (há mais informações no [artigo da Wikipédia sobre números inteiros coprimos][coprime-integers]).
Caso `a` não seja coprimo com `m`, o seu programa deve indicar que isso é um erro.
Caso contrário, ele deve cifrar ou decifrar com a chave fornecida.

Para os fins deste exercício, os dígitos são entradas válidas, mas não são cifrados.
Espaços e caracteres de pontuação são excluídos.
O texto cifrado é escrito em grupos de comprimento fixo separados por espaço, sendo o tamanho tradicional do grupo `5` letras.
Isso serve para dificultar a dedução do texto cifrado com base nos limites das palavras.

## Decifragem

A função de decifragem é:

```text
D(y) = (a^-1)(y - b) mod m
```

Onde:

- `y` é o valor numérico de uma letra cifrada, ou seja, `y = E(x)`
- é importante observar que `a^-1` é o inverso multiplicativo modular (MMI) de `a mod m`
- o inverso multiplicativo modular só existe se `a` e `m` forem coprimos.

O MMI de `a` é o `x` tal que o resto da divisão de `ax` por `m` é `1`:

```text
ax mod m = 1
```

Há mais informações sobre como encontrar um inverso multiplicativo modular e o que ele significa no [artigo relacionado da Wikipédia][mmi].

## Exemplos gerais

- Cifrar `"test"` resulta em `"ybty"` com a chave `a = 5`, `b = 7`
- Decifrar `"ybty"` resulta em `"test"` com a chave `a = 5`, `b = 7`
- Decifrar `"ybty"` resulta em `"lqul"` com a chave errada `a = 11`, `b = 7`
- Decifrar `"kqlfd jzvgy tpaet icdhm rtwly kqlon ubstx"` resulta em `"thequickbrownfoxjumpsoverthelazydog"` com a chave `a = 19`, `b = 13`
- Cifrar `"test"` com a chave `a = 18`, `b = 13` é um erro, porque `18` e `26` não são coprimos

## Exemplo de como encontrar um inverso multiplicativo modular (MMI)

Encontrando o MMI para `a = 15`:

- `(15 * x) mod 26 = 1`
- `(15 * 7) mod 26 = 1`, ou seja, `105 mod 26 = 1`
- `7` é o MMI de `15 mod 26`

[mmi]: https://en.wikipedia.org/wiki/Modular_multiplicative_inverse
[coprime-integers]: https://en.wikipedia.org/wiki/Coprime_integers
