# Instruções

A tua amiga Li Mei tem um bar de sumos onde vende deliciosos sumos de fruta misturada.
És um cliente frequente na loja dela e percebeste que podias facilitar a vida à tua amiga.
Decides usar as tuas competências de programação para ajudar a Li Mei no seu trabalho.

## 1. Determina quanto tempo demora a misturar um sumo

A Li Mei gosta de dizer aos clientes, com antecedência, quanto tempo têm de esperar por um sumo do menu que encomendaram.
Tem dificuldade em lembrar-se dos números exatos, porque o tempo que cada sumo leva a misturar varia.
O `"Pure Strawberry Joy"` demora 0,5 minutos, o `"Energizer"` e o `"Green Garden"` demoram 1,5 minutos cada, o `"Tropical Island"` demora 3 minutos e o `"All or Nothing"` demora 5 minutos.
Para todas as outras bebidas (por exemplo, ofertas especiais) podes assumir um tempo de preparação de 2,5 minutos.

Para ajudares a tua amiga, escreve uma função `time_to_mix_juice` que recebe um sumo do menu como argumento e devolve o número de minutos que demora a misturar essa bebida.

```julia-repl
julia> time_to_mix_juice("Tropical Island")
3

julia> time_to_mix_juice("Berries & Lime")
2.5
```

## 2. Reabastece a reserva de gomos de lima

Muitas das criações da Li Mei incluem gomos de lima, tanto como ingrediente como para decoração.
Por isso, quando começa o turno de manhã, tem de se certificar de que a caixa de gomos de lima está cheia para o resto do dia.

Implementa a função `limes_to_cut`, que recebe o número de gomos de lima que a Li Mei precisa de cortar e um array que representa as limas inteiras que tem à mão.
Consegue obter 6 gomos de uma lima `"small"`, 8 gomos de uma lima `"medium"` e 10 de uma lima `"large"`.
Corta sempre as limas pela ordem em que aparecem na lista, começando pelo primeiro item.
Continua até atingir o número de gomos de que precisa ou até ficar sem limas.

A Li Mei gostaria de saber com antecedência quantas limas precisa de cortar.
A função `limes_to_cut` deve devolver o número de limas a cortar.

```julia-repl
julia> limes_to_cut(25, ["small", "small", "large", "medium", "small"])
4
```

## 3. Lista os tempos de mistura de cada pedido na fila

A Li Mei gosta de saber quanto tempo vai demorar a misturar os pedidos pelos quais os clientes estão à espera.

Implementa a função `order_times`, que recebe uma fila de pedidos e devolve um vetor de tempos de mistura.

```julia-repl
julia> order_times(["Energizer", "Tropical Island"])
[1.5, 3.0]
```

## 4. Termina o turno

A Li Mei trabalha sempre até às 15 horas.
Depois, o empregado dela, o Dmitry, assume o turno.
Muitas vezes há bebidas que já foram encomendadas mas que ainda não estão preparadas quando o turno da Li Mei termina.
O Dmitry prepara então os sumos que faltam.

Para facilitar a passagem de turno, implementa uma função `remaining_orders` que recebe o número de minutos que faltam para o turno da Li Mei terminar e um array de sumos que já foram encomendados mas que ainda não estão preparados.
A função deve devolver os pedidos que a Li Mei não consegue começar a preparar antes do fim do seu dia de trabalho.

O tempo que falta para o turno terminar será sempre maior do que 0.
O array de sumos a preparar nunca estará vazio.
Além disso, os pedidos são preparados pela ordem em que aparecem no array.
Se a Li Mei começar a misturar um determinado sumo, acaba-o sempre, mesmo que tenha de trabalhar um pouco mais.
Se não houver pedidos restantes de que o Dmitry tenha de tratar, deve ser devolvido um vetor vazio.

```julia-repl
julia> remaining_orders(5, ["Energizer", "All or Nothing", "Green Garden"])
["Green Garden"]
```
