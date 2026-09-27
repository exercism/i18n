# Informazioni

[Pony](http://www.ponylang.org) è un linguaggio di programmazione orientato agli oggetti, basato sul modello ad attori e sicuro rispetto alle capability, pensato per portare a termine le cose.

È orientato agli oggetti perché ha classi e oggetti, come Python, Java, C++ e molti altri linguaggi. È basato sul modello ad attori perché ha gli attori (simili a quelli di Erlang o Akka). Gli attori si comportano come gli oggetti, ma possono anche eseguire codice in modo asincrono. Gli attori rendono Pony fantastico.
Quando diciamo che Pony è sicuro rispetto alle capability, intendiamo alcune cose:

- È type safe. Davvero type safe. Esiste persino una dimostrazione matematica.
- È sicuro rispetto alla memoria. Va bene, questo deriva dal type safe, ma resta comunque interessante. Non ci sono puntatori penzolanti, nessun buffer overflow, e pensa che il linguaggio non ha nemmeno il concetto di null!
- È sicuro rispetto alle eccezioni. Non ci sono eccezioni a runtime. Tutte le eccezioni hanno una semantica definita e vengono sempre gestite.
- È privo di data race. Pony non ha lock, operazioni atomiche o cose del genere. Al contrario, il sistema dei tipi garantisce in fase di compilazione che un programma concorrente non possa mai avere data race. Così puoi scrivere codice altamente concorrente senza mai sbagliare.
- È privo di deadlock. Questo è facile, perché Pony non ha alcun lock! Quindi non possono certo andare in deadlock, perché i lock non esistono.

Chi è alle prime armi dovrebbe iniziare dal [tutorial](https://tutorial.ponylang.org/).
