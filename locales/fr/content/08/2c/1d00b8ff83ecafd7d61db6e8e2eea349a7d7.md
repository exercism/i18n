# Instructions

Ton ami vient de t'envoyer un message contenant un secret important. Pour éviter que d'autres puissent le lire facilement, le message a été chiffré au moyen d'une série de manipulations de bits. Tu vas devoir écrire les fonctions qui permettent de déchiffrer le message.

## 1. Décale les bits vers la droite

La première étape du déchiffrement consiste à annuler le décalage effectué lors du chiffrement, en redécalant les bits vers la droite. Les étapes suivantes du déchiffrement supposent que des 0 sont insérés par la gauche.

Implémente la fonction `shiftBack`, qui prend une valeur et le nombre de positions à décaler, et effectue le décalage.

```kotlin
shiftBack(0b1001, 2)
# => 0b0010
```

## 2. Mets certains bits à 1

Ensuite, certains bits doivent être mis à 1.

Implémente la fonction `setBits`, qui prend une valeur et un masque et renvoie le résultat de la mise à 1 des bits de la valeur.
Un bit de la valeur doit être mis à 1 lorsque le bit correspondant du masque vaut lui aussi 1.
Tous les autres bits restent inchangés.

```kotlin
setBits(0b0110, 0b0101);
# => 0b0111
```

## 3. Inverse certains bits

Certains bits sont inversés lors du chiffrement.
Il faudra les inverser à nouveau pour déchiffrer le message.

Implémente la fonction `flipBits`, qui prend une valeur et le masque.
Le masque indique quels bits de la valeur doivent être inversés.
Si le bit vaut 1 dans le masque, le bit est inversé dans la valeur.
Tous les autres bits restent inchangés.

```java
flipBits(0b1100, 0b0101);
# => 0b1001
```

## 4. Mets certains bits à 0

Enfin, certains bits se déchiffrent toujours à 0.

Implémente la fonction `clearBits`, qui prend une valeur et un masque.
Les bits de `value` doivent être mis à 0 lorsque le bit correspondant du masque vaut 1.
Tous les autres bits restent inchangés.

```java
clearBits(0b0110, 0b0101);
# => 0b0010
```
