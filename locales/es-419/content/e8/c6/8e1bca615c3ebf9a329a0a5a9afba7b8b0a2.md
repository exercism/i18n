# Buenas prácticas

## Sigue las buenas prácticas oficiales

Las [buenas prácticas oficiales para Dockerfile](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) tienen muchísimo contenido excelente sobre cómo mejorar tus Dockerfiles.

## Rendimiento

Deberías optimizar principalmente el rendimiento (sobre todo en el caso de los test runners).
Así te asegurarás de que tus herramientas se ejecuten lo más rápido posible y no expiren por límite de tiempo.

### Mide

Medir el tiempo de ejecución con frecuencia es una excelente manera de hacerte una idea del rendimiento de tus herramientas.
Haz que sea un hábito medir el tiempo de ejecución tanto después _como_ antes de un cambio.
Incluso cuando sientes «cierto» que un cambio va a mejorar el rendimiento, igual deberías medir el tiempo de ejecución.

#### Scripts

Cuando sea posible, crea scripts para medir el rendimiento automáticamente (también conocido como _benchmarking_).
Una herramienta de línea de comandos muy útil es [hyperfine](https://github.com/sharkdp/hyperfine), pero siéntete libre de usar lo que tenga más sentido para tus herramientas.

Los repositorios de herramientas de track más nuevos tendrán acceso a los siguientes dos scripts:

1. `./bin/benchmark.sh`: mide el rendimiento del código de las herramientas del track ([código fuente](https://github.com/exercism/generic-test-runner/blob/main/bin/benchmark.sh))
2. `./bin/benchmark-in-docker.sh`: mide el rendimiento de la imagen Docker de las herramientas del track ([código fuente](https://github.com/exercism/generic-test-runner/blob/main/bin/benchmark-in-docker.sh))

```exercism/note
Si estás trabajando en un repositorio de herramientas de track que no tiene estos archivos, siéntete libre de copiarlos a tu repositorio usando los enlaces al código fuente de arriba.
```

```exercism/caution
Los scripts de benchmarking pueden ayudar a estimar el rendimiento de las herramientas.
Ten en cuenta, eso sí, que el rendimiento en los servidores de producción de Exercism suele ser menor.
```

### Experimenta con distintas imágenes base

Prueba a experimentar con distintas imágenes base (por ejemplo, Alpine en lugar de Ubuntu), para ver si una supera (significativamente) a la otra.
Si el rendimiento es más o menos igual, elige la imagen que sea más pequeña.

### Prueba con la red interna

Comprueba si usar la red `internal` en lugar de `none` mejora el rendimiento.
Consulta la [documentación sobre redes](/docs/building/tooling/docker#network) para más información.

### Prefiere los comandos en tiempo de construcción sobre los de tiempo de ejecución

Las herramientas del track ejecutan un contenedor Docker único y de corta duración que lleva a cabo los siguientes pasos.

1. Se crea un contenedor Docker.
2. El contenedor Docker se ejecuta con los argumentos correctos.
3. El contenedor Docker se destruye.

Por lo tanto, el código que se ejecuta en el paso 2 se ejecuta en _todas y cada una de las ejecuciones_ de las herramientas.
Por este motivo, reducir la cantidad de código que se ejecuta en el paso 2 es una excelente manera de mejorar el rendimiento.
Una forma de lograrlo es trasladar código del _tiempo de ejecución_ al _tiempo de construcción_.
Mientras que el código de tiempo de ejecución se ejecuta en todas y cada una de las ejecuciones de las herramientas, el código de tiempo de construcción solo se ejecuta una vez (cuando se construye la imagen Docker).

El código de tiempo de construcción se ejecuta una vez como parte de un flujo de trabajo de GitHub Actions.
Por lo tanto, no hay problema si el código que se ejecuta en tiempo de construcción es (relativamente) lento.

#### Ejemplo: precompilar bibliotecas

Al ejecutar las pruebas en el test runner de Haskell, este necesita que se compilen algunas bibliotecas base.
Como cada ejecución de pruebas ocurre en un contenedor nuevo, ¡esto significa que esa compilación se hacía _en todas y cada una de las ejecuciones de pruebas_!
Para evitar esto, el [Dockerfile del test runner de Haskell](https://github.com/exercism/haskell-test-runner/blob/5264c460054649fc672c3d5932c2f3cb082e2405/Dockerfile) tiene los siguientes dos comandos:

```dockerfile
COPY pre-compiled/ .
RUN stack build --resolver lts-20.18 --no-terminal --test --no-run-tests
```

Primero, el directorio `pre-compiled` se copia en la imagen.
Este directorio está configurado como un ejercicio de prueba y depende de las mismas bibliotecas base de las que depende el ejercicio real.
Luego ejecutamos las pruebas sobre ese directorio, de forma similar a como se ejecutan las pruebas de un ejercicio real.
Ejecutar las pruebas hará que se compile la base, pero la diferencia es que esto ocurre en _tiempo de construcción_.
Así, la imagen Docker resultante tendrá sus bibliotecas base ya compiladas.
Esto significa que no hace falta compilar en _tiempo de ejecución_, lo que da como resultado una ejecución (mucho) más rápida.

#### Ejemplo: precompilar binarios

Algunos lenguajes permiten compilar el código por adelantado o en el momento.
Esto es una disyuntiva entre tiempo de construcción y tiempo de ejecución y, de nuevo, preferimos la ejecución en tiempo de construcción por motivos de rendimiento.

El [Dockerfile del test runner de C#](https://github.com/exercism/csharp-test-runner/blob/b54122ef76cbf86eff0691daa33c8e50bc83979f/Dockerfile) usa este enfoque, donde el test runner se compila a un binario por adelantado (en tiempo de construcción) en lugar de compilar el código en el momento (en tiempo de ejecución).
Esto significa que hay menos trabajo por hacer en tiempo de ejecución, lo que debería ayudar a aumentar el rendimiento.

## Tamaño

Deberías intentar reducir el tamaño de la imagen, lo que significa que esta:

- Se desplegará más rápido
- Reducirá los costos para nosotros
- Mejorará el tiempo de arranque de cada contenedor

### Prueba con distintas distribuciones

Las distintas imágenes de distribución tendrán tamaños distintos.
Por ejemplo, la imagen `alpine:3.20.2` es **diez veces** más pequeña que la imagen `ubuntu:24.10`:

```
REPOSITORY   TAG       SIZE
alpine       3.20.2    8.83MB
ubuntu       24.10     101MB
```

En general, las imágenes basadas en Alpine están entre las más pequeñas, así que muchas imágenes de herramientas se basan en Alpine.

### Prueba con imágenes reducidas

Algunas imágenes tienen variantes «slim» especiales, en las que se han eliminado algunas funcionalidades, lo que da como resultado imágenes más pequeñas.
Por ejemplo, la imagen `node:20.16.0-slim` es **cinco veces** más pequeña que la imagen `node:20.16.0`:

```
REPOSITORY   TAG            SIZE
node         20.16.0        1.09GB
node         20.16.0-slim   219MB
```

La razón por la que las variantes «slim» son más pequeñas es que tienen menos funcionalidades.
Puede que tu imagen no necesite esas funcionalidades adicionales y, si no las necesita, considera usar la variante «slim».

### Elimina lo que no necesitas

Una manera obvia, pero excelente, de reducir el tamaño de tu imagen es eliminar todo lo que no necesites.
Esto puede incluir cosas como:

- Archivos fuente que ya no se necesitan después de compilar un binario a partir de ellos
- Archivos orientados a arquitecturas distintas de las de la imagen Docker
- Documentación

#### Elimina los archivos del gestor de paquetes

La mayoría de las imágenes Docker necesitan instalar paquetes adicionales, lo que normalmente se hace a través de un gestor de paquetes.
Estos paquetes deben instalarse en _tiempo de construcción_ (ya que no hay conexión a internet disponible en _tiempo de ejecución_).
Por lo tanto, cualquier archivo de caché o de registro del gestor de paquetes debería eliminarse después de instalar los paquetes adicionales.

##### apk

Las distribuciones que usan el gestor de paquetes `apk` (como Alpine) deberían usar la opción `--no-cache` al usar `apk add` para instalar paquetes:

```dockerfile
RUN apk add --no-cache curl
```

##### apt-get/apt

Las distribuciones que usan el gestor de paquetes `apt-get`/`apk` (como Ubuntu) deberían ejecutar los comandos `apt-get autoremove -y` y `rm -rf /var/lib/apt/lists/*` _después_ de instalar los paquetes y en el mismo comando `RUN`:

```dockerfile
RUN apt-get update && \
    apt-get install curl -y && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*
```

### Usa compilaciones en varias etapas

Docker tiene una funcionalidad llamada [compilaciones en varias etapas](https://docs.docker.com/build/building/multi-stage/).
Estas te permiten dividir tu Dockerfile en _etapas_ separadas, y solo la última etapa termina en la imagen Docker producida (el resto solo está ahí para ayudar a construir la última etapa).
Puedes pensar en cada etapa como su propio mini Dockerfile; las etapas pueden usar imágenes base distintas.

Las compilaciones en varias etapas son especialmente útiles cuando tu Dockerfile necesita instalar paquetes que _solo_ se necesitan en tiempo de construcción.
En esta situación, la estructura general de tu Dockerfile se ve así:

1. Define una nueva etapa (la llamaremos la etapa «build»).
   Esta etapa _solo_ se usará en tiempo de construcción.
2. Instala los paquetes adicionales necesarios (en la etapa «build»).
3. Ejecuta los comandos que requieren los paquetes adicionales (dentro de la etapa «build»).
4. Define una nueva etapa (la llamaremos la etapa «runtime»).
   Esta etapa formará la imagen Docker resultante y se ejecutará en tiempo de ejecución.
5. Copia el resultado o los resultados de los comandos ejecutados en el paso 3 (en la etapa «build») a esta etapa (la etapa «runtime»).

Con esta configuración, los paquetes adicionales se instalan _solo_ en la etapa «build» y _no_ en la etapa «runtime», lo que significa que no terminarán en la imagen Docker que se produce.

#### Ejemplo: descargar archivos

El test runner de Fortran necesita `curl` para descargar algunos archivos.
Sin embargo, su imagen de tiempo de ejecución _no_ necesita `curl`, lo que hace de este un caso de uso perfecto para una compilación en varias etapas.

Primero, su [Dockerfile](https://github.com/exercism/fortran-test-runner/blob/783e228d8449143d2040e68b95128bb791833a27/Dockerfile) define una etapa (llamada «build») en la que se instala el paquete `curl`.
Luego usa curl para descargar archivos en esa etapa.

```dockerfile
FROM alpine:3.15 AS build

RUN apk add --no-cache curl

WORKDIR /opt/test-runner
COPY bust_cache .

WORKDIR /opt/test-runner/testlib
RUN curl -R -O https://raw.githubusercontent.com/exercism/fortran/main/testlib/CMakeLists.txt
RUN curl -R -O https://raw.githubusercontent.com/exercism/fortran/main/testlib/TesterMain.f90

WORKDIR /opt/test-runner
RUN curl -R -O https://raw.githubusercontent.com/exercism/fortran/main/config/CMakeLists.txt
```

La segunda parte del Dockerfile define una nueva etapa y copia los archivos descargados de la etapa «build» a su propia etapa usando el comando `COPY`:

```dockerfile
FROM alpine:3.15

RUN apk add --no-cache coreutils jq gfortran libc-dev cmake make

WORKDIR /opt/test-runner
COPY --from=build /opt/test-runner/ .

COPY . .
ENTRYPOINT ["/opt/test-runner/bin/run.sh"]
```

##### Ejemplo: instalar bibliotecas

El test runner de Ruby necesita que se instalen los paquetes `git`, `openssh`, `build-base`, `gcc` y `wget` antes de poder instalar sus bibliotecas requeridas (gemas).
Su [Dockerfile](https://github.com/exercism/ruby-test-runner/blob/e57ed45b553d6c6411faeea55efa3a4754d1cdbf/Dockerfile) empieza con una etapa (a la que se le da el nombre `build`) que instala esos paquetes (mediante `apk add`) y luego instala las dependencias (mediante `bundle install`):

```dockerfile
FROM ruby:3.2.2-alpine3.18 AS build

RUN apk update && apk upgrade && \
    apk add --no-cache git openssh build-base gcc wget git

COPY Gemfile Gemfile.lock .

RUN gem install bundler:2.4.18 && \
    bundle config set without 'development test' && \
    bundle install
```

Luego define la etapa que formará la imagen Docker resultante.
Esta etapa _no_ instala las dependencias que instaló la etapa anterior; en su lugar, usa el comando `COPY` para copiar las bibliotecas instaladas de la etapa de construcción a su propia etapa:

```dockerfile
FROM ruby:3.2.2-alpine3.18

RUN apk add --no-cache bash

WORKDIR /opt/test-runner

COPY --from=build /usr/local/bundle /usr/local/bundle

COPY . .

ENTRYPOINT [ "sh", "/opt/test-runner/bin/run.sh" ]
```

```exercism/note
El [Dockerfile del test runner de C#](https://github.com/exercism/csharp-test-runner/blob/b54122ef76cbf86eff0691daa33c8e50bc83979f/Dockerfile) hace algo similar, solo que en este caso la etapa de construcción puede usar una imagen Docker existente que ya tiene preinstalados los paquetes adicionales necesarios para instalar bibliotecas.
```

## Pruebas

### Usa pruebas de integración

Las pruebas unitarias pueden ser muy útiles, pero recomendamos centrarte en escribir [pruebas de integración](https://en.wikipedia.org/wiki/Integration_testing).
Su principal beneficio es que prueban mejor cómo se ejecutan las herramientas en producción y, por lo tanto, ayudan a aumentar la confianza en la implementación de tus herramientas.

#### Usa Docker

Para imitar lo mejor posible el entorno de producción, las pruebas de integración deberían ejecutar las herramientas _como el entorno de producción_.
Esto significa construir la imagen Docker y luego ejecutar la imagen construida sobre una solución para verificar su salida.

#### Usa pruebas golden

Las pruebas de integración deberían definirse como [pruebas golden](https://ro-che.info/articles/2017-12-04-golden-tests), que son pruebas en las que la salida esperada se guarda en un archivo.
Esto es perfecto para las pruebas de integración de las herramientas de un track, ya que la salida de las herramientas también son archivos.

##### Ejemplo: test runner

Cuando se ejecuta el test runner sobre una solución, su salida es un archivo `results.json`.
Luego podemos comparar este archivo con un archivo de salida de referencia (es decir, el «esperado»), llamado `expected_results.json`, para comprobar si el test runner funciona como se pretende.

## Seguridad

La seguridad es una de las razones principales por las que usamos contenedores Docker para ejecutar nuestras herramientas.

### Prefiere las imágenes oficiales

Hay muchas imágenes Docker en [Docker Hub](https://hub.docker.com/), pero intenta usar [las oficiales](https://hub.docker.com/search?q=&image_filter=official).
Estas imágenes están curadas y tienen (muchas) menos probabilidades de ser inseguras.

### Fija las versiones

Para asegurarte de que las construcciones sean estables (es decir, que no se rompan de repente), siempre deberías fijar tus imágenes base a etiquetas específicas.
Eso significa que en lugar de:

```dockerfile
FROM alpine:latest
```

deberías usar:

```dockerfile
FROM alpine:3.20.2
```

Con esta última, las construcciones siempre usarán la misma versión.

### Ejecuta como un usuario sin privilegios

Por defecto, muchas imágenes se ejecutarán con un usuario que tiene privilegios de root.
Deberías considerar ejecutar como un usuario sin privilegios.

```dockerfile
FROM alpine

RUN groupadd -r myuser && useradd -r -g myuser myuser

# RUN <COMMANDS THAT REQUIRE ROOT USER, E.G. INSTALLING PACKAGES>

USER myuser
```

### Actualiza los repositorios de paquetes a la última versión

Es (casi) siempre una buena idea instalar las últimas versiones

```dockerfile
RUN apt-get update && \
    apt-get install curl
```

### Admite un sistema de archivos de solo lectura

Animamos a que los archivos Docker se escriban usando un sistema de archivos de solo lectura.
Los únicos directorios que deberías asumir como escribibles son:

- El directorio de la solución (que se pasa como segundo argumento)
- El directorio de salida (que se pasa como tercer argumento)
- El directorio `/tmp`

```exercism/caution
Nuestro entorno de producción actualmente _no_ aplica un sistema de archivos de solo lectura, pero podríamos hacerlo en el futuro.
Por este motivo, la plantilla base de un nuevo test runner/analyzer/representer empieza con un sistema de archivos de solo lectura.
Si no logras que las cosas funcionen en un archivo de solo lectura, siéntete libre de (por ahora) asumir un sistema de archivos escribible.
```
