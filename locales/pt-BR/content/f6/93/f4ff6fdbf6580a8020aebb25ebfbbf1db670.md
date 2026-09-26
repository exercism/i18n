# Dicas

## 1. Classifique os clientes

- As funções `any()` ou `all()` podem ajudar aqui.
- Você pode definir uma função separada para usar nessas funções, ou usar uma função anônima diretamente.

## 2. Separe os clientes enfáticos

- Você precisa filtrar o dicionário.
- Um dicionário, por padrão, itera sobre um `Pair` de chave/valor, que pode ser acessado por campos (first/second) ou por índice (1/2).
- Use a sua função `all_15()`.

## 3. Transforme as avaliações em binário

- Você precisa de um mapeamento de `1` para `0` e de `5` para `1`.
- Verifique se o formato do array de saída é o mesmo do array de entrada.

## 4. Transforme as avaliações em uma matriz

- Isso pode ser feito com `mapreduce()`.
- Use a sua função `tobinary()` para (parte do?) mapeamento.
- É possível obter uma matriz reduzindo um vetor de vetores com `hcat()` ou `vcat()`, dependendo se a entrada é um vetor coluna ou um vetor linha, respectivamente.
- Fique de olho na sua saída. Cada vetor de avaliação é uma linha da matriz? A função `transpose()` pode ajudar em algum lugar.
