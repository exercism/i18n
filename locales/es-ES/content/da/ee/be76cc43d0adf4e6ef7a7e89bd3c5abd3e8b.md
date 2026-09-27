# Instrucciones

La temporada de netball ha terminado y la clasificación decide quién juega las finales.

El esqueleto te da una clase `TEAM`. Escribe `FINALS_LADDER` debajo de ella.

## 1. ¿Quién está por encima de quién?

`higher` recibe dos equipos y devuelve si el primero va por encima del
segundo. Quien tiene más puntos va primero. Los equipos empatados a puntos se
separan por la diferencia de goles, y va primero el de mayor diferencia.

```sather
FINALS_LADDER::higher(#TEAM("Vixens", 24, 40), #TEAM("Magpies", 20, 90))
-- => true
```

## 2. La clasificación

`ladder` recibe los equipos en cualquier orden y los devuelve clasificados. El
array que se le pasa debe quedar tal y como estaba.

```sather
FINALS_LADDER::ladder(teams)
-- => the same teams, best first
```

## 3. Muestra la clasificación

`names` recibe un array de equipos y devuelve sus nombres unidos con `", "`.

```sather
FINALS_LADDER::names(FINALS_LADDER::ladder(teams))
-- => "Vixens, Magpies, Swifts"
```

## 4. Los primeros puestos

`premiers` recibe los equipos en cualquier orden y devuelve el nombre del
equipo que está en cabeza. Si no hay ningún equipo, la respuesta es `""`.

```sather
FINALS_LADDER::premiers(teams)
-- => "Vixens"
```

## 5. Un orden completamente distinto

`shortest_first` recibe un array de strings y los devuelve ordenados por
longitud, primero los más cortos. Los strings de la misma longitud van en
orden alfabético.

```sather
FINALS_LADDER::shortest_first(|"Magpies", "Vixens", "Swifts"|)
-- => "Swifts", "Vixens", "Magpies"
```

El desempate no es un adorno. La ordenación no es estable, así que sin él dos
nombres de la misma longitud podrían salir en cualquier orden.

Es la misma rutina de ordenación que la de la tarea 2, solo que se le pasa una
regla distinta. De eso trata el ejercicio.
