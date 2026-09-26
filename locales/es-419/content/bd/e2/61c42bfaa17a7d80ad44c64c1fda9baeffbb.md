# Acerca de

Un vocabulario es la unidad de organización en Factor: una colección con nombre de definiciones de palabras.

```factor
USING: kernel ;
IN: greetings.formal

: hello ( name -- str ) "Greetings, " prepend ;
```

## Estructura de archivos y directorios

Los nombres de los vocabularios usan `.` como separador. La ruta sigue los puntos:

| Vocabulario             | Archivo                                    |
| ---                    | ---                                        |
| `greetings`            | `greetings/greetings.factor`               |
| `greetings.formal`     | `greetings/formal/formal.factor`           |
| `greetings.casual`     | `greetings/casual/casual.factor`           |

El cargador de Factor busca los vocabularios recorriendo las *raíces de vocabularios* (la raíz del proyecto y la biblioteca basis incluida) hasta encontrar un directorio cuyo nombre coincida con cada segmento de la ruta. El segmento final se repite como nombre del archivo.

## `USING:` e `IN:`

`USING:` (junto con `USE:` para un vocabulario a la vez) incorpora otros vocabularios a la ruta de búsqueda del archivo actual. `IN:` declara a qué vocabulario *pertenecen* las palabras definidas en este archivo: sus nombres completamente cualificados comienzan con ese prefijo.

```factor
USING: kernel sequences greetings.formal ;
IN: greetings

: greet-everyone ( names -- strs )
    [ hello ] map ;
```

Aquí `greet-everyone` está en `greetings`, llama a `hello` de `greetings.formal` y a `map` de `sequences`.

## Por qué dividir una solución entre vocabularios

Dividir el código entre vocabularios te permite:

- Agrupar palabras auxiliares pequeñas por responsabilidad, lejos de la rutina de alto nivel que las compone.
- Reutilizar las palabras auxiliares desde otros lugares sin arrastrar la rutina principal.
- Leer cada archivo como una única capa coherente de abstracción.

El cargador de Factor es lo bastante rápido y perezoso como para que dividir *hacia abajo* en vocabularios más pequeños sea barato; la convención en la biblioteca estándar es factorizar de forma agresiva.
