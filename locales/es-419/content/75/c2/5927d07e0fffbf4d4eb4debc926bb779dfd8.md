# Introducción

## Clases

Es hora de entrar en uno de los paradigmas centrales de C++: la programación orientada a objetos (POO).
La POO gira en torno a `classes`, tipos de datos definidos por el usuario que tienen su propio conjunto de funciones relacionadas.
Empezaremos con lo básico y cubriremos temas más avanzados más adelante en el temario.

### Miembros

Las clases pueden tener **variables miembro** y **funciones miembro**.
Se accede a ellas con el operador `.` de **selección de miembros**.
Al igual que con las variables fuera de las `classes`, es recomendable inicializar las variables miembro con un valor al declararlas.
Ese valor pasa a ser entonces el predeterminado para los objetos de esta clase que se creen.

### Encapsulación y ocultación de información

Las clases ofrecen la opción de restringir el acceso a sus miembros.
Los dos `access specifiers` básicos son `private` y `public`.
No se puede acceder a los miembros `private` desde fuera de la clase.
Se puede acceder libremente a los miembros `public`.
Todos los miembros de una `class` son `private` de forma predeterminada.
Solo los miembros marcados explícitamente con `public` se pueden usar libremente fuera de la clase.

### Ejemplo básico

La definición de una `class` se puede ver en el siguiente ejemplo.
Fíjate en el `;` después de la definición:

```cpp
class Wizard {
  public:               // from here on all members are publicly accessible
    int cast_spell() {  // defines the public member function cast_spell
      return damage;
    }
    std::string name{}; // defines the public member variable `name`
  private:              // from here on all members are private
    int damage{5};      // defines the private member variable `damage`
};

```

Puedes acceder a todas las variables miembro desde dentro de la clase.
Echa un vistazo a `damage` dentro de la función `cast_spell`.
No puedes leer ni cambiar los miembros `private` desde fuera de la clase:

```cpp
Wizard silverhand{};
// calling the `cast_spell` function is okay, it is public:
silverhand.cast_spell();
// => 5

// name is public and can be changed:
silverhand.name = "Laeral";

// damage is private:
silverhand.damage = 500;
 // => Compilation error
```

### Constructores

Los constructores ofrecen la posibilidad de asignar valores a las variables miembro al crear un objeto.
Tienen el mismo nombre que la `class` y no tienen tipo de retorno.
Una clase puede tener varios constructores.
Esto es útil si no siempre necesitas establecer todas las variables.
A veces puede que quieras mantener todo en sus valores predeterminados, pero cambiar la variable `name`.
En el caso de un Wizard importante, quizá quieras cambiar también el damage, así que necesitas dos `constructors`.

```cpp
class Wizard {
  public:
    Wizard(std::string new_name) {
      name = new_name;
    }
    Wizard(std::string new_name, int new_damage) {
      name = new_name;
      damage = new_damage;
    }
    int cast_spell() {
      return damage;
    }
    std::string name{};
  private:
    int damage{5};
};

Wizard el{"Eleven"};       // deals  5 damage
Wizard vecna{"Vecna", 50}; // deals 50 damage
```

Los constructores son un tema amplio y tienen muchos matices.
Si no defines explícitamente un `constructor` para tu `class`, entonces (y solo entonces) el compilador hará el trabajo por ti.
Eso es lo que ocurrió en el primer ejemplo de arriba.
El objeto _silverhand_ se crea llamando al constructor predeterminado, sin pasar ningún argumento.
Todas las variables se establecen con el valor indicado en la definición de la clase.
Si no hubieras dado ningún valor en esa definición, es posible que las variables quedaran sin inicializar, lo que podría tener consecuencias no deseadas.

~~~~exercism/note
## Structs

Los structs provienen de las raíces originales del lenguaje en C y son tan antiguos como el propio C++.
En esencia, son lo mismo que `classes` con una excepción importante.
De forma predeterminada, todo en una `class` es `private`.
Los structs, en cambio, son `public` hasta que se defina lo contrario.
Por convención, la palabra clave `struct` se usa a menudo para **estructuras que solo contienen datos**.
La palabra clave `class` se prefiere para objetos que necesitan garantizar ciertas propiedades.
Un invariante así podría ser que el `damage` de tu `class` `Wizard` no pueda volverse negativo.
La variable `damage` es privada y cualquier función que cambie el damage se aseguraría de que el invariante se conserve.
~~~~
