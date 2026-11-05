# Instrucciones

Tu amiga acaba de enviarte un mensaje con un secreto importante.
Como no quería que los demás pudieran leerlo con facilidad, el mensaje se cifró realizando una serie de manipulaciones de bits.
Tendrás que escribir las funciones que ayudan a descifrar el mensaje.

## 1. Desplaza los bits hacia atrás

El primer paso para descifrar el mensaje consiste en deshacer el desplazamiento del proceso de cifrado, desplazando los bits de vuelta hacia la derecha.
En el proceso de descifrado habrá pasos posteriores que dan por hecho que se insertan 0s por la izquierda.

Implementa la función `shiftBack`, que recibe un valor y el número de posiciones que hay que desplazar, y realiza el desplazamiento.

```kotlin
shiftBack(0b1001, 2)
# => 0b0010
```

## 2. Pon algunos bits a 1

Después, hay algunos bits que hay que poner a 1.

Implementa la función `setBits`, que recibe un valor y una máscara y devuelve el resultado de poner a 1 los bits del valor.
Un bit del valor debe ponerse a 1 cuando el bit de la máscara también sea 1.
El resto de bits deben quedar sin cambios.

```kotlin
setBits(0b0110, 0b0101);
# => 0b0111
```

## 3. Invierte bits concretos

Durante el cifrado se invierten algunos bits.
Habrá que invertirlos de nuevo para descifrar el mensaje.

Implementa la función `flipBits`, que recibe un valor y la máscara.
La máscara indica qué bits del valor hay que invertir.
Si el bit de la máscara es 1, se invierte el bit correspondiente del valor.
El resto de bits se dejan sin cambios.

```java
flipBits(0b1100, 0b0101);
# => 0b1001
```

## 4. Pon a 0 bits concretos

Por último, también hay ciertos bits que siempre se descifran como 0.

Implementa la función `clearBits`, que recibe un valor y una máscara.
Los bits del `value` deben ponerse a 0 cuando el bit de la máscara sea 1.
El resto de bits deben quedar sin cambios.

```java
clearBits(0b0110, 0b0101);
# => 0b0010
```
