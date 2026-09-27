# Introducción

## Fichero

El módulo `File` proporciona las funciones para trabajar con ficheros.

Para leer un fichero completo, usa `File.read/1`. Para escribir en un fichero, usa `File.write/2`.

Cada vez que se escribe en un fichero con `File.write/2`, se abre un descriptor de fichero y se lanza un nuevo [proceso][exercism-processes] de Elixir. Por este motivo, conviene evitar escribir en un fichero dentro de un bucle con `File.write/2`.

En su lugar, puedes abrir un fichero con `File.open/2`. El segundo argumento de `File.open/2` es una lista de modos, que te permite especificar si quieres abrir el fichero para leer o para escribir.

`File.open/2` devuelve el PID de un proceso que se encarga del fichero. Para leer y escribir en el fichero, usa funciones del módulo `IO` y pasa este PID como dispositivo de E/S.

Cuando termines de trabajar con el fichero, ciérralo con `File.close/1`.

Todas las funciones mencionadas del módulo `File` también tienen una variante con `!` que lanza un error en lugar de devolver una tupla de error (por ejemplo, `File.read!/1`). Usa esa variante si no tienes intención de gestionar errores como ficheros que faltan o falta de permisos.

[exercism-processes]: https://exercism.org/tracks/elixir/concepts/processes
