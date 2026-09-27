# Guía de estilo de Rexx

Esta guía describe el estilo previsto para los ficheros de test y de ejemplo de los ejercicios del track de Rexx.

## Estándar de Rexx

El código debe ajustarse a Rexx Language level 5.0.

Pueden usarse las extensiones de Regina Rexx y las funciones del estándar SAA para acceder a bibliotecas externas.

No deben usarse las extensiones de AREXX ni las rutinas de manipulación de búfer de CMS.

## Plataforma

El entorno de ejecución de los tests está basado en Linux, por lo que en las invocaciones de la instrucción ADDRESS solo pueden usarse comandos disponibles en ese entorno. Estos deben destacarse claramente en los comentarios del código.

## Nombres

### Instrucciones

Las instrucciones (palabras reservadas) deben escribirse en **_minúsculas_**. Así, lo siguiente es conforme a las recomendaciones de la guía de estilo:

```rexx
do while input \= ''
  parse var input char +1 input
  say char
end
```

mientras que ninguno de los siguientes es conforme, por lo que no se recomiendan:

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

### Funciones integradas (BIF)

Las BIF deben escribirse en **_mayúsculas_**, como se ilustra aquí:

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

Los nombres de las variables deben empezar por una letra **_minúscula_**, por lo que las variables de una sola palabra irían en minúsculas.

Las variables de varias palabras pueden expresarse en **_camel case_** o en **_snake case_**.

La convención adoptada para el track es utilizar _camel case para la mayoría de las variables_ y reservar snake case para las variables de test. Las variables que se quieran usar como constantes pueden, opcionalmente, ir también en mayúsculas.

```rexx
input = 'ABCDE'
i = 0

personName = 'Alice'
test_person_description = 'Brown hair, blue eyes'

TRUE = 1
PI_CONSTANT = 3.14159
```

## Literales

Las cadenas pueden denotarse con comillas simples o dobles, **`'`** y **`"`** respectivamente. Las siguientes son equivalentes:

```rexx
say "Hello, world!"

say 'Hello, world!'
```

Cada una puede incluirse dentro de la otra sin necesidad de un carácter de escape:

```rexx
say "Please don't do that as it's wrong."

say 'He said, "Please sir, may I have more?".'
```

A menos que las cadenas contengan comillas incrustadas, lo que obliga a mezclar comillas, se prefiere denotar las cadenas con **_comillas simples_**.

### Cadenas hexadecimales y binarias

Los valores binarios y hexadecimales pueden representarse añadiendo una **`B`** o una **`X`**, respectivamente, a una cadena. Ejemplos:

```rexx
hexvalue = "0A"X

binvalue = "00001010"B
```

Se recomienda delimitar estos valores con **_comillas dobles_**.

Junto con la recomendación anterior de usar comillas simples para representar cadenas normales, esta convención debería facilitar la identificación de cadenas binarias y hexadecimales en una base de código.

### Terminador de nueva línea
En muchos lenguajes UNIX o influidos por C, el literal, **_`\n`_**, se usa como terminador de **_nueva línea_**. Este uso está muy extendido, y varios ejercicios de este track implican usar y manipular cadenas con este terminador.

Rexx no admite este terminador, ni admite, **_`\`_** (ni ningún otro carácter), como carácter de escape.

El equivalente en Rexx del carácter de nueva línea es un valor hexadecimal (dependiente de la plataforma); en plataformas derivadas de UNIX es:

**_`"0A"X`_**

El equivalente en Rexx de la siguiente cadena con nuevas líneas incrustadas (usando el shell bash):

```bash
printf "I have\nthree embedded\nnewlines.\n"
```

es:

```rexx
say 'I have' || "0A"X || 'three embedded' || "0A"X || 'newlines.' || "0A"X
```

Los ejercicios de este track solo traducirán **_`\n`_** a **_`"0A"X`_** cuando sea necesario en una cadena destinada a mostrarse en el terminal. En caso contrario, la cadena **_`\n`_** simplemente se interpretará como una nueva línea lógica.

## Otras recomendaciones de estilo

La indentación puede ser de dos, tres o cuatro caracteres de ESPACIO, aunque se prefiere la indentación de _dos caracteres_ y la coherencia en la indentación.

La instrucción final **_return_** de una función debe alinearse con el nombre de la etiqueta, marcando así claramente el final de esa función, y debe devolver _siempre_ un valor.

El operador booleano NOT puede representarse con varios símbolos distintos. El símbolo preferido en este track es **`\`** y, para mantener la coherencia con este uso, el operador relacional «no es igual» debe ser **`\=`**.

Los valores booleanos **`false`** y **`true`** se representan con **`0`** y **`1`**, respectivamente. No existen literales predefinidos para estos valores.

Los estados de error se indican mediante valores devueltos, y son la cadena vacía, **`''`**, o **`-1`** los que indican estados de error, según el contexto.

## Ejemplo canónico de estilo de código
```rexx
TO DO EXAMPLE
```

## Estructura del fichero de test

Un ejercicio tendrá un único fichero de test, situado en el directorio de nivel superior del ejercicio, llamado: `<exercise>-check.rexx`

Siguiendo esta convención, el fichero de test del ejercicio `acronym` se llamará: `acronym-check.rexx`

El fichero de test de cada ejercicio está organizado de una manera flexible pero concreta, tanto para ayudar a los estudiantes a entender los requisitos del ejercicio como para facilitar a los colaboradores la tarea de implementar o ampliar los tests.

El siguiente es un subconjunto del fichero de test del ejercicio `acronym`:

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

El fichero se divide en dos secciones lógicas, cada una identificada con una línea de comentario.

La primera sección asigna el nombre de la **_función bajo test_** (aquí la función `Abbreviate`) a la variable `function`. Este nombre de variable es descriptivo pero arbitrario, y se usa en el resto del fichero allí donde se necesita el nombre de la función bajo test.

En esta sección también hay una llamada a la función `context`, cuyo propósito es evidente.

La siguiente sección contiene los tests unitarios. Cada invocación de la función `check` es un único test unitario. Parámetros esperados:

```rexx
check(<test description>,
      <function invocation>,
      [<actual result variable>],
      <test comparator>,
      <expected result>)
```

**\<test description>** es la cadena que se emite cuando se ejecuta el test. Para que sea lo más descriptiva posible, se recomienda usar una cadena que incluya el nombre de la función bajo test y los argumentos que se le pasan, como en el ejemplo.

**\<function invocation>** es la invocación o llamada real a la función, de modo que pasa su valor devuelto a `check` para la comparación del test.

**\<actual result variable>** es un parámetro opcional y, si se usa, es el nombre de una variable que contiene el valor que se usará para la comparación del test.

El motivo de usarlo es permitir comprobar resultados _derivados del_ valor devuelto por la función bajo test en lugar del valor devuelto. Un ejemplo obvio es cuando el valor devuelto es una cadena de varios kB, como se muestra:

```rexx
expected_length = LENGTH(FUT(...))

check('...', FUT(...), expected_length, 'to be', 50)
```

Ten en cuenta que el argumento \<function invocation> todavía debe pasarse.

**\<test comparator>** es una cadena que describe el tipo de comparación que se va a realizar. En la mayoría de los casos será la cadena 'to be', que solicita una comparación de igualdad. Consulta la documentación del framework de tests unitarios para conocer otras opciones de comparación.

**\<expected result>** es, evidentemente, el valor con el que se compara el resultado real.

Las variables pueden declararse libremente dentro del fichero de test (antes de usarlas, por supuesto) y usarse en lugar de literales como argumentos de `check`.
