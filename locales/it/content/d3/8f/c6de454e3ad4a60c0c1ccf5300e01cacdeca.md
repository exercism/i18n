# Informazioni

Coq è al tempo stesso un linguaggio di programmazione e un sistema logico, basato sulla [corrispondenza di Curry-Howard](https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence).
Per essere un sistema logico sensato, il linguaggio è progettato in modo che ogni programma scritto in Coq termini di sicuro.
Per questo motivo, Coq è raramente usato per scopi generali; al contrario, permette di sviluppare *teorie matematiche* e di scrivere *programmi certificati*.

Coq è anche un assistente alla dimostrazione interattivo.
Non risolve i teoremi in automatico, ma aiuta chi lo usa a costruire le dimostrazioni tramite le tattiche.
Il linguaggio delle tattiche (Ltac) è un linguaggio a sé stante, che permette di automatizzare alcune parti delle dimostrazioni.
Uno script di dimostrazione ben scritto assomiglia a una dimostrazione informale scritta in prosa.

Le principali aree di applicazione e di ricerca che usano Coq includono:

* La matematica (teoria dei numeri, teoria degli insiemi, teoria della logica, teoria della calcolabilità, algebra, geometria, ...)
* I linguaggi di programmazione (compilatori, modelli di esecuzione, ottimizzazioni dei compilatori, sistemi di tipi, ...)
* Gli algoritmi certificati (correttezza e terminazione degli algoritmi) e l'estrazione verso un linguaggio di uso generale (di solito Ocaml o Haskell)

Tra gli sviluppi degni di nota di Coq ci sono:

* La dimostrazione verificata al calcolatore del [problema dei quattro colori](https://madiot.fr/coq100/#32)
* [CompCert](http://compcert.inria.fr/compcert-C.html), un compilatore C certificato

Se Coq ti interessa ma non l'hai ancora imparato, spesso si consiglia di iniziare dalla serie [Software Foundations](https://softwarefoundations.cis.upenn.edu/).
In particolare i primi capitoli (fino a "IndProp") ti daranno le basi che ti servono prima di poter iniziare a lavorare su concetti e teorie più interessanti.
Potresti trovare interessanti anche [altre risorse](https://coq.inria.fr/documentation).

Le discussioni su Coq e sugli sviluppi che lo usano si svolgono di solito su [Reddit /r/coq](https://www.reddit.com/r/Coq/) e su [Discourse](https://coq.discourse.group/latest).
Se hai domande, puoi trovare aiuto anche su [StackOverflow](https://stackoverflow.com/questions/tagged/coq?sort=newest&pageSize=50); non dimenticare di aggiungere il tag "coq" alla tua domanda.