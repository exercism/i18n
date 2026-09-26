# Fluxo de trabalho de nenhum arquivo importante alterado

Quando um PR de trilha que mexe em um exercício é mesclado, isso dispara o reteste de _todas_ as iterações publicadas mais recentes das soluções dos estudantes.
Para exercícios populares, essa é uma operação _muito_ cara (70.000 execuções de teste para o Olá, Mundo em Python, no caso extremo!).

Este fluxo de trabalho verifica se as mudanças de um PR disparariam o reteste das soluções e, se disparassem, adiciona um comentário explicando o risco de mesclar o PR _do jeito que está_.
Ele também explica como mesclar o PR sem retestar as soluções.

Para mais informações, consulte a documentação [Como evitar disparar execuções de teste desnecessárias](https://exercism.org/docs/building/tracks#h-avoiding-triggering-unnecessary-test-runs).

## Fonte

O fluxo de trabalho está definido no arquivo `.github/workflows/no-important-files-changed.yml`.
