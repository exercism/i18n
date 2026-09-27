# Introducción

Los diccionarios en Cairo proporcionan una forma de almacenar y recuperar pares clave-valor, similares a las tablas hash o diccionarios en otros lenguajes.
Sin embargo, debido al modelo de memoria único de Cairo y su papel en la generación de pruebas computacionales, funcionan de manera bastante diferente en su interior: ofrecen operaciones de complejidad $O(n)$ y validación automática mediante un proceso llamado «squashing».
Entender en qué se diferencian los diccionarios de Cairo de sus equivalentes en otros lenguajes es esencial para escribir programas de Cairo eficientes.
