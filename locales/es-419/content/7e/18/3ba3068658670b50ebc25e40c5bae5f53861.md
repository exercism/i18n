# Instrucciones

Elena es la nueva gerente de calidad de una fábrica de periódicos.
Como acaba de llegar a la empresa, ha decidido revisar algunos de los procesos de la fábrica para ver qué se podría mejorar.
Descubrió que los técnicos hacen muchos controles de calidad a mano. Ve una buena oportunidad para automatizar y te pide a ti, desarrollador freelance, que crees un programa para monitorear algunas de las máquinas.

## 1. Verifica el nivel de humedad de la sala

Tu primera misión es escribir un programa que monitoree el nivel de humedad de la sala de producción. Ya hay un sensor conectado al software de la empresa que devuelve periódicamente el porcentaje de humedad de la sala.

Necesitas implementar una función en el software que lance un error si el porcentaje de humedad es demasiado alto.
Si la humedad está en un nivel aceptable, se agregará un log de Info.
La función debe llamarse `humiditycheck` y recibir el porcentaje de humedad como argumento.

Debes detenerte con una `ErrorException` (el mensaje exacto no importa, pero debe contener el nivel de humedad medido) si el porcentaje supera el 70%.
De lo contrario, agrega un log de Info con el mensaje `"humidity level check passed: h%"`, donde `h` es el porcentaje de humedad.

```julia-repl
julia> humiditycheck(60)
[ Info: humidity level check passed: 60%
```

```julia-repl
julia> humiditycheck(100)
ERROR: humidity check failed: 100%
```

## 2. Verifica el sobrecalentamiento

Elena está muy contenta con tu primera tarea y te pide que te encargues de monitorear la temperatura de las máquinas.
Mientras charlas con un técnico, Greg, este te cuenta que si la temperatura de una máquina supera los 500°C, los técnicos empiezan a preocuparse por el sobrecalentamiento.

La máquina está equipada con un sensor que mide su temperatura interna.
Debes saber que el sensor es muy sensible y se rompe con frecuencia.
En ese caso, los técnicos tendrán que cambiarlo.

Tu trabajo es implementar una función `temperaturecheck` que reciba la temperatura como argumento y que agregue un log si todo está bien, o lance un error si el sensor está roto o si la máquina empieza a sobrecalentarse.
Como más adelante necesitarás reaccionar de forma distinta según el error, necesitas un mecanismo que te permita diferenciar los dos tipos de errores.

- Si el sensor está roto, la temperatura será `nothing`.
  En ese caso, debes detenerte con un `ArgumentError` (el mensaje no importa).
- Cuando el sensor funciona, si la temperatura supera los 500°C, debes lanzar un `DomainError` que incluya la temperatura medida.
- De lo contrario, todo está bien, así que agrega un log de Info con el mensaje `"temperature check passed: t °C"`, donde `t` es la temperatura.

```julia-repl
julia> temperaturecheck(nothing)
ERROR: ArgumentError: sensor is broken

julia> temperaturecheck(800)
ERROR: DomainError with 800:
"overheating detected"

julia> temperaturecheck(500)
[ Info: temperature check passed: 500 °C
```

## 3. Define un error personalizado

Para la siguiente tarea, necesitarás definir un error más general que abarque todo.
Los detalles de implementación no importan más allá de que sea un error y de que su nombre sea `MachineError`.
Puedes incluir campos y mensajes como te resulte útil.

## 4. Monitorea la máquina

Ahora que tu máquina puede detectar errores y tienes un error de máquina personalizado, agrega una función contenedora que informe cómo funciona todo.
Además de devolver los logs de las funciones anteriores, esta función contenedora también tendrá que agregar logs según los tipos de fallos que ocurran.

- Verifica la humedad y la temperatura.
- Si la verificación de humedad lanza una `ErrorException`, se debe agregar un log de Error con el mensaje `"humidity level check failed: h%"`, donde `h` es el porcentaje de humedad.
- Si la verificación de temperatura lanza un `ArgumentError`, se debe agregar un log de Warn con el mensaje `"sensor is broken"`.
- Si la verificación de temperatura lanza un `DomainError`, se debe agregar un log de Error con el mensaje `"overheating detected: t °C"`, donde `t` es la temperatura.
- Si una de las verificaciones falla o fallan ambas, se debe lanzar un único `MachineError` después de agregar los logs.
- Si todo está bien, solo se agregarán los logs de `humiditycheck` y `temperaturecheck`.

Implementa una función `machinemonitor()` que reciba la humedad y la temperatura como argumentos.

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
