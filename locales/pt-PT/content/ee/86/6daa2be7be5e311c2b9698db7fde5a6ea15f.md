# método demasiado longo

Considera dividir o(s) seguinte(s) método(s) em chamadas a outros métodos semanticamente significativos: `%{methodNames}`

O método tem mais linhas de código do que aquilo que este exercício costuma exigir.
Isto pode ser aceitável, mas pode ser sinal de que o método está a fazer demasiado trabalho diretamente e que deveria delegar parte desse trabalho noutros métodos.
Tenta manter tudo dentro de um método no mesmo nível de abstração.
Por exemplo, iterar pelos elementos de um ciclo pode estar num método, enquanto manipular cada elemento individual pode estar noutro.
