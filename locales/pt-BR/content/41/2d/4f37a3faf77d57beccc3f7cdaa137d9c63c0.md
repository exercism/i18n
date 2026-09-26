# Instruções

Elena é a nova gerente de qualidade de uma fábrica de jornais. Como acabou de chegar à empresa, decidiu revisar alguns dos processos da fábrica para ver o que pode ser melhorado. Ela descobriu que os técnicos fazem muitos controles de qualidade à mão. Ela percebe uma boa oportunidade de automação e pede a você, um desenvolvedor freelancer, que crie um software para monitorar algumas das máquinas.

## 1. Verifique o nível de umidade da sala

Sua primeira missão é escrever um software para monitorar o nível de umidade da sala de produção. Já existe um sensor conectado ao software da empresa que retorna periodicamente a porcentagem de umidade da sala.

Você precisa implementar, no software, uma função que lance um erro se a porcentagem de umidade estiver alta demais.
Se a umidade estiver em um nível aceitável, um log Info será adicionado.
A função deve se chamar `humiditycheck` e receber a porcentagem de umidade como argumento.

Você deve interromper com um ErrorException (a mensagem exata não importa, mas precisa conter o nível de umidade medido) se a porcentagem passar de 70%.
Caso contrário, adicione um log Info com a mensagem `"humidity level check passed: h%"`, em que `h` é a porcentagem de umidade.

```julia-repl
julia> humiditycheck(60)
[ Info: humidity level check passed: 60%
```

```julia-repl
julia> humiditycheck(100)
ERROR: humidity check failed: 100%
```

## 2. Verifique se há superaquecimento

Elena ficou muito satisfeita com sua primeira tarefa e pede que você cuide do monitoramento da temperatura das máquinas.
Enquanto conversa com um técnico, Greg, você fica sabendo que, se a temperatura de uma máquina passar de 500°C, os técnicos começam a se preocupar com superaquecimento.

A máquina é equipada com um sensor que mede sua temperatura interna.
Você deve saber que o sensor é muito sensível e quebra com frequência.
Nesse caso, os técnicos precisam trocá-lo.

Sua tarefa é implementar uma função `temperaturecheck` que recebe a temperatura como argumento e ou adiciona um log, se estiver tudo bem, ou lança um erro, se o sensor estiver quebrado ou se a máquina começar a superaquecer.
Sabendo que depois você vai precisar reagir de forma diferente dependendo do erro, você precisa de um mecanismo para diferenciar os dois tipos de erro.

- Se o sensor estiver quebrado, a temperatura será `nothing`.
  Nesse caso, você deve interromper com um `ArgumentError` (a mensagem não importa).
- Quando o sensor estiver funcionando, se a temperatura passar de 500°C, você deve lançar um `DomainError` que inclua a temperatura medida.
- Caso contrário, está tudo bem, então adicione um log Info com a mensagem `"temperature check passed: t °C"`, em que `t` é a temperatura.

```julia-repl
julia> temperaturecheck(nothing)
ERROR: ArgumentError: sensor is broken

julia> temperaturecheck(800)
ERROR: DomainError with 800:
"overheating detected"

julia> temperaturecheck(500)
[ Info: temperature check passed: 500 °C
```

## 3. Defina um erro personalizado

Para a próxima tarefa, você vai precisar definir um erro mais geral, que sirva para qualquer caso.
Os detalhes de implementação não importam, desde que seja um erro e que o nome seja `MachineError`.
Fique à vontade para incluir campos e mensagens que você achar úteis.

## 4. Monitore a máquina

Agora que sua máquina consegue detectar erros e você tem um erro de máquina personalizado, você adiciona uma função wrapper capaz de relatar como tudo está funcionando.
Além de retornar os logs das funções anteriores, essa wrapper também vai precisar adicionar logs dependendo de quais tipos de falha ocorrerem.

- Verifique a umidade e a temperatura.
- Se a verificação de umidade lançar um `ErrorException`, um log Error deve ser adicionado com a mensagem `"humidity level check failed: h%"`, em que `h` é a porcentagem de umidade.
- Se a verificação de temperatura lançar um `ArgumentError`, um log Warn deve ser adicionado com a mensagem `"sensor is broken"`.
- Se a verificação de temperatura lançar um `DomainError`, um log Error deve ser adicionado com a mensagem `"overheating detected: t °C"`, em que `t` é a temperatura.
- Se uma das verificações falhar, ou as duas, um único `MachineError` deve ser lançado depois que os logs forem adicionados.
- Se estiver tudo bem, apenas os logs de `humiditycheck` e `temperaturecheck` serão adicionados.

Implemente uma função `machinemonitor()` que recebe a umidade e a temperatura como argumentos.

```julia-repl
julia> machinemonitor(42, 450)
[ Info: humidity level check passed: 42%
[ Info: temperature check passed: 450 °C

julia> machinemonitor(42, 550)
[ Info: humidity level check passed: 42%
┌ Error: overheating detected: 550 °C
└ @ Main # output truncated

Error: MachineError

julia> machinemonitor(82, 521)
┌ Error: humidity level check failed: 82%
└ @ Main # output truncated
┌ Error: overheating detected: 521 °C
└ @ Main # output truncated

Error: MachineError

julia> machinemonitor(42, nothing)
[ Info: humidity level check passed: 42%
┌ Warning: sensor is broken
└ @ Main # output truncated

Error: MachineError
```
