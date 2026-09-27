# Istruzioni

Lavori nell'ufficio comunale da un po' di tempo e hai sviluppato una serie di strumenti che velocizzano il lavoro di ogni giorno, per esempio quando compili i moduli.

Ora sta arrivando un nuovo collega e ti sei reso conto che i tuoi strumenti potrebbero non essere autoesplicativi.
Nel tuo ufficio ci sono molte convenzioni strane, come compilare sempre i moduli con lettere maiuscole ed evitare di lasciare campi vuoti.

Come primo passo decidi di aggiungere le dichiarazioni di tipo di PHP, così che il nuovo collega possa iniziare subito a usare i tuoi strumenti.

## 1. Dichiara i tipi per la classe Address

Aggiungi le dichiarazioni del tipo di proprietà a ognuna delle proprietà dichiarate della classe `Address`.
Ogni proprietà della classe va dichiarata come stringa.

## 2. Dichiara i tipi per compilare il modulo con valori vuoti

Aggiungi una dichiarazione del tipo di un parametro e una dichiarazione del tipo restituito al metodo `blanks` della classe `Form`.
Il metodo deve ricevere una lunghezza intera e restituire una rappresentazione sotto forma di stringa della riga vuota.

## 3. Dichiara il tipo quando dividi un valore in lettere separate

Aggiungi una dichiarazione del tipo di un parametro e una dichiarazione del tipo restituito al metodo `letters` della classe `Form`.
Il metodo deve ricevere una stringa, che rappresenta delle parole, e restituire un array di lettere.

## 4. Dichiara il tipo quando controlli se un valore entra in un modulo

Aggiungi le dichiarazioni del tipo dei parametri e una dichiarazione del tipo restituito al metodo `checkLength` della classe `Form`.
Il metodo deve ricevere una parola sotto forma di stringa e una lunghezza massima intera, e restituire un valore vero o falso.

## 5. Dichiara il tipo quando formatti un indirizzo nel modulo

Aggiungi una dichiarazione del tipo di un parametro, facendo uso della classe `Address` aggiornata in precedenza, e una dichiarazione del tipo restituito al metodo `formatAddress` della classe `Form`.
Il metodo deve ricevere un `Address` e restituire una stringa formattata.
