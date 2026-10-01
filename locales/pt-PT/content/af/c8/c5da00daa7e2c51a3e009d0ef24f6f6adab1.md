# Testes

Precisas de ter o [Godot instalado][installation] corretamente para usar o executor de testes.

## Executar os testes

O [executor de testes][test runner] é usado para carregar e testar soluções.
Quando descarregas um exercício localmente, é incluída uma cópia do executor de testes, juntamente com um script de shell para o invocar.

Para executar o exercício, basta executares o script `./run_tests` no diretório do exercício.

Por exemplo,

```bash
cd "$(exercism workspace)/gdscript/hello-world"
./run_tests
```

[installation]: https://exercism.org/docs/tracks/gdscript/installation
[test runner]: https://raw.githubusercontent.com/exercism/gdscript-test-runner/refs/heads/main/bin/test_runner.gd
