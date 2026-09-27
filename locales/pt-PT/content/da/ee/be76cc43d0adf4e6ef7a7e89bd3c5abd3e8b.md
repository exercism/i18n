# Instruções

A época de netball terminou e a classificação decide quem joga as finais.

O código inicial dá-te uma classe `TEAM`. Escreve `FINALS_LADDER` por baixo dela.

## 1. Quem está acima de quem?

`higher` recebe duas equipas e diz se a primeira fica acima da segunda. Quem tem mais pontos fica à frente. As equipas empatadas em pontos são separadas pela diferença de golos, ficando à frente a que tiver maior.

```sather
FINALS_LADDER::higher(#TEAM("Vixens", 24, 40), #TEAM("Magpies", 20, 90))
-- => true
```

## 2. A classificação

`ladder` recebe as equipas em qualquer ordem e devolve-as classificadas. O array recebido tem de ficar como estava.

```sather
FINALS_LADDER::ladder(teams)
-- => the same teams, best first
```

## 3. Ler a classificação

`names` recebe um array de equipas e devolve os seus nomes unidos com `", "`.

```sather
FINALS_LADDER::names(FINALS_LADDER::ladder(teams))
-- => "Vixens, Magpies, Swifts"
```

## 4. Os primeiros

`premiers` recebe as equipas em qualquer ordem e devolve o nome da equipa que está no topo. Sem equipas nenhumas, a resposta é `""`.

```sather
FINALS_LADDER::premiers(teams)
-- => "Vixens"
```

## 5. Uma ordem completamente diferente

`shortest_first` recebe um array de strings e devolve-as ordenadas por comprimento, da mais curta para a mais longa. As strings com o mesmo comprimento ficam por ordem alfabética.

```sather
FINALS_LADDER::shortest_first(|"Magpies", "Vixens", "Swifts"|)
-- => "Swifts", "Vixens", "Magpies"
```

O desempate não é decorativo. A ordenação não é estável, por isso, sem ele, dois nomes com o mesmo comprimento podiam sair em qualquer ordem.

Esta é a mesma rotina de ordenação da tarefa 2, mas com uma regra diferente. É esse o objetivo do exercício.
