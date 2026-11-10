# Instructions

Elena es la nueva responsable de calidad de una fábrica de periódicos.
Como acaba de llegar a la empresa, ha decidido revisar algunos de los procesos de la fábrica para ver qué se puede mejorar.
Ha descubierto que los técnicos hacen muchos controles de calidad a mano. Ve que hay una buena oportunidad para la automatización y te pide a ti, desarrollador freelance, que desarrolles un programa para monitorizar algunas de las máquinas.

## 1. Comprobar el nivel de humedad de la sala

Tu primera misión es escribir un programa para monitorizar el nivel de humedad de la sala de producción. Ya hay un sensor conectado al software de la empresa que devuelve periódicamente el porcentaje de humedad de la sala.

Tienes que implementar una función en el software que lance un error si el porcentaje de humedad es demasiado alto.
Si la humedad está en un nivel aceptable, se añadirá un registro de información.
La función debe llamarse `humiditycheck` y recibir el porcentaje de humedad como argumento.

Debes detenerte con una `ErrorException` (el mensaje exacto no es importante, pero debe contener el nivel de humedad medido) si el porcentaje supera el 70 %.
En caso contrario, añade un registro de información con el mensaje `"humidity level check passed: h%"`, donde `h` es el porcentaje de humedad.

```julia-repl
julia> humiditycheck(60)
[ Info: humidity level check passed: 60%
```

```julia-repl
julia> humiditycheck(100)
ERROR: humidity check failed: 100%
```

## 2. Comprobar el sobrecalentamiento

Elena está muy contenta con tu primera tarea y te pide que te encargues de monitorizar la temperatura de las máquinas.
Mientras charlas con un técnico, Greg, te cuenta que si la temperatura de una máquina supera los 500 °C, los técnicos empiezan a preocuparse por el sobrecalentamiento.

La máquina está equipada con un sensor que mide su temperatura interna.
Debes saber que el sensor es muy sensible y se rompe a menudo.
En ese caso, los técnicos tendrán que cambiarlo.

Tu trabajo es implementar una función `temperaturecheck` que reciba la temperatura como argumento y que añada un registro si todo va bien o lance un error si el sensor está roto o si la máquina empieza a sobrecalentarse.
Sabiendo que más adelante tendrás que reaccionar de forma distinta según el error, necesitas un mecanismo para diferenciar los dos tipos de errores.

- Si el sensor está roto, la temperatura será `nothing`.
  En ese caso, debes detenerte con un `ArgumentError` (el mensaje no es importante).
- Cuando el sensor funciona, si la temperatura supera los 500 °C, debes lanzar un `DomainError` que incluya la temperatura medida.
- En caso contrario, todo va bien, así que añade un registro de información con el mensaje `"temperature check passed: t °C"`, donde `t` es la temperatura.

```julia-repl
julia> temperaturecheck(nothing)
ERROR: ArgumentError: sensor is broken

julia> temperaturecheck(800)
ERROR: DomainError with 800:
"overheating detected"

julia> temperaturecheck(500)
[ Info: temperature check passed: 500 °C
```

## 3. Definir un error personalizado

Para la siguiente tarea, tendrás que definir un error más general que sirva para todo.
Los detalles de implementación no son importantes más allá de que sea un error y de que se llame `MachineError`.
Puedes incluir los campos y mensajes que te resulten útiles.

## 4. Monitorizar la máquina

Ahora que tu máquina puede detectar errores y tienes un error de máquina personalizado, añades una función envoltorio que pueda informar de cómo funciona todo.
Además de devolver los registros de las funciones anteriores, este envoltorio también tendrá que añadir registros según el tipo o los tipos de fallos que se produzcan.

- Comprueba la humedad y la temperatura.
- Si la comprobación de humedad lanza una `ErrorException`, se debe añadir un registro de error con el mensaje `"humidity level check failed: h%"`, donde `h` es el porcentaje de humedad.
- Si la comprobación de temperatura lanza un `ArgumentError`, se debe añadir un registro de advertencia con el mensaje `"sensor is broken"`.
- Si la comprobación de temperatura lanza un `DomainError`, se debe añadir un registro de error con el mensaje `"overheating detected: t °C"`, donde `t` es la temperatura.
- Si falla una de las comprobaciones o ambas, se debe lanzar un único `MachineError` después de añadir los registros.
- Si todo va bien, solo se añadirán los registros de `humiditycheck` y `temperaturecheck`.

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
