# Introducción

## Clases

Es hora de llegar a uno de los paradigmas fundamentales de C++: la programación orientada a objetos (POO).
La POO gira en torno a las `classes`, tipos de datos definidos por el usuario con su propio conjunto de funciones relacionadas.
Empezaremos por lo básico y cubriremos temas más avanzados más adelante en el temario.

### Miembros

Las clases pueden tener **variables miembro** y **funciones miembro**.
Se accede a ellas mediante el operador de **selección de miembros** `.`.
Igual que ocurre con las variables fuera de las `classes`, es recomendable inicializar las variables miembro con un valor en el momento de declararlas.
Ese valor pasará a ser el valor por defecto de los objetos de esta clase que se creen a partir de entonces.

### Encapsulación y ocultación de información

Las clases ofrecen la posibilidad de restringir el acceso a sus miembros.
Los dos `access specifiers` básicos son `private` y `public`.
No se puede acceder a los miembros `private` desde fuera de la clase.
Se puede acceder libremente a los miembros `public`.
Todos los miembros de una `class` son `private` por defecto.
Solo los miembros marcados explícitamente como `public` se pueden usar libremente fuera de la clase.

### Ejemplo básico

La definición de una `class` puede verse en el siguiente ejemplo.
Fíjate en el `;` que va después de la definición:

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

Los constructores ofrecen la posibilidad de asignar valores a las variables miembro en el momento de crear el objeto.
Tienen el mismo nombre que la `class` y no tienen tipo de retorno.
Una clase puede tener varios constructores.
Esto es útil si no siempre necesitas establecer todas las variables.
A veces puede que quieras dejar todo con los valores por defecto pero cambiar la variable `name`.
En el caso de un mago poderoso, puede que también quieras cambiar el daño, así que necesitarás dos `constructors`.

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

Los constructores son un tema extenso y tienen muchos matices.
Si no defines explícitamente un `constructor` para tu `class`, será entonces, y solo entonces, cuando el compilador haga el trabajo por ti.
Esto es lo que ha ocurrido en el primer ejemplo de arriba.
El objeto _silverhand_ se crea llamando al constructor por defecto, sin pasar ningún argumento.
Todas las variables se establecen al valor indicado en la definición de la clase.
Si no hubieras dado ningún valor en esa definición, las variables podrían quedar sin inicializar, lo que podría tener consecuencias no deseadas.

~~~~exercism/note
## Estructuras

Las estructuras provienen de las raíces originales del lenguaje en C y son tan antiguas como el propio C++.
En esencia, son lo mismo que las `classes`, con una excepción importante.
Por defecto, todo lo que hay en una `class` es `private`.
Las estructuras, en cambio, son `public` hasta que se defina lo contrario.
Por convención, la palabra clave `struct` se usa a menudo para **estructuras que solo contienen datos**.
Se prefiere la palabra clave `class` para objetos que necesitan garantizar ciertas propiedades.
Una de esas invariantes podría ser que el `damage` de tu `class` `Wizard` no pueda volverse negativo.
La variable `damage` es privada y cualquier función que cambie el daño garantizaría que se preserve la invariante.
~~~~
