# Pistas

## General

Usa solo f-strings o el método `format()` para crear un folleto con la información básica de un evento.

- [Introducción al formato de cadenas en Python][str-f-strings-docs]
- [Artículo en realpython.com][realpython-article]

## 1. Capitaliza el encabezado

- Usa el método `capitalize` para capitalizar el título.

## 2. Da formato a la fecha

- La `date` debe formatearse manualmente con `f''` o `''.format()`.
- La `date` debe usar este formato: «Month day, year».

## 3. Representa los caracteres unicode como iconos

- Una forma de representarlo con `format` sería usar el prefijo unicode `u'{}'`.

## 4. Muestra el folleto terminado

- Encuentra el [campo format_spec][formatspec-docs] adecuado para alinear los asteriscos y los caracteres.
- La sección 1 es el `header` como string capitalizado.
- La sección 2 es la `date`.
- La sección 3 es la lista de artistas; cada artista está asociado con el carácter unicode que tiene el mismo índice.
- Cada línea debe contener 20 caracteres.
- Escribe código conciso para añadir las líneas vacías necesarias entre cada sección.
- Si no se indica la fecha, sustitúyela por una línea en blanco.

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
