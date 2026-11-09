# Introdução

`Complex numbers` não são complicados.
Só precisam de um nome menos alarmante.

São tão úteis, sobretudo na engenharia e na ciência, que o R inclui os [números complexos][web-complex] como [tipos atómicos][ref-atomic] padrão, a par de integer, double, logical, character e raw.

## Noções básicas

Um número `complex` em R é um valor único.
Na prática, porém, pode ser encarado como um par de números.
Chamam-se a parte «real» e a parte «imaginária», por razões históricas pouco felizes.
Mais uma vez, o melhor é concentrares-te na simplicidade subjacente e não nos nomes estranhos.

Para criar números complexos a partir de dois números reais, basta acrescentar o sufixo `i` à parte imaginária.

```r
2+3i
#> [1] 2+3i

typeof(2+3i)
#> [1] "complex"
```

Para criar um número complexo a partir de variáveis reais, a sintaxe acima não funciona.
Escrever `r + imi` leva o analisador sintático a pensar que `imi` é um nome de variável (que não existe).

Multiplica a parte imaginária por `1i` ou usa a função [`complex()`][ref-complex]:

```r
r <- 2
im <- 3

r + im * 1i
#> [1] 2+3i

# must include the `real` and `imaginary` keywords
complex(real = r, imaginary = im)
#> [1] 2+3i
```

Podes perguntar-te: porque é que se usa `i` e não `j`?

A maioria dos engenheiros prefere `j`.
A maioria dos cientistas e matemáticos prefere a notação matemática `i` para _imaginário_, mas essa notação entra em conflito com o uso de `i` para designar _corrente_ na engenharia eletrotécnica.

O R escolheu `i`, o Python escolheu `j` e a Julia contornou a polémica escolhendo `im`.
Tem cuidado ao alternar entre [linguagens de programação STEM][wiki-STEM].

Para acederes individualmente às partes de um número complexo:

```r
z <- 2+3i

Re(z)  # real part
#> [1] 2

Im(z)  # imaginary part
#> [1] 3
```

Qualquer das partes pode ser zero, e os matemáticos podem então falar de um número «totalmente real» ou «totalmente imaginário».
No entanto, em R continua a ser um número complexo.

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

Podes já ter ouvido dizer que «`i` (ou `j`) é a raiz quadrada de -1».

Para já, tudo o que isto significa é que a parte imaginária, _por definição_, satisfaz a seguinte igualdade:

```r
1i * 1i == -1  # more precisely, 1i * 1i == -1 + 0i
#> [1] TRUE
```

É uma ideia simples, mas que conduz a consequências interessantes.

## Aritmética

A maioria dos [`operators`][ref-operators] usados com números de vírgula flutuante e inteiros também funciona com números complexos:

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

Explicar as regras da multiplicação e da divisão de números complexos está fora do âmbito deste conceito (_e é pouco provável que tenhas de fazer essas operações «à mão» com muita frequência_).

Qualquer introdução [matemática][web-math-complex] ou de [engenharia eletrotécnica][web-engineering-complex] aos números complexos aborda isto, caso queiras aprofundar o tema.

Em alternativa, o Exercism tem um exercício de prática [`Complex Numbers`][exercise-complex-numbers] onde podes implementar uma classe de números complexos com estas operações a partir dos primeiros princípios.

A divisão inteira geralmente ___não___ é possível com números complexos, por isso os operadores `%/%` e `%%` falham para o tipo de número complexo.

## Funções

A maioria das funções matemáticas funciona com valores de entrada complexos.

No entanto, fornecer valores de entrada reais e esperar um resultado complexo normalmente não funciona.

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

Há várias funções, para além de `Re()` e `Im()`, com especial relevância para os números complexos.

- `Conj()` limita-se a inverter o sinal da parte imaginária de um número complexo (_de + para - ou vice-versa_).
  - Por causa da forma como a multiplicação de números complexos funciona, isto é mais útil do que podes pensar.
- `abs(<complex number>)` devolve garantidamente um número real sem parte imaginária (a sua «magnitude»), e `Mod(<complex number>)` é um sinónimo.
- `Arg(<complex number>)` devolve o ângulo de fase em radianos.

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
