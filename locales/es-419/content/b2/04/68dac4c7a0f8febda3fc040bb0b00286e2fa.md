# Instrucciones

En este ejercicio vas a escribir código para analizar la producción de una línea de ensamblaje en una fábrica de autos.
La velocidad de la línea de ensamblaje puede ir de `0` (apagada) a `10` (máxima).

A su velocidad más lenta (`1`), se producen `221` autos cada hora.
La producción aumenta de forma lineal con la velocidad.
Así que con la velocidad en `4`, debería producir `4 * 221 = 884` autos por hora.
Sin embargo, las velocidades más altas aumentan la probabilidad de que se produzcan autos defectuosos, que después hay que descartar.
La siguiente tabla muestra cómo influye la velocidad en la tasa de éxito:

- `1` a `4`: 100 % de tasa de éxito.
- `5` a `8`: 90 % de tasa de éxito.
- `9`: 80 % de tasa de éxito.
- `10`: 77 % de tasa de éxito.

Tienes dos tareas.

## 1. Calcula la tasa de producción por hora

Calcula la tasa de producción por hora de la línea de ensamblaje, teniendo en cuenta su tasa de éxito.

## 2. Calcula la cantidad de unidades funcionales producidas por minuto

Calcula cuántos **autos completos y funcionales** se producen por minuto.
