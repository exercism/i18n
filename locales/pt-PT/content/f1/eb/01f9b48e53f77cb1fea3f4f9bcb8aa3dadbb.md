# Dicas

## Geral

- Tenta dividir um problema num caso base e num caso recursivo. Por exemplo, imagina que queres contar quantas bolachas há no pote das bolachas com uma abordagem recursiva. Um caso base é um pote vazio: tem zero bolachas. Se o pote não estiver vazio, o número de bolachas no pote é igual a uma bolacha mais o número de bolachas no pote depois de retirares uma bolacha.

## 1. Define os tipos de pizza e as opções

- O tipo `Pizza` é um tipo recursivo, em que os casos `ExtraSauce` e `ExtraToppings` contêm uma `Pizza`.

## 2. Calcula o preço da pizza

- Para lidares com o facto de o tipo `Pizza` ser um tipo recursivo, define uma função recursiva.

## 3. Calcula o preço de um pedido

- Podes fazer correspondência de padrões com o comprimento exato da lista para determinar se a taxa adicional deve ser aplicada.
- Usa recursão de cauda para evitar usar demasiada memória ao calcular o preço de um pedido.
