# Introduzione

## Classi

È ora di arrivare ad uno dei paradigmi fondamentali del C++: la programmazione orientata agli oggetti (OOP).
L'OOP è incentrata sulle `classes`, tipi di dati definiti dall'utente con il proprio insieme di funzioni correlate.
Inizieremo dalle basi e tratteremo argomenti più avanzati più avanti nel percorso.

### Membri

Le classi possono avere **variabili membro** e **funzioni membro**.
Vi si accede tramite l'operatore di **selezione dei membri** `.`.
Proprio come per le variabili al di fuori delle `classes`, è consigliabile inizializzare le variabili membro con un valore al momento della dichiarazione.
Questo valore diventerà poi quello predefinito per i nuovi oggetti creati da questa classe.

### Incapsulamento e occultamento delle informazioni

Le classi offrono la possibilità di limitare l'accesso ai propri membri.
I due `access specifiers` di base sono `private` e `public`.
I membri `private` non sono accessibili dall'esterno della classe.
Ai membri `public` si può accedere liberamente.
Per impostazione predefinita, tutti i membri di una `class` sono `private`.
Solo i membri contrassegnati esplicitamente con `public` sono liberamente utilizzabili all'esterno della classe.

### Esempio di base

La definizione di una `class` è visibile nell'esempio seguente.
Nota il `;` dopo la definizione:

```cpp
class Wizard {
  public:               // from here on all members are publicly accessible
    int cast_spell() {  // defines the public member function cast_spell
      return damage;
    }
    std::string name{}; // defines the public member variable `name`
  private:              // from here on all members are private
    int damage{5};      // defines the private member variable `damage`
};

```

Puoi accedere a tutte le variabili membro dall'interno della classe.
Dai un'occhiata a `damage` all'interno della funzione `cast_spell`.
Non puoi leggere o modificare i membri `private` dall'esterno della classe:

```cpp
Wizard silverhand{};
// calling the `cast_spell` function is okay, it is public:
silverhand.cast_spell();
// => 5

// name is public and can be changed:
silverhand.name = "Laeral";

// damage is private:
silverhand.damage = 500;
 // => Compilation error
```

### Costruttori

I costruttori offrono la possibilità di assegnare valori alle variabili membro al momento della creazione dell'oggetto.
Hanno lo stesso nome della `class` e non hanno un tipo di ritorno.
Una classe può avere diversi costruttori.
Questo è utile se non hai sempre bisogno di impostare tutte le variabili.
A volte potresti voler lasciare tutto ai valori predefiniti e cambiare solo la variabile `name`.
Nel caso di un Wizard potente, potresti voler cambiare anche il damage, quindi ti servono due `constructors`.

```cpp
class Wizard {
  public:
    Wizard(std::string new_name) {
      name = new_name;
    }
    Wizard(std::string new_name, int new_damage) {
      name = new_name;
      damage = new_damage;
    }
    int cast_spell() {
      return damage;
    }
    std::string name{};
  private:
    int damage{5};
};

Wizard el{"Eleven"};       // deals  5 damage
Wizard vecna{"Vecna", 50}; // deals 50 damage
```

I costruttori sono un argomento complesso ed hanno molte sfumature.
Se non definisci esplicitamente un `constructor` per la `class`, allora, e solo allora, il compilatore farà il lavoro al posto tuo.
È quello che è successo nel primo esempio qui sopra.
L'oggetto _silverhand_ viene creato chiamando il costruttore predefinito: non è stato passato alcun argomento.
Tutte le variabili sono impostate al valore indicato nella definizione della classe.
Se non avessi indicato alcun valore in quella definizione, le variabili potrebbero rimanere non inizializzate, con possibili conseguenze indesiderate.

~~~~exercism/note
## Strutture

Le strutture derivano dalle radici C originali del linguaggio e sono vecchie quanto il C++ stesso.
Sono in pratica la stessa cosa delle `classes`, con un'importante eccezione.
Per impostazione predefinita, tutto ciò che sta in una `class` è `private`.
Le strutture, invece, sono `public` finché non si specifica il contrario.
Per convenzione, la parola chiave `struct` si usa spesso per le **strutture di soli dati**.
La parola chiave `class` è invece preferita per gli oggetti che devono garantire determinate proprietà.
Un invariante di questo tipo potrebbe essere che il `damage` della `class` `Wizard` non possa diventare negativo.
La variabile `damage` è privata e qualsiasi funzione che modifichi il damage farebbe in modo che l'invariante venga mantenuto.
~~~~
