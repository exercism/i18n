# Buenas prácticas

## Sigue las buenas prácticas oficiales

Las [buenas prácticas oficiales para Dockerfile](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) contienen un montón de contenido excelente sobre cómo mejorar tus Dockerfiles.

## Rendimiento

Deberías optimizar principalmente el rendimiento (sobre todo en el caso de los test runners).
Así te asegurarás de que tus herramientas se ejecuten lo más rápido posible y no se agote el tiempo de espera.

### Mide

Medir el tiempo de ejecución a menudo es una forma estupenda de hacerse una idea del rendimiento de las herramientas.
Adquiere el hábito de medir el tiempo de ejecución tanto después _como_ antes de un cambio.
Aunque creas que «estás seguro» de que un cambio mejorará el rendimiento, deberías medir igualmente el tiempo de ejecución.

#### Scripts

Cuando sea posible, crea scripts que midan el rendimiento automáticamente (lo que también se conoce como _benchmarking_).
Una herramienta de línea de comandos muy útil es [hyperfine](https://github.com/sharkdp/hyperfine), pero siéntete libre de usar lo que tenga más sentido para tus herramientas.

Los repositorios de herramientas del track más recientes tendrán acceso a los dos scripts siguientes:

1. `./bin/benchmark.sh`: mide el rendimiento del código de las herramientas del track ([código fuente](https://github.com/exercism/generic-test-runner/blob/main/bin/benchmark.sh))
2. `./bin/benchmark-in-docker.sh`: mide el rendimiento de la imagen de Docker de las herramientas del track ([código fuente](https://github.com/exercism/generic-test-runner/blob/main/bin/benchmark-in-docker.sh))

```exercism/note
Si trabajas en un repositorio de herramientas del track que no tenga estos archivos, puedes copiarlos a tu repositorio usando los enlaces al código fuente de arriba.
```

```exercism/caution
Los scripts de benchmarking pueden ayudarte a estimar el rendimiento de las herramientas.
Ten en cuenta, no obstante, que el rendimiento en los servidores de producción de Exercism suele ser inferior.
```

### Experimenta con distintas imágenes base

Intenta experimentar con distintas imágenes base (p. ej., Alpine en lugar de Ubuntu) para ver si una tiene un rendimiento (significativamente) mejor que la otra.
Si el rendimiento es más o menos el mismo, quédate con la imagen más pequeña.

### Prueba la red interna

Comprueba si usar la red `internal` en lugar de `none` mejora el rendimiento.
Consulta la [documentación sobre redes](/docs/building/tooling/docker#network) para obtener más información.

### Prefiere los comandos de tiempo de compilación a los de tiempo de ejecución

Las herramientas del track ejecutan un contenedor de Docker puntual y de corta duración que lleva a cabo los siguientes pasos.

1. Se crea un contenedor de Docker.
2. El contenedor de Docker se ejecuta con los argumentos correctos.
3. El contenedor de Docker se destruye.

Por lo tanto, el código que se ejecuta en el paso 2 se ejecuta en _todas y cada una de las ejecuciones de las herramientas_.
Por este motivo, reducir la cantidad de código que se ejecuta en el paso 2 es una forma estupenda de mejorar el rendimiento.
Una manera de conseguirlo es trasladar código del _tiempo de ejecución_ al _tiempo de compilación_.
Mientras que el código de tiempo de ejecución se ejecuta en todas y cada una de las ejecuciones de las herramientas, el código de tiempo de compilación solo se ejecuta una vez (cuando se compila la imagen de Docker).

El código de tiempo de compilación se ejecuta una vez como parte de un flujo de trabajo de GitHub Actions.
Por lo tanto, no pasa nada si el código que se ejecuta en tiempo de compilación es (relativamente) lento.

#### Ejemplo: precompilar bibliotecas

Al ejecutar las pruebas en el test runner de Haskell, este necesita que se compilen algunas bibliotecas base.
Como cada ejecución de las pruebas tiene lugar en un contenedor nuevo, ¡esto significa que esa compilación se hacía _en todas y cada una de las ejecuciones de las pruebas_!
Para evitarlo, el [Dockerfile del test runner de Haskell](https://github.com/exercism/haskell-test-runner/blob/5264c460054649fc672c3d5932c2f3cb082e2405/Dockerfile) tiene los dos comandos siguientes:

```dockerfile
COPY pre-compiled/ .
RUN stack build --resolver lts-20.18 --no-terminal --test --no-run-tests
```

Primero, el directorio `pre-compiled` se copia en la imagen.
Este directorio está configurado como un ejercicio de pruebas y depende de las mismas bibliotecas base de las que depende el ejercicio real.
Después ejecutamos las pruebas en ese directorio, lo que es similar a cómo se ejecutan las pruebas de un ejercicio real.
Ejecutar las pruebas hará que se compile la base, pero la diferencia es que esto ocurre en _tiempo de compilación_.
Por lo tanto, la imagen de Docker resultante tendrá ya compiladas sus bibliotecas base.
Esto significa que no hace falta compilar en _tiempo de ejecución_, lo que da como resultado una ejecución (mucho) más rápida.

#### Ejemplo: precompilar binarios

Algunos lenguajes permiten compilar el código por adelantado o sobre la marcha.
Se trata de una disyuntiva entre tiempo de compilación y tiempo de ejecución y, de nuevo, nos decantamos por la ejecución en tiempo de compilación por motivos de rendimiento.

El [Dockerfile del test runner de C#](https://github.com/exercism/csharp-test-runner/blob/b54122ef76cbf86eff0691daa33c8e50bc83979f/Dockerfile) usa este enfoque, en el que el test runner se compila a un binario por adelantado (en tiempo de compilación) en lugar de compilar el código sobre la marcha (en tiempo de ejecución).
Esto significa que hay menos trabajo que hacer en tiempo de ejecución, lo que debería ayudar a aumentar el rendimiento.

## Tamaño

Deberías intentar reducir el tamaño de la imagen, lo que hará que esta:

- Se despliegue más rápido
- Reduzca los costes para nosotros
- Mejore el tiempo de arranque de cada contenedor

### Prueba distintas distribuciones

Las distintas imágenes de distribución tendrán tamaños diferentes.
Por ejemplo, la imagen `alpine:3.20.2` es **diez veces** más pequeña que la imagen `ubuntu:24.10`:

```
REPOSITORY   TAG       SIZE
alpine       3.20.2    8.83MB
ubuntu       24.10     101MB
```

En general, las imágenes basadas en Alpine están entre las más pequeñas, por lo que muchas imágenes de herramientas se basan en Alpine.

### Prueba imágenes reducidas

Algunas imágenes tienen variantes «slim» especiales, en las que se han eliminado algunas características, lo que da como resultado tamaños de imagen más pequeños.
Por ejemplo, la imagen `node:20.16.0-slim` es **cinco veces** más pequeña que la imagen `node:20.16.0`:

```
REPOSITORY   TAG            SIZE
node         20.16.0        1.09GB
node         20.16.0-slim   219MB
```

La razón por la que las variantes «slim» son más pequeñas es que tienen menos características.
Puede que tu imagen no necesite las características adicionales y, si no es así, plantéate usar la variante «slim».

### Eliminar elementos innecesarios

Una forma obvia, pero excelente, de reducir el tamaño de tu imagen es eliminar todo lo que no necesites.
Esto puede incluir cosas como:

- Archivos de código fuente que ya no son necesarios después de compilar un binario a partir de ellos
- Archivos destinados a arquitecturas distintas de las de la imagen de Docker
- Documentación

#### Elimina los archivos del gestor de paquetes

La mayoría de las imágenes de Docker necesitan instalar paquetes adicionales, lo que normalmente se hace a través de un gestor de paquetes.
Estos paquetes deben instalarse en _tiempo de compilación_ (ya que no hay conexión a internet disponible en _tiempo de ejecución_).
Por lo tanto, cualquier archivo de caché o de control interno del gestor de paquetes debería eliminarse después de instalar los paquetes adicionales.

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

### Usa compilaciones de varias etapas

Docker tiene una funcionalidad llamada [compilaciones de varias etapas](https://docs.docker.com/build/building/multi-stage/).
Estas te permiten dividir tu Dockerfile en _etapas_ separadas, y solo la última etapa acaba formando parte de la imagen de Docker producida (el resto solo está ahí para ayudar a compilar la última etapa).
Puedes pensar en cada etapa como en su propio mini Dockerfile; las etapas pueden usar imágenes base distintas.

Las compilaciones de varias etapas son especialmente útiles cuando tu Dockerfile necesita instalar paquetes que solo se necesitan en tiempo de compilación.
En esta situación, la estructura general de tu Dockerfile es así:

1. Define una nueva etapa (la llamaremos etapa «build»).
   Esta etapa _solo_ se usará en tiempo de compilación.
2. Instala los paquetes adicionales necesarios (en la etapa «build»).
3. Ejecuta los comandos que requieren los paquetes adicionales (dentro de la etapa «build»).
4. Define una nueva etapa (la llamaremos etapa «runtime»).
   Esta etapa formará la imagen de Docker resultante y se ejecutará en tiempo de ejecución.
5. Copia el resultado o los resultados de los comandos ejecutados en el paso 3 (en la etapa «build») a esta etapa (la etapa «runtime»).

Con esta configuración, los paquetes adicionales se instalan _solo_ en la etapa «build» y _no_ en la etapa «runtime», lo que significa que no acabarán en la imagen de Docker que se produce.

#### Ejemplo: descargar archivos

El test runner de Fortran necesita `curl` para descargar algunos archivos.
Sin embargo, su imagen de tiempo de ejecución _no_ necesita `curl`, lo que hace de este un caso de uso perfecto para una compilación de varias etapas.

Primero, su [Dockerfile](https://github.com/exercism/fortran-test-runner/blob/783e228d8449143d2040e68b95128bb791833a27/Dockerfile) define una etapa (llamada «build») en la que se instala el paquete `curl`.
Después usa curl para descargar archivos en esa etapa.

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

El test runner de Ruby necesita que se instalen los paquetes `git`, `openssh`, `build-base`, `gcc` y `wget` antes de poder instalar sus bibliotecas (gemas) requeridas.
Su [Dockerfile](https://github.com/exercism/ruby-test-runner/blob/e57ed45b553d6c6411faeea55efa3a4754d1cdbf/Dockerfile) comienza con una etapa (a la que se da el nombre `build`) que instala esos paquetes (mediante `apk add`) y después instala las dependencias (mediante `bundle install`):

```dockerfile
FROM ruby:3.2.2-alpine3.18 AS build

RUN apk update && apk upgrade && \
    apk add --no-cache git openssh build-base gcc wget git

COPY Gemfile Gemfile.lock .

RUN gem install bundler:2.4.18 && \
    bundle config set without 'development test' && \
    bundle install
```

Después define la etapa que formará la imagen de Docker resultante.
Esta etapa _no_ instala las dependencias que instaló la etapa anterior; en su lugar, usa el comando `COPY` para copiar las bibliotecas instaladas de la etapa «build» a su propia etapa:

```dockerfile
FROM ruby:3.2.2-alpine3.18

RUN apk add --no-cache bash

WORKDIR /opt/test-runner

COPY --from=build /usr/local/bundle /usr/local/bundle

COPY . .

ENTRYPOINT [ "sh", "/opt/test-runner/bin/run.sh" ]
```

```exercism/note
El [Dockerfile del test runner de C#](https://github.com/exercism/csharp-test-runner/blob/b54122ef76cbf86eff0691daa33c8e50bc83979f/Dockerfile) hace algo similar, solo que en este caso la etapa «build» puede usar una imagen de Docker existente que ya tiene preinstalados los paquetes adicionales necesarios para instalar bibliotecas.
```

## Pruebas

### Usa pruebas de integración

Las pruebas unitarias pueden ser muy útiles, pero te recomendamos centrarte en escribir [pruebas de integración](https://en.wikipedia.org/wiki/Integration_testing).
Su principal ventaja es que comprueban mejor cómo se ejecutan las herramientas en producción y, por tanto, ayudan a aumentar la confianza en la implementación de tus herramientas.

#### Usa Docker

Para imitar lo mejor posible el entorno de producción, las pruebas de integración deberían ejecutar las herramientas _como en el entorno de producción_.
Esto significa compilar la imagen de Docker y luego ejecutar la imagen compilada con una solución para verificar su salida.

#### Usa pruebas golden

Las pruebas de integración deberían definirse como [pruebas golden](https://ro-che.info/articles/2017-12-04-golden-tests), que son pruebas en las que la salida esperada se almacena en un archivo.
Esto es perfecto para las pruebas de integración de las herramientas del track, ya que la salida de las herramientas también son archivos.

##### Ejemplo: test runner

Al ejecutar el test runner con una solución, su salida es un archivo `results.json`.
Después podemos comparar este archivo con un archivo de salida «conocido como bueno» (es decir, «esperado») (llamado `expected_results.json`) para comprobar si el test runner funciona como se pretende.

## Seguridad

La seguridad es uno de los principales motivos por los que usamos contenedores de Docker para ejecutar nuestras herramientas.

### Prefiere las imágenes oficiales

Hay muchas imágenes de Docker en [Docker Hub](https://hub.docker.com/), pero intenta usar las [oficiales](https://hub.docker.com/search?q=&image_filter=official).
Estas imágenes están seleccionadas y tienen (muchas) menos probabilidades de ser inseguras.

### Fija las versiones

Para asegurarte de que las compilaciones sean estables (es decir, que no se rompan de repente), deberías fijar siempre tus imágenes base a etiquetas concretas.
Eso significa que, en lugar de:

```dockerfile
FROM alpine:latest
```

deberías usar:

```dockerfile
FROM alpine:3.20.2
```

Con esta última, las compilaciones siempre usarán la misma versión.

### Ejecuta como usuario sin privilegios

De forma predeterminada, muchas imágenes se ejecutan con un usuario que tiene privilegios de root.
Deberías plantearte ejecutarlas como un usuario sin privilegios.

```dockerfile
FROM alpine

RUN groupadd -r myuser && useradd -r -g myuser myuser

# RUN <COMMANDS THAT REQUIRE ROOT USER, E.G. INSTALLING PACKAGES>

USER myuser
```

### Actualiza los repositorios de paquetes a la última versión

(Casi) siempre es buena idea instalar las últimas versiones

```dockerfile
RUN apt-get update && \
    apt-get install curl
```

### Admite un sistema de archivos de solo lectura

Animamos a que los archivos de Docker se escriban usando un sistema de archivos de solo lectura.
Los únicos directorios que debes asumir que son escribibles son:

- El directorio de la solución (que se pasa como segundo argumento)
- El directorio de salida (que se pasa como tercer argumento)
- El directorio `/tmp`

```exercism/caution
Nuestro entorno de producción actualmente _no_ exige un sistema de archivos de solo lectura, pero es posible que lo hagamos en el futuro.
Por este motivo, la plantilla base de un nuevo test runner/analyzer/representer parte de un sistema de archivos de solo lectura.
Si no consigues que las cosas funcionen en un sistema de archivos de solo lectura, puedes asumir (por ahora) un sistema de archivos escribible.
```
