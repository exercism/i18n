# Instruções

Neste exercício vais escrever código para analisar a produção de uma linha de montagem numa fábrica de automóveis.
A velocidade da linha de montagem pode variar entre `0` (desligada) e `10` (máxima).

À sua velocidade mais lenta (`1`), são produzidos `221` carros por hora.
A produção aumenta linearmente com a velocidade.
Por isso, com a velocidade definida como `4`, a linha deve produzir `4 * 221 = 884` carros por hora.
No entanto, velocidades mais altas aumentam a probabilidade de se produzirem carros com defeito, que depois têm de ser descartados.
A tabela seguinte mostra como a velocidade influencia a taxa de sucesso:

- `1` a `4`: 100% de taxa de sucesso.
- `5` a `8`: 90% de taxa de sucesso.
- `9`: 80% de taxa de sucesso.
- `10`: 77% de taxa de sucesso.

Tens duas tarefas.

## 1. Calcula a taxa de produção por hora

Calcula a taxa de produção da linha de montagem por hora, tendo em conta a taxa de sucesso.

## 2. Calcula o número de carros funcionais produzidos por minuto

Calcula quantos **carros completos e funcionais** são produzidos por minuto.
