# Introdução

Os `Complex numbers` não são complicados.
Eles só precisam de um nome menos alarmante.

Eles são tão úteis, especialmente na engenharia e na ciência, que o R inclui [números complexos][web-complex] como
[tipos atômicos][ref-atomic] padrão, ao lado de integer, double, logical, character e raw.

## Noções básicas

Um número `complex` em R é um único valor.
No uso, porém, ele pode ser pensado como um par de números.
Essas partes são chamadas de "real" e "imaginária", por motivos históricos infelizes.
Mais uma vez, é melhor focar na simplicidade subjacente e não nos nomes estranhos.

Para criar números complexos a partir de dois números reais, basta adicionar o sufixo `i` à parte imaginária.

```r
2+3i
#> [1] 2+3i

typeof(2+3i)
#> [1] "complex"
```

Para criar um número complexo a partir de variáveis reais, a sintaxe acima não funciona.
Escrever `r + imi` confunde o parser, que passa a achar que `imi` é um nome de variável (inexistente).

Multiplique a parte imaginária por `1i` ou use a função [`complex()`][ref-complex]:

```r
r <- 2
im <- 3

r + im * 1i
#> [1] 2+3i

# must include the `real` and `imaginary` keywords
complex(real = r, imaginary = im)
#> [1] 2+3i
```

Você pode se perguntar: por que `i` e não `j`?

A maioria dos engenheiros prefere `j`.
A maioria dos cientistas e matemáticos prefere a notação matemática `i` para _imaginário_, mas essa notação entra em conflito
com o uso de `i` para dizer _corrente_ na Engenharia Elétrica.

O R escolheu `i`, o Python escolheu `j`, e o Julia contornou a polêmica escolhendo `im`.
Tenha cuidado ao alternar entre linguagens de programação [STEM][wiki-STEM].

Para acessar as partes de um número complexo individualmente:

```r
z <- 2+3i

Re(z)  # real part
#> [1] 2

Im(z)  # imaginary part
#> [1] 3
```

Qualquer uma das partes pode ser zero, e os matemáticos podem então dizer que o número é "totalmente real" ou "totalmente imaginário".
No entanto, ele continua sendo um número complexo no R.

```r
1.2 + 0i
#> [1] 1.2+0i

typeof(1.2 + 0i)
#> [1] "complex"

2i
#> [1] 0+2i

typeof(2i)
#> [1] "complex"
```

Você talvez já tenha ouvido que "`i` (ou `j`) é a raiz quadrada de -1".

Por enquanto, isso significa apenas que a parte imaginária, _por definição_, satisfaz a seguinte igualdade:

```r
1i * 1i == -1  # more precisely, 1i * 1i == -1 + 0i
#> [1] TRUE
```

É uma ideia simples, mas leva a consequências interessantes.

## Aritmética

A maioria dos [`operators`][ref-operators] usados com números de ponto flutuante e inteiros também funciona com números complexos:

```r
z1 = 1.5 + 2i
z2 = 2 + 1.5i

z1 + z2  # addition
#> [1] 3.5+3.5i

z1 * z2  # multiplication
#> [1] 0+6.25i

z1 / z2  # division
#> [1] 0.96+0.28i

z1^2  # exponentiation
#> [1] -1.75+6i

2^z1  # another exponentiation
#> [1] 0.518895+2.780422i
```

Explicar as regras de multiplicação e divisão de números complexos está fora do escopo deste conceito (_e você dificilmente precisará fazer essas operações "à mão" com frequência_).

Qualquer introdução [matemática][web-math-complex] ou de [engenharia elétrica][web-engineering-complex] aos números complexos cobre isso, caso você queira se aprofundar no assunto.

Como alternativa, o Exercism tem um [exercício de prática `Complex Numbers`][exercise-complex-numbers] no qual você pode implementar uma classe de número complexo com essas operações, partindo do zero.

A divisão inteira geralmente ___não___ é possível com números complexos, então os operadores `%/%` e `%%` vão falhar para o tipo de número complexo.

## Funções

A maioria das funções matemáticas funciona com entradas complexas.

No entanto, fornecer entradas reais e esperar uma saída complexa geralmente não funciona.

```r
sqrt(z1)
#> [1] 1.414214+0.707107i

sqrt(-1)  # fails!
#> Warning in sqrt(-1) : NaNs produced
#> [1] NaN

sqrt(-1 + 0i)  # succeeds with complex input
#> [1] 0+1i

sin(z1)
#> [1] 3.752771+0.256554i
```

Existem várias funções, além de `Re()` e `Im()`, com relevância especial para números complexos.

- `Conj()` simplesmente inverte o sinal da parte imaginária de um número complexo (_de + para - ou vice-versa_).
  - Por causa de como a multiplicação de complexos funciona, isso é mais útil do que você imagina.
- `abs(<complex number>)` tem garantia de retornar um número real sem parte imaginária (sua "magnitude"), e `Mod(<complex number>)` é um sinônimo.
- `Arg(<complex number>)` retorna o ângulo de fase em radianos.

```r
z1
#> [1] 1.5+2i

abs(z1)
#> [1] 2.5

Mod(z1)  # same as previous
#> [1] 2.5

Conj(z1)  # flip sign
#> [1] 1.5-2i

Arg(z1)
#> [1] 0.9272952
```

[web-complex]: https://www.cfm.brown.edu/people/dobrush/am33/R/intro/complex0.html
[ref-atomic]: https://cran.r-project.org/doc/manuals/r-release/R-lang.html#Vectors
[ref-complex]: https://www.rdocumentation.org/packages/base/versions/3.3.0/topics/complex
[web-math-complex]: https://www.nagwa.com/en/videos/143121736364/
[web-engineering-complex]: https://www.khanacademy.org/science/electrical-engineering/ee-circuit-analysis-topic/ee-ac-analysis/v/ee-complex-numbers
[ref-operators]: https://stat.ethz.ch/R-manual/R-devel/library/base/html/Syntax.html
[wiki-STEM]: https://en.wikipedia.org/wiki/Science,_technology,_engineering,_and_mathematics
[exercise-complex-numbers]: https://exercism.org/tracks/r/exercises/complex-numbers
