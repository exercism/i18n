# Fiebre por los monitores

Trabajas en una empresa de software llamada ABC Corp, que tiene 97 empleados. Sin embargo, el espacio de oficina que se acaba de alquilar solo tiene 65 cubículos. Todos los empleados quieren trabajar en la nueva oficina porque cada cubículo tiene monitores de última generación. El departamento de recursos humanos está desbordado con tantas solicitudes, así que, con la ayuda de su equipo de operaciones digitales, ha ideado un sistema de asignación de cubículos.

Han asignado un número a cada cubículo, del 1 al 65. Los empleados que quieran trabajar en la nueva oficina deben enviar sus solicitudes de asignación de cubículo antes de las 7:30 de la mañana de todos los días laborables. Cada empleado solo puede enviar una solicitud de asignación y cada solicitud puede contener un único número de cubículo.

## Enunciado del problema

El departamento de recursos humanos realiza las siguientes acciones para cada solicitud de asignación de cubículo:

- Si el cubículo solicitado está disponible, asígnalo a quien lo ha solicitado.
- Si el cubículo solicitado ya está asignado, rechaza la solicitud.

Eres la persona del equipo de operaciones digitales responsable de automatizar este proceso de asignación. La entrada es un `int[]` request que contiene todas las solicitudes enviadas por los empleados antes de las 7:30. Cada elemento del array representa un número de cubículo. Tu tarea es devolver un `int[]` con los números de los cubículos asignados. Después, ordena los números de los cubículos en orden ascendente.

## Restricciones

- 0 <= tamaño del array de entrada <= 97
- Cada elemento del array de entrada estará entre 1 y 65, ambos inclusive

## Ejemplo 1

- Entrada: `65 1 56`
- Salida: `1 56 65`

## Ejemplo 2

- Entrada: `5 6 18 56 18 8 1`
- Salida: `1 5 6 8 18 56`
- Explicación: hay dos solicitudes para el cubículo número 18
