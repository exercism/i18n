# Instruções

Neste exercício você vai escrever um pouco de código para ajudar a preparar uma lasanha incrível usando seu livro de receitas favorito.

Você tem três tarefas, todas relacionadas ao tempo gasto no preparo da lasanha.

## 1. Defina o tempo esperado no forno em minutos

Defina `expectedMinutesInOven` para calcular quantos minutos a lasanha deve ficar no forno. De acordo com o livro de receitas, o tempo esperado no forno em minutos é 40:

```elm
expectedMinutesInOven
    --> 40
```

## 2. Calcule o tempo de preparo em minutos

Defina `preparationTimeInMinutes`, que recebe o número de camadas da lasanha como parâmetro e retorna quantos minutos são necessários para preparar a lasanha, considerando que cada camada leva 2 minutos para ser preparada.

```elm
preparationTimeInMinutes 3
    --> 6
```

## 3. Calcule o tempo decorrido em minutos

Defina a função `elapsedTimeInMinutes`, que recebe dois parâmetros: o primeiro parâmetro é o número de camadas da lasanha, e o segundo é o número de minutos que a lasanha já passou no forno. A função deve retornar quantos minutos você trabalhou no preparo da lasanha, que é a soma do tempo de preparo em minutos com o tempo em minutos que a lasanha passou no forno até o momento.

```elm
elapsedTimeInMinutes 3 20
    --> 26
```
