# Pistas

## General

Usa solo f-strings o el método `format()` para construir un folleto que contenga información básica sobre un evento.

- [Introducción al formateo de strings en Python][str-f-strings-docs]
- [Artículo en realpython.com][realpython-article]

## 1. Capitalizar el encabezado

- Capitaliza el título usando el método `capitalize` de str.

## 2. Formatear la fecha

- La `date` se debe formatear manualmente usando `f''` o `''.format()`.
- La `date` debe usar este formato: «Month day, year».

## 3. Renderizar los caracteres unicode como íconos

- Una forma de renderizar con `format` sería usar el prefijo unicode `u'{}'`.

## 4. Mostrar el folleto terminado

- Encuentra el [campo format_spec][formatspec-docs] correcto para alinear los asteriscos y los caracteres.
- La sección 1 es el `header` como un string capitalizado.
- La sección 2 es la `date`.
- La sección 3 es la lista de artistas. Cada artista está asociado con el carácter unicode que tiene el mismo índice.
- Cada línea debe contener 20 caracteres.
- Escribe código conciso para agregar las líneas vacías necesarias entre cada sección.
- Si no se proporciona la fecha, reemplázala con una línea en blanco.

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
