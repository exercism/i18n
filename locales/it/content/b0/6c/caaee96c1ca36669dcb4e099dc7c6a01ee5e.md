# Introduzione

Una singola istruzione può sembrare un'azione indivisibile pur non essendolo affatto.
Prendiamo l'aggiunta di cinque a un valore in memoria:

```x86asm
add qword [rel counter], 5
```

Sotto il cofano, il processore non ha un modo per sommare direttamente in memoria.
Suddivide questa unica istruzione in tre passaggi più piccoli, chiamati **micro-operazioni**:

1. **leggere** il valore attuale dalla memoria;
2. **modificare** questo valore in un registro, aggiungendovi cinque;
3. **scrivere di nuovo** il risultato.

```x86asm
mov rax, qword [rel counter] ; 1. load the current value
add rax, 5                   ; 2. add five
mov qword [rel counter], rax ; 3. store the result back
```

Questo è uno schema comune chiamato **read-modify-write (RMW)**.

Nota che la lettura (o load) e la scrittura (o store) sono eventi distinti, quindi tra loro c'è una finestra di tempo.
Di solito non ce ne accorgiamo perché su un singolo core ogni istruzione ha la garanzia di produrre il suo effetto per intero prima della successiva.
Quella finestra è quindi invisibile e `add` si comporta come un'unica unità.

Tuttavia, le CPU moderne raramente hanno un solo core, e le applicazioni spesso girano su molti core contemporaneamente, senza alcuna sequenza tra loro.
Con diversi core in esecuzione nello stesso istante, un altro core può leggere o scrivere `counter` dentro la finestra, dopo il load di questo core e prima del suo store.
Due thread caricano ciascuno lo stesso vecchio valore, ciascuno aggiunge cinque e ciascuno memorizza il proprio risultato.
Sono avvenute due addizioni, ma il valore è aumentato solo di cinque.
Un aggiornamento è andato perso in silenzio.

Questo è un **data race**, ed è un problema comune nel codice multi-thread.

Non tutti i valori sono esposti in questo modo.
Ogni thread ha i propri registri e il proprio stack, quindi un valore contenuto in un registro, o una variabile locale sullo stack di un thread, è esclusivo di quel thread e non può essere soggetto a un data race.
Solo la memoria condivisa tra i thread, come `counter` qui sopra, ha bisogno di protezione.

x86-64 offre un insieme di istruzioni per risolvere questo problema, rendendo un'istruzione indivisibile.
Essa si comporta come un'unica unità non solo per il core che la elabora, ma anche per ogni altro core.
Un'operazione che resta compatta, che nessun altro core può dividere, si chiama **atomica**.

~~~~exercism/note
È comune riferirsi alle applicazioni che girano su molti core come multi-thread.
Tuttavia, un **thread** non è la stessa cosa di un core.
Due thread possono girare in modo concorrente sullo stesso core, alternandosi tra loro, oppure in parallelo su core diversi.

Thread che si alternano possono già dare origine a un data race su un read-modify-write se questo è suddiviso in più istruzioni, dato che il sistema operativo può passare da un thread all'altro tra due istruzioni qualsiasi.
La finestra all'interno di una _singola_ istruzione, invece, è esposta solo dal codice davvero parallelo.
Poiché il sistema operativo scambia i thread solo tra un'istruzione e l'altra, mai dentro una singola istruzione, un'istruzione è di per sé sicura su un singolo core.

La vera atomicità su _più_ core è quella che forniscono le istruzioni seguenti.
~~~~

## Scambio atomico

L'istruzione `xchg` scambia due operandi.
L'operando di destinazione diventa uguale al valore precedente dell'operando sorgente, mentre l'operando sorgente diventa uguale al valore precedente dell'operando di destinazione.
Concettualmente, può essere vista come due istruzioni `mov` che avvengono nello stesso istante.

Come al solito, può essere usata con due operandi registro oppure con un operando in memoria e un operando registro:

```x86asm
mov  eax, 1
xchg dword [rdi], eax ; [rdi] = 1, eax = the old value of [rdi]
mov ecx, 2
mov edx, 3
xchg edx, ecx         ; edx = 2, ecx = 3
```

Quando viene usata con un operando in memoria, `xchg` è _sempre_ atomica.

~~~~exercism/caution
`xchg` è automaticamente atomica quando uno degli operandi è una locazione di memoria.
Questo significa anche che l'operazione è molto più lenta in quella situazione.

Se non ti serve l'atomicità, esegui lo scambio passando da un registro libero con semplici istruzioni `mov`.
~~~~

## Il prefisso lock

Il modo più comune per rendere atomica un'istruzione in x86-64 è aggiungere il prefisso `lock`.
Esso fonde la lettura, la modifica e la scrittura in un unico passaggio indivisibile.
Questo significa che il core detiene la memoria in esclusiva per tutto il processo, quindi nessun altro core può leggere o scrivere quella locazione nel frattempo.

```x86asm
lock add qword [rel counter], 5 ; the read, the modify, and the write are one step
```

`lock` funziona solo quando la destinazione è in memoria, e solo su istruzioni che eseguono un read-modify-write su quella memoria:

1. operazioni aritmetiche, come `add`, `sub`, `inc`, `dec`, `neg`;
2. operazioni bit a bit, come `and`, `or`, `xor`, `not`;
3. le operazioni sui bit `bts`, `btr`, `btc`;
4. alcune altre istruzioni dedicate, come `xadd` e `cmpxchg`, descritte più avanti.

~~~~exercism/caution
Tenere una locazione in esclusiva e impedire l'accesso a ogni altro core non è gratis.
Un'operazione con il prefisso `lock` è decisamente più lenta della sua forma semplice, e ancora più lenta quando diversi core si contendono la stessa locazione.

Questo prefisso va riservato alla memoria che ci si aspetta venga modificata da più di un thread.
Evitalo se la memoria non è condivisa o se viene solo letta.
~~~~

## Scambio e addizione

Un semplice `lock add` aggiorna la memoria ma butta via il valore precedente.
Spesso il valore precedente è proprio quello che serve, per esempio per assegnare a ogni thread un numero di ticket diverso.

L'istruzione `xadd` (`x` di exchange, scambio) restituisce il valore precedente mentre esegue l'addizione.
Scrive la somma nella destinazione e lascia il valore originale della destinazione nel registro sorgente.

```x86asm
mov  rax, 1
lock xadd qword [rdi], rax ; [rdi] = [rdi] + rax = [rdi] + 1
                           ; rax = the old value of [rdi]
```

Con il prefisso `lock` questa è un'operazione atomica di **fetch-and-add**.
Eseguita da molti thread sullo stesso contatore, ogni chiamata restituisce un valore precedente diverso.

Come con `lock add`, il contatore finisce esattamente al numero di chiamate.
Tuttavia, a differenza di `lock add`, viene restituito anche ogni valore intermedio, uno a ciascun chiamante.

## Confronto e scambio

`xadd` somma e `xchg` sovrascrive, ma nessuna delle due può far dipendere il nuovo valore da quello attuale e applicarlo solo se nulla è cambiato nel frattempo.
È proprio questo aggiornamento condizionale che offre `cmpxchg`, compare-and-exchange, ed è la più generale di queste primitive.

`cmpxchg dest, src` usa `rax` come accumulatore implicito e lo confronta con `dest`:

- Se `dest == rax`, allora `dest = src` e `ZF = 1`.
- Se `dest != rax`, allora `rax = dest` e `ZF = 0`.

Nota che `dest` viene aggiornato solo quando è uguale al valore atteso, caricato in precedenza in `rax`.
Questa uguaglianza garantisce che `dest` contenga ancora il valore da cui è stato calcolato quello nuovo, così un aggiornamento basato su una lettura obsoleta non viene mai applicato.
Questo rende `cmpxchg` il mattone fondamentale per un aggiornamento atomico, noto anche come **compare-and-swap (CAS)**:

```x86asm
    mov rax, qword [rdi]          ; rax = the value we expect to find
.retry:
    lea rcx, [rax + 10]           ; rcx = the new value we want to install
    lock cmpxchg qword [rdi], rcx ; if [rdi] still equals rax, store rcx and set ZF
                                  ; otherwise reload rax with the current value, clear ZF
    jnz  .retry                   ; ZF is cleared, so another thread won the race. Recompute and retry
```

Questo **ciclo di tentativi** è il cuore degli aggiornamenti lock-free.
La finestra tra la lettura e il compare-and-exchange è esattamente il momento in cui un altro thread potrebbe intervenire, e `cmpxchg` lo intercetta rifiutandosi di memorizzare un valore calcolato da una lettura obsoleta.

## Ordinamento della memoria

Ogni operazione vista finora ha toccato una sola locazione.
Quando i thread si coordinano attraverso più di una locazione, compare una nuova domanda: in quale ordine le scritture di un thread diventano visibili a un altro.
Le regole che rispondono a questa domanda costituiscono l'**ordinamento della memoria** del processore.

Il concetto di codice senza rami ha introdotto l'idea che un core moderno non procede a fatica un'istruzione alla volta.
Ne tiene molte in volo contemporaneamente e corre avanti dove può.
Questo significa che una scrittura può diventare visibile agli altri core più tardi di quanto il programma suggerisca, mentre le istruzioni successive sono già andate avanti.

x86-64 mantiene un **ordinamento della memoria forte** tra i normali load e store, così che su ogni core:

1. un load non viene mai riordinato dopo un load successivo;
2. uno store non viene mai riordinato dopo uno store successivo;
3. un load non viene mai riordinato dopo uno store successivo.

L'unico riordino possibile è quello di uno store che sembra completarsi dopo un load successivo di un indirizzo _diverso_.

Un'istruzione con il prefisso `lock`, o una `xchg` con un operando in memoria, è una barriera completa: nulla sembra attraversarla in nessuna delle due direzioni.
Ecco perché sono sufficienti a garantire un ordinamento completo nella maggior parte delle situazioni.

## Lo spin e `pause`

Le istruzioni che impostano un flag restituendo anche il suo stato precedente sono note come **test-and-set**.
Possono essere usate come base per uno **spinlock**, che garantisce a un core l'accesso esclusivo a una parte del codice.

Questo è l'algoritmo complessivo, che usa l'istruzione `xchg` con un flag binario:

1. Il flag parte da `0`.
2. Per acquisire il lock, un core scambia il valore nel flag con `1`.
3. Se il valore restituito è `1`, significa che il lock è _detenuto_ da un altro core.
   Il core corrente allora aspetta e prova di nuovo ad acquisire il lock.
4. Se il valore restituito è `0`, significa che il lock era libero.
   Ora `xchg` lo ha impostato a `1` e gli altri core aspetteranno finché questo core non lo rilascia.
5. Quando il core corrente finisce il suo lavoro, aggiornare il flag con `0` rilascia il lock.

```x86asm
acquire:
    mov  eax, 1
    xchg dword [rdi], eax ; try to take the lock; eax = its old value
    test eax, eax
    jnz  .held            ; old value was 1: someone else holds it
    ret                   ; old value was 0: the lock is ours
.held:
    pause                 ; wait before trying again
    jmp  acquire
```

L'istruzione `pause` nel ciclo di attesa non cambia ciò che il codice calcola.
Suggerisce al processore che questa è un'attesa in spin.
La CPU può così ridurre il consumo di energia del thread in attesa e cedere il passo a un thread gemello che condivide lo stesso core.
Un ciclo di spin senza `pause` è comunque corretto, solo dispendioso.

Quando il thread finisce il suo lavoro, può rilasciare il lock con un semplice store di `0` usando `mov`.
Non serve altro che una `mov`, perché su x86-64 i load e gli store non vengono mai riordinati dopo uno store successivo.
Uno store che non supera mai gli accessi che lo precedono si dice che abbia **release ordering**, e su x86 ogni store semplice lo garantisce.

~~~~exercism/note
Qualsiasi istruzione che verifica e imposta atomicamente una locazione di memoria può essere usata per uno spinlock.
Per esempio, si può usare `lock bts` al posto di `xchg`, per impostare un bit specifico verificando al tempo stesso se era già impostato.

Nota che i flag, come il `CF` modificato da `bts`, fanno parte di `rflags`, un registro.
Questo significa che sono esclusivi di ciascun thread.
~~~~
