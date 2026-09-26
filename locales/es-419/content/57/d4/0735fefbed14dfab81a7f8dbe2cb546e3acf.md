# Guía de estilo de Rexx

Esta guía describe el estilo que se pretende usar con los archivos de test y de ejemplo de los ejercicios del track de Rexx.

## Estándar de Rexx

El código debe ajustarse al nivel 5.0 del lenguaje Rexx.

Se pueden usar las extensiones de Regina Rexx y las funciones del estándar SAA para acceder a bibliotecas externas.

No se deben usar las extensiones de AREXX ni las rutinas de manipulación de buffers de CMS.

## Plataforma

El entorno de ejecución para los tests está basado en Linux, por lo que en las invocaciones de la instrucción ADDRESS solo se pueden usar los comandos disponibles en ese entorno. Estos deben señalarse claramente en los comentarios del código.

## Nombres

### Instrucciones

Las instrucciones (palabras reservadas) deben escribirse en **_minúsculas_**. Así, lo siguiente es conforme con las recomendaciones de la guía de estilo:

```rexx
do while input \= ''
  parse var input char +1 input
  say char
end
```

En cambio, ninguno de los siguientes es conforme, así que no se recomienda usarlos:

```rexx
/* *** Not recommended *** */
Do While input \= ''
  Parse Var input char +1 input
  Say char
End
```

y:

```rexx
/* *** Not recommended *** */
DO WHILE input \= ''
  PARSE VAR input char +1 input
  SAY char
END
```

### Funciones integradas (BIFs)

Las BIFs deben escribirse en **_mayúsculas_**, como se ilustra aquí:

```rexx
input = 'ABCDE'
say 'Length of input is' LENGTH(input)
say 'First letter of input is' SUBSTR(input, 1, 1)
```

### Etiquetas (funciones definidas por el usuario)

Los nombres de las etiquetas deben estar en **_Pascal case_**, como se muestra aquí:

```rexx
greeting = MyFuncSayHello()
say greeting

exit 0

MyFuncSayHello : procedure
  hello = 'Hello there!'
return hello
```

### Variables

Los nombres de las variables deben empezar con una letra **_minúscula_**, así que las variables de una sola palabra irían en minúsculas.

Las variables de varias palabras se pueden escribir en **_camel case_** o en **_snake case_**.

La convención adoptada para el track es usar _camel case para la mayoría de las variables_ y reservar snake case para las variables de test. Las variables que se pretende que sean constantes también pueden estar, opcionalmente, en mayúsculas.

```rexx
input = 'ABCDE'
i = 0

personName = 'Alice'
test_person_description = 'Brown hair, blue eyes'

TRUE = 1
PI_CONSTANT = 3.14159
```

## Literales

Los strings se pueden denotar con comillas simples o dobles, **`'`** y **`"`**, respectivamente. Los siguientes son equivalentes:

```rexx
say "Hello, world!"

say 'Hello, world!'
```

Cada uno se puede incrustar dentro del otro sin necesidad de un carácter de escape:

```rexx
say "Please don't do that as it's wrong."

say 'He said, "Please sir, may I have more?".'
```

A menos que los strings contengan comillas incrustadas, lo que obliga a mezclar comillas, se prefiere que los strings se denoten con **_comillas simples_**.

### Strings hexadecimales y binarios

Los valores binarios y hexadecimales se pueden representar agregando una **`B`** o una **`X`**, respectivamente, a un string. Ejemplos:

```rexx
hexvalue = "0A"X

binvalue = "00001010"B
```

Se recomienda delimitar esos valores con **_comillas dobles_**.

Junto con la recomendación anterior de usar comillas simples para representar strings normales, esta convención debería facilitar la identificación de los strings binarios y hexadecimales en una base de código.

### Terminador de nueva línea
En muchos lenguajes influidos por UNIX o C, el literal **_`\n`_** se usa como terminador de **_nueva línea_**. Ese uso está muy extendido, y varios ejercicios de este track implican el uso y la manipulación de strings con este terminador.

Rexx no admite este terminador ni admite **_`\`_** (ni ningún otro carácter) como carácter de escape.

El equivalente en Rexx del carácter de nueva línea es un valor hexadecimal (dependiente de la plataforma); en las plataformas derivadas de UNIX es:

**_`"0A"X`_**

El equivalente en Rexx del siguiente string con líneas nuevas incrustadas (usando el shell de bash):

```bash
printf "I have\nthree embedded\nnewlines.\n"
```

es:

```rexx
say 'I have' || "0A"X || 'three embedded' || "0A"X || 'newlines.' || "0A"X
```

Los ejercicios de este track solo traducirán **_`\n`_** a **_`"0A"X`_** cuando se requiera en un string destinado a mostrarse en la terminal. De lo contrario, el string **_`\n`_** simplemente se interpretará como una nueva línea lógica.

## Otras recomendaciones de estilo

La sangría puede ser de dos, tres o cuatro caracteres de ESPACIO, aunque se prefiere la sangría de _dos caracteres_ y la consistencia en la sangría.

La instrucción final **_return_** de una función debe alinearse con el nombre de la etiqueta, marcando así claramente el final de esa función, y _siempre_ debe devolver un valor.

El operador booleano NOT se puede representar con varios símbolos distintos. El símbolo preferido en este track es **`\`** y, para mantener la consistencia con este uso, el operador relacional «distinto de» debe ser **`\=`**.

Los valores booleanos **`false`** y **`true`** se representan con **`0`** y **`1`**, respectivamente. No existen literales predefinidos para estos valores.

Los estados de error se indican mediante valores de retorno, donde el string vacío, **`''`**, o **`-1`** indican estados de error, según el contexto.

## Ejemplo canónico de estilo de código
```rexx
TO DO EXAMPLE
```

## Estructura del archivo de test

Cada ejercicio tendrá un único archivo de test, ubicado en el directorio de nivel superior del ejercicio, con el nombre: `<exercise>-check.rexx`

Si se sigue esta convención, el archivo de test del ejercicio `acronym` se llamará: `acronym-check.rexx`

El archivo de test de cada ejercicio se estructura de una forma flexible pero específica, tanto para ayudar a los estudiantes a entender los requisitos del ejercicio como para facilitar la tarea de los colaboradores al implementar o ampliar tests.

Lo siguiente es un subconjunto del archivo de test del ejercicio `acronym`:

```rexx
/* Unit Test Runner: t-rexx */
function = 'Abbreviate'
context('Checking the' function 'function')

/* Unit tests */
check('basic' function||'("Portable Network Graphics")',,
      function||'("Portable Network Graphics")',, 'to be', 'PNG')

check('lowercase words' function||'("Ruby on Rails")',,
      function||'("Ruby on Rails")',, 'to be', 'ROR')
```

El archivo se divide en dos secciones lógicas, cada una identificada con una línea de comentario.

La primera sección asigna el nombre de la **_función objeto del test_** (aquí la función `Abbreviate`) a la variable `function`. Este nombre de variable es descriptivo, pero arbitrario, y se usa en el resto del archivo allí donde se requiere el nombre de la función objeto del test.

En esta sección también hay una llamada a la función `context`, cuyo propósito es evidente.

La siguiente sección contiene los tests unitarios. Cada invocación de la función `check` es un único test unitario. Parámetros esperados:

```rexx
check(<test description>,
      <function invocation>,
      [<actual result variable>],
      <test comparator>,
      <expected result>)
```

**\<test description>** es el string que se emite cuando se ejecuta el test. Para que sea lo más descriptivo posible, se recomienda usar un string que incluya el nombre de la función objeto del test y los argumentos que se le pasan, como en el ejemplo.

**\<function invocation>** es la invocación o llamada real de la función, de modo que su valor de retorno se pasa a `check` para la comparación del test.

**\<actual result variable>** es un parámetro opcional y, si se usa, es el nombre de una variable que contiene el valor que se usará para la comparación del test.

La razón para usarlo es permitir comprobar resultados _derivados del_ valor de retorno de la función objeto del test en lugar del valor de retorno mismo. Un ejemplo obvio es cuando el valor de retorno es un string de varios kB, como se muestra:

```rexx
expected_length = LENGTH(FUT(...))

check('...', FUT(...), expected_length, 'to be', 50)
```

Ten en cuenta que el argumento \<function invocation> de todos modos se debe pasar.

**\<test comparator>** es un string que describe el tipo de comparación que se va a realizar. En la mayoría de los casos, este será el string «to be», que solicita una comparación de igualdad. Consulta la documentación del framework de tests unitarios para conocer otras opciones de comparación.

**\<expected result>** es, evidentemente, el valor con el que se compara el resultado real.

Las variables se pueden declarar libremente dentro del archivo de test (antes de usarlas, por supuesto) y usarse en lugar de literales, como argumentos de `check`.
