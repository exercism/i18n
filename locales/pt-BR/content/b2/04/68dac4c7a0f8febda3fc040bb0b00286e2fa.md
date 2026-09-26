# Instruções

Neste exercício, você vai escrever código para analisar a produção de uma linha de montagem em uma fábrica de carros.
A velocidade da linha de montagem pode variar de `0` (desligada) a `10` (máxima).

Na velocidade mais lenta (`1`), são produzidos `221` carros por hora.
A produção aumenta linearmente com a velocidade.
Então, com a velocidade definida como `4`, ela deve produzir `4 * 221 = 884` carros por hora.
No entanto, velocidades mais altas aumentam a chance de carros com defeito serem produzidos, que depois precisam ser descartados.
A tabela a seguir mostra como a velocidade influencia a taxa de sucesso:

- `1` a `4`: taxa de sucesso de 100%.
- `5` a `8`: taxa de sucesso de 90%.
- `9`: taxa de sucesso de 80%.
- `10`: taxa de sucesso de 77%.

Você tem duas tarefas.

## 1. Calcule a taxa de produção por hora

Calcule a taxa de produção da linha de montagem por hora, levando em conta a taxa de sucesso.

## 2. Calcule o número de itens funcionais produzidos por minuto

Calcule quantos **carros prontos e em funcionamento** são produzidos por minuto.
