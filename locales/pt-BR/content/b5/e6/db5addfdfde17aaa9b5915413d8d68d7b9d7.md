# Dicas

## 1. Calcule a data do aniversário de um gigassegundo

- Um horário universal é um número de segundos desde a época.
- Common Lisp tem um par de funções que podem codificar ou decodificar um horário universal
- Vários valores de uma função podem ser capturados em uma lista com o uso da macro certa.
- Embora os parâmetros de fuso horário de [`decode-universal-time`][hyperspec-decode-universal-time] e [`encode-universal-time`][hyperspec-encode-universla-time] sejam opcionais, eles são importantes. Quais são os valores padrão deles?

[hyperspec-decode-universal-time]: http://www.lispworks.com/documentation/HyperSpec/Body/f_dec_un.htm#decode-universal-time
[hyperspec-encode-universal-time]: http://www.lispworks.com/documentation/HyperSpec/Body/f_encode.htm#encode-universal-time
