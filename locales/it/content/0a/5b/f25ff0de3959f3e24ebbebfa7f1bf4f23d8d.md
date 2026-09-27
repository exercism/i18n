# Istruzioni

Chaitana possiede un parco divertimenti molto popolare.
 Ha una sola attrazione, proprio al centro di un terreno splendidamente curato: The Biggest Roller Coaster in the World(TM).
 Anche se c'è solo questa attrazione, persone da tutto il mondo viaggiano e stanno in fila per ore per avere l'occasione di salire sulle montagne russe di Chaitana.

Per questa attrazione ci sono due code, ognuna rappresentata da una `list`:

1. Coda normale
2. Coda express (_nota anche come Fast-track_): qui si paga un supplemento per l'accesso prioritario.


Ti è stato chiesto di scrivere del codice per gestire meglio gli ospiti del parco.
 Devi implementare le seguenti funzioni il prima possibile, prima che gli ospiti (e il tuo capo, Chaitana!) si innervosiscano.
 Leggi con attenzione.
 Alcuni compiti ti chiedono di modificare o aggiornare la coda esistente, altri di farne una copia.


## 1. Aggiungimi alla coda

Definisci la funzione `add_me_to_the_queue()` che prende 4 parametri `<express_queue>, <normal_queue>, <ticket_type>, <person_name>` e restituisce la coda appropriata aggiornata con il nome della persona.


1. `<ticket_type>` è un `int`, dove 1 == express_queue e 0 == normal_queue.
2. `<person_name>` è il nome (come `str`) della persona da aggiungere alla coda corrispondente.


```python
>>> add_me_to_the_queue(express_queue=["Tony", "Bruce"], normal_queue=["RobotGuy", "WW"], ticket_type=1, person_name="RichieRich")
...
["Tony", "Bruce", "RichieRich"]

>>> add_me_to_the_queue(express_queue=["Tony", "Bruce"], normal_queue=["RobotGuy", "WW"], ticket_type=0, person_name="HawkEye")
....
["RobotGuy", "WW", "HawkEye"]
```

## 2. Dove sono i miei amici?

Una persona è arrivata tardi al parco ma vuole mettersi nella coda dove aspettano i suoi amici.
 Però non ha idea di dove si trovino i suoi amici e non c'è campo per chiamarli.

Definisci la funzione `find_my_friend()` che prende 2 parametri `queue` e `friend_name` e restituisce la posizione nella coda del nome della persona.


1. `<queue>` è la `list` delle persone in attesa nella coda.
2. `<friend_name>` è il nome dell'amico di cui devi trovare l'indice (la posizione nella coda).

Ricorda: l'indicizzazione parte da 0 da sinistra e da -1 da destra.


```python
>>> find_my_friend(queue=["Natasha", "Steve", "T'challa", "Wanda", "Rocket"], friend_name="Steve")
...
1
```


## 3. Posso unirmi a loro?

Ora che i suoi amici sono stati trovati (nel compito 2 qui sopra), chi è arrivato tardi vorrebbe unirsi a loro nella loro posizione in coda.
Definisci la funzione `add_me_with_my_friends()` che prende 3 parametri `queue`, `index` e `person_name`.


1. `<queue>` è la `list` delle persone in attesa nella coda.
2. `<index>` è la posizione in cui aggiungere la nuova persona.
3. `<person_name>` è il nome della persona da aggiungere nella posizione indicata dall'indice.

Restituisci la coda aggiornata con il nome di chi è arrivato tardi.


```python
>>> add_me_with_my_friends(queue=["Natasha", "Steve", "T'challa", "Wanda", "Rocket"], index=1, person_name="Bucky")
...
["Natasha", "Bucky", "Steve", "T'challa", "Wanda", "Rocket"]
```

## 4. Persona maleducata in coda

Hai appena sentito dalla coda che c'è una persona davvero maleducata che spinge, urla e crea problemi.
 Devi cacciare quel mascalzone per il suo cattivo comportamento!


Definisci la funzione `remove_the_mean_person()` che prende 2 parametri `queue` e `person_name`.


1. `<queue>` è la `list` delle persone in attesa nella coda.
2. `<person_name>` è il nome della persona da cacciare.

Restituisci la coda aggiornata senza il nome della persona maleducata.

```python
>>> remove_the_mean_person(queue=["Natasha", "Steve", "Eltran", "Wanda", "Rocket"], person_name="Eltran")
...
["Natasha", "Steve", "Wanda", "Rocket"]
```


## 5. Omonimi

Potresti non aver mai visto due persone non imparentate identiche nell'aspetto, ma hai _sicuramente_ visto persone non imparentate con lo stesso identico nome (_omonimi_)!
 Oggi sembra che ce ne siano molte tra i presenti.
  Vuoi sapere quante volte un certo nome compare nella coda.

Definisci la funzione `how_many_namefellows()` che prende 2 parametri `queue` e `person_name`.

1. `<queue>` è la `list` delle persone in attesa nella coda.
2. `<person_name>` è il nome che pensi possa comparire più di una volta nella coda.


Restituisci il numero di occorrenze di `person_name`, come `int`.


```python
>>> how_many_namefellows(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"], person_name="Natasha")
...
2
```

## 6. Rimuovi l'ultima persona

Purtroppo oggi il parco è sovraffollato e devi rimuovere l'ultima persona della coda normale (_le darai un buono per tornare in fast-track un altro giorno_).
 Dovrai definire la funzione `remove_the_last_person()` che prende 1 parametro, `queue`, cioè la coda delle persone in attesa.

Devi aggiornare la `list` e anche restituire con `return` il nome della persona rimossa, così puoi scriverle un buono.


```python
>>> remove_the_last_person(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"])
...
'Rocket'
```

## 7. Ordina la coda

Per motivi amministrativi, devi ottenere tutti i nomi di una data coda in ordine alfabetico.


Definisci la funzione `sorted_names()` che prende 1 argomento, `queue` (la `list` delle persone in attesa nella coda), e restituisce una copia `sorted` della `list`.


```python
>>> sorted_names(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"])
...
['Eltran', 'Natasha', 'Natasha', 'Rocket', 'Steve']
```
