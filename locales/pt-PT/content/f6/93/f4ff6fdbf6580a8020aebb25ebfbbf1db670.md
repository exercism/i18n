# Dicas

## 1. Classifica os clientes

- As funções `any()` ou `all()` podem ser úteis aqui.
- Podes definir uma função separada para usar nestas, ou usar diretamente uma função anónima.

## 2. Separa os clientes enfáticos

- Precisas de filtrar o dicionário.
- Um dicionário, por omissão, itera um `Pair` de chave/valor, ao qual podes aceder por campos (first/second) ou por índice (1/2).
- Usa a tua função `all_15()`.

## 3. Converte as classificações em binário

- Precisas de um mapeamento de `1` para `0` e de `5` para `1`.
- Certifica-te de que o array que devolves tem a mesma forma que o array que recebes.

## 4. Transforma as classificações numa matriz

- Isto pode ser feito com `mapreduce()`.
- Usa a tua função `tobinary()` para o mapeamento (ou para parte dele?).
- Podes obter uma matriz reduzindo um vetor de vetores com `hcat()` ou `vcat()`, consoante se trate de vetores coluna ou de vetores linha.
- Tem atenção ao teu resultado. Cada vetor de classificações é uma linha da matriz? A função `transpose()` pode ajudar algures.
