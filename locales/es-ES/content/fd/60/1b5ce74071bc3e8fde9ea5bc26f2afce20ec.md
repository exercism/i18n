# Instrucciones

Llevas un tiempo trabajando en la oficina municipal y has desarrollado un conjunto de herramientas que agilizan tu trabajo del día a día, por ejemplo para rellenar formularios.

Ahora se incorpora un nuevo compañero y te has dado cuenta de que puede que tus herramientas no se expliquen por sí solas.
En tu oficina hay un montón de convenciones raras, como rellenar siempre los formularios con letras mayúsculas y evitar dejar campos vacíos.

Como primer paso, decides añadir declaraciones de tipo de PHP para que tu nuevo compañero pueda empezar a usar tus herramientas enseguida.

## 1. Declara los tipos de la clase `Address`

Añade declaraciones de tipo a cada una de las propiedades declaradas de la clase `Address`.
Cada propiedad de la clase debe declararse como string.

## 2. Declara los tipos para rellenar el formulario con valores en blanco

Añade una declaración de tipo de parámetro y una declaración del tipo devuelto al método `blanks` de la clase `Form`.
El método debe recibir una longitud como entero y devolver una representación como string de la línea en blanco.

## 3. Declara el tipo al dividir un valor en letras individuales

Añade una declaración de tipo de parámetro y una declaración del tipo devuelto al método `letters` de la clase `Form`.
El método debe recibir un string que representa palabras y devolver un array de letras.

## 4. Declara el tipo al comprobar si un valor cabe en un formulario

Añade declaraciones de tipo de parámetro y una declaración del tipo devuelto al método `checkLength` de la clase `Form`.
El método debe recibir una palabra como string y una longitud máxima como entero, y devolver un valor verdadero o falso.

## 5. Declara el tipo al dar formato a una dirección en el formulario

Añade una declaración de tipo de parámetro, haciendo uso de la clase `Address` actualizada anteriormente, y una declaración del tipo devuelto al método `formatAddress` de la clase `Form`.
El método debe recibir un `Address` y devolver un string con formato.
