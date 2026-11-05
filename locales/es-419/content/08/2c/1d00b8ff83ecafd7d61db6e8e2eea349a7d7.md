# Instrucciones

Tu amigo acaba de enviarte un mensaje con un secreto importante.
Como no quería que a otras personas les resultara fácil leerlo, el mensaje se cifró realizando una serie de manipulaciones de bits.
Tendrás que escribir las funciones que ayuden a descifrar el mensaje.

## 1. Desplaza los bits hacia atrás

El primer paso para descifrar el mensaje es deshacer el desplazamiento del proceso de cifrado desplazando los bits de vuelta hacia la derecha.
Habrá más pasos en el proceso de descifrado que suponen que se insertan 0s por el lado izquierdo.

Implementa la función `shiftBack`, que recibe un valor y el número de posiciones que hay que desplazar, y realiza el desplazamiento.

```kotlin
shiftBack(0b1001, 2)
# => 0b0010
```

## 2. Pon algunos bits a 1

A continuación, hay algunos bits que deben ponerse a 1.

Implementa la función `setBits`, que recibe un valor y una máscara y devuelve el resultado de poner a 1 los bits de value.
Un bit de value debe ponerse a 1 cuando el bit correspondiente de la máscara también es 1.
Todos los demás bits deben quedar sin cambios.

```kotlin
setBits(0b0110, 0b0101);
# => 0b0111
```

## 3. Invierte algunos bits específicos

Algunos bits se invierten durante el cifrado.
Habrá que volver a invertirlos para descifrar el mensaje.

Implementa la función `flipBits`, que recibe un valor y la máscara.
La máscara indica qué bits del valor hay que invertir.
Si el bit es 1 en la máscara, el bit se invierte en el valor.
Todos los demás bits quedan sin cambios.

```java
flipBits(0b1100, 0b0101);
# => 0b1001
```

## 4. Pon a 0 algunos bits específicos

Por último, también hay ciertos bits que siempre se descifran como 0.

Implementa la función `clearBits`, que recibe un valor y una máscara.
Los bits de `value` deben ponerse a 0 donde el bit de la máscara es 1.
Todos los demás bits deben quedar sin cambios.

```java
clearBits(0b0110, 0b0101);
# => 0b0010
```
