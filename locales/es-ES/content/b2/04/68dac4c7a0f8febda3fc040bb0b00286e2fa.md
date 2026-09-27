# Instrucciones

En este ejercicio vas a escribir código para analizar la producción de una cadena de montaje en una fábrica de coches.
La velocidad de la cadena de montaje puede ir desde `0` (apagada) hasta `10` (máxima).

A su velocidad más lenta (`1`), se producen `221` coches cada hora.
La producción aumenta linealmente con la velocidad.
Así, con la velocidad ajustada a `4`, debería producir `4 * 221 = 884` coches por hora.
Sin embargo, las velocidades más altas aumentan la probabilidad de que se produzcan coches defectuosos, que después hay que desechar.
La siguiente tabla muestra cómo influye la velocidad en la tasa de éxito:

- De `1` a `4`: tasa de éxito del 100 %.
- De `5` a `8`: tasa de éxito del 90 %.
- `9`: tasa de éxito del 80 %.
- `10`: tasa de éxito del 77 %.

Tienes dos tareas.

## 1. Calcula el ritmo de producción por hora

Calcula el ritmo de producción por hora de la cadena de montaje, teniendo en cuenta su tasa de éxito.

## 2. Calcula el número de unidades en buen estado producidas por minuto

Calcula cuántos **coches terminados y en buen estado** se producen por minuto.
