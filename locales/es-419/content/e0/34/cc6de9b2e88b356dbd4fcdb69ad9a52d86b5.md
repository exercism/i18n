# Anexo a las instrucciones

## Estructura del proyecto

* `src` contiene tu solución al ejercicio
* `spec` contiene las pruebas que hay que ejecutar para el ejercicio

## Ejecutar las pruebas

Si estás en el directorio correcto (es decir, el que contiene `src` y `spec`), puedes ejecutar las pruebas de ese ejercicio con `crystal spec`:

```bash
$ pwd
/Users/johndoe/Code/exercism/crystal/hello-world

$ ls
GETTING_STARTED.md README.md          spec               src

$ crystal spec
```

Esto ejecutará todos los archivos de prueba del directorio `spec`.

En cada archivo de prueba, se han omitido todas las pruebas excepto la primera.

Una vez que logres que una prueba pase, puedes hacer que se ejecute la siguiente cambiando `pending` por `it`.

## Enviar tu solución

Asegúrate de enviar el archivo fuente que está en el directorio `src` cuando envíes tu solución:

```bash
$ exercism submit src/hello_world.cr
```
