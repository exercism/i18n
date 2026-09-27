# método demasiado largo

Considera dividir el siguiente método o métodos en llamadas a otros métodos con un significado semántico propio: `%{methodNames}`

El método tiene más líneas de código de las que este ejercicio suele requerir.
Puede que sea aceptable, pero podría ser un indicio de que el método está haciendo demasiado trabajo directamente y debería delegar parte de ese trabajo en otros métodos.
Intenta mantener todo lo que hay dentro de un método en un solo nivel de abstracción.
Por ejemplo, recorrer los elementos de un bucle podría estar en un método, mientras que manipular cada elemento individual podría estar en otro.
