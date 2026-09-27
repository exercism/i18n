# Instrucciones

Tu amiga Li Mei regenta una barra de zumos en la que vende deliciosos zumos de frutas mezcladas.
Eres un cliente habitual de su tienda y te has dado cuenta de que podrías hacerle la vida más fácil a tu amiga.
Decides usar tus dotes de programación para ayudar a Li Mei con su trabajo.

## 1. Determinar cuánto se tarda en mezclar un zumo

A Li Mei le gusta decir a sus clientes con antelación cuánto tienen que esperar por un zumo del menú que han pedido.
Le cuesta recordar las cifras exactas porque el tiempo que se tarda en mezclar los zumos varía.
`"Pure Strawberry Joy"` tarda 0,5 minutos, `"Energizer"` y `"Green Garden"` tardan 1,5 minutos cada uno, `"Tropical Island"` tarda 3 minutos y `"All or Nothing"` tarda 5 minutos.
Para el resto de bebidas (por ejemplo, ofertas especiales) puedes suponer un tiempo de preparación de 2,5 minutos.

Para ayudar a tu amiga, escribe una función `time_to_mix_juice` que reciba un zumo del menú como argumento y devuelva el número de minutos que se tarda en mezclar esa bebida.

```julia-repl
julia> time_to_mix_juice("Tropical Island")
3

julia> time_to_mix_juice("Berries & Lime")
2.5
```

## 2. Reponer el suministro de gajos de lima

Muchas de las creaciones de Li Mei incluyen gajos de lima, ya sea como ingrediente o como parte de la decoración.
Así que cuando empieza su turno por la mañana, necesita asegurarse de que el recipiente de gajos de lima esté lleno para el resto del día.

Implementa la función `limes_to_cut`, que recibe el número de gajos de lima que Li Mei necesita cortar y un array que representa el suministro de limas enteras que tiene a mano.
Puede sacar 6 gajos de una lima `"small"`, 8 gajos de una lima `"medium"` y 10 de una lima `"large"`.
Siempre corta las limas en el orden en que aparecen en el array, empezando por el primer elemento.
Sigue cortando hasta alcanzar el número de gajos que necesita o hasta que se quede sin limas.

A Li Mei le gustaría saber de antemano cuántas limas necesita cortar.
La función `limes_to_cut` debe devolver el número de limas que hay que cortar.

```julia-repl
julia> limes_to_cut(25, ["small", "small", "large", "medium", "small"])
4
```

## 3. Listar los tiempos de mezcla de cada pedido en la cola

A Li Mei le gusta llevar un registro de cuánto se tardará en mezclar los pedidos que los clientes están esperando.

Implementa la función `order_times`, que recibe una cola de pedidos y devuelve un vector de tiempos de mezcla.

```julia-repl
julia> order_times(["Energizer", "Tropical Island"])
[1.5, 3.0]
```

## 4. Terminar el turno

Li Mei siempre trabaja hasta las 3 de la tarde.
Luego su empleado Dmitry toma el relevo.
A menudo hay bebidas que se han pedido pero que aún no están preparadas cuando termina el turno de Li Mei.
Entonces Dmitry prepara los zumos restantes.

Para facilitar el relevo, implementa una función `remaining_orders` que recibe el número de minutos que quedan del turno de Li Mei y un array de zumos que se han pedido pero aún no se han preparado.
La función debe devolver los pedidos que Li Mei no puede empezar a preparar antes del final de su jornada laboral.

El tiempo que queda del turno siempre será mayor que 0.
El array de zumos que hay que preparar nunca estará vacío.
Además, los pedidos se preparan en el orden en que aparecen en el array.
Si Li Mei empieza a mezclar un zumo, siempre lo termina aunque tenga que trabajar un poco más.
Si no queda ningún pedido pendiente del que Dmitry tenga que encargarse, debe devolverse un vector vacío.

```julia-repl
julia> remaining_orders(5, ["Energizer", "All or Nothing", "Green Garden"])
["Green Garden"]
```
