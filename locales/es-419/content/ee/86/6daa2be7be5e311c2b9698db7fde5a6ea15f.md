# Método demasiado largo

Considera dividir los siguientes métodos en llamadas a otros métodos con un significado semántico propio: `%{methodNames}`

El método tiene más líneas de código de las que este ejercicio suele requerir.
Esto podría ser aceptable, pero también podría indicar que el método está haciendo demasiado trabajo directamente y que debería delegar parte de ese trabajo a otros métodos.
Intenta mantener todo lo que está dentro de un método en un mismo nivel de abstracción.
Por ejemplo, recorrer los elementos de un bucle podría estar en un método, mientras que manipular cada elemento individual podría estar en otro.
