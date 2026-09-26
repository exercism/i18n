# Pistas

## General

## 1. Compra un auto a control remoto nuevo

- [Esta página muestra cómo crear una nueva instancia de una clase][creating-objects].

## 2. Muestra la distancia recorrida

- Lleva un registro de la distancia recorrida en un [campo][fields].
- Piensa qué visibilidad usar para el campo (¿necesita usarse fuera de la clase?).
- Considera usar [interpolación de string][string-interpolation] para dar formato al string que vas a devolver.

## 3. Muestra el porcentaje de batería

- Lleva un registro de la carga inicial de la batería en un [campo][fields].
- Inicializa el campo con un valor específico que corresponda a la carga inicial esperada de la batería.
- Piensa qué visibilidad usar para el campo (¿necesita usarse fuera de la clase?).
- Considera usar [interpolación de string][string-interpolation] para dar formato al string que vas a devolver.

## 4. Actualiza la cantidad de metros recorridos al conducir

- Actualiza el campo que representa la distancia recorrida.

## 5. Actualiza el porcentaje de batería al conducir

- Actualiza el campo que representa el porcentaje de batería.

## 6. Evita conducir cuando la batería esté agotada

- Agrega un condicional para actualizar la distancia y la batería solo si la batería aún no está agotada.
- Agrega un condicional para mostrar el mensaje de batería vacía si la batería está agotada.

[creating-objects]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/classes#creating-objects
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[string-interpolation]: https://christianfindlay.com/2019/10/04/c-string-interpolation/
