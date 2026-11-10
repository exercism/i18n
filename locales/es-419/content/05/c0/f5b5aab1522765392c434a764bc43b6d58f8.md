# Instrucciones

Tu amiga Li Mei tiene un bar de jugos donde vende deliciosos jugos de frutas mixtas.
Eres cliente frecuente de su local y te diste cuenta de que podrías hacerle la vida más fácil a tu amiga.
Decides usar tus habilidades de programación para ayudarle a Li Mei con su trabajo.

## 1. Determina cuánto se tarda en preparar un jugo

A Li Mei le gusta decirles a sus clientes de antemano cuánto tendrán que esperar por un jugo del menú que pidieron.
Le cuesta recordar los números exactos porque el tiempo que se tarda en preparar los jugos varía.
`"Pure Strawberry Joy"` tarda 0.5 minutos, `"Energizer"` y `"Green Garden"` tardan 1.5 minutos cada uno, `"Tropical Island"` tarda 3 minutos y `"All or Nothing"` tarda 5 minutos.
Para todas las demás bebidas (por ejemplo, ofertas especiales) puedes asumir un tiempo de preparación de 2.5 minutos.

Para ayudar a tu amiga, escribe una función `time_to_mix_juice` que reciba un jugo del menú como argumento y devuelva la cantidad de minutos que se tarda en preparar esa bebida.

```julia-repl
julia> time_to_mix_juice("Tropical Island")
3

julia> time_to_mix_juice("Berries & Lime")
2.5
```

## 2. Repón el suministro de gajos de lima

Muchas de las creaciones de Li Mei incluyen gajos de lima, ya sea como ingrediente o como parte de la decoración.
Así que cuando empieza su turno por la mañana, necesita asegurarse de que el recipiente de gajos de lima esté lleno para el resto del día.

Implementa la función `limes_to_cut`, que recibe la cantidad de gajos de lima que Li Mei necesita cortar y un array que representa el suministro de limas enteras que tiene a la mano.
Puede obtener 6 gajos de una lima `"small"`, 8 gajos de una lima `"medium"` y 10 de una lima `"large"`.
Siempre corta las limas en el orden en que aparecen en el array, empezando por el primer elemento.
Sigue cortando hasta alcanzar la cantidad de gajos que necesita o hasta que se le acaben las limas.

A Li Mei le gustaría saber de antemano cuántas limas necesita cortar.
La función `limes_to_cut` debe devolver la cantidad de limas que hay que cortar.

```julia-repl
julia> limes_to_cut(25, ["small", "small", "large", "medium", "small"])
4
```

## 3. Enumera los tiempos de preparación de cada pedido en la cola

A Li Mei le gusta llevar un registro de cuánto tardará en preparar los pedidos que los clientes están esperando.

Implementa la función `order_times`, que recibe una cola de pedidos y devuelve un vector con los tiempos de preparación.

```julia-repl
julia> order_times(["Energizer", "Tropical Island"])
[1.5, 3.0]
```

## 4. Termina el turno

Li Mei siempre trabaja hasta las 3 de la tarde.
Después, su empleado Dmitry toma el relevo.
A menudo hay bebidas que se pidieron pero que aún no están preparadas cuando termina el turno de Li Mei.
Dmitry se encarga entonces de preparar los jugos que quedan.

Para que el cambio de turno sea más fácil, implementa una función `remaining_orders`, que recibe la cantidad de minutos que quedan en el turno de Li Mei y un array de jugos que se pidieron pero que aún no están preparados.
La función debe devolver los pedidos que Li Mei no puede empezar a preparar antes del final de su jornada laboral.

El tiempo que queda en el turno siempre será mayor que 0.
El array de jugos por preparar nunca estará vacío.
Además, los pedidos se preparan en el orden en que aparecen en el array.
Si Li Mei empieza a preparar un jugo, siempre lo termina, aunque tenga que trabajar un poco más.
Si no quedan pedidos de los que Dmitry tenga que encargarse, se debe devolver un vector vacío.

```julia-repl
julia> remaining_orders(5, ["Energizer", "All or Nothing", "Green Garden"])
["Green Garden"]
```
