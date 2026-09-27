# Instrucciones

Chaitana es la dueña de un parque de atracciones muy popular.
 Solo tiene una atracción, en el centro mismo de unos terrenos bellamente ajardinados: La Montaña Rusa Más Grande del Mundo(TM).
 Aunque solo hay esta atracción, gente de todo el mundo viaja y hace cola durante horas para tener la oportunidad de subir a la hipermontaña rusa de Chaitana.

Hay dos colas para esta atracción, cada una representada como un `list`:

1. Cola normal
2. Cola exprés (_también conocida como vía rápida_), donde la gente paga un extra por acceder con prioridad.


Te han pedido que escribas algo de código para gestionar mejor a los visitantes del parque.
 Tienes que implementar las siguientes funciones cuanto antes, antes de que los visitantes (¡y tu jefa, Chaitana!) se impacienten.
 Asegúrate de leer con atención.
 Algunas tareas te piden que cambies o actualices la cola existente, mientras que otras te piden que hagas una copia.


## 1. Añádeme a la cola

Define la función `add_me_to_the_queue()`, que toma 4 parámetros `<express_queue>, <normal_queue>, <ticket_type>, <person_name>` y devuelve la cola correspondiente actualizada con el nombre de la persona.


1. `<ticket_type>` es un `int` con 1 == express_queue y 0 == normal_queue.
2. `<person_name>` es el nombre (como `str`) de la persona que se va a añadir a la cola correspondiente.


```python
>>> add_me_to_the_queue(express_queue=["Tony", "Bruce"], normal_queue=["RobotGuy", "WW"], ticket_type=1, person_name="RichieRich")
...
["Tony", "Bruce", "RichieRich"]

>>> add_me_to_the_queue(express_queue=["Tony", "Bruce"], normal_queue=["RobotGuy", "WW"], ticket_type=0, person_name="HawkEye")
....
["RobotGuy", "WW", "HawkEye"]
```

## 2. ¿Dónde están mis amigos?

Una persona ha llegado tarde al parque, pero quiere unirse a la cola donde esperan sus amigos.
 Sin embargo, no tiene ni idea de dónde están sus amigos y no hay cobertura para llamarlos.

Define la función `find_my_friend()`, que toma 2 parámetros, `queue` y  `friend_name`, y devuelve la posición en la cola del nombre de la persona.


1. `<queue>` es la `list` de personas que están en la cola.
2. `<friend_name>` es el nombre del amigo cuyo índice (su lugar en la cola) tienes que encontrar.

Recuerda:  la indexación empieza en 0 por la izquierda y en -1 por la derecha.


```python
>>> find_my_friend(queue=["Natasha", "Steve", "T'challa", "Wanda", "Rocket"], friend_name="Steve")
...
1
```


## 3. ¿Puedo unirme a ellos, por favor?

Ahora que ya se han encontrado sus amigos (en la tarea n.º 2 anterior), a quien llegó tarde le gustaría unirse a ellos en su lugar de la cola.
Define la función `add_me_with_my_friends()`, que toma 3 parámetros, `queue`, `index` y  `person_name`.


1. `<queue>` es la `list` de personas que están en la cola.
2. `<index>` es la posición en la que debe añadirse la nueva persona.
3. `<person_name>` es el nombre de la persona que hay que añadir en la posición indicada por el índice.

Devuelve la cola actualizada con el nombre de quien llegó tarde.


```python
>>> add_me_with_my_friends(queue=["Natasha", "Steve", "T'challa", "Wanda", "Rocket"], index=1, person_name="Bucky")
...
["Natasha", "Bucky", "Steve", "T'challa", "Wanda", "Rocket"]
```

## 4. Persona mal educada en la cola

Acabas de oír en la cola que hay una persona muy mal educada que empuja, grita y arma jaleo.
 ¡Tienes que echar a ese sinvergüenza por su mal comportamiento!


Define la función `remove_the_mean_person()`, que toma 2 parámetros, `queue` y `person_name`.


1. `<queue>` es la `list` de personas que están en la cola.
2. `<person_name>` es el nombre de la persona a la que hay que echar.

Devuelve la cola actualizada sin el nombre de la persona mal educada.

```python
>>> remove_the_mean_person(queue=["Natasha", "Steve", "Eltran", "Wanda", "Rocket"], person_name="Eltran")
...
["Natasha", "Steve", "Wanda", "Rocket"]
```


## 5. Tocayos

Puede que no hayas visto nunca a dos personas sin ningún parentesco que sean idénticas, ¡pero _desde luego_ que has visto a personas sin parentesco con exactamente el mismo nombre (_tocayos_)!
 Hoy parece que hay un montón de ellos en el parque.
  Quieres saber cuántas veces aparece un nombre concreto en la cola.

Define la función `how_many_namefellows()`, que toma 2 parámetros, `queue` y  `person_name`.

1. `<queue>` es la `list` de personas que están en la cola.
2. `<person_name>` es el nombre que crees que puede aparecer más de una vez en la cola.


Devuelve el número de apariciones de `person_name`, como un `int`.


```python
>>> how_many_namefellows(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"], person_name="Natasha")
...
2
```

## 6. Elimina a la última persona

Por desgracia, hoy el parque está abarrotado y tienes que quitar a la última persona de la cola normal (_le darás un vale para volver otro día por la vía rápida_).
 Tendrás que definir la función `remove_the_last_person()`, que toma 1 parámetro, `queue`, que es el array de personas que están en la cola.

Debes actualizar la `list` y también hacer `return` del nombre de la persona que se ha quitado, para poder escribirle un vale.


```python
>>> remove_the_last_person(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"])
...
'Rocket'
```

## 7. Ordena el array de la cola

Por motivos administrativos, necesitas obtener todos los nombres de una cola determinada en orden alfabético.


Define la función `sorted_names()`, que toma 1 argumento,  `queue`, (la `list` de personas que están en la cola), y devuelve una copia `sorted` de la `list`.


```python
>>> sorted_names(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"])
...
['Eltran', 'Natasha', 'Natasha', 'Rocket', 'Steve']
```
