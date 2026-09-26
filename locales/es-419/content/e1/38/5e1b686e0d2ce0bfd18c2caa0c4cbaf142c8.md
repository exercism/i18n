# Acerca de

## Sintaxis general

El bucle for es una de las sentencias que más se usan para ejecutar una misma lógica repetidamente.
En Go consta de la palabra clave `for`, un encabezado y un bloque de código que contiene el cuerpo del bucle entre llaves.
El encabezado consta de 3 componentes separados por puntos y coma `;`: init, condición y post.

```go
for init; condition; post {
  // loop body - code that is executed repeatedly as long as the condition is true
}
```

- El componente **init** es código que se ejecuta solo una vez antes de que el bucle comience.
- El componente **condición** debe ser una expresión que evalúe a un Boolean y que controle cuándo debe detenerse el bucle.
  El código dentro del bucle se ejecutará mientras esta condición evalúe a true.
  En cuanto esta expresión evalúe a false, no se ejecutarán más iteraciones del bucle.
- El componente **post** es código que se ejecuta al final de cada iteración.

**Nota:** A diferencia de otros lenguajes, no hay paréntesis `()` alrededor de los tres componentes del encabezado.
De hecho, incluir esos paréntesis es un error de compilación.
Sin embargo, las llaves `{ }` que rodean el cuerpo del bucle siempre son obligatorias.

## Bucles for: un ejemplo

Por lo general, el componente init inicializa una variable contadora, la condición verifica si el bucle debe continuar o detenerse, y el componente post incrementa el contador al final de cada repetición.

```go
for i := 1; i < 10; i++ {
  fmt.Println(i)
}
```

Este bucle imprimirá los números del `1` al `9` (incluido el `9`).
Definir el paso suele hacerse con una sentencia de incremento o decremento, como se muestra en el ejemplo anterior.

## Componentes opcionales del encabezado

Los componentes init y post del encabezado son opcionales:

```go
var sum = 1
for sum < 1000 {
	sum += sum
}
fmt.Println(sum)
// Output: 1024
```

Al omitir los componentes init y post en un bucle for como el que se muestra arriba, creas un bucle while en Go.
No existe la palabra clave `while`.
Este es un ejemplo del principio de Go de que los conceptos deben ser ortogonales.
Como ya existe un concepto para lograr el comportamiento de un bucle while, a saber, el bucle for, no se agregó `while` como un concepto adicional.

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

## Bucle for infinito

La parte de la condición del encabezado del bucle también es opcional.
De hecho, puedes escribir un bucle sin encabezado:

```go
for {
  // Endless loop...
}
```

Este bucle solo terminará si el programa finaliza o si tiene un `break` en su cuerpo.

## Etiquetas y goto

Cuando usamos `break`, Go detiene la ejecución del bucle más interno.
De manera similar, cuando usamos `continue`, Go ejecuta la siguiente iteración del bucle más interno.

Sin embargo, esto no siempre es lo que queremos.
Podemos usar etiquetas junto con `break` y `continue` para especificar exactamente de qué bucle queremos salir o en cuál queremos continuar, respectivamente.

En este ejemplo creamos una etiqueta `OuterLoop` que hará referencia al bucle más externo.
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

Go también tiene la palabra clave `goto`, que funciona de manera similar y nos permite saltar de un fragmento de código a otro fragmento de código marcado con una etiqueta.

**Advertencia:** Aunque Go permite saltar a un fragmento de código marcado con una etiqueta, usar esta funcionalidad del lenguaje puede hacer que el código sea muy difícil de leer con facilidad.
Por esta razón, a menudo no se recomienda usar etiquetas.
