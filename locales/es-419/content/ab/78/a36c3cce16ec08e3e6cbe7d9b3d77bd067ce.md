# Pruebas en el track de Pyret

## Instalación de los requisitos previos

Después de descargar un ejercicio correctamente, necesitas instalar los módulos de Node.js para ejecutar las pruebas:

```sh
cd /path/to/exercise
npm install
```

Luego agrega el directorio que contiene la herramienta de línea de comandos `pyret` a tu $PATH

```sh
# bash
PATH="./node_modules/.bin:$PATH"

# zsh
path=(./node_modules/.bin $path)

# fish
fish_add_path ./node_modules/.bin
```

## Primeros pasos

Dentro del directorio del ejercicio habrá varios archivos, pero los dos más importantes son tu archivo de solución y el de pruebas.
En el siguiente ejemplo, descargamos el ejercicio Año bisiesto.

```bash
leap/
├── leap.arr       # Solution file - your code goes here
├── leap-test.arr  # Test cases for the exercise
```

Para ejecutar las pruebas, usa `exercism test` si descargaste la CLI oficial de Exercism, o ejecuta `pyret leap-test.arr`.
Pyret ejecutará el conjunto de pruebas, que consiste en una serie de bloques `check` etiquetados que prueban tu archivo de solución con entradas y resultados esperados específicos.
Una parte fundamental de este proceso es exportar de forma explícita partes de tu código para que el conjunto de pruebas pueda verlas.

## provide

Las pruebas de este track importarán tu archivo, lo que da acceso a todo lo que exportes explícitamente desde tu código.

Para exportar variables, necesitas agregar una [sentencia provide][provide-statement] al inicio de tu archivo.

Los siguientes fragmentos son dos formas válidas de exportar `a`, `b` y `c`.

```pyret
# using a list of bindings
provide a, b, c end
```

```pyret
# using an object literal
provide {
  a: a,
  b: b,
  c: c
}
end
```

Un tercer método, `provide *`, es una forma abreviada de exportar todas las vinculaciones de nivel superior excepto los tipos de datos personalizados
Sin embargo, por lo general no se recomienda, porque Pyret es estricto y no permite el shadowing.

## provide-types

Algunos ejercicios requerirán que se exporte un [tipo de datos personalizado][data-definition] para poder hacer las pruebas.
En esos casos, puedes usar una [sentencia provide-types][provide-types-statement].
Como un tipo de datos tiene funciones adicionales que podrían no estar exportadas, se recomienda usar `provide-types *` a pesar de la preocupación por el shadowing.

```pyret
provide-types *

data MyPoint:
  | two-dim(x, y)
  | three-dim(x, y, z)
end
```

Todos los esqueletos de los ejercicios tendrán sentencias `provide` o `provide-types` ya preparadas para que las uses.

[provide-statement]: https://pyret.org/docs/latest/Provide_Statements.html
[shadowing]: https://pyret.org/docs/latest/Bindings.html#%28part._s~3ashadowing%29
[data-definition]: https://pyret.org/docs/latest/s_declarations.html#%28elem._%28bnf-prod._%28.Pyret._data-decl%29%29%29
[provide-types-statement]: https://pyret.org/docs/latest/Provide_Statements.html
