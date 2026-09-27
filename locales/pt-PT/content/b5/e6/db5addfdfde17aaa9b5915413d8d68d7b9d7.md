# Dicas

## 1. Calcula a data do aniversário do gigassegundo

- Um tempo universal é um número de segundos desde a época.
- O Common Lisp tem um par de funções que conseguem codificar ou descodificar um 
tempo universal.
- É possível recolher vários valores de uma função numa lista recorrendo ao macro certo.
- Embora o parâmetro de fuso horário de [`decode-universal-time`][hyperspec-decode-universal-time] e de [`encode-universal-time`][hyperspec-encode-universla-time] seja opcional, é importante. Quais são os valores por omissão?

[hyperspec-decode-universal-time]: http://www.lispworks.com/documentation/HyperSpec/Body/f_dec_un.htm#decode-universal-time
[hyperspec-encode-universal-time]: http://www.lispworks.com/documentation/HyperSpec/Body/f_encode.htm#encode-universal-time
