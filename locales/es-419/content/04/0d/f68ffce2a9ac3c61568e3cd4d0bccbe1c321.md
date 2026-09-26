# Encabezado ficticio

## Biblioteca de funciones

Este es el primer ejercicio que vemos en el que la solución que escribimos no es un script «main». Estamos escribiendo una biblioteca a la que se le hará «source» desde otros scripts que invocarán nuestras funciones.

### Namerefs en Bash

Este ejercicio requiere el uso de variables `nameref`. Para eso necesitas una versión de bash al menos 4.0. Si usas el bash que viene por defecto en MacOS, tendrás que instalar otra versión: consulta [Instalar Bash](https://exercism.io/tracks/bash/installation)

Los namerefs son una forma de pasar una variable a una función _por referencia_. De esa manera, la variable se puede modificar dentro de la función y el valor actualizado queda disponible en el ámbito desde el que se hace la llamada. Aquí tienes un ejemplo:
```bash
prependElements() {
    local -n __array=$1
    shift
    __array=( "$@" "${__array[@]}" )
}

my_array=( a b c )
echo "before: ${my_array[*]}"    # => before: a b c

prependElements my_array d e f
echo "after: ${my_array[*]}"     # => after: d e f a b c
```
