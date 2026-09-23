# Introduction

## Terminologie

Tu as déjà utilisé et écrit des fonctions C++ dans quelques concepts.
Il est temps de passer à la technique.
L'extrait de code ci-dessous présente les termes les plus courants, pour t'y référer facilement.
Comme C++ ignore les espaces, la mise en forme a été modifiée pour placer chaque élément sur une seule ligne.

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
La déclaration fonctionne comme une note pour le compilateur, indiquant qu'il existe une fonction avec ce nom, ce type de retour et cette liste de paramètres.
Le code ne fonctionnera pas si la définition est absente.
Les déclarations sont facultatives ; elles sont nécessaires si tu utilises la fonction avant sa définition.
Les déclarations peuvent résoudre des problèmes comme les références cycliques, et elles peuvent servir à séparer l'interface de l'implémentation.
~~~~

## Le qualificateur const

Parfois, tu veux t'assurer que des valeurs ne peuvent pas être modifiées après leur initialisation.
C++ utilise le mot-clé `const` comme qualificateur pour les constantes.

```cpp
const int number_of_dragon_balls{7};
number_of_dragon_balls--; // compilation error
```

~~~~exercism/note
Tu verras souvent des constantes écrites en _UPPER_SNAKE_CASE_.
Il est recommandé de réserver cette casse aux macros, s'il n'existe pas d'autre convention.
~~~~

Si tu essaies de modifier une variable constante après l'avoir définie, ton code ne compilera pas.
Cela permet d'éviter des modifications involontaires, mais ouvre aussi des possibilités d'optimisation pour le compilateur.
En tant qu'humain, il est aussi plus facile de raisonner sur le code quand on sait que certaines parties ne seront pas modifiées.

Tu peux aussi utiliser `const` comme qualificateur pour les paramètres d'une fonction.

```cpp
string guess_number(const int& secret, const int& guess) {
    if (secret < guess) return "lower.";
    if (secret > guess) return "higher.";
    return "exact!";
}
```

Quand tu passes une référence `const` à la fonction, tu peux être sûr qu'elle restera inchangée.
Tu verras souvent des références `const` pour des objets dont la copie peut être coûteuse, comme les _strings_ plus longues.
Un troisième cas d'usage du qualificateur `const` concerne les fonctions membres qui ne modifient pas l'instance d'une classe.

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

La fonction membre `answer` de `Stubborn` utilise une référence `const string&` comme paramètre.
Cela évite une opération de copie de l'objet original passé à la fonction.

## La surcharge de fonctions

Plusieurs fonctions peuvent porter le même nom si leur liste de paramètres est différente.
C'est ce qu'on appelle la surcharge de fonctions, et on y a généralement recours quand ces fonctions accomplissent des tâches très similaires.

L'en-tête de la fonction, sans le type de retour, constitue la __signature de type__ de la fonction.
Un changement dans la signature de type donne une nouvelle fonction.

L'exemple `play_sound` comporte six surcharges différentes pour couvrir différents scénarios :

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
La signature de type est définie par le nom de la fonction, le nombre de paramètres, leurs types et leurs qualificateurs (mais pas leurs noms).
Le type de retour ne fait explicitement pas partie de la signature de type, et tu obtiendras des erreurs de compilation si tu as deux fonctions qui ne diffèrent que par leur type de retour.
Le compilateur se plaindra, car il n'est pas clair laquelle des deux doit être utilisée.
~~~~

## Les arguments par défaut

Certaines fonctions peuvent devenir très longues, et beaucoup de leurs appels utilisent souvent les mêmes valeurs pour la plupart des paramètres.
La répétition dans ces appels peut être évitée grâce aux arguments par défaut.

```cpp
void record_new_horse_birth(string name, int weight, string color="brown-ish", string dam="Alruccaba", string sire="Poseidon");

record_new_horse_birth("Urban Sea", 130); // color will be brown, dam "Alruccabam", sire "Poseidon"
record_new_horse_birth("Highclere", 175, "off-white", "Fall Aspen");   // sire will be "Poseidon"
```

Comme la déclaration de la fonction est souvent lue avant sa définition, c'est le meilleur endroit pour définir les arguments par défaut.
Si un paramètre a une valeur par défaut, tous les paramètres à sa droite doivent aussi en avoir une.
Parfois, des surcharges de fonctions compliquées peuvent être réécrites en moins de fonctions grâce aux arguments par défaut, afin d'améliorer la maintenabilité.
