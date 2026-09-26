# Instruções

Analise e avalie problemas simples de matemática escritos por extenso, retornando a resposta como um número inteiro.

## Iteração 0: Números

Problemas sem operações simplesmente têm como resultado o número dado.

> What is 5?

O resultado é 5.

## Iteração 1: Adição

Some dois números.

> What is 5 plus 13?

O resultado é 18.

Lide com números grandes e negativos.

## Iteração 2: Subtração, Multiplicação e Divisão

Agora, faça as outras três operações.

> What is 7 minus 5?

2

> What is 6 multiplied by 4?

24

> What is 25 divided by 5?

5

## Iteração 3: Múltiplas Operações

Lide com um conjunto de operações, em sequência.

Como esses problemas são escritos por extenso, avalie a expressão da
esquerda para a direita, _ignorando a ordem usual das operações._

> What is 5 plus 13 plus 6?

24

> What is 3 plus 2 multiplied by 3?

15  (ou seja, não 9)

## Iteração 4: Erros

O parser deve rejeitar:

* Operações não suportadas ("What is 52 cubed?")
* Perguntas sem matemática ("Who is the President of the United States")
* Problemas escritos por extenso com sintaxe inválida ("What is 1 plus plus 2?")

## Bônus: Exponenciais

Se você quiser, lide com exponenciais.

> What is 2 raised to the 5th power?

32
