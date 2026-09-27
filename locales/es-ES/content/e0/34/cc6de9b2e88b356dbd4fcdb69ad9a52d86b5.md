# Apéndice de instrucciones

## Estructura del proyecto

* `src` contiene tu solución al ejercicio
* `spec` contiene los tests que hay que ejecutar para el ejercicio

## Ejecutar los tests

Si estás en el directorio correcto (es decir, el que contiene `src` y `spec`), puedes ejecutar los tests de ese ejercicio con `crystal spec`:

```bash
$ pwd
/Users/johndoe/Code/exercism/crystal/hello-world

$ ls
GETTING_STARTED.md README.md          spec               src

$ crystal spec
```

Esto ejecutará todos los archivos de test del directorio `spec`.

En cada archivo de test, todos los tests excepto el primero están desactivados.

Cuando consigas que un test pase, puedes activar el siguiente cambiando `pending` por `it`.

## Enviar tu solución

Asegúrate de enviar el archivo fuente del directorio `src` al enviar tu solución:

```bash
$ exercism submit src/hello_world.cr
```
