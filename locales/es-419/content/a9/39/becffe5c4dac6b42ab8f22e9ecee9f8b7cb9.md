# Formatear archivos JSON

Un repositorio de track de Exercism tiene muchos archivos JSON, entre ellos:

- El archivo `config.json` del track.
- Para cada concepto, un archivo `.meta/config.json` y un archivo `links.json`.
- Para cada ejercicio de concepto o ejercicio de práctica, un archivo `.meta/config.json`.

Estos archivos son más legibles si tienen un formato consistente en todo Exercism, por lo que configlet tiene un comando `fmt` para reescribir los archivos JSON de un track en una forma canónica.

El comando `fmt` formatea los siguientes archivos:

- `config.json`
- `exercises/{concept,practice}/*/.approaches/config.json`
- `exercises/{concept,practice}/*/.articles/config.json`
- `exercises/{concept,practice}/*/.meta/config.json`

## Uso

El comando `fmt` formatea los archivos «meta/config.json» de los ejercicios.

```
configlet [global-options] fmt [command-options]

Global options:
  -h, --help                   Show this help message and exit
      --version                Show this tool's version information and exit
  -t, --track-dir <dir>        Specify a track directory to use instead of the current directory
  -v, --verbosity <verbosity>  The verbosity of output. Allowed values: q[uiet], n[ormal], d[etailed]

Options for fmt:
  -e, --exercise <slug>        Only operate on this exercise
  -u, --update                 Prompt to write formatted files
  -y, --yes                    Auto-confirm the prompt from --update
```

Un simple `configlet fmt` no hace cambios en el track y verifica el formato del archivo `.meta/config.json` de cada ejercicio de concepto y ejercicio de práctica, y del archivo `config.json` del track.

Para imprimir una lista de rutas para las que todavía no existe un archivo `.meta/config.json` de ejercicio con formato (saliendo con un código de salida distinto de cero si al menos un ejercicio carece de un archivo de configuración con formato):

```shell
configlet fmt
```

Para que se te pida escribir los archivos de configuración con formato, agrega la opción `--update` (o `-u` para abreviar):

```shell
configlet fmt --update
```

Para escribir los archivos de configuración con formato sin interacción, agrega la opción `--yes` (o `-y` para abreviar):

```shell
configlet fmt --update --yes
```

Para operar sobre un solo ejercicio, usa la opción `--exercise` (o `-e` para abreviar).
Por ejemplo, para escribir sin interacción el archivo de configuración con formato del ejercicio `prime-factors`:

```shell
configlet fmt -uy -e prime-factors
```

Al escribir archivos JSON, `configlet fmt` hará lo siguiente:

- Escribir los pares clave/valor en el orden canónico.

- Usar dos espacios para la indentación.

- Usar una línea aparte para cada elemento de un array JSON y para cada clave de un objeto JSON.

- Eliminar los pares clave/valor de las claves que son opcionales y tienen valores vacíos.
  Por ejemplo, se elimina `"source": ""`.

- Eliminar `"test_runner": true` de los archivos de configuración de los ejercicios de práctica.
  Esta es una clave opcional: la especificación dice que una clave `test_runner` omitida implica el valor `true`.

- Cuando un objeto JSON tiene más de un par clave/valor con el mismo nombre de clave, conservar solo el último.

El orden canónico de las claves de un archivo `.meta/config.json` de ejercicio es:

```text
- authors
- [contributors]
- files
  - solution
  - test
  - exemplar           (Concept Exercises only)
  - example            (Practice Exercises only)
  - [editor]
  - [invalidator]
- [language_versions]
- [forked_from]        (Concept Exercises only)
- [icon]               (Concept Exercises only)
- [test_runner]        (Practice Exercises only)
- blurb
- [source]
- [source_url]
- [custom]
```

donde los corchetes indican que la clave encerrada es opcional.

Ten en cuenta que `configlet fmt` solo opera sobre los ejercicios que existen en el archivo `config.json` de nivel de track.
Por lo tanto, si estás implementando un ejercicio nuevo en un track y quieres formatear su archivo `.meta/config.json`, primero agrega el ejercicio al archivo `config.json` de nivel de track.
Si el ejercicio aún no está listo para mostrarse a los usuarios, asigna el valor `wip` a su `status`.

El código de salida es 0 cuando todos los archivos de configuración que configlet ha visto están formateados al terminar, y 1 en caso contrario.
