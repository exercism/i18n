# Dicas

A introdução contém a maior parte do que é necessário para este exercício.
A tarefa 5 (renderização) pode ser feita antes para ajudar na visualização, mas cuidado para levar em conta os diferentes valores possíveis dos pontos.

## 1. Defina o logo `Matrix` do Exercism

- Solte a criatividade! Mas você também pode simplesmente copiar e colar das instruções.

## 2. Defina funções que fazem o logo franzir a testa

- Lembre-se de que funções que terminam em `!` mutam a entrada (modificam no lugar), enquanto as outras não.
- `frown!` pode ser feita atribuindo elementos específicos ou (de forma menos eficiente) trocando duas linhas.
- `frown` vai ser muito parecida com `frown!`, só que retornando uma `copy` da matriz de entrada.

## 3. Monte um mural de adesivos

- Use sua função `frown()`.
- As funções `vcat()` e `hcat()`, ou seus equivalentes, são suas aliadas aqui.
- Repare que há uma linha de `1`s (ou seja, `X`s) separando a metade de cima da metade de baixo.
- A função `ones()` pode ser usada se você quiser, mas cuidado com o formato dela.

## 4. Mude os pontos para contagens de pixels por coluna

- O broadcasting é uma ótima forma de fazer isso de maneira concisa.
- Para fazer broadcasting, você vai precisar de um vetor *linha* com as contagens de pontos por coluna.
- Para obter um vetor com as contagens de pontos por coluna, você pode aplicar uma função à `Matrix` com o `dims` especificado.

## 5. Renderize uma matriz de pontos

- Os pontos (por exemplo, `1`, `2`, etc.) e os `0`s precisam ser trocados por `"X"` e `" "`, respectivamente.
- Usar `eachrow()` para um laço interno pode ser útil aqui, mas não é necessário.
- A função `join()` também pode ajudar a deixar as coisas mais concisas e até poderia ser usada com broadcasting.
