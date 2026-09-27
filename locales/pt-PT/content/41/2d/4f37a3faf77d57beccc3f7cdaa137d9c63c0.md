# Instruções

Elena é a nova gestora de qualidade de uma fábrica de jornais.
Como acabou de chegar à empresa, decidiu rever alguns dos processos da fábrica para ver o que podia ser melhorado.
Descobriu que os técnicos fazem muitos controlos de qualidade à mão. Vê aí uma boa oportunidade de automação e pede-te a ti, programador independente, que desenvolvas um software para monitorizar algumas das máquinas.

## 1. Verifica o nível de humidade da sala

A tua primeira missão é escrever um software para monitorizar o nível de humidade da sala de produção. Já existe um sensor ligado ao software da empresa que devolve periodicamente a percentagem de humidade da sala.

Precisas de implementar uma função no software que lance um erro se a percentagem de humidade for demasiado alta.
Se a humidade estiver num nível aceitável, é adicionado um log de Info.
A função deve chamar-se `humiditycheck` e receber a percentagem de humidade como argumento.

Deves parar com uma `ErrorException` (a mensagem exata não é importante, mas tem de conter o nível de humidade medido) se a percentagem exceder 70%.
Caso contrário, adiciona um log de Info com a mensagem `"humidity level check passed: h%"`, em que `h` é a percentagem de humidade.

```julia-repl
julia> humiditycheck(60)
[ Info: humidity level check passed: 60%
```

```julia-repl
julia> humiditycheck(100)
ERROR: humidity check failed: 100%
```

## 2. Verifica o sobreaquecimento

A Elena ficou muito satisfeita com a tua primeira tarefa e pede-te que trates da monitorização da temperatura das máquinas.
Enquanto conversas com um técnico, o Greg, ele diz-te que, se a temperatura de uma máquina exceder 500°C, os técnicos começam a preocupar-se com o sobreaquecimento.

A máquina está equipada com um sensor que mede a sua temperatura interna.
Deves saber que o sensor é muito sensível e avaria com frequência.
Nesse caso, os técnicos terão de o substituir.

A tua tarefa é implementar uma função `temperaturecheck` que recebe a temperatura como argumento e ou adiciona um log se estiver tudo bem, ou lança um erro se o sensor estiver avariado ou se a máquina começar a sobreaquecer.
Sabendo que mais tarde vais precisar de reagir de forma diferente consoante o erro, precisas de um mecanismo para distinguir os dois tipos de erros.

- Se o sensor estiver avariado, a temperatura será `nothing`.
  Nesse caso, deves parar com um `ArgumentError` (a mensagem não é importante).
- Quando o sensor está a funcionar, se a temperatura exceder 500°C, deves lançar um `DomainError` que inclua a temperatura medida.
- Caso contrário, está tudo bem, por isso adiciona um log de Info com a mensagem `"temperature check passed: t °C"`, em que `t` é a temperatura.

```julia-repl
julia> temperaturecheck(nothing)
ERROR: ArgumentError: sensor is broken

julia> temperaturecheck(800)
ERROR: DomainError with 800:
"overheating detected"

julia> temperaturecheck(500)
[ Info: temperature check passed: 500 °C
```

## 3. Define um erro personalizado

Para a próxima tarefa, vais precisar de definir um erro mais geral, que abranja todos os casos.
Os detalhes da implementação não são importantes, desde que seja um erro e o nome seja `MachineError`.
Podes incluir campos e mensagens como achares útil.

## 4. Monitoriza a máquina

Agora que a tua máquina consegue detetar erros e tens um erro de máquina personalizado, adicionas uma função de encapsulamento que consegue reportar como está tudo a funcionar.
Além de devolver os logs das funções anteriores, esta função de encapsulamento também terá de adicionar logs consoante os tipos de falhas que ocorram.

- Verifica a humidade e a temperatura.
- Se a verificação da humidade lançar uma `ErrorException`, deve ser adicionado um log de Error com a mensagem `"humidity level check failed: h%"`, em que `h` é a percentagem de humidade.
- Se a verificação da temperatura lançar um `ArgumentError`, deve ser adicionado um log de Warn com a mensagem `"sensor is broken"`.
- Se a verificação da temperatura lançar um `DomainError`, deve ser adicionado um log de Error com a mensagem `"overheating detected: t °C"`, em que `t` é a temperatura.
- Se uma das verificações falhar, ou as duas, deve ser lançado um único `MachineError` depois de os logs serem adicionados.
- Se estiver tudo bem, só serão adicionados os logs de `humiditycheck` e `temperaturecheck`.

Implementa uma função `machinemonitor()` que recebe a humidade e a temperatura como argumentos.

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
