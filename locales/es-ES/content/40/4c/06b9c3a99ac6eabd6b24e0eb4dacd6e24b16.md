# Introducción

## Más sobre los patrones

Recuerda del concepto Fundamentos que un programa AWK se compone de **pares patrón-acción**.

```awk
pattern1 { action1 }
pattern2 { action2 }
...
```

### ¿Qué queremos decir con «patrón»?

El «patrón» es cualquier expresión de AWK.
El valor de verdad del resultado de la expresión determina si se ejecuta la acción.

### El patrón vacío

El patrón puede omitirse.
En ese caso, la acción se ejecuta para cada registro.

Podemos imprimir todos los nombres de usuario del fichero passwd.

```sh
awk -F: '{print $1}' /etc/passwd
```

### Expresiones regulares

AWK puede comparar strings con expresiones regulares para obtener un resultado Boolean.

Usa el operador de coincidencia de expresiones regulares `~` para hacer coincidir un campo concreto.
Este operador toma un string como operando izquierdo y una expresión regular como operando derecho.
Un literal de expresión regular se escribe entre barras `/`.

Para encontrar los usuarios del fichero passwd que inician sesión con bash:

```sh
awk -F: '$7 ~ /bash/ {print $1}' /etc/passwd
```

`!~` es el operador que significa «la expresión regular **no** coincide».

Para comparar una expresión regular con el registro actual, puedes hacer `$0 ~ /regex/`.
Esto es tan habitual que existe una forma abreviada: puedes omitir `$0` y `~` y escribir simplemente `/regex/`

```sh
awk '/regex/' data.txt
```

~~~~exercism/note
Compara ese comando de una línea de AWK con el comando grep equivalente

```sh
grep 'regex' data.txt
```

AWK te ofrece todo un lenguaje de programación sin renunciar a la brevedad.
~~~~

Profundizaremos en la variante de expresiones regulares de GNU AWK en un concepto posterior.

### Expresiones

Las expresiones de AWK (aritméticas, lógicas o de cualquier otro tipo) pueden usarse como patrones.

Para extraer todos los usuarios con UID 1000 o superior:

```sh
awk -F: '$3 >= 1000' /etc/passwd
```

Recuerda que los valores falsos de AWK son el número cero y el string vacío, y que cualquier otro número o string es verdadero.
Cualquier expresión que se evalúe como un número o un string puede usarse como patrón.

### Funciones

Cualquier función [incorporada][builtins] o [definida por el usuario][user-defined] puede usarse en una expresión y, por tanto, en el patrón.
Un par de ejemplos:

```awk
length($1) {print "first field is not empty"}
```
```awk
toupper(substr($1, 1, 1)) ~ /[AEIOU]/ {print "starts with a vowel"}
```

### Patrones constantes

Una construcción habitual en AWK es:

```sh
{
    xyz()   # some code that transforms each record
}
1
```

`1` es un patrón verdadero sin acción asociada.
Esto significa «imprime el registro actual».

[builtins]: https://www.gnu.org/software/gawk/manual/html_node/Built_002din.html
[user-defined]: https://www.gnu.org/software/gawk/manual/html_node/User_002ddefined.html
