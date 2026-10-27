# Pistas

## General

- En el tipo `Node` que se proporciona, `left : Tree ?? Empty` declara un campo cuyo valor predeterminado es `Empty`.
  Puedes omitir ese campo al construir un nodo, y al leerlo sigues obteniendo un `Tree`.
  Esto es distinto de un campo opcional declarado con `?:`, cuya presencia hay que comprobar.
