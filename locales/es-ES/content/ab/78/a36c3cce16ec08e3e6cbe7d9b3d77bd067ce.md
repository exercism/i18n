# Pruebas en el track de Pyret

## Instalación de los requisitos previos

Cuando hayas descargado un ejercicio correctamente, tendrás que instalar los módulos de Node.js para ejecutar las pruebas:

```sh
cd /path/to/exercise
npm install
```

A continuación, añade el directorio que contiene la herramienta de línea de comandos `pyret` a tu $PATH

```sh
# bash
PATH="./node_modules/.bin:$PATH"

# zsh
path=(./node_modules/.bin $path)

# fish
fish_add_path ./node_modules/.bin
```

## Primeros pasos

Habrá varios archivos dentro del directorio del ejercicio, pero los dos más importantes son tu archivo de solución y tu archivo de pruebas.
En el siguiente ejemplo, hemos descargado el ejercicio Año bisiesto.

```bash
leap/
├── leap.arr       # Solution file - your code goes here
├── leap-test.arr  # Test cases for the exercise
```

Para ejecutar las pruebas, usa `exercism test` si has descargado la interfaz de línea de comandos oficial de Exercism, o ejecuta `pyret leap-test.arr`.
Pyret ejecutará el conjunto de pruebas, que consta de una serie de bloques `check` etiquetados que comprueban tu archivo de solución con entradas concretas y resultados esperados.
Una parte fundamental de este proceso es exportar explícitamente partes de tu código para que el conjunto de pruebas pueda verlas.

## provide

Las pruebas de este track importarán tu archivo, lo que da acceso a todo lo que hayas exportado explícitamente desde tu código.

Para exportar variables, tienes que añadir una [instrucción `provide`][provide-statement] al principio de tu archivo.

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

Un tercer método, `provide *`, es una forma abreviada de exportar todos los enlaces de nivel superior excepto los tipos de datos personalizados.
Sin embargo, por lo general no se recomienda, porque Pyret es estricto y no permite el [sombreado][shadowing].

## provide-types

Algunos ejercicios requerirán que se exporte un [tipo de dato personalizado][data-definition] para poder hacer las pruebas.
En esos casos, puedes usar una [instrucción `provide-types`][provide-types-statement].
Como un tipo de dato tiene funciones adicionales que podrían no estar exportadas, se recomienda usar `provide-types *` a pesar de la preocupación por el sombreado.

```pyret
provide-types *

data MyPoint:
  | two-dim(x, y)
  | three-dim(x, y, z)
end
```

Todos los esqueletos de los ejercicios tendrán preparadas instrucciones `provide` o `provide-types` para que las uses.

[provide-statement]: https://pyret.org/docs/latest/Provide_Statements.html
[shadowing]: https://pyret.org/docs/latest/Bindings.html#%28part._s~3ashadowing%29
[data-definition]: https://pyret.org/docs/latest/s_declarations.html#%28elem._%28bnf-prod._%28.Pyret._data-decl%29%29%29
[provide-types-statement]: https://pyret.org/docs/latest/Provide_Statements.html
