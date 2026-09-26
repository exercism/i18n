# Instruções

Sua amiga Li Mei tem um bar de sucos onde vende deliciosos sucos mistos de frutas.
Você é cliente frequente na loja dela e percebeu que poderia facilitar a vida da sua amiga.
Você decide usar suas habilidades de programação para ajudar a Li Mei no trabalho dela.

## 1. Descubra quanto tempo leva para misturar um suco

Li Mei gosta de avisar os clientes com antecedência quanto tempo vão ter que esperar por um suco do menu que pediram.
Ela tem dificuldade de lembrar os números exatos, porque o tempo para misturar os sucos varia.
`"Pure Strawberry Joy"` leva 0,5 minutos, `"Energizer"` e `"Green Garden"` levam 1,5 minutos cada, `"Tropical Island"` leva 3 minutos e `"All or Nothing"` leva 5 minutos.
Para todas as outras bebidas (por exemplo, ofertas especiais), você pode supor um tempo de preparo de 2,5 minutos.

Para ajudar sua amiga, escreva uma função `time_to_mix_juice` que recebe um suco do menu como argumento e retorna o número de minutos necessários para misturar essa bebida.

```julia-repl
julia> time_to_mix_juice("Tropical Island")
3

julia> time_to_mix_juice("Berries & Lime")
2.5
```

## 2. Reponha o estoque de gomos de limão

Muitas das criações da Li Mei levam gomos de limão, como ingrediente ou como parte da decoração.
Então, quando ela começa o turno pela manhã, precisa garantir que o recipiente de gomos de limão esteja cheio para o dia que vem.

Implemente a função `limes_to_cut`, que recebe o número de gomos de limão que Li Mei precisa cortar e um array que representa o estoque de limões inteiros que ela tem à mão.
Ela consegue 6 gomos de um limão `"small"`, 8 gomos de um limão `"medium"` e 10 de um limão `"large"`.
Ela sempre corta os limões na ordem em que eles aparecem na lista, começando pelo primeiro item.
Ela continua até alcançar o número de gomos de que precisa ou até acabarem os limões.

Li Mei gostaria de saber com antecedência quantos limões precisa cortar.
A função `limes_to_cut` deve retornar o número de limões a cortar.

```julia-repl
julia> limes_to_cut(25, ["small", "small", "large", "medium", "small"])
4
```

## 3. Liste os tempos de mistura de cada pedido na fila

Li Mei gosta de acompanhar quanto tempo vai levar para misturar os pedidos que os clientes estão esperando.

Implemente a função `order_times`, que recebe uma fila de pedidos e retorna um vetor de tempos de mistura.

```julia-repl
julia> order_times(["Energizer", "Tropical Island"])
[1.5, 3.0]
```

## 4. Termine o turno

Li Mei sempre trabalha até as 15h.
Depois, seu funcionário Dmitry assume.
Muitas vezes há bebidas que foram pedidas mas ainda não foram preparadas quando o turno da Li Mei termina.
Dmitry então prepara os sucos restantes.

Para facilitar a passagem do turno, implemente uma função `remaining_orders` que recebe o número de minutos restantes no turno da Li Mei e um array de sucos que foram pedidos mas ainda não foram preparados.
A função deve retornar os pedidos que Li Mei não consegue começar a preparar antes do fim do seu dia de trabalho.

O tempo restante no turno será sempre maior que 0.
O array de sucos a preparar nunca estará vazio.
Além disso, os pedidos são preparados na ordem em que aparecem no array.
Se Li Mei começa a misturar um determinado suco, ela sempre o termina, mesmo que precise trabalhar um pouco mais.
Se não restarem pedidos que Dmitry precise cuidar, deve ser retornado um vetor vazio.

```julia-repl
julia> remaining_orders(5, ["Energizer", "All or Nothing", "Green Garden"])
["Green Garden"]
```
