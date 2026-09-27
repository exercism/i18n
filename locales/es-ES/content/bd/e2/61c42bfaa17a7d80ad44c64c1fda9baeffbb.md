# Acerca de

Un vocabulario es la unidad de organización en Factor: una colección con nombre de definiciones de palabras.

```factor
USING: kernel ;
IN: greetings.formal

: hello ( name -- str ) "Greetings, " prepend ;
```

## Estructura de ficheros y directorios

Los nombres de vocabulario usan `.` como separador. La ruta sigue los puntos:

| Vocabulario            | Fichero                                    |
| ---                    | ---                                        |
| `greetings`            | `greetings/greetings.factor`               |
| `greetings.formal`     | `greetings/formal/formal.factor`           |
| `greetings.casual`     | `greetings/casual/casual.factor`           |

El cargador de Factor busca los vocabularios recorriendo las *raíces de vocabulario*, la raíz del proyecto y la biblioteca basis incluida, hasta encontrar un directorio cuyo nombre coincida con cada segmento de la ruta. El último segmento se repite como nombre del fichero.

## `USING:` e `IN:`

`USING:` (junto con `USE:` para un vocabulario a la vez) incorpora otros vocabularios a la ruta de búsqueda del fichero actual. `IN:` declara a qué vocabulario *pertenecen* las palabras definidas en este fichero: sus nombres completamente cualificados empiezan por ese prefijo.

```factor
USING: kernel sequences greetings.formal ;
IN: greetings

: greet-everyone ( names -- strs )
    [ hello ] map ;
```

Aquí `greet-everyone` está en `greetings`, llama a `hello` de `greetings.formal` y a `map` de `sequences`.

## Por qué dividir una solución en varios vocabularios

Dividir el código en varios vocabularios te permite:

- Agrupar pequeñas palabras auxiliares por responsabilidad, lejos de la rutina de alto nivel que las compone.
- Reutilizar las auxiliares desde otros sitios sin arrastrar la rutina principal.
- Leer cada fichero como una única capa de abstracción coherente.

El cargador de Factor es lo bastante rápido y perezoso como para que dividir *hacia abajo* en vocabularios más pequeños salga barato; la convención de la biblioteca estándar es factorizar de forma agresiva.
