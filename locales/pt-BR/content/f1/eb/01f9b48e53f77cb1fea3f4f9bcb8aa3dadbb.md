# Dicas

## Geral

- Tente dividir um problema em um caso base e um caso recursivo. Por exemplo, digamos que você queira contar quantos biscoitos há no pote de biscoitos com uma abordagem recursiva. Um caso base é um pote vazio: ele tem zero biscoitos. Se o pote não estiver vazio, o número de biscoitos no pote é igual a um biscoito mais o número de biscoitos no pote depois de remover um biscoito.

## 1. Defina os tipos de pizza e as opções

- O tipo `Pizza` é um tipo recursivo, com os casos `ExtraSauce` e `ExtraToppings` contendo uma `Pizza`.

## 2. Calcule o preço da pizza

- Para lidar com o fato de o tipo `Pizza` ser um tipo recursivo, defina uma função recursiva.

## 3. Calcule o preço de um pedido

- Você pode usar casamento de padrões sobre o tamanho exato da lista para determinar se a taxa adicional deve ser aplicada.
- Use recursão de cauda para não consumir memória demais ao calcular o preço de um pedido.
