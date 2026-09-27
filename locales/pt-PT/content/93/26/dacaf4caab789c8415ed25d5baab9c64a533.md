# Dicas

A introdução contém a maior parte do que precisas para este exercício.
A tarefa 5 (renderização) pode ser feita mais cedo para ajudar na visualização, mas tem atenção aos diferentes valores que os pontos podem assumir.

## 1. Define o logótipo `Matrix` do Exercism

- Sê criativo! Ainda assim, também podes simplesmente copiar e colar a partir das instruções.

## 2. Define funções que fazem o logótipo franzir o sobrolho

- Lembra-te de que as funções cujo nome termina em `!` alteram o valor de entrada (modificam-no no local), enquanto as outras não o fazem.
- Podes implementar `frown!` através da atribuição de elementos específicos ou, de forma menos eficiente, através da troca de duas linhas.
- `frown` vai ser muito semelhante a `frown!`, só que devolve uma `copy` da matriz de entrada.

## 3. Constrói uma stickerwall

- Usa a tua função `frown()`.
- As funções `vcat()` e `hcat()`, ou os seus equivalentes, são as tuas amigas aqui.
- Repara que há uma linha de `1`s (ou seja, `X`s) que separa a metade de cima da metade de baixo.
- Podes usar a função `ones()` se quiseres, mas tem cuidado com a sua forma.

## 4. Converte os pontos em contagens de pixels por coluna

- O broadcasting ajuda-te a fazer isto de forma concisa.
- Para fazeres broadcasting, vais precisar de um vetor *linha* com as contagens de pontos por coluna.
- Para obteres um vetor com as contagens de pontos por coluna, podes aplicar uma função à `Matrix` com o `dims` especificado.

## 5. Renderiza uma matriz de pontos

- Os pontos (por exemplo, `1`, `2`, etc.) e os `0`s têm de ser convertidos em `"X"` e `" "`, respetivamente.
- Usar `eachrow()` para um ciclo interno pode ser útil aqui, mas não é obrigatório.
- A função `join()` também pode ajudar a tornar o código mais conciso e pode até ser usada com broadcasting.
