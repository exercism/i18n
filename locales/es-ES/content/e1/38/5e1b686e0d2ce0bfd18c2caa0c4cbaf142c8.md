# Acerca de

## Sintaxis general

El bucle `for` es una de las instrucciones más habituales para ejecutar repetidamente cierta lógica.
En Go consta de la palabra clave `for`, una cabecera y un bloque de código que contiene el cuerpo del bucle encerrado entre llaves.
La cabecera consta de 3 componentes separados por puntos y coma `;`: inicialización, condición y post.

```go
for init; condition; post {
  // loop body - code that is executed repeatedly as long as the condition is true
}
```

- El componente de **inicialización** es código que se ejecuta una sola vez antes de que empiece el bucle.
- El componente de **condición** debe ser una expresión que se evalúe como Boolean y que controle cuándo debe detenerse el bucle.
  El código dentro del bucle se ejecutará mientras esta condición se evalúe como true.
  En cuanto esta expresión se evalúe como false, no se ejecutará ninguna iteración más del bucle.
- El componente **post** es código que se ejecuta al final de cada iteración.

**Nota:** A diferencia de otros lenguajes, no hay paréntesis `()` que rodeen los tres componentes de la cabecera.
De hecho, incluir esos paréntesis es un error de compilación.
Sin embargo, las llaves `{ }` que rodean el cuerpo del bucle siempre son obligatorias.

## Bucles `for`: un ejemplo

El componente de inicialización normalmente prepara una variable contadora, la condición comprueba si el bucle debe continuar o detenerse, y el componente post normalmente incrementa el contador al final de cada repetición.

```go
for i := 1; i < 10; i++ {
  fmt.Println(i)
}
```

Este bucle imprimirá los números del `1` al `9` (incluido el `9`).
Definir el paso suele hacerse con una instrucción de incremento o decremento, como se muestra en el ejemplo anterior.

## Componentes opcionales de la cabecera

Los componentes de inicialización y post de la cabecera son opcionales:

```go
var sum = 1
for sum < 1000 {
	sum += sum
}
fmt.Println(sum)
// Output: 1024
```

Al omitir los componentes de inicialización y post en un bucle `for` como el anterior, creas un bucle `while` en Go.
No existe la palabra clave `while`.
Este es un ejemplo del principio de Go de que los conceptos deben ser ortogonales.
Como ya existe un concepto para lograr el comportamiento de un bucle `while`, concretamente el bucle `for`, `while` no se añadió como concepto adicional.

## `break` y `continue`

Dentro del cuerpo de un bucle puedes usar la palabra clave `break` para detener por completo la ejecución del bucle:

```go
for n := 0; n <= 5; n++ {
  if n == 3 {
    break
  }
  fmt.Println(n)
}
// Output:
// 0
// 1
// 2
```

En cambio, la palabra clave `continue` solo detiene la ejecución de la iteración actual y continúa con la siguiente:

```go
for n := 0; n <= 5; n++ {
  if n%2 == 0 {
    continue
  }
  fmt.Println(n)
}
// Output:
// 1
// 3
// 5
```

## Bucle `for` infinito

La parte de la condición de la cabecera del bucle también es opcional.
De hecho, puedes escribir un bucle sin cabecera:

```go
for {
  // Endless loop...
}
```

Este bucle solo terminará si el programa finaliza o si tiene un `break` en su cuerpo.

## Etiquetas y `goto`

Cuando usamos `break`, Go detiene la ejecución del bucle más interno.
De manera similar, cuando usamos `continue`, Go ejecuta la siguiente iteración del bucle más interno.

Sin embargo, esto no siempre es deseable.
Podemos usar etiquetas junto con `break` y `continue` para especificar exactamente de qué bucle queremos salir o continuar, respectivamente.

En este ejemplo creamos una etiqueta `OuterLoop`, que hará referencia al bucle más externo.
En el bucle más interno, para indicar que queremos salir del bucle más externo, usamos `break` seguido del nombre de la etiqueta del bucle más externo:

```go
OuterLoop:
    for i := 0; i < 10; i++ {
        for j := 0; j < 10; j++ {
            // ...
            break OuterLoop
        }
    }
```

Usar etiquetas con `continue` también funcionaría; en ese caso, Go continuaría con la siguiente iteración del bucle al que hace referencia la etiqueta.

Go también tiene una palabra clave `goto` que funciona de manera similar y nos permite saltar de un fragmento de código a otro fragmento etiquetado.

**Advertencia:** Aunque Go permite saltar a un fragmento de código marcado con una etiqueta, usar esta funcionalidad del lenguaje puede hacer que el código sea muy difícil de leer con facilidad.
Por este motivo, a menudo no se recomienda usar etiquetas.
