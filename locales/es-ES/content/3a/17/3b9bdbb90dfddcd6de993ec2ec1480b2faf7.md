# Introducción

## Terminología

Ya has usado y escrito funciones de C++ en un par de conceptos.
Es hora de ponerse técnico.
El fragmento de código que aparece a continuación muestra los términos más comunes para que los tengas a mano.
Como C++ ignora los espacios en blanco, se ha modificado el formato para poner cada elemento en una sola línea.

```cpp
// Function declaration:
bool                                              // Return type
admin_detected(string user, string password)      // Type signature
;                                                 // Don't forget the ';' for the declaration

// Function definition:
bool                                              // Return type
admin_detected                                    // Function name
(string user, string password)                    // Parameter list
{ return user == "admin" && password == "1234"; } // Function body
```
~~~~exercism/advanced
La declaración funciona como una nota para el compilador: existe una función con ese nombre, ese tipo devuelto y esa lista de parámetros.
El código no funcionará si falta la definición.
Las declaraciones son opcionales; se necesitan si usas la función antes de su definición.
Las declaraciones pueden resolver problemas como las referencias cíclicas y sirven para separar la interfaz de la implementación.
~~~~

## El calificador const

A veces quieres asegurarte de que los valores no se puedan cambiar después de haberlos inicializado.
C++ usa la palabra clave `const` como calificador de constantes.

```cpp
const int number_of_dragon_balls{7};
number_of_dragon_balls--; // compilation error
```

~~~~exercism/note
A menudo verás constantes escritas en _UPPER_SNAKE_CASE_.
Se recomienda reservar este estilo para las macros, si no hay otra convención.
~~~~

Si intentas cambiar una variable constante después de haberle asignado un valor, tu código no compilará.
Esto ayuda a evitar cambios no deseados, pero también abre posibilidades de optimización para el compilador.
Como persona, también te resulta más fácil razonar sobre el código si sabes que ciertas partes no se verán afectadas.

También puedes usar `const` como calificador de los parámetros de una función.

```cpp
string guess_number(const int& secret, const int& guess) {
    if (secret < guess) return "lower.";
    if (secret > guess) return "higher.";
    return "exact!";
}
```

Cuando pasas una referencia `const` a la función, puedes estar seguro de que no se modificará.
A menudo verás referencias `const` para objetos que podrían ser costosos de copiar, como strings más largos.
Un tercer caso de uso del calificador `const` son las funciones miembro que no modifican la instancia de una clase.

```cpp
class Stubborn {
    public:
    Stubborn(string reply) {
        response = reply;
    }
    string answer(const string& question) const {
        if (question.length() == 0) { return ""; }
        return response;
    }
    private:
    string response{};
};
```

La función miembro `answer` de `Stubborn` usa una referencia `const string&` como parámetro.
Así se evita una operación de copia del objeto original que se pasó a la función.

## Sobrecarga de funciones

Varias funciones pueden tener el mismo nombre si su lista de parámetros es distinta.
Eso se llama sobrecarga de funciones y se suele hacer cuando estas funciones realizan tareas muy parecidas.

El encabezado de la función sin el tipo devuelto es la __firma de tipo__ de la función.
Un cambio en la firma de tipo da lugar a una función nueva.

El ejemplo de `play_sound` tiene seis sobrecargas distintas para cubrir diferentes situaciones:

```cpp
// different argument types:
void play_sound(char note);         // C, D, E, ..., B
void play_sound(string solfege);    // do, re, mi, ..., ti
void play_sound(int jianpu);        // 1, 2, 3, ..., 7

// different number of arguments:
void play_sound(string solfege, double duration);

// different qualifiers:
void play_sound(vector<string>& solfege);
void play_sound(const vector<string>& solfege);
```

~~~~exercism/advanced
La firma de tipo se define por el nombre de la función, el número de parámetros, sus tipos y sus calificadores (pero no sus nombres).
El tipo devuelto no forma parte de la firma de tipo de manera explícita, y obtendrás errores de compilación si tienes dos funciones que solo se diferencian en el tipo devuelto.
El compilador se quejará porque no está claro cuál de las dos debe usarse.
~~~~

## Argumentos por defecto

Algunas funciones pueden llegar a ser muy largas, y muchas de sus llamadas podrían usar los mismos valores para la mayoría de los parámetros.
La repetición en esas llamadas se puede evitar con argumentos por defecto.

```cpp
void record_new_horse_birth(string name, int weight, string color="brown-ish", string dam="Alruccaba", string sire="Poseidon");

record_new_horse_birth("Urban Sea", 130); // color will be brown, dam "Alruccabam", sire "Poseidon"
record_new_horse_birth("Highclere", 175, "off-white", "Fall Aspen");   // sire will be "Poseidon"
```

Como la declaración de la función suele leerse antes que la definición, es el mejor lugar para establecer los argumentos por defecto.
Si un parámetro tiene un valor por defecto declarado, todos los parámetros a su derecha también necesitan uno.
A veces, las sobrecargas de funciones complicadas se pueden refactorizar en menos funciones con argumentos por defecto para mejorar el mantenimiento.
