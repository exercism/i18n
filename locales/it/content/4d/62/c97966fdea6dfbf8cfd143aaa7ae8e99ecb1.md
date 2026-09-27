# Approfondimento

Gli specificatori di classe di memorizzazione riguardano il modo in cui le variabili vengono memorizzate in memoria.
Sono strettamente legati alla durata di memorizzazione (detta anche vita) di un valore.

## auto: la classe di memorizzazione predefinita per le variabili con scope di funzione o di blocco

Dato che le variabili definite all'interno di un blocco o di una funzione sono `auto` per impostazione predefinita, non è comune usare esplicitamente questo termine.
Un altro motivo per cui `auto` viene spesso evitato è che in C++ ha un significato diverso.
Le basi di codice che combinano C e C++ risultano meno confuse se si evita lo specificatore di memorizzazione `auto`.
La vita di una variabile `auto` inizia quando si entra nel suo blocco e termina quando se ne esce.
Quando si entra nel blocco di una variabile `auto`, per essa viene allocata della memoria, _ma senza alcun valore predefinito_.
Un'eccezione è rappresentata dagli array a lunghezza variabile (VLA).
L'allocazione di un VLA avviene nel punto in cui è dichiarato o definito all'interno del suo blocco e termina quando si esce dal blocco.
Una variabile `auto` può essere inizializzata con qualsiasi espressione valida.

## static: lo specificatore di memorizzazione da non confondere con il tipo di collegamento static

Una variabile definita all'esterno di un blocco o di una funzione ha scope di file e ha sempre durata di memorizzazione statica.
Scope di file significa che è accessibile in qualsiasi punto del file.
Memorizzazione statica significa che esiste dall'inizio dell'esecuzione del programma fino alla fine.
Se non viene inizializzata esplicitamente, una variabile `static` viene inizializzata con il suo valore predefinito zero.
Se una variabile con scope di file è contrassegnata con `static`, allora `static` si riferisce al suo collegamento.
Una variabile con scope di file contrassegnata `static` ha collegamento interno, il che significa che è accessibile solo all'interno del file.
Se una variabile è definita all'interno di una funzione o in un blocco dentro una funzione ed è contrassegnata `static`, ha una durata di memorizzazione `static`.
Il valore della variabile `static` persiste tra una chiamata e l'altra alla funzione o al blocco.

Nell'esempio seguente vediamo due variabili `static` in azione.
La prima variabile `count` è definita all'interno della funzione `print_stuff` e conserva il suo valore tra una chiamata e l'altra alla funzione.
La seconda variabile `count` è definita all'interno di un blocco arbitrario e nasconde (ovvero ombreggia) la prima variabile `count` all'interno del suo blocco.
La seconda variabile `count` conserva il suo valore in modo indipendente tra un ingresso e l'altro nel blocco.

```c
#include <stdio.h>

void print_stuff(void) {
    // static variable is initialized to 0
    static int count;
    count++;
    printf("function count is %d\n", count);
    {
        // static variable is initialized to 0
        static int count;
        count++;
        printf("block count is %d\n", count);
    }
}

int main() {
    // prints
    // function count is 1
    // block count is 1
    print_stuff();
    // prints
    // function count is 2
    // block count is 2    
    print_stuff();
}
```

Se una variabile `static` viene inizializzata esplicitamente, bisogna farlo con un'espressione costante.
Un'espressione costante è un'espressione che può essere valutata in fase di compilazione.

## extern: come accedere a una variabile in un'altra unità di traduzione

Un'unità di traduzione è composta da un file sorgente e da ogni altro file che esso include con `#include`.
Sebbene una variabile con scope di file possa essere dichiarata e inizializzata come `extern`, la parola chiave `extern` si usa di solito per fare riferimento a una variabile esistente, non per definirne una nuova.
La variabile a cui si fa riferimento con `extern` deve avere scope di file.
Una variabile con scope di file ha sempre memorizzazione `static`.
Una variabile in un file incluso deve avere collegamento esterno per poter essere accessibile dal file che lo include.

Nell'esempio seguente usiamo la variabile `val` dichiarata come `extern`, in modo che faccia riferimento alla `val` definita nel suo scope di file.
Entrambi gli usi di `extern` sono chiamati dichiarazioni di riferimento, dato che fanno riferimento a una variabile definita altrove.

```c
#include <stdio.h>

void set_val() {
    // this declares val which is defined elsewhere
    extern int val;
    val += 42;
    // prints val is 42
    printf("val is %d\n", val);
}

int main() {
    set_val();
    // this declares val which is defined elsewhere
    extern int val;
    val += 42;
    // prints val is 84
    printf("val is %d\n", val);
}
// this value could be defined in another source file.
// as a variable with static storage, it is initialized to zero
int val;
```

Se entrambe le parole chiave `extern` venissero rimosse, il programma potrebbe stampare qualcosa come

```
val is 22038
val is 42
```

Un output del genere dimostra che ogni dichiarazione di `val` senza `extern` è una dichiarazione di definizione ed è indipendente dalle altre dichiarazioni di `val`.
Rimuovendo del tutto le dichiarazioni di `val` da `set_val` e `main` si otterrebbe un errore di compilazione perché `val` non è dichiarata in `set_val` e `main`.

Se una variabile a cui si fa riferimento come `extern` si trova nello stesso file, può avere collegamento interno o esterno.
Definire `val` come `static int val;` non avrebbe alcun effetto sull'uso di `val` in `set_val` o `main`, tranne che la definizione dovrebbe essere spostata sopra di esse per poter compilare.
Ma se `val` fosse definita sopra le funzioni, queste non avrebbero bisogno di dichiarare `val` come `extern`.

Quanto segue funzionerebbe

```c
#include <stdio.h>

// val defining declaration before the function definitions
static int val;

void set_val() {
    val += 42;
    // prints val is 42
    printf("val is %d\n", val);
}

int main() {
    set_val();
    val += 42;
    // prints val is 84
    printf("val is %d\n", val);
}
```

Si potrebbe rimuovere `static` da `static int val;`, dando a `val` collegamento esterno, e `val` funzionerebbe comunque allo stesso modo in `set_val` e `main`.
Se un altro file sorgente includesse questo file, potrebbe usare `val` solo se `val` avesse collegamento esterno (non dichiarata come `static`) e se l'altro file dichiarasse `extern int val;`.

Una variabile a cui si fa riferimento con `extern` non deve solo avere memorizzazione `static`, ma deve anche avere scope di file.
L'esempio seguente molto probabilmente non compilerà, perché `val`, pur essendo `static`, non ha scope di file.

```c
#include <stdio.h>

void set_val() {
    // defined with static storage, but not in file scope
    static int val;
    val += 42;
    printf("val is %d\n", val);
}

int main() {
    set_val();
    extern int val;
    printf("val is %d\n", val);
}
```

## register: come accelerare, eventualmente, l'accesso a una variabile

Una variabile contrassegnata come `register` esprime il desiderio del programmatore di avere il valore collocato in un registro per un accesso rapido.
Una variabile `register` è simile a una variabile `auto` in quanto deve trovarsi nello scope di una funzione o di un blocco.
Poiché il valore dovrebbe essere collocato in un registro invece che in memoria, l'accesso all'indirizzo della variabile dovrebbe essere vietato dal compilatore, dato che l'indirizzo di un registro non può essere preso.
Tuttavia, un indirizzo di memoria può essere collocato in un registro.
L'esempio seguente lo dimostra

```c
#include <stdio.h>

int main() {
    int i = 42;
    register int *i_ptr = &i;
    // prints i is 42, i_ptr is 0x7ffd0c2055c4 (or some other address)
    printf("i is %d, i_ptr is %p", i, i_ptr);
}
```

register` è essenzialmente un suggerimento, poiché i compilatori sono liberi di scegliere se seguire o meno questo specificatore, quindi il valore può essere effettivamente collocato in un registro oppure no.

## typedef: lo specificatore di classe di memorizzazione che in realtà non lo è

`typedef` è descritto come specificatore di classe di memorizzazione solo per ragioni sintattiche.
Questo perché uno specificatore di classe di memorizzazione non può essere usato insieme a un altro specificatore di classe di memorizzazione.
Quindi, `typedef auto int i = 42;` è illegale tanto quanto `static auto int i = 42;`.
