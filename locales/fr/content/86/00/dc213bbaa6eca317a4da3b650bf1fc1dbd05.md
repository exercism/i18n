# Indices

## Généralités

N'utilise que des _f-strings_ ou la méthode `format()` pour construire un dépliant contenant les informations de base sur un événement.

- [Introduction au formatage de chaînes de caractères en Python][str-f-strings-docs]
- [Article sur realpython.com][realpython-article]

## 1. Mets une majuscule à l'en-tête

- Mets une majuscule au titre à l'aide de la méthode `capitalize` des chaînes de caractères.

## 2. Formate la date

- La `date` doit être formatée manuellement à l'aide de `f''` ou de `''.format()`.
- La `date` doit utiliser ce format : 'Month day, year'.

## 3. Affiche les caractères unicode sous forme d'icônes

- Une façon d'afficher avec `format` serait d'utiliser le préfixe unicode `u'{}'`.

## 4. Affiche le dépliant terminé

- Trouve le bon [champ format_spec][formatspec-docs] pour aligner les astérisques et les caractères.
- La section 1 est le `header`, avec une majuscule initiale.
- La section 2 est la `date`.
- La section 3 est la liste des artistes, chaque artiste étant associé au caractère unicode qui a le même indice.
- Chaque ligne doit contenir 20 caractères.
- Écris du code concis pour ajouter les lignes vides nécessaires entre chaque section.
- Si la date n'est pas fournie, remplace-la par une ligne vide.

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
