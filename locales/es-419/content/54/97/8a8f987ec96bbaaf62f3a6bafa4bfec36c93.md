# Introducción

Los diccionarios en Cairo ofrecen una forma de almacenar y recuperar pares clave-valor, similares a los mapas hash o diccionarios en otros lenguajes.
Sin embargo, debido al modelo de memoria único de Cairo y su papel en la generación de pruebas computacionales, funcionan de manera bastante diferente bajo el capó. Ofrecen operaciones de complejidad $O(n)$ y validación automática a través de un proceso llamado «squashing».
Entender en qué se diferencian los diccionarios de Cairo de sus equivalentes en otros lenguajes es esencial para escribir programas eficientes en Cairo.
