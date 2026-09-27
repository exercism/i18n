# Instruções

Analisa e avalia problemas de matemática simples descritos em palavras, devolvendo a resposta como um número inteiro.

## Iteração 0: Números

Os problemas sem operações limitam-se a dar o número indicado.

> What is 5?

O resultado é 5.

## Iteração 1: Adição

Soma dois números.

> What is 5 plus 13?

O resultado é 18.

Lida com números grandes e negativos.

## Iteração 2: Subtração, multiplicação e divisão

Agora, realiza as outras três operações.

> What is 7 minus 5?

2

> What is 6 multiplied by 4?

24

> What is 25 divided by 5?

5

## Iteração 3: Várias operações

Lida com um conjunto de operações, em sequência.

Como estes problemas são descritos em palavras, avalia a expressão da esquerda para a direita, _ignorando a ordem de operações habitual._

> What is 5 plus 13 plus 6?

24

> What is 3 plus 2 multiplied by 3?

15  (ou seja, não 9)

## Iteração 4: Erros

O analisador deve rejeitar:

* Operações não suportadas ("What is 52 cubed?")
* Perguntas que não são de matemática ("Who is the President of the United States")
* Problemas descritos em palavras com sintaxe inválida ("What is 1 plus plus 2?")

## Bónus: Exponenciais

Se quiseres, trata também de exponenciais.

> What is 2 raised to the 5th power?

32
