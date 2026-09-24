# Підказки

## 1. Обчисліть дату річниці гігасекунди

- Універсальний час - це кількість секунд від епохи.
- У Common Lisp є пара функцій, які можуть закодувати або декодувати універсальний час.
- Кілька значень із функції можна зібрати в список за допомогою відповідного макросу.
- Хоча параметри часового поясу [`decode-universal-time`][hyperspec-decode-universal-time] і [`encode-universal-time`][hyperspec-encode-universla-time] необовʼязкові, вони важливі. Які їхні типові значення?

[hyperspec-decode-universal-time]: http://www.lispworks.com/documentation/HyperSpec/Body/f_dec_un.htm#decode-universal-time
[hyperspec-encode-universal-time]: http://www.lispworks.com/documentation/HyperSpec/Body/f_encode.htm#encode-universal-time
