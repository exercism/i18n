# Instruções

Vais escrever algum código para te ajudar a cozinhar uma lasanha do teu livro de receitas preferido.

Tens cinco tarefas, todas relacionadas com a preparação da tua receita.

## 1. Define o tempo esperado no forno em minutos

Define a variável `$Lasagna::ExpectedMinutesInOven` com o número de minutos que a lasanha deve estar no forno. Segundo o livro de receitas, o tempo esperado no forno é de 40 minutos:

```perl
$Lasagna::ExpectedMinutesInOven
# => 40
```

## 2. Calcula o tempo restante no forno em minutos

Modifica a sub-rotina `Lasagna::remaining_minutes_in_oven`, que recebe como argumento os minutos reais que a lasanha já esteve no forno, para devolver quantos minutos a lasanha ainda tem de permanecer no forno, com base no tempo esperado no forno da tarefa anterior.

```perl
Lasagna::remaining_minutes_in_oven(30)
# => 10
```

## 3. Calcula o tempo de preparação em minutos

Modifica a sub-rotina `Lasagna::preparation_time_in_minutes`, que recebe como argumento o número de camadas que adicionaste à lasanha, para devolver quantos minutos passaste a preparar a lasanha, assumindo que cada camada demora 2 minutos a preparar.

```perl
Lasagna::preparation_time_in_minutes(2)
# => 4
```

## 4. Calcula o tempo total de trabalho em minutos

Modifica a sub-rotina `Lasagna::total_time_in_minutes`, que recebe dois argumentos: o primeiro argumento é o número de camadas que adicionaste à lasanha e o segundo é o número de minutos que a lasanha já esteve no forno.
A sub-rotina deve devolver o total de minutos que trabalhaste a cozinhar a lasanha, ou seja, a soma do tempo de preparação em minutos com o tempo em minutos que a lasanha esteve no forno até ao momento.

```perl
Lasagna::total_time_in_minutes(3, 20)
# => 26
```

## 5. Cria uma notificação de que a lasanha está pronta

Modifica a sub-rotina `Lasagna::oven_alarm`, que não recebe argumentos, para devolver uma mensagem a indicar que a lasanha está pronta a comer.

```perl
Lasagna::oven_alarm()
# => "Ding!"
```
