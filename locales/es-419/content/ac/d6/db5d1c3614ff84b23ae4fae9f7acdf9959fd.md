# Fiebre de monitores

Trabajas en ABC Corp, una empresa de software con 97 empleados. Sin embargo, el espacio de oficinas que acaban de alquilar solo tiene 65 cubículos. Todos los empleados quieren trabajar en la nueva oficina porque cada cubículo tiene monitores de última generación. El departamento de Recursos Humanos está desbordado con tantas solicitudes, así que, con la ayuda de su equipo de operaciones digitales, ideó un sistema de asignación de cubículos.

Asignaron un número a cada cubículo, del 1 al 65. Los empleados que quieran trabajar en la nueva oficina deben enviar solicitudes de asignación de cubículos antes de las 7:30 a. m. de cada día hábil. Un empleado solo puede enviar una solicitud de asignación. Cada solicitud puede contener un solo número de cubículo.

## Planteamiento del problema

El departamento de Recursos Humanos toma las siguientes acciones para cada solicitud de asignación de cubículo:

- Si el cubículo solicitado está disponible, se lo asigna a quien lo solicitó.
- Si el cubículo solicitado ya está asignado, rechaza la solicitud.

Eres quien, en el equipo de operaciones digitales, se encarga de automatizar este proceso de asignación. La entrada es un `int[]` request que contiene todas las solicitudes que los empleados enviaron antes de las 7:30 a. m. Cada elemento del array representa un número de cubículo. Tu tarea es devolver un `int[]` con los números de los cubículos que se asignaron. Luego, ordena los números de los cubículos de forma ascendente.

## Restricciones

- 0 <= Tamaño del array de entrada <= 97
- Cada elemento del array de entrada estará entre 1 y 65, inclusive

## Ejemplo 1

- Entrada: `65 1 56`
- Salida: `1 56 65`

## Ejemplo 2

- Entrada: `5 6 18 56 18 8 1`
- Salida: `1 5 6 8 18 56`
- Explicación: Hay dos solicitudes para el cubículo número 18
