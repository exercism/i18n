# Instrucciones

Chaitana es dueña de un parque de diversiones muy popular.
Solo tiene una atracción en el mismísimo centro de unos jardines bellamente diseñados: La Montaña Rusa Más Grande del Mundo(TM).
Aunque solo existe esta atracción, gente de todo el mundo viaja y hace fila durante horas para tener la oportunidad de subirse a la hipercoaster de Chaitana.

Hay dos filas para esta atracción, cada una representada como una `list`:

1. Fila normal
2. Fila exprés (_también conocida como vía rápida_), donde la gente paga extra por acceso prioritario.


Te han pedido que escribas algo de código para gestionar mejor a los visitantes del parque.
Necesitas implementar las siguientes funciones lo antes posible, antes de que los visitantes (¡y tu jefa, Chaitana!) se pongan de mal humor.
Asegúrate de leer con atención.
Algunas tareas te piden que cambies o actualices la fila existente, mientras que otras te piden que hagas una copia de ella.


## 1. Agrégame a la fila

Define la función `add_me_to_the_queue()` que recibe 4 parámetros `<express_queue>, <normal_queue>, <ticket_type>, <person_name>` y devuelve la fila correspondiente actualizada con el nombre de la persona.


1. `<ticket_type>` es un `int` donde 1 == express_queue y 0 == normal_queue.
2. `<person_name>` es el nombre (como un `str`) de la persona que se agregará a la fila correspondiente.


```python
>>> add_me_to_the_queue(express_queue=["Tony", "Bruce"], normal_queue=["RobotGuy", "WW"], ticket_type=1, person_name="RichieRich")
...
["Tony", "Bruce", "RichieRich"]

>>> add_me_to_the_queue(express_queue=["Tony", "Bruce"], normal_queue=["RobotGuy", "WW"], ticket_type=0, person_name="HawkEye")
....
["RobotGuy", "WW", "HawkEye"]
```

## 2. ¿Dónde están mis amigos?

Una persona llegó tarde al parque, pero quiere unirse a la fila donde están esperando sus amigos.
Pero no tiene idea de dónde están parados sus amigos y no hay señal de teléfono para llamarlos.

Define la función `find_my_friend()` que recibe 2 parámetros `queue` y `friend_name` y devuelve la posición que ocupa en la fila el nombre de la persona.


1. `<queue>` es la `list` de personas que están en la fila.
2. `<friend_name>` es el nombre del amigo cuyo índice (lugar en la fila) necesitas encontrar.

Recuerda: la indexación empieza en 0 desde la izquierda y en -1 desde la derecha.


```python
>>> find_my_friend(queue=["Natasha", "Steve", "T'challa", "Wanda", "Rocket"], friend_name="Steve")
...
1
```


## 3. ¿Puedo unirme a ellos, por favor?

Ahora que ya se encontraron sus amigos (en la tarea 2 de arriba), a quien llegó tarde le gustaría unirse a ellos en su lugar de la fila.
Define la función `add_me_with_my_friends()` que recibe 3 parámetros `queue`, `index` y `person_name`.


1. `<queue>` es la `list` de personas que están en la fila.
2. `<index>` es la posición en la que se debe agregar a la nueva persona.
3. `<person_name>` es el nombre de la persona que se agregará en la posición del índice.

Devuelve la fila actualizada con el nombre de quien llegó tarde.


```python
>>> add_me_with_my_friends(queue=["Natasha", "Steve", "T'challa", "Wanda", "Rocket"], index=1, person_name="Bucky")
...
["Natasha", "Bucky", "Steve", "T'challa", "Wanda", "Rocket"]
```

## 4. Persona grosera en la fila

Acabas de escuchar en la fila que hay una persona muy grosera que empuja, grita y arma problemas.
¡Tienes que sacar a ese malhechor por su mal comportamiento!


Define la función `remove_the_mean_person()` que recibe 2 parámetros `queue` y `person_name`.


1. `<queue>` es la `list` de personas que están en la fila.
2. `<person_name>` es el nombre de la persona a la que hay que sacar.

Devuelve la fila actualizada sin el nombre de la persona grosera.

```python
>>> remove_the_mean_person(queue=["Natasha", "Steve", "Eltran", "Wanda", "Rocket"], person_name="Eltran")
...
["Natasha", "Steve", "Wanda", "Rocket"]
```


## 5. Tocayos

Puede que no hayas visto a dos personas sin ningún parentesco que se vean exactamente iguales, ¡pero _definitivamente_ has visto a personas sin parentesco con exactamente el mismo nombre (_tocayos_)!
Hoy parece que hay muchos de ellos entre los presentes.
Quieres saber cuántas veces aparece un nombre en particular en la fila.

Define la función `how_many_namefellows()` que recibe 2 parámetros `queue` y `person_name`.

1. `<queue>` es la `list` de personas que están en la fila.
2. `<person_name>` es el nombre que crees que podría aparecer más de una vez en la fila.


Devuelve el número de apariciones de `person_name`, como un `int`.


```python
>>> how_many_namefellows(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"], person_name="Natasha")
...
2
```

## 6. Elimina a la última persona

Lamentablemente, hoy el parque está demasiado lleno y necesitas eliminar a la última persona de la fila normal (_le darás un cupón para volver a la vía rápida otro día_).
Tendrás que definir la función `remove_the_last_person()` que recibe 1 parámetro, `queue`, que es la lista de personas que están en la fila.

Debes actualizar la `list` y también devolver con `return` el nombre de la persona que se eliminó, para que puedas escribirle un cupón.


```python
>>> remove_the_last_person(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"])
...
'Rocket'
```

## 7. Ordena la lista de la fila

Por motivos administrativos, necesitas obtener todos los nombres de una fila dada en orden alfabético.


Define la función `sorted_names()` que recibe 1 argumento, `queue` (la `list` de personas que están en la fila), y devuelve una copia `sorted` de la `list`.


```python
>>> sorted_names(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"])
...
['Eltran', 'Natasha', 'Natasha', 'Rocket', 'Steve']
```
