# Introduction

## Les classes

Il est temps d'aborder l'un des paradigmes fondamentaux du C++ : la programmation orientée objet (POO). La POO s'articule autour des `classes`, des types de données définis par l'utilisateur et dotés de leur propre ensemble de fonctions associées. On commencera par les bases et on abordera des sujets plus avancés plus bas dans l'arbre du programme.

### Les membres

Une classe peut avoir des **variables membres** et des **fonctions membres**. On y accède avec l'opérateur de **sélection de membre** `.`. Comme pour les variables en dehors des `classes`, il est conseillé d'initialiser les variables membres avec une valeur au moment de leur déclaration. Cette valeur devient alors la valeur par défaut des nouveaux objets créés à partir de cette classe.

### Encapsulation et masquage des informations

Les classes offrent la possibilité de restreindre l'accès à leurs membres. Les deux `access specifiers` de base sont `private` et `public`. Les membres `private` ne sont pas accessibles depuis l'extérieur de la classe. Les membres `public` sont accessibles librement. Tous les membres d'une `class` sont `private` par défaut. Seuls les membres explicitement marqués `public` sont librement utilisables en dehors de la classe.

### Un exemple simple

La définition d'une `class` est visible dans l'exemple suivant. Fais attention au `;` après la définition :

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

Tu peux accéder à toutes les variables membres depuis l'intérieur de la classe. Regarde `damage` à l'intérieur de la fonction `cast_spell`. Tu ne peux pas lire ni modifier les membres `private` depuis l'extérieur de la classe :

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

### Les constructeurs

Les constructeurs offrent la possibilité d'affecter des valeurs aux variables membres au moment de la création de l'objet. Ils portent le même nom que la `class` et n'ont pas de type de retour. Une classe peut avoir plusieurs constructeurs. C'est utile si tu n'as pas toujours besoin de définir toutes les variables. Parfois, tu peux vouloir tout laisser par défaut et ne changer que la variable `name`. Pour un magicien important, tu peux aussi vouloir changer les dégâts, et il te faut donc deux `constructors`.

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

Les constructeurs sont un vaste sujet et comportent de nombreuses nuances. Si tu ne définis pas explicitement un `constructor` pour ta `class`, alors, et seulement alors, le compilateur s'en charge à ta place. C'est ce qui s'est passé dans le premier exemple ci-dessus. L'objet _silverhand_ est créé en appelant le constructeur par défaut, aucun argument n'a été passé. Toutes les variables reçoivent la valeur indiquée dans la définition de la classe. Si tu n'avais donné aucune valeur dans cette définition, les variables pourraient ne pas être initialisées, ce qui pourrait avoir des conséquences inattendues.

~~~~exercism/note
## Les `struct`

Les `struct` viennent des racines C du langage et sont aussi anciennes que le C++ lui-même. Ce sont en pratique la même chose que les `classes`, à une exception importante près. Par défaut, tout ce qui se trouve dans une `class` est `private`. Les `struct`, elles, sont `public` tant qu'on ne précise pas le contraire. Par convention, le mot-clé `struct` est souvent utilisé pour des **structures de données uniquement**. On préfère le mot-clé `class` pour les objets qui doivent garantir certaines propriétés. Un tel invariant pourrait être que le `damage` de ta `class` `Wizard` ne puisse pas devenir négatif. La variable `damage` est privée et toute fonction qui modifie les dégâts garantirait que l'invariant est préservé.
~~~~
