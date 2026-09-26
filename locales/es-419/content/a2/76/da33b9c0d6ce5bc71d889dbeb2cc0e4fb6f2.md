# Instrucciones

Vas a escribir un poco de código para ayudarte a cocinar una lasaña de tu libro de cocina favorito.

Tienes cinco tareas, todas relacionadas con cocinar tu receta.

## 1. Define el tiempo esperado en el horno, en minutos

Asigna a la variable `$Lasagna::ExpectedMinutesInOven` cuántos minutos debe estar la lasaña en el horno. Según el libro de cocina, el tiempo esperado en el horno, en minutos, es 40:

```perl
$Lasagna::ExpectedMinutesInOven
# => 40
```

## 2. Calcula el tiempo restante en el horno, en minutos

Modifica la subrutina `Lasagna::remaining_minutes_in_oven`, que recibe como argumento los minutos reales que la lasaña ha estado en el horno, para que devuelva cuántos minutos le quedan todavía a la lasaña en el horno, según el tiempo esperado en el horno, en minutos, de la tarea anterior.

```perl
Lasagna::remaining_minutes_in_oven(30)
# => 10
```

## 3. Calcula el tiempo de preparación en minutos

Modifica la subrutina `Lasagna::preparation_time_in_minutes`, que recibe como argumento el número de capas que le agregaste a la lasaña, para que devuelva cuántos minutos dedicaste a preparar la lasaña, suponiendo que cada capa te toma 2 minutos de preparación.

```perl
Lasagna::preparation_time_in_minutes(2)
# => 4
```

## 4. Calcula el tiempo total de trabajo en minutos

Modifica la subrutina `Lasagna::total_time_in_minutes`, que recibe dos argumentos: el primer argumento es el número de capas que le agregaste a la lasaña, y el segundo argumento es el número de minutos que la lasaña ha estado en el horno.
La subrutina debe devolver cuántos minutos en total has trabajado cocinando la lasaña, que es la suma del tiempo de preparación en minutos y el tiempo en minutos que la lasaña ha pasado en el horno hasta el momento.

```perl
Lasagna::total_time_in_minutes(3, 20)
# => 26
```

## 5. Crea una notificación de que la lasaña está lista

Modifica la subrutina `Lasagna::oven_alarm`, que no recibe ningún argumento, para que devuelva un mensaje que indique que la lasaña está lista para comer.

```perl
Lasagna::oven_alarm()
# => "Ding!"
```
