# Instruções

A temporada de netball acabou e a classificação decide quem vai às finais.

O esqueleto fornece a você uma classe `TEAM`. Escreva `FINALS_LADDER` abaixo dela.

## 1. Quem está acima de quem?

`higher` recebe dois times e responde se o primeiro fica acima do
segundo. Quem tem mais pontos vem primeiro. Times empatados em pontos são
separados pelo saldo de gols, maior primeiro.

```sather
FINALS_LADDER::higher(#TEAM("Vixens", 24, 40), #TEAM("Magpies", 20, 90))
-- => true
```

## 2. A classificação

`ladder` recebe os times em qualquer ordem e responde com eles classificados. O array
recebido precisa ficar como estava.

```sather
FINALS_LADDER::ladder(teams)
-- => the same teams, best first
```

## 3. Mostre a classificação

`names` recebe um array de times e responde os nomes deles unidos com `", "`.

```sather
FINALS_LADDER::names(FINALS_LADDER::ladder(teams))
-- => "Vixens, Magpies, Swifts"
```

## 4. Os primeiros colocados

`premiers` recebe os times em qualquer ordem e responde o nome do time que
está no topo. Sem nenhum time, a resposta é `""`.

```sather
FINALS_LADDER::premiers(teams)
-- => "Vixens"
```

## 5. Uma ordem completamente diferente

`shortest_first` recebe um array de strings e responde com elas ordenadas por
comprimento, da menor para a maior. Strings do mesmo comprimento ficam em ordem alfabética.

```sather
FINALS_LADDER::shortest_first(|"Magpies", "Vixens", "Swifts"|)
-- => "Swifts", "Vixens", "Magpies"
```

O critério de desempate não é enfeite. A ordenação não é estável, então sem
ele dois nomes do mesmo comprimento poderiam sair em qualquer ordem.

É a mesma rotina de ordenação da tarefa 2, só que com uma regra diferente
passada para ela. É justamente esse o ponto do exercício.
