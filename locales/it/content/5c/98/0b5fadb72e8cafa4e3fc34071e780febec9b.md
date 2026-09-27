# Introduzione

Un numero in virgola mobile è un numero con zero o più cifre dopo il separatore decimale. Ne sono esempi `-2.4`, `0.1`, `3.14`, `16.984025` e `1024.0`.

Diversi tipi in virgola mobile possono memorizzare un numero diverso di cifre dopo il separatore decimale: questa caratteristica è detta precisione.

C# ha tre tipi in virgola mobile:

- `float`: 4 byte (precisione di circa 6-9 cifre). Si scrive `2.45f`.
- `double`: 8 byte (precisione di circa 15-17 cifre). Questo è il tipo più comune. Si scrive `2.45` o `2.45d`.
- `decimal`: 16 byte (precisione di 28-29 cifre). Normalmente viene usato quando si lavora con dati monetari, poiché la sua precisione comporta meno errori di arrotondamento. Si scrive `2.45m`.

Come si può vedere, ogni tipo può memorizzare un numero diverso di cifre. Questo significa che provando a memorizzare il pi greco in un `float` verranno memorizzate solo le prime 6-9 cifre (con l'ultima cifra che viene arrotondata).
