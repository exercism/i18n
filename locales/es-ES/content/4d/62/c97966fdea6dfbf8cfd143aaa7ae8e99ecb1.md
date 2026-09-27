# Acerca de

Los especificadores de clase de almacenamiento tienen que ver con cómo se almacenan las variables en memoria.
Están estrechamente relacionados con la duración de almacenamiento (también conocida como tiempo de vida) de un valor.

## auto: la clase de almacenamiento predeterminada para las variables de scope de función o de bloque

Como las variables definidas dentro de un bloque o una función son `auto` de forma predeterminada, no es habitual usar el término de forma explícita.
Otro motivo por el que a menudo se evita `auto` es que tiene un significado distinto en C++.
Los proyectos de código que combinan C y C++ pueden resultar menos confusos si se evita el especificador de almacenamiento `auto`.
El tiempo de vida de una variable `auto` comienza cuando se entra en su bloque y termina cuando se sale de él.
Cuando se entra en su bloque, se asigna memoria para una variable `auto`, _pero sin ningún valor predeterminado_.
Una excepción son los arrays de longitud variable (VLA).
La asignación de un VLA ocurre donde se declara o define en su bloque y termina cuando se sale de él.
Una variable `auto` se puede inicializar con cualquier expresión válida.

## static: el especificador de almacenamiento que no debe confundirse con el tipo de enlazado estático

Una variable definida fuera de un bloque o una función tiene scope de fichero y siempre tiene duración de almacenamiento estática.
El scope de fichero significa que se puede acceder a ella desde cualquier punto del fichero.
El almacenamiento estático significa que existe desde el comienzo de la ejecución del programa hasta el final.
A menos que se inicialice explícitamente, una variable `static` se inicializa con su valor predeterminado de cero.
Si una variable de scope de fichero está marcada con `static`, ese `static` se refiere a su enlazado.
Una variable de scope de fichero marcada como `static` tiene enlazado interno, lo que significa que solo se puede acceder a ella dentro del fichero.
Si una variable se define dentro de una función o en un bloque dentro de una función y está marcada como `static`, tiene duración de almacenamiento `static`.
El valor de la variable `static` persiste entre llamadas a la función o al bloque.

En el siguiente ejemplo vemos dos variables `static` en acción.
La primera variable `count` se define dentro de la función `print_stuff` y conserva su valor entre llamadas a la función.
La segunda variable `count` se define dentro de un bloque arbitrario y oculta (o eclipsa) a la primera variable `count` dentro de su bloque.
La segunda variable `count` conserva su valor de forma independiente entre entradas en el bloque.

```c
#include <stdio.h>

void print_stuff(void) {
    // static variable is initialized to 0
    static int count;
    count++;
    printf("function count is %d\n", count);
    {
        // static variable is initialized to 0
        static int count;
        count++;
        printf("block count is %d\n", count);
    }
}

int main() {
    // prints
    // function count is 1
    // block count is 1
    print_stuff();
    // prints
    // function count is 2
    // block count is 2    
    print_stuff();
}
```

Si una variable `static` se inicializa explícitamente, debe hacerse con una expresión constante.
Una expresión constante es aquella que se puede evaluar en tiempo de compilación.

## extern: cómo acceder a una variable de otra unidad de traducción

Una unidad de traducción consta de un fichero fuente y cualquier otro fichero que se incluya con `#include`.
Aunque una variable con scope de fichero se puede declarar e inicializar como `extern`, la palabra clave `extern` se suele usar para referirse a una variable existente, no para definir una nueva.
La variable a la que se refiere `extern` debe tener scope de fichero.
Una variable en el scope de fichero siempre tiene almacenamiento `static`.
Una variable de un fichero incluido debe tener enlazado externo para que el fichero que la incluye pueda acceder a ella.

En el siguiente ejemplo usamos la variable `val` declarada como `extern` para que se refiera a la `val` definida en su scope de fichero.
Ambos usos de `extern` se denominan declaraciones de referencia, ya que hacen referencia a una variable definida en otro lugar.

```c
#include <stdio.h>

void set_val() {
    // this declares val which is defined elsewhere
    extern int val;
    val += 42;
    // prints val is 42
    printf("val is %d\n", val);
}

int main() {
    set_val();
    // this declares val which is defined elsewhere
    extern int val;
    val += 42;
    // prints val is 84
    printf("val is %d\n", val);
}
// this value could be defined in another source file.
// as a variable with static storage, it is initialized to zero
int val;
```

Si se eliminaran las dos palabras clave `extern`, el programa podría imprimir algo como

```
val is 22038
val is 42
```

Una salida así demuestra que cada declaración de `val` sin `extern` es una declaración de definición y es independiente de las otras declaraciones de `val`.
Si se eliminaran por completo las declaraciones de `val` de `set_val` y `main`, se produciría un error de compilación indicando que `val` no está declarada en `set_val` ni en `main`.

Si una variable a la que se hace referencia como `extern` está en el mismo fichero, puede tener enlazado interno o externo.
Definir `val` como `static int val;` no tendría ningún efecto sobre el uso de `val` en `set_val` o `main`, salvo que la definición tendría que moverse por encima de ellas para que compile.
Pero si `val` estuviera definida por encima de las funciones, estas no necesitarían declarar `val` como `extern`.

Lo siguiente funcionaría

```c
#include <stdio.h>

// val defining declaration before the function definitions
static int val;

void set_val() {
    val += 42;
    // prints val is 42
    printf("val is %d\n", val);
}

int main() {
    set_val();
    val += 42;
    // prints val is 84
    printf("val is %d\n", val);
}
```

Se podría quitar el `static` de `static int val;`, con lo que `val` tendría enlazado externo, y `val` seguiría funcionando igual en `set_val` y `main`.
Si otro fichero fuente incluyera este fichero, solo podría usar `val` si `val` tuviera enlazado externo (no declarada como `static`) y el otro fichero declarara `extern int val;`.

Una variable a la que se hace referencia mediante `extern` no solo debe tener almacenamiento `static`, sino que también debe tener scope de fichero.
Es muy probable que el siguiente ejemplo no compile, porque `val`, aunque es `static`, no tiene scope de fichero.

```c
#include <stdio.h>

void set_val() {
    // defined with static storage, but not in file scope
    static int val;
    val += 42;
    printf("val is %d\n", val);
}

int main() {
    set_val();
    extern int val;
    printf("val is %d\n", val);
}
```

## register: cómo acelerar posiblemente el acceso a una variable

Una variable marcada como `register` expresa el deseo del programador de que el valor se coloque en un registro para acceder a él rápidamente.
Una variable `register` es como una variable `auto` en el sentido de que debe estar en el scope de una función o de un bloque.
Como se pretende que el valor se coloque en un registro en lugar de en memoria, el compilador debería impedir el acceso a la dirección de la variable, ya que no se puede obtener la dirección de un registro.
Sin embargo, una dirección de memoria sí se puede colocar en un registro.
El siguiente ejemplo lo demuestra

```c
#include <stdio.h>

int main() {
    int i = 42;
    register int *i_ptr = &i;
    // prints i is 42, i_ptr is 0x7ffd0c2055c4 (or some other address)
    printf("i is %d, i_ptr is %p", i, i_ptr);
}
```

register` es esencialmente una sugerencia, ya que los compiladores son libres de elegir si siguen este especificador o no, así que puede que el valor se coloque realmente en un registro o puede que no.

## typedef: el especificador de clase de almacenamiento que en realidad no lo es

`typedef` se describe como un especificador de clase de almacenamiento solo por razones sintácticas.
Esto se debe a que un especificador de clase de almacenamiento no se puede usar junto con otro especificador de clase de almacenamiento.
Así pues, `typedef auto int i = 42;` es tan ilegal como `static auto int i = 42;`.
