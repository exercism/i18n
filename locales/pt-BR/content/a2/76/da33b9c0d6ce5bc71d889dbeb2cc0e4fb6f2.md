# Instruções

Você vai escrever um código para ajudar a preparar uma lasanha do seu livro de receitas favorito.

Você tem cinco tarefas, todas relacionadas ao preparo da sua receita.

## 1. Defina o tempo esperado no forno em minutos

Defina a variável `$Lasagna::ExpectedMinutesInOven` com quantos minutos a lasanha deve ficar no forno. De acordo com o livro de receitas, o tempo esperado no forno em minutos é 40:

```perl
$Lasagna::ExpectedMinutesInOven
# => 40
```

## 2. Calcule o tempo restante no forno em minutos

Modifique a sub-rotina `Lasagna::remaining_minutes_in_oven`, que recebe como argumento os minutos reais que a lasanha está no forno, para retornar quantos minutos a lasanha ainda precisa ficar no forno, com base no tempo esperado no forno em minutos da tarefa anterior.

```perl
Lasagna::remaining_minutes_in_oven(30)
# => 10
```

## 3. Calcule o tempo de preparo em minutos

Modifique a sub-rotina `Lasagna::preparation_time_in_minutes`, que recebe como argumento o número de camadas que você adicionou à lasanha, para retornar quantos minutos você gastou preparando a lasanha, considerando que cada camada leva 2 minutos para preparar.

```perl
Lasagna::preparation_time_in_minutes(2)
# => 4
```

## 4. Calcule o tempo total de trabalho em minutos

Modifique a sub-rotina `Lasagna::total_time_in_minutes`, que recebe dois argumentos: o primeiro argumento é o número de camadas que você adicionou à lasanha, e o segundo argumento é o número de minutos que a lasanha está no forno.
A sub-rotina deve retornar quantos minutos no total você trabalhou preparando a lasanha, que é a soma do tempo de preparo em minutos com o tempo em minutos que a lasanha passou no forno até o momento.

```perl
Lasagna::total_time_in_minutes(3, 20)
# => 26
```

## 5. Crie uma notificação de que a lasanha está pronta

Modifique a sub-rotina `Lasagna::oven_alarm`, que não recebe nenhum argumento, para retornar uma mensagem indicando que a lasanha está pronta para comer.

```perl
Lasagna::oven_alarm()
# => "Ding!"
```
