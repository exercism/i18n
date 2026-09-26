# Apéndice de instrucciones

## Implementación

Implementa los métodos `get` y `post` de la clase `RestAPI`.

Solo debes escribir las funciones manejadoras, sin implementar un servidor HTTP real.
Puedes simular la base de datos con un objeto en memoria que contenga todos los usuarios almacenados.
El constructor de la clase `RestAPI` debe aceptar una instancia de esta base de datos como argumento (y establecer un valor predeterminado si no se pasa ningún argumento).

Para esta implementación, en el caso de una petición `GET`, los datos deben formar parte de la URL y se deben manejar como parámetros de consulta, por ejemplo `/users?users=Adam,Bob`.
