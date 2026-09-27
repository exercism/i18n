# Consigli

## Generale

Usa solo le f-string o il metodo `format()` per costruire un volantino con le informazioni di base su un evento.

- [Introduzione alla formattazione delle stringhe in Python][str-f-strings-docs]
- [Articolo su realpython.com][realpython-article]

## 1. Metti in maiuscolo l'intestazione

- Metti in maiuscolo il titolo usando il metodo `capitalize` delle stringhe.

## 2. Formatta la data

- La `date` dovrebbe essere formattata manualmente, usando `f''` o `''.format()`.
- La `date` dovrebbe usare questo formato: 'Month day, year'.

## 3. Renderizza i caratteri unicode come icone

- Un modo per renderizzare con `format` sarebbe usare il prefisso unicode `u'{}'`.

## 4. Mostra il volantino finito

- Trova il giusto [campo format_spec][formatspec-docs] per allineare gli asterischi e i caratteri.
- La sezione 1 è l'`header`, come stringa con la prima lettera maiuscola.
- La sezione 2 è la `date`.
- La sezione 3 è la lista degli artisti, e ogni artista è associato al carattere unicode che ha lo stesso indice.
- Ogni riga dovrebbe contenere 20 caratteri.
- Scrivi un codice conciso per aggiungere le righe vuote necessarie tra una sezione e l'altra.
- Se la data non è indicata, sostituiscila con una riga vuota.

```python
******************** # 20 asterisks
*                  *
*     'Header'     * # capitalized header
*                  *
* Month day, year  * # Optional date
*                  *
* Artist1       ⑴ * # Artist list from 1 to 4
* Artist2       ⑵ *
* Artist3       ⑶ *
* Artist4       ⑷ *
*                  *
********************
```

[str-f-strings-docs]: https://docs.python.org/3/reference/lexical_analysis.html#f-strings
[realpython-article]: https://realpython.com/python-formatted-output/
[formatspec-docs]: https://docs.python.org/3/library/string.html#formatspec
