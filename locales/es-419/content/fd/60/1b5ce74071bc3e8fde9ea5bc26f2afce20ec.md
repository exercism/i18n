# Instrucciones

Llevas un tiempo trabajando en la oficina de la ciudad y has desarrollado un conjunto de herramientas que agilizan tu trabajo diario, por ejemplo, para rellenar formularios.

Ahora se te une un nuevo colega y te diste cuenta de que puede que tus herramientas no se expliquen por sí solas.
Hay muchas convenciones raras en tu oficina, como rellenar siempre los formularios con letras mayúsculas y evitar dejar campos vacíos.

Como primer paso, decides añadir declaraciones de tipos de PHP para que a tu nuevo colega le resulte más fácil sumarse y empezar a usar tus herramientas.

## 1. Declara los tipos para la clase Address

Añade declaraciones de tipo de propiedad a cada una de las propiedades declaradas de la clase `Address`.
Cada propiedad de la clase debe declararse como string.

## 2. Declara los tipos para rellenar el formulario con valores en blanco

Añade una declaración de tipo de parámetro y una declaración de tipo de retorno al método `blanks` de la clase `Form`.
El método debe recibir una longitud entera y devolver una representación en forma de string de la línea en blanco.

## 3. Declara el tipo al dividir un valor en letras separadas

Añade una declaración de tipo de parámetro y una declaración de tipo de retorno al método `letters` de la clase `Form`.
El método debe recibir un string, que representa palabras, y devolver un array de letras.

## 4. Declara el tipo al comprobar si un valor cabe en un formulario

Añade declaraciones de tipo de parámetro y una declaración de tipo de retorno al método `checkLength` de la clase `Form`.
El método debe recibir una palabra en forma de string y una longitud máxima entera, y devolver un valor verdadero o falso.

## 5. Declara el tipo al dar formato a una dirección en el formulario

Añade una declaración de tipo de parámetro, haciendo uso de la clase `Address` que actualizaste antes, y una declaración de tipo de retorno al método `formatAddress` de la clase `Form`.
El método debe recibir un `Address` y devolver un string con formato.
