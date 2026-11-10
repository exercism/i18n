# Istruzioni

La tua amica Li Mei gestisce un juice bar dove vende deliziosi succhi di frutta misti.
Sei un cliente abituale del suo locale e ti sei reso conto che potresti rendere la vita più facile alla tua amica.
Decidi di usare le tue competenze di programmazione per aiutare Li Mei con il suo lavoro.

## 1. Determina quanto tempo ci vuole per preparare un succo

A Li Mei piace dire in anticipo ai suoi clienti quanto devono aspettare per un succo del menù che hanno ordinato.
Fa fatica a ricordare i numeri esatti, perché il tempo necessario per preparare i succhi varia.
`"Pure Strawberry Joy"` impiega 0,5 minuti, `"Energizer"` e `"Green Garden"` impiegano 1,5 minuti ciascuno, `"Tropical Island"` impiega 3 minuti e `"All or Nothing"` impiega 5 minuti.
Per tutte le altre bevande (ad esempio le offerte speciali) puoi assumere un tempo di preparazione di 2,5 minuti.

Per aiutare la tua amica, scrivi una funzione `time_to_mix_juice` che prende come argomento un succo del menù e restituisce il numero di minuti necessari per preparare quella bevanda.

```julia-repl
julia> time_to_mix_juice("Tropical Island")
3

julia> time_to_mix_juice("Berries & Lime")
2.5
```

## 2. Rifornisci la scorta di spicchi di lime

Molte delle creazioni di Li Mei includono spicchi di lime, come ingrediente o come decorazione.
Così, quando inizia il turno al mattino, deve assicurarsi che il contenitore degli spicchi di lime sia pieno per la giornata che la aspetta.

Implementa la funzione `limes_to_cut`, che prende il numero di spicchi di lime che Li Mei deve tagliare e un array che rappresenta la scorta di lime interi che ha a disposizione.
Può ricavare 6 spicchi da un lime `"small"`, 8 spicchi da un lime `"medium"` e 10 da un lime `"large"`.
Taglia sempre i lime nell'ordine in cui compaiono nella lista, iniziando dal primo elemento.
Continua finché non raggiunge il numero di spicchi che le serve o finché non finisce i lime.

Li Mei vorrebbe sapere in anticipo quanti lime deve tagliare.
La funzione `limes_to_cut` dovrebbe restituire il numero di lime da tagliare.

```julia-repl
julia> limes_to_cut(25, ["small", "small", "large", "medium", "small"])
4
```

## 3. Elenca i tempi di preparazione di ogni ordine in coda

A Li Mei piace tenere traccia di quanto tempo ci vorrà per preparare gli ordini che i clienti stanno aspettando.

Implementa la funzione `order_times`, che prende una coda di ordini e restituisce un vettore di tempi di preparazione.

```julia-repl
julia> order_times(["Energizer", "Tropical Island"])
[1.5, 3.0]
```

## 4. Concludi il turno

Li Mei lavora sempre fino alle 15.
Poi il suo dipendente Dmitry prende il suo posto.
Spesso, quando il turno di Li Mei finisce, ci sono bevande ordinate ma non ancora preparate.
Dmitry preparerà poi i succhi rimanenti.

Per rendere più facile il passaggio di consegne, implementa una funzione `remaining_orders` che prende il numero di minuti rimanenti nel turno di Li Mei e un array di succhi ordinati ma non ancora preparati.
La funzione dovrebbe restituire gli ordini che Li Mei non può iniziare a preparare prima della fine della sua giornata lavorativa.

Il tempo rimanente nel turno sarà sempre maggiore di 0.
L'array di succhi da preparare non sarà mai vuoto.
Inoltre, gli ordini vengono preparati nell'ordine in cui compaiono nell'array.
Se Li Mei inizia a preparare un certo succo, lo finirà sempre, anche se deve lavorare un po' più a lungo.
Se non ci sono ordini rimanenti di cui Dmitry debba occuparsi, dovrebbe essere restituito un vettore vuoto.

```julia-repl
julia> remaining_orders(5, ["Energizer", "All or Nothing", "Green Garden"])
["Green Garden"]
```
