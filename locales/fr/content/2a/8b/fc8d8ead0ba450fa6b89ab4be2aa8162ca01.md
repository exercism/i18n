# Indices

## Général

- [Tutoriel sur les dates et les heures par csharp.net][csharp.net-datetimes-working-with-datetimes-time]

## 1. Analyser la date du rendez-vous

- La classe `DateTime` propose plusieurs méthodes pour [analyser][docs.microsoft.com_parsing-date] une `string` en `DateTime`.

## 2. Vérifier si un rendez-vous est déjà passé

- Les objets `DateTime` peuvent être comparés à l'aide des [opérateurs de comparaison][docs.microsoft.com_datetime-operators] par défaut.
- Il existe une [propriété][docs.microsoft.com_datetime-properties] pour récupérer la date et l'heure actuelles.

## 3. Vérifier si le rendez-vous est dans l'après-midi

- On peut accéder à la partie heure d'un objet `DateTime` par l'une de ses [propriétés][docs.microsoft.com_datetime-properties].

## 4. Décrire l'heure et la date du rendez-vous

- Les tests s'exécutent comme s'ils tournaient sur une machine située aux États-Unis, ce qui signifie que la conversion d'un `DateTime` en `string` renverra les dates et les heures au format américain.
- Lorsque tu convertis une instance de `DateTime` en `string`, tu peux utiliser soit une [chaîne de format standard][docs.microsoft.com_standard-date-and-time-format-strings], soit une [chaîne de format personnalisée][docs.microsoft.com_custom-date-and-time-format-strings].

## 5. Renvoyer la date anniversaire

- Utilise l'un des différents [constructeurs][constructors] de `DateTime` pour créer une nouvelle instance de `DateTime`.
- Tu peux utiliser l'une des [propriétés][docs.microsoft.com_datetime-properties] de la date et de l'heure actuelles pour obtenir l'année en cours.

[docs.microsoft.com_parsing-date]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/parsing-datetime
[docs.microsoft.com_datetime-operators]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_datetime-properties]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_standard-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings
[docs.microsoft.com_custom-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings
[csharp.net-datetimes-working-with-datetimes-time]: https://csharp.net-tutorials.com/data-types/working-with-dates-time//
[constructors]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
