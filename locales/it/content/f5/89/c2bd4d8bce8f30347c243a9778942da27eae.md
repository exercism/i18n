# Introduzione

`Complex numbers` non sono complicati.
Hanno solo bisogno di un nome meno allarmante.

Sono così utili, soprattutto in ingegneria e nelle scienze, che R include i [numeri complessi][web-complex] tra i tipi [atomici][ref-atomic] standard, insieme a integer, double, logical, character e raw.

## Le basi

Un numero `complex` in R è un unico valore.
Nell'uso pratico, però, lo si può pensare come una coppia di numeri.
Queste sono chiamate parti «reali» e «immaginarie», per sfortunate ragioni storiche.
Ancora una volta, è meglio concentrarsi sulla semplicità di fondo e non sui nomi strani.

Per creare numeri complessi a partire da due numeri reali, basta aggiungere il suffisso `i` alla parte immaginaria.

```r
2+3i
#> [1] 2+3i

typeof(2+3i)
#> [1] "complex"
```

Per creare un numero complesso a partire da variabili reali, la sintassi qui sopra non funziona.
Scrivere `r + imi` confonde il parser, che pensa che `imi` sia il nome di una variabile (inesistente).

In alternativa, moltiplica la parte immaginaria per `1i` oppure usa la funzione [`complex()`][ref-complex]:

```r
r <- 2
im <- 3

r + im * 1i
#> [1] 2+3i

# must include the `real` and `imaginary` keywords
complex(real = r, imaginary = im)
#> [1] 2+3i
```

Ti starai chiedendo: perché `i` e non `j`?

La maggior parte degli ingegneri preferisce `j`.
La maggior parte degli scienziati e dei matematici preferisce la notazione matematica `i` per _immaginario_, ma quella notazione entra in conflitto con l'uso di `i` per indicare la _corrente_ in ingegneria elettrica.

R ha scelto `i`, Python ha scelto `j` e Julia ha aggirato la controversia scegliendo `im`.
Fai attenzione quando passi da un linguaggio di programmazione [STEM][wiki-STEM] ad un altro.

Per accedere singolarmente alle parti di un numero complesso:

```r
z <- 2+3i

Re(z)  # real part
#> [1] 2

Im(z)  # imaginary part
#> [1] 3
```

Una delle due parti può essere zero, ed i matematici possono allora parlare del numero come «interamente reale» o «interamente immaginario».
Tuttavia, in R è comunque un numero complesso.

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

Potresti aver sentito dire che «`i` (o `j`) è la radice quadrata di -1».

Per ora, tutto questo significa solo che la parte immaginaria _per definizione_ soddisfa la seguente uguaglianza:

```r
1i * 1i == -1  # more precisely, 1i * 1i == -1 + 0i
#> [1] TRUE
```

È un'idea semplice, ma porta a conseguenze interessanti.

## Aritmetica

La maggior parte degli [`operators`][ref-operators] usati con i numeri in virgola mobile e gli interi funziona anche con i numeri complessi:

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

Spiegare le regole per la moltiplicazione e la divisione dei numeri complessi esula dagli obiettivi di questo concetto (_ed è improbabile che tu debba eseguire quelle operazioni «a mano» molto spesso_).

Qualsiasi introduzione [matematica][web-math-complex] o di [ingegneria elettrica][web-engineering-complex] ai numeri complessi tratterà questo argomento, se vuoi approfondirlo.

In alternativa, Exercism ha un esercizio di pratica [`Complex Numbers`][exercise-complex-numbers], in cui puoi implementare una classe per numeri complessi con queste operazioni partendo dai principi fondamentali.

La divisione intera in genere ___non___ è possibile con i numeri complessi, quindi gli operatori `%/%` e `%%` falliranno per il tipo numero complesso.

## Funzioni

La maggior parte delle funzioni matematiche funziona con input complessi.

Tuttavia, fornire input reali e aspettarsi un output complesso di solito non funziona.

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

Ci sono diverse funzioni, oltre a `Re()` e `Im()`, particolarmente rilevanti per i numeri complessi.

- `Conj()` inverte semplicemente il segno della parte immaginaria di un numero complesso (_da + a - o viceversa_).
  - Per come funziona la moltiplicazione tra numeri complessi, è più utile di quanto potresti pensare.
- `abs(<complex number>)` restituisce sempre un numero reale senza parte immaginaria (il suo «modulo»), e `Mod(<complex number>)` è un sinonimo.
- `Arg(<complex number>)` restituisce l'angolo di fase in radianti.

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
