# Suggerimenti

## 1. Calcola la data dell'anniversario del gigasecond

- Un universal time è un numero di secondi a partire dall'epoca.
- Common Lisp ha una coppia di funzioni che possono codificare o decodificare un universal time.
- I valori multipli restituiti da una funzione si possono catturare in una lista con l'uso della macro giusta.
- Anche se i parametri del fuso orario di [`decode-universal-time`][hyperspec-decode-universal-time] e di [`encode-universal-time`][hyperspec-encode-universla-time] sono opzionali, sono importanti. Quali sono i loro valori predefiniti?

[hyperspec-decode-universal-time]: http://www.lispworks.com/documentation/HyperSpec/Body/f_dec_un.htm#decode-universal-time
[hyperspec-encode-universal-time]: http://www.lispworks.com/documentation/HyperSpec/Body/f_encode.htm#encode-universal-time
