# Fluxo de trabalho quando não há alterações a ficheiros importantes

Quando um PR de um percurso que afeta um exercício é integrado, desencadeia o novo teste de _todas_ as últimas iterações publicadas das soluções dos estudantes.
Para exercícios populares, é uma operação _muito_ dispendiosa (70 000 execuções de testes no Hello World de Python, num caso extremo!).

Este fluxo de trabalho verifica se as alterações de um PR iriam desencadear o novo teste das soluções e, em caso afirmativo, acrescenta um comentário a explicar o risco de integrar o PR _tal como está_.
Explica também como integrar o PR sem voltar a testar as soluções.

Para mais informações, consulta a documentação [Evitar desencadear execuções de testes desnecessárias](https://exercism.org/docs/building/tracks#h-avoiding-triggering-unnecessary-test-runs).

## Origem

O fluxo de trabalho está definido no ficheiro `.github/workflows/no-important-files-changed.yml`.
