# Tipps

## Allgemein

Verwende nur f-Strings oder die Methode `format()`, um einen Flyer mit den grundlegenden Informationen zu einem Event zu erstellen.

- [Einführung in die String-Formatierung in Python][str-f-strings-docs]
- [Artikel auf realpython.com][realpython-article]

## 1. Den Header großschreiben

- Schreibe den Titel mit der `str`-Methode `capitalize` groß.

## 2. Das Datum formatieren

- Das `date` sollte manuell mit `f''` oder `''.format()` formatiert werden.
- Das `date` sollte dieses Format verwenden: 'Month day, year'.

## 3. Die Unicode-Zeichen als Icons darstellen

- Eine Möglichkeit, mit `format` zu rendern, wäre das Unicode-Präfix `u'{}'`.

## 4. Den fertigen Flyer ausgeben

- Finde das richtige [format_spec-Feld][formatspec-docs], um die Sternchen und Zeichen auszurichten.
- Abschnitt 1 ist der `header` als großgeschriebener String.
- Abschnitt 2 ist das `date`.
- Abschnitt 3 ist die Liste der Künstler, wobei jeder Künstler dem Unicode-Zeichen mit demselben Index zugeordnet ist.
- Jede Zeile sollte 20 Zeichen enthalten.
- Schreibe prägnanten Code, um die nötigen Leerzeilen zwischen den Abschnitten einzufügen.
- Wenn das Datum nicht angegeben ist, ersetze es durch eine Leerzeile.

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
