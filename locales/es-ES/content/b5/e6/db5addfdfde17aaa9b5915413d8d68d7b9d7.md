# Pistas

## 1. Calcula la fecha del aniversario del gigasegundo

- Un universal time es un número de segundos transcurridos desde el epoch.
- Common Lisp tiene un par de funciones que pueden codificar o decodificar un universal time.
- Los múltiples valores que devuelve una función se pueden capturar en una lista con el uso de la macro adecuada.
- Aunque el parámetro de zona horaria de [`decode-universal-time`][hyperspec-decode-universal-time] y [`encode-universal-time`][hyperspec-encode-universla-time] es opcional, es importante. ¿Cuáles son sus valores por defecto?

[hyperspec-decode-universal-time]: http://www.lispworks.com/documentation/HyperSpec/Body/f_dec_un.htm#decode-universal-time
[hyperspec-encode-universal-time]: http://www.lispworks.com/documentation/HyperSpec/Body/f_encode.htm#encode-universal-time
