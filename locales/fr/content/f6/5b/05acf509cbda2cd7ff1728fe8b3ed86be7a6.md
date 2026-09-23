# Instructions

Analyse et évalue des petits problèmes de mathématiques énoncés en mots, et renvoie la réponse sous la forme d'un entier.

## Itération 0 : nombres

Un problème sans opération donne simplement le nombre indiqué.

> What is 5?

Donne 5.

## Itération 1 : addition

Additionne deux nombres.

> What is 5 plus 13?

Donne 18.

Gère les grands nombres et les nombres négatifs.

## Itération 2 : soustraction, multiplication et division

Maintenant, effectue les trois autres opérations.

> What is 7 minus 5?

2

> What is 6 multiplied by 4?

24

> What is 25 divided by 5?

5

## Itération 3 : opérations multiples

Gère une suite d'opérations, dans l'ordre.

Comme ce sont des problèmes énoncés en mots, évalue l'expression de
gauche à droite, _en ignorant l'ordre habituel des opérations._

> What is 5 plus 13 plus 6?

24

> What is 3 plus 2 multiplied by 3?

15  (c'est-à-dire pas 9)

## Itération 4 : erreurs

L'analyseur doit rejeter :

* Les opérations non prises en charge (« What is 52 cubed? »)
* Les questions qui ne relèvent pas des mathématiques (« Who is the President of the United States »)
* Les problèmes énoncés avec une syntaxe invalide (« What is 1 plus plus 2? »)

## Bonus : exponentielles

Si tu le souhaites, gère aussi les exponentielles.

> What is 2 raised to the 5th power?

32
