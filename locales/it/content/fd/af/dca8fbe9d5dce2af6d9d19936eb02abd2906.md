# Istruzioni

Un tuo amico sta imparando a risolvere i Killer Sudoku (le regole sono più sotto), ma fa fatica a capire quali cifre possono andare in una gabbia.
Ti chiede una mano: scrivi un piccolo programma che elenchi tutte le combinazioni valide per una data gabbia e tutti i vincoli che la riguardano.

Per rendere facilmente leggibile l'output del programma, le combinazioni restituite devono essere ordinate.

## Regole del Killer Sudoku

- Si applicano le [regole standard del Sudoku][sudoku-rules].
- Le cifre in una gabbia, di solito contrassegnata da una linea tratteggiata, sommate danno il piccolo numero indicato nell'angolo della gabbia.
- Una cifra può comparire una sola volta in una gabbia.

Per una spiegazione più dettagliata, dai un'occhiata a [questa guida][killer-guide].

## Esempio 1: gabbia con una sola combinazione possibile

In una gabbia di 3 cifre con somma 7, c'è una sola combinazione valida: 124.

- 1 + 2 + 4 = 7
- Qualsiasi altra combinazione che dia come somma 7, ad esempio 232, violerebbe la regola che vieta di ripetere le cifre all'interno di una gabbia.

![Griglia di Sudoku con tre gabbie killer contrassegnate come raggruppate insieme.
La prima gabbia killer si trova nel riquadro 3×3 in alto a sinistra della griglia.
La colonna centrale di quel riquadro forma la gabbia, con le seguenti celle dall'alto verso il basso: la prima cella contiene un 1 e una nota a matita di 7, che indica una somma della gabbia pari a 7, la seconda cella contiene un 2, la terza cella contiene un 5.
I numeri sono evidenziati in rosso per indicare un errore.
La seconda gabbia killer si trova nel riquadro 3×3 centrale della griglia.
La colonna centrale di quel riquadro forma la gabbia, con le seguenti celle dall'alto verso il basso: la prima cella contiene un 1 e una nota a matita di 7, che indica una somma della gabbia pari a 7, la seconda cella contiene un 2, la terza cella contiene un 4.
Nessuno dei numeri in questa gabbia è evidenziato, quindi non contiene errori.
La terza gabbia killer segue l'angolo esterno del riquadro 3×3 centrale della griglia.
È formata dalle tre celle seguenti: la cella in alto a sinistra della gabbia contiene un 2, evidenziato in rosso, e una somma della gabbia di 7.
La cella in alto a destra della gabbia contiene un 3.
La cella in basso a destra della gabbia contiene un 2, evidenziato in rosso. Tutte le altre celle sono vuote.][one-solution-img]

## Esempio 2: gabbia con diverse combinazioni

In una gabbia di 2 cifre con somma 10, ci sono 4 possibili combinazioni:

- 19
- 28
- 37
- 46

![Griglia di Sudoku con tutte le caselle vuote tranne la colonna centrale, la colonna 5, che ha 8 righe riempite.
Ogni coppia di righe contigue forma una gabbia killer ed è contrassegnata come raggruppata insieme.
Dall'alto verso il basso: il primo gruppo è una cella con valore 1 e una nota a matita che indica una somma della gabbia di 10, e una cella con valore 9.
Il secondo gruppo è una cella con valore 2 e una nota a matita di 10, e una cella con valore 8.
Il terzo gruppo è una cella con valore 3 e una nota a matita di 10, e una cella con valore 7.
Il quarto gruppo è una cella con valore 4 e una nota a matita di 10, e una cella con valore 6.
L'ultima cella della colonna è vuota.][four-solutions-img]

## Esempio 3: gabbia con diverse combinazioni ma vincolata

In una gabbia di 2 cifre con somma 10, dove la colonna contiene già un 1 e un 4, ci sono 2 possibili combinazioni:

- 28
- 37

19 e 46 non sono possibili a causa dell'1 e del 4 presenti nella colonna, secondo le regole standard del Sudoku.

![Griglia di Sudoku con tutte le caselle vuote tranne la colonna centrale, la colonna 5, che ha 8 righe riempite.
La prima riga contiene un 4, la seconda è vuota e la terza contiene un 1.
L'1 è evidenziato in rosso per indicare un errore.
Le ultime 6 righe della colonna formano gabbie killer di due celle ciascuna.
Dall'alto verso il basso: il primo gruppo è una cella con valore 2 e una nota a matita che indica una somma della gabbia di 10, e una cella con valore 8.
Il secondo gruppo è una cella con valore 3 e una nota a matita di 10, e una cella con valore 7.
Il terzo gruppo è una cella con valore 1, evidenziato in rosso, e una nota a matita di 10, e una cella con valore 9.][not-possible-img]

## Provalo da solo

Se vuoi provare un Killer Sudoku alla portata di tutti, puoi cimentarti con [questo puzzle][clover-puzzle] di Clover, presentato da [Mark Goodliffe su Cracking The Cryptic il 21 giugno 2021][goodliffe-video].

Puoi anche trovare Killer Sudoku di difficoltà diverse in numerosi giornali, così come in app, libri e siti web di Sudoku.

## Crediti

Gli screenshot qui sopra sono stati generati con [F-Puzzles.com](https://www.f-puzzles.com/), uno strumento per creare puzzle di Eric Fox.

[sudoku-rules]: https://masteringsudoku.com/sudoku-rules-beginners/
[killer-guide]: https://masteringsudoku.com/killer-sudoku/
[one-solution-img]: https://assets.exercism.org/images/exercises/killer-sudoku-helper/example1.png
[four-solutions-img]: https://assets.exercism.org/images/exercises/killer-sudoku-helper/example2.png
[not-possible-img]: https://assets.exercism.org/images/exercises/killer-sudoku-helper/example3.png
[clover-puzzle]: https://app.crackingthecryptic.com/sudoku/HqTBn3Pr6R
[goodliffe-video]: https://youtu.be/c_NjEbFEeW0?t=1180
