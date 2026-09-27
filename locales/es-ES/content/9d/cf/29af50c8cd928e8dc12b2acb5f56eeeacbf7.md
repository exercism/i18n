# Instrucciones

En este ejercicio vas a escribir algo de código para ayudarte a cocinar una lasaña excelente con tu libro de cocina favorito.

Tienes tres tareas, todas relacionadas con el tiempo empleado en cocinar la lasaña.

## 1. Define el tiempo esperado en el horno en minutos

Define `expectedMinutesInOven` para calcular cuántos minutos debe estar la lasaña en el horno. Según el libro de cocina, el tiempo esperado en el horno en minutos es 40:

```elm
expectedMinutesInOven
    --> 40
```

## 2. Calcula el tiempo de preparación en minutos

Define `preparationTimeInMinutes`, que toma el número de capas de la lasaña como parámetro y devuelve cuántos minutos se tarda en preparar la lasaña, suponiendo que cada capa tarda 2 minutos en prepararse.

```elm
preparationTimeInMinutes 3
    --> 6
```

## 3. Calcula el tiempo transcurrido en minutos

Define la función `elapsedTimeInMinutes`, que toma dos parámetros: el primer parámetro es el número de capas de la lasaña, y el segundo parámetro es el número de minutos que la lasaña lleva en el horno. La función debe devolver cuántos minutos has trabajado en cocinar la lasaña, que es la suma del tiempo de preparación en minutos y el tiempo en minutos que la lasaña ha pasado en el horno en ese momento.

```elm
elapsedTimeInMinutes 3 20
    --> 26
```
