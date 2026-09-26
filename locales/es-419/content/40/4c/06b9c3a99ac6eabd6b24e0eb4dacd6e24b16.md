# Introducción

## Más sobre patrones

Recuerda del concepto Fundamentos, un programa AWK se compone de **pares patrón-acción**.

```awk
pattern1 { action1 }
pattern2 { action2 }
...
```

### ¿Qué queremos decir con «patrón»?

El «patrón» es cualquier expresión AWK.
La veracidad del resultado de la expresión determina si se ejecuta la acción.

### El patrón vacío

El patrón se puede omitir.
En este caso, la acción se realiza para cada registro.

Podemos imprimir todos los nombres de usuario en el archivo passwd.

```sh
awk -F: '{print $1}' /etc/passwd
```

### Expresiones regulares

AWK puede comparar strings con expresiones regulares para obtener un resultado boolean.

Usa el operador de coincidencia de regex `~` para hacer coincidir un campo en particular.
Este operador toma un string como operando izquierdo y una expresión regular como operando derecho.
Un literal de expresión regular se encierra entre barras `/`.

Para encontrar los usuarios en el archivo passwd que inician sesión con bash:

```sh
awk -F: '$7 ~ /bash/ {print $1}' /etc/passwd
```

`!~` es el operador «regex **no** coincide».

Para hacer coincidir una regex con el registro actual, puedes hacer `$0 ~ /regex/`.
Esto es tan común que hay una forma abreviada: puedes omitir el `$0` y el `~` y simplemente escribir `/regex/`

```sh
awk '/regex/' data.txt
```

~~~~exercism/note
Compara ese one-liner de AWK con el comando grep equivalente

```sh
grep 'regex' data.txt
```

AWK te da todo un lenguaje de programación sin sacrificar la concisión.
~~~~

Profundizaremos en la variante de expresiones regulares de GNU AWK en un concepto posterior.

### Expresiones

Las expresiones AWK (aritméticas, lógicas o de otro tipo) se pueden usar como patrones.

Para extraer todos los usuarios con UID 1000 o superior:

```sh
awk -F: '$3 >= 1000' /etc/passwd
```

Recuerda que los valores falsos de AWK son el número cero y el string vacío, y todos los demás números o strings son verdaderos.
Cualquier expresión que evalúe a un número o a un string se puede usar como patrón.

### Funciones

Cualquier función [incorporada][builtins] o [definida por el usuario][user-defined] se puede usar en una expresión y, por lo tanto, en el patrón.
Un par de ejemplos:

```awk
length($1) {print "first field is not empty"}
```
```awk
toupper(substr($1, 1, 1)) ~ /[AEIOU]/ {print "starts with a vowel"}
```

### Patrones constantes

Un modismo común de AWK es:

```sh
{
    xyz()   # some code that transforms each record
}
1
```

`1` es un patrón verdadero sin acción asociada.
Esto significa «imprimir el registro actual».

[builtins]: https://www.gnu.org/software/gawk/manual/html_node/Built_002din.html
[user-defined]: https://www.gnu.org/software/gawk/manual/html_node/User_002ddefined.html
