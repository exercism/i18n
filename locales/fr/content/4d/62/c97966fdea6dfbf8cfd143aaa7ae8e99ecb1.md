# À propos

Les spécificateurs de classe de stockage ont trait à la façon dont les variables sont stockées en mémoire.
Ils sont étroitement liés à la durée de stockage (également appelée durée de vie) d'une valeur.

## auto : la classe de stockage par défaut pour les variables de portée de bloc ou de fonction

Comme les variables définies dans un bloc ou une fonction sont `auto` par défaut, il est rare d'employer explicitement ce terme.
Une autre raison d'éviter souvent `auto` tient au fait qu'il a un sens différent en C++.
Les bases de code qui combinent C et C++ peuvent être moins déroutantes si l'on évite le spécificateur de stockage `auto`.
La durée de vie d'une variable `auto` commence à l'entrée dans son bloc et se termine à la sortie de celui-ci.
Une variable `auto` se voit allouer de la mémoire à l'entrée dans son bloc, _mais sans valeur par défaut_.
Une exception concerne les tableaux de longueur variable (VLA).
L'allocation d'un VLA a lieu là où il est déclaré ou défini dans son bloc, et prend fin à la sortie de ce bloc.
Une variable `auto` peut être initialisée par n'importe quelle expression valide.

## static : le spécificateur de stockage à ne pas confondre avec le type de liaison static

Une variable définie en dehors d'un bloc ou d'une fonction a une portée de fichier et toujours une durée de stockage statique.
La portée de fichier signifie qu'elle est accessible n'importe où dans le fichier.
Le stockage statique signifie qu'elle existe depuis le début de l'exécution du programme jusqu'à la fin.
Sauf initialisation explicite, une variable `static` est initialisée à sa valeur nulle par défaut.
Si une variable de portée de fichier est marquée `static`, ce `static` désigne sa liaison.
Une variable de portée de fichier marquée `static` a une liaison interne, ce qui signifie qu'elle n'est accessible qu'à l'intérieur du fichier.
Si une variable est définie dans une fonction, ou dans un bloc à l'intérieur d'une fonction, et qu'elle est marquée `static`, elle a une durée de stockage statique.
La valeur de la variable `static` persiste entre les appels à la fonction ou au bloc.

Dans l'exemple suivant, on voit deux variables `static` à l'œuvre.
La première variable `count` est définie dans la fonction `print_stuff` et conserve sa valeur entre les appels à la fonction.
La seconde variable `count` est définie dans un bloc arbitraire et masque (ou cache) la première variable `count` à l'intérieur de son bloc.
La seconde variable `count` conserve indépendamment sa valeur entre les entrées dans le bloc.

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

Si une variable `static` est initialisée explicitement, elle doit l'être au moyen d'une expression constante.
Une expression constante est une expression qui peut être évaluée à la compilation.

## extern : comment accéder à une variable dans une autre unité de traduction

Une unité de traduction est constituée d'un fichier source et de tous les autres fichiers qu'il `#include`.
Bien qu'une variable de portée de fichier puisse être déclarée et initialisée avec `extern`, le mot-clé `extern` sert généralement à référencer une variable existante, et non à en définir une nouvelle.
La variable référencée par `extern` doit avoir une portée de fichier.
Une variable de portée de fichier a toujours un stockage statique.
Une variable d'un fichier inclus doit avoir une liaison externe pour être accessible par le fichier qui l'inclut.

Dans l'exemple suivant, on utilise la variable `val` déclarée `extern` afin qu'elle référence la `val` définie dans sa portée de fichier.
Les deux emplois de `extern` sont appelés des déclarations de référence, puisqu'elles référencent une variable définie ailleurs.

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

Si l'on supprimait les deux mots-clés `extern`, le programme pourrait afficher quelque chose comme

```
val is 22038
val is 42
```

Une telle sortie montre que chaque déclaration de `val` sans `extern` est une déclaration de définition et qu'elle est indépendante des autres déclarations de `val`.
Si l'on supprimait entièrement les déclarations de `val` dans `set_val` et `main`, on obtiendrait une erreur de compilation indiquant que `val` n'est pas déclarée dans `set_val` et `main`.

Si une variable référencée avec `extern` se trouve dans le même fichier, elle peut avoir une liaison interne ou externe.
Définir `val` comme `static int val;` n'aurait aucun effet sur l'utilisation de `val` dans `set_val` ou `main`, sauf que la définition devrait être déplacée au-dessus d'elles pour que le code compile.
Mais si `val` était définie au-dessus des fonctions, celles-ci n'auraient pas besoin de déclarer `val` comme `extern`.

Ce qui suit fonctionnerait

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

On pourrait retirer le `static` de `static int val;`, ce qui donnerait à `val` une liaison externe, et `val` fonctionnerait toujours de la même façon dans `set_val` et `main`.
Si un autre fichier source incluait ce fichier, il ne pourrait utiliser `val` que si `val` avait une liaison externe (non déclarée `static`) et si l'autre fichier déclarait `extern int val;`.

Une variable référencée par `extern` doit non seulement avoir un stockage statique, mais aussi avoir une portée de fichier.
L'exemple suivant ne compilera très probablement pas, car `val`, bien que `static`, n'a pas de portée de fichier.

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

## register : comment accélérer éventuellement l'accès à une variable

Une variable marquée `register` exprime le souhait du programmeur de voir sa valeur placée dans un registre pour y accéder rapidement.
Une variable `register` est semblable à une variable `auto` en ce qu'elle doit se trouver dans la portée d'une fonction ou d'un bloc.
Comme la valeur est censée être placée dans un registre plutôt qu'en mémoire, l'accès à l'adresse de la variable devrait être interdit par le compilateur, car on ne peut pas prendre l'adresse d'un registre.
Cependant, une adresse mémoire peut elle-même être placée dans un registre.
L'exemple suivant le montre

```c
#include <stdio.h>

int main() {
    int i = 42;
    register int *i_ptr = &i;
    // prints i is 42, i_ptr is 0x7ffd0c2055c4 (or some other address)
    printf("i is %d, i_ptr is %p", i, i_ptr);
}
```

`register` n'est en fait qu'une indication, car les compilateurs sont libres de suivre ou non ce spécificateur, si bien que la valeur peut ou non être réellement placée dans un registre.

## typedef : le spécificateur de classe de stockage qui n'en est pas vraiment un

`typedef` n'est décrit comme un spécificateur de classe de stockage que pour des raisons de syntaxe.
C'est parce qu'un spécificateur de classe de stockage ne peut pas être utilisé avec un autre spécificateur de classe de stockage.
Ainsi, `typedef auto int i = 42;` est tout aussi illégal que `static auto int i = 42;`.
