# Instrucciones

La temporada de netball terminó y la tabla de posiciones decide quién juega las finales.

El stub te da una clase `TEAM`. Escribe `FINALS_LADDER` debajo de ella.

## 1. ¿Quién va por encima de quién?

`higher` recibe dos equipos y devuelve si el primero va por encima del segundo. El que tiene más puntos va primero. Cuando dos equipos tienen los mismos puntos, se separan por diferencia de goles y va primero el de mayor diferencia.

```sather
FINALS_LADDER::higher(#TEAM("Vixens", 24, 40), #TEAM("Magpies", 20, 90))
-- => true
```

## 2. La tabla de posiciones

`ladder` recibe los equipos en cualquier orden y los devuelve ordenados. El array que se le pasa debe quedar tal como estaba.

```sather
FINALS_LADDER::ladder(teams)
-- => the same teams, best first
```

## 3. Muestra la tabla

`names` recibe un array de equipos y devuelve sus nombres unidos con `", "`.

```sather
FINALS_LADDER::names(FINALS_LADDER::ladder(teams))
-- => "Vixens, Magpies, Swifts"
```

## 4. Los campeones

`premiers` recibe los equipos en cualquier orden y devuelve el nombre del equipo que está arriba. Si no hay ningún equipo, la respuesta es `""`.

```sather
FINALS_LADDER::premiers(teams)
-- => "Vixens"
```

## 5. Un orden completamente distinto

`shortest_first` recibe un array de strings y los devuelve ordenados por longitud, del más corto al más largo. Los strings de la misma longitud van en orden alfabético.

```sather
FINALS_LADDER::shortest_first(|"Magpies", "Vixens", "Swifts"|)
-- => "Swifts", "Vixens", "Magpies"
```

El desempate no es un adorno. La ordenación no es estable, así que sin él dos nombres de la misma longitud podrían quedar en cualquier orden.

Esta es la misma rutina de ordenación que en la tarea 2, pero con una regla distinta. Ese es el punto del ejercicio.
