# À propos

## L'instruction _if-then_

L'instruction de contrôle de flux la plus élémentaire en Java est l'instruction [_if-then_][if-statement].
Cette instruction sert à n'exécuter une partie du code que si une condition particulière vaut `true`.
Une instruction _if-then_ se définit à l'aide de la clause `if` :

```java
class Car {
    void drive() {
        // the "if" clause: the car needs to have fuel left to drive
        if (fuel > 0) {
            // the "then" clause: the car drives, consuming fuel
            fuel--;
        }
    }
}
```

Dans l'exemple ci-dessus, si la voiture n'a plus de carburant, appeler la méthode `Car.drive` ne fera rien.

## L'instruction _if-then-else_

L'instruction _if-then-else_ offre un autre chemin d'exécution pour le cas où la condition de la clause `if` vaut `false`.
Ce chemin d'exécution alternatif suit une clause `if` et se définit à l'aide de la clause `else` :

```java
class Car {
    void drive() {
        if (fuel > 0) {
            fuel--;
        } else {
            stop();
        }
    }
}
```

Dans l'exemple ci-dessus, si la voiture n'a plus de carburant, appeler la méthode `Car.drive` appellera une autre méthode pour arrêter la voiture.

L'instruction _if-then-else_ prend aussi en charge plusieurs conditions grâce à la clause `else if` :

```java
class Car {
    void drive() {
        if (fuel > 5) {
            fuel--;
        } else if (fuel > 0) {
            turnOnFuelLight();
            fuel--;
        } else {
            stop();
        }
    }
}
```

Dans l'exemple ci-dessus, conduire la voiture quand le carburant est inférieur ou égal à `5` fera avancer la voiture, mais allumera le voyant de carburant.
Quand le carburant atteint `0`, la voiture s'arrête.

[if-statement]: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html
