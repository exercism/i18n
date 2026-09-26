# Acerca de

Los especificadores de clase de almacenamiento se relacionan con cómo se almacenan las variables en la memoria.
Están estrechamente relacionados con la duración de almacenamiento (también conocida como el tiempo de vida) de un valor.

## auto: la clase de almacenamiento predeterminada para variables de ámbito de función o de bloque

Dado que las variables definidas dentro de un bloque o función son `auto` de forma predeterminada, no es común usar el término explícitamente.
Otra razón por la que a menudo se evita `auto` es porque tiene un significado diferente en C++.
Las bases de código que combinan C y C++ pueden resultar menos confusas si se evita el especificador de almacenamiento `auto`.
El tiempo de vida de una variable `auto` comienza cuando se entra en su bloque y termina cuando se sale de él.
Cuando se entra en su bloque, a una variable `auto` se le asigna memoria, _pero sin valor predeterminado_.
Una excepción son los arrays de longitud variable (VLA).
La asignación de un VLA ocurre donde se declara o define en su bloque y termina cuando se sale de él.
Una variable `auto` puede inicializarse con cualquier expresión válida.

## static: el especificador de almacenamiento que no debe confundirse con el tipo de enlace static

Una variable definida fuera de un bloque o función tiene ámbito de archivo y siempre tiene duración de almacenamiento estática.
Ámbito de archivo significa que se puede acceder a ella en cualquier parte del archivo.
Almacenamiento estático significa que existe desde el comienzo de la ejecución del programa hasta el final.
A menos que se inicialice explícitamente, una variable `static` se inicializa con su valor predeterminado cero.
Si una variable de ámbito de archivo está marcada con `static`, el `static` se refiere a su enlace.
Una variable de ámbito de archivo marcada `static` tiene enlace interno, lo que significa que solo se puede acceder a ella dentro del archivo.
Si una variable se define dentro de una función o en un bloque dentro de una función y está marcada `static`, tiene duración de almacenamiento `static`.
El valor de la variable `static` persiste entre llamadas a la función o al bloque.

En el siguiente ejemplo vemos dos variables `static` en acción.
La primera variable `count` se define dentro de la función `print_stuff` y conserva su valor entre llamadas a la función.
La segunda variable `count` se define dentro de un bloque arbitrario y oculta (o sombrea) a la primera variable `count` dentro de su bloque.
La segunda variable `count` conserva su valor de forma independiente entre entradas al bloque.

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
Una expresión constante es aquella que puede evaluarse en tiempo de compilación.

## extern: cómo acceder a una variable en otra unidad de traducción

Una unidad de traducción consta de un archivo fuente y cualquier otro archivo que incluya con `#include`.
Aunque una variable con ámbito de archivo puede declararse e inicializarse como `extern`, la palabra clave `extern` generalmente se usa para referirse a una variable existente, no para definir una nueva.
La variable a la que se refiere `extern` debe tener ámbito de archivo.
Una variable de ámbito de archivo siempre tiene almacenamiento `static`.
Una variable en un archivo incluido debe tener enlace externo para que el archivo que la incluye pueda acceder a ella.

En el siguiente ejemplo usamos la variable `val` declarada como `extern` para que haga referencia a `val` definida en su ámbito de archivo.
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

Si se eliminaran ambas palabras clave `extern`, el programa podría imprimir algo como

```
val is 22038
val is 42
```

Tal salida demuestra que cada declaración de `val` sin `extern` es una declaración de definición y es independiente de las otras declaraciones de `val`.
Eliminar por completo las declaraciones de `val` de `set_val` y `main` daría como resultado un error de compilación de que `val` no está declarada en `set_val` y `main`.

Si una variable referida como `extern` está en el mismo archivo, puede tener enlace interno o externo.
Definir `val` como `static int val;` no tendría efecto en el uso de `val` en `set_val` o `main`, excepto que la definición tendría que moverse por encima de ellas para compilar.
Pero si `val` se definiera por encima de las funciones, no necesitarían declarar `val` como `extern`.

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

Se podría eliminar `static` de `static int val;`, dando a `val` enlace externo, y `val` seguiría funcionando igual en `set_val` y `main`.
Si otro archivo fuente incluyera este archivo, solo podría usar `val` si `val` tuviera enlace externo (no declarada como `static`) y el otro archivo declarara `extern int val;`.

Una variable referida por `extern` no solo debe tener almacenamiento `static`, sino que también debe tener ámbito de archivo.
El siguiente ejemplo probablemente no compilará, porque `val`, aunque sea `static`, no tiene ámbito de archivo.

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

## register: cómo posiblemente acelerar el acceso a una variable

Una variable marcada como `register` expresa el deseo del programador de que el valor se coloque en un registro para un acceso rápido.
Una variable `register` es como una variable `auto` en que debe estar en ámbito de función o de bloque.
Dado que el valor está destinado a colocarse en un registro en lugar de en la memoria, el compilador debería prohibir el acceso a la dirección de la variable, ya que no se puede tomar la dirección de un registro.
Sin embargo, una dirección de memoria en sí misma se puede colocar en un registro.
El siguiente ejemplo demuestra eso

```c
#include <stdio.h>

int main() {
    int i = 42;
    register int *i_ptr = &i;
    // prints i is 42, i_ptr is 0x7ffd0c2055c4 (or some other address)
    printf("i is %d, i_ptr is %p", i, i_ptr);
}
```

register` es esencialmente una sugerencia, ya que los compiladores son libres de elegir si siguen este especificador o no, por lo que el valor puede o no colocarse realmente en un registro.

## typedef: el especificador de clase de almacenamiento que en realidad no lo es

`typedef` se describe como un especificador de clase de almacenamiento solo por razones sintácticas.
Esto se debe a que un especificador de clase de almacenamiento no se puede usar con otro especificador de clase de almacenamiento.
Por lo tanto, `typedef auto int i = 42;` es tan ilegal como `static auto int i = 42;`.
