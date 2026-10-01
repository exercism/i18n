# Testes

Você vai precisar do [Godot instalado][installation] corretamente para usar o executor de testes.

## Rodando os testes

O [executor de testes][test runner] é usado para carregar e testar soluções.
Quando um exercício é baixado localmente, uma cópia do executor de testes é incluída, junto com um script de shell para executá-lo.

Para rodar o exercício, basta rodar o script `./run_tests` no diretório do exercício.

Por exemplo,

```bash
cd "$(exercism workspace)/gdscript/hello-world"
./run_tests
```

[installation]: https://exercism.org/docs/tracks/gdscript/installation
[test runner]: https://raw.githubusercontent.com/exercism/gdscript-test-runner/refs/heads/main/bin/test_runner.gd
