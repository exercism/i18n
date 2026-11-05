# Instruções

O teu amigo acabou de te enviar uma mensagem com um segredo importante.
Para não facilitar a leitura a mais ninguém, a mensagem foi encriptada através de uma série de manipulações de bits.
Vais ter de escrever as funções que ajudam a desencriptar a mensagem.

## 1. Deslocar os bits de volta

O primeiro passo para desencriptar a mensagem é desfazer o deslocamento feito no processo de encriptação, deslocando os bits de volta para a direita.
Haverá mais passos no processo de desencriptação que assumem que os 0s são inseridos do lado esquerdo.

Implementa a função `shiftBack`, que recebe um valor e o número de posições a deslocar e efetua o deslocamento.

```kotlin
shiftBack(0b1001, 2)
# => 0b0010
```

## 2. Colocar alguns bits a 1

De seguida, há alguns bits que têm de ser colocados a 1.

Implementa a função `setBits`, que recebe um valor e uma máscara e devolve o resultado de colocar a 1 os bits do valor.
Um bit do valor deve ser colocado a 1 quando o bit correspondente na máscara também for 1.
Todos os outros bits devem permanecer inalterados.

```kotlin
setBits(0b0110, 0b0101);
# => 0b0111
```

## 3. Inverter bits específicos

Alguns bits são invertidos durante a encriptação.
Têm de ser invertidos outra vez para desencriptar a mensagem.

Implementa a função `flipBits`, que recebe um valor e a máscara.
A máscara indica quais os bits do valor a inverter.
Se o bit for 1 na máscara, o bit é invertido no valor.
Todos os outros bits permanecem inalterados.

```java
flipBits(0b1100, 0b0101);
# => 0b1001
```

## 4. Limpar bits específicos

Por fim, há também certos bits que dão sempre 0 ao desencriptar.

Implementa a função `clearBits`, que recebe um valor e uma máscara.
Os bits do `value` devem ser colocados a 0 quando o bit correspondente na máscara for 1.
Todos os outros bits devem permanecer inalterados.

```java
clearBits(0b0110, 0b0101);
# => 0b0010
```
