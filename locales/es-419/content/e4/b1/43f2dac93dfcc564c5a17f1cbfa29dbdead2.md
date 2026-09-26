# Instrucciones

Cuenta los puntos anotados en un tablero de Go.

En el juego de go (también conocido como baduk, igo, cờ vây y wéiqí) se ganan puntos al rodear por completo intersecciones vacías con tus piedras.
Las intersecciones rodeadas de un jugador se conocen como su territorio.

Calcula el territorio de cada jugador.
Puedes suponer que las piedras que quedaron atrapadas en territorio enemigo ya se retiraron del tablero.

Determina el territorio que incluye una coordenada específica.

Se pueden rodear varias intersecciones vacías a la vez, y para rodear solo cuentan los vecinos horizontales y verticales.
En el siguiente diagrama, las piedras que importan están marcadas con «O» y las que no, con «I» (ignoradas).
Los espacios vacíos representan intersecciones vacías.

```text
+----+
|IOOI|
|O  O|
|O OI|
|IOI |
+----+
```

Para ser más precisos, una intersección vacía forma parte del territorio de un jugador si todos sus vecinos son piedras de ese jugador o intersecciones vacías que forman parte del territorio de ese jugador.

Para más información, consulta [Wikipedia][go-wikipedia] o [Sensei's Library][go-sensei].

[go-wikipedia]: https://en.wikipedia.org/wiki/Go_%28game%29
[go-sensei]: https://senseis.xmp.net/
