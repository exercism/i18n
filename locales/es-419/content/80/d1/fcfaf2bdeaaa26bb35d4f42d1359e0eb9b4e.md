# Instrucciones

Este ejercicio aborda el análisis de archivos de log.

Después de una revisión de seguridad reciente, te pidieron que limpiaras los archivos de log archivados de la organización.

Está garantizado que todos los strings que se pasan a las funciones no son nulos y no tienen espacios al principio ni al final.

## 1. Identifica las líneas de log corruptas

Necesitas hacerte una idea de cuántas líneas de log de tu archivo no cumplen con los estándares actuales.
Crees que una prueba simple revela si una línea de log es válida.
Para considerarse válida, una línea debe comenzar con uno de los siguientes strings:

- [TRC]
- [DBG]
- [INF]
- [WRN]
- [ERR]
- [FTL]

Implementa la función `IsValidLine` para que devuelva `false` si un string no es válido y `true` en caso contrario.

```go
IsValidLine("[ERR] A good error here")
// => true
IsValidLine("Any old [ERR] text")
// => false
IsValidLine("[BOB] Any old text")
// => false
```

## 2. Divide la línea de log

Un equipo nuevo se unió a la organización y descubres que sus archivos de log usan un separador extraño para los «campos».
En lugar de algo sensato como dos puntos «:», usan un string como «<--->» o «<=>» (porque es más bonito); de hecho, cualquier string cuyo primer carácter sea «<» y cuyo último carácter sea «>» y que tenga en medio cualquier combinación de los siguientes caracteres: «~», «\*», «=» y «-».

Implementa la función `SplitLogLine`, que recibe una línea y devuelve un array de strings, cada uno de los cuales contiene un campo.

```go
SplitLogLine("section 1<*>section 2<~~~>section 3")
// => []string{"section 1", "section 2", "section 3"},
```

## 3. Cuenta el número de líneas que contienen `password` en texto entre comillas

El equipo necesita conocer las referencias a contraseñas en texto entre comillas para poder examinarlas manualmente.

Implementa la función `CountQuotedPasswords` para darte una idea de la magnitud probable del trabajo manual.

Identifica las líneas de log donde el string «password», que puede estar en cualquier combinación de mayúsculas y minúsculas, está rodeado de comillas.
Debes tener en cuenta la posibilidad de que haya contenido adicional entre las comillas, antes y después de «password».
Cada línea contendrá como máximo dos comillas.

Las líneas que se pasan a la rutina pueden ser válidas o no según lo definido en la tarea 1.
Las procesamos de la misma manera, sean válidas o no.

```go
lines := []string{
    `[INF] passWord`, // contains 'password' but not surrounded by quotation marks
    `"passWord"`,  // count this one
    `[INF] User saw error message "Unexpected Error" on page load.`, // does not contain 'password'
    `[INF] The message "Please reset your password" was ignored by the user`, // count this one
}
// => 2
```

## 4. Elimina los artefactos del log

Has descubierto que algún procesamiento anterior de los logs ha estado dispersando por todos los logs el texto «end-of-line» seguido de un número de línea (sin un espacio intermedio).

Implementa la función `RemoveEndOfLineText` para que reciba un string, elimine el texto end-of-line y devuelva un string «limpio».

Las líneas que no contengan el texto end-of-line deben devolverse sin modificaciones.

Solo elimina el string end-of-line.
No intentes ajustar los espacios en blanco.

```go
RemoveEndOfLineText("[INF] end-of-line23033 Network Failure end-of-line27")
// => "[INF]  Network Failure "
```

## 5. Etiqueta las líneas con nombres de usuario

Te has dado cuenta de que algunas de las líneas de log incluyen oraciones que se refieren a usuarios.
Estas oraciones siempre contienen el string `"User"`, seguido de uno o más espacios y luego un nombre de usuario.
Decides etiquetar esas líneas.

Implementa una función `TagWithUserName` que procese líneas de log:

- Las líneas que no contengan el string `"User "` permanecen sin cambios.
- En las líneas que contengan el string `"User "`, antepón a la línea `[USR]` seguido del nombre de usuario.

Por ejemplo:

```go
result := TagWithUserName([]string{
    "[WRN] User James123 has exceeded storage space.",
	"[WRN] Host down. User   Michelle4 lost connection.",
	"[INF] Users can login again after 23:00.",
	"[DBG] We need to check that user names are at least 6 chars long.",
})
// => []string {
//  "[USR] James123 [WRN] User James123 has exceeded storage space.",
//  "[USR] Michelle4 [WRN] Host down. User   Michelle4 lost connection.",
//  "[INF] Users can login again after 23:00.",
//  "[DBG] We need to check that user names are at least 6 chars long."
// }
```

Puedes asumir que:

- Los nombres de usuario van seguidos de al menos un carácter de espacio en blanco en el log.
- Hay como máximo una aparición del string `"User "` en cada línea.
- Los nombres de usuario son strings no vacíos que no contienen espacios en blanco.
