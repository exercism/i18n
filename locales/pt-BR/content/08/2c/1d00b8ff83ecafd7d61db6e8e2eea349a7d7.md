# Instruções

Uma pessoa amiga acabou de enviar uma mensagem com um segredo importante.
Para não deixar fácil para os outros lerem, a mensagem foi criptografada por meio de uma série de manipulações de bits.
Você vai precisar escrever as funções que ajudam a descriptografar a mensagem.

## 1. Desloque os bits de volta

O primeiro passo para descriptografar a mensagem é desfazer o deslocamento do processo de criptografia, deslocando os bits de volta para a direita.
Haverá outras etapas no processo de descriptografia que assumem que 0s são inseridos pelo lado esquerdo.

Implemente a função `shiftBack`, que recebe um valor e o número de posições a deslocar e faz o deslocamento.

```kotlin
shiftBack(0b1001, 2)
# => 0b0010
```

## 2. Defina alguns bits

Em seguida, há alguns bits que precisam ser definidos como 1.

Implemente a função `setBits`, que recebe um valor e uma máscara e retorna o resultado de definir como 1 os bits do valor.
Um bit do valor deve ser definido como 1 onde o bit da máscara também for 1.
Todos os outros bits devem permanecer inalterados.

```kotlin
setBits(0b0110, 0b0101);
# => 0b0111
```

## 3. Inverta bits específicos

Alguns bits são invertidos durante a criptografia.
Eles vão precisar ser invertidos de volta para descriptografar a mensagem.

Implemente a função `flipBits`, que recebe um valor e a máscara.
A máscara indica quais bits do valor devem ser invertidos.
Se o bit for 1 na máscara, o bit é invertido no valor.
Todos os outros bits permanecem inalterados.

```java
flipBits(0b1100, 0b0101);
# => 0b1001
```

## 4. Zere bits específicos

Por fim, também há certos bits que sempre descriptografam para 0.

Implemente a função `clearBits`, que recebe um valor e uma máscara.
Os bits do `value` devem ser definidos como 0 onde o bit da máscara for 1.
Todos os outros bits devem permanecer inalterados.

```java
clearBits(0b0110, 0b0101);
# => 0b0010
```
