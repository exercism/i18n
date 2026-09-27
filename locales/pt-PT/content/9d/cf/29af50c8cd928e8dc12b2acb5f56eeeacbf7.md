# Instruções

Neste exercício vais escrever algum código para te ajudar a cozinhar uma lasanha fantástica do teu livro de receitas preferido.

Tens três tarefas, todas relacionadas com o tempo gasto a cozinhar a lasanha.

## 1. Define o tempo esperado no forno, em minutos

Define `expectedMinutesInOven` para calcular quantos minutos a lasanha deve estar no forno. Segundo o livro de receitas, o tempo esperado no forno, em minutos, é 40:

```elm
expectedMinutesInOven
    --> 40
```

## 2. Calcula o tempo de preparação, em minutos

Define `preparationTimeInMinutes`, que recebe o número de camadas da lasanha como parâmetro e devolve quantos minutos são precisos para preparar a lasanha, assumindo que cada camada leva 2 minutos a preparar.

```elm
preparationTimeInMinutes 3
    --> 6
```

## 3. Calcula o tempo decorrido, em minutos

Define a função `elapsedTimeInMinutes`, que recebe dois parâmetros: o primeiro é o número de camadas da lasanha e o segundo é o número de minutos que a lasanha está no forno. A função deve devolver quantos minutos já dedicaste a cozinhar a lasanha, ou seja, a soma do tempo de preparação, em minutos, com o tempo, em minutos, que a lasanha passou no forno até ao momento.

```elm
elapsedTimeInMinutes 3 20
    --> 26
```
