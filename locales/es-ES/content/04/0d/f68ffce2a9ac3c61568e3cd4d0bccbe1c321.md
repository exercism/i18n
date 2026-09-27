# Encabezado ficticio

## Biblioteca de funciones

Este es el primer ejercicio que vemos en el que la solución que escribimos no es un script «main». Estamos escribiendo una biblioteca que se cargará («source») en otros scripts que invocarán nuestras funciones.

### Namerefs de Bash

En este ejercicio es necesario usar variables `nameref`. Para ello se necesita una versión de Bash al menos 4.0. Si usas el Bash predeterminado en MacOS, tendrás que instalar otra versión: consulta [Instalación de Bash](https://exercism.io/tracks/bash/installation)

Las namerefs son una forma de pasar una variable a una función _por referencia_. Así, la variable se puede modificar dentro de la función y el valor actualizado estará disponible en el scope desde el que se llama. Aquí tienes un ejemplo:
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
