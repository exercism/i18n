# Instrucciones

Calcula la diferencia de Hamming entre dos cadenas de ADN.

Una mutación no es más que un error que ocurre durante la creación o la
copia de un ácido nucleico, en particular del ADN. Como los ácidos
nucleicos son vitales para las funciones celulares, las mutaciones suelen
provocar un efecto en cadena en toda la célula. Aunque técnicamente las
mutaciones son errores, una mutación muy poco frecuente puede dotar a la
célula de un atributo beneficioso. De hecho, los macroefectos de la
evolución se deben al resultado acumulado de mutaciones microscópicas
beneficiosas a lo largo de muchas generaciones.

El tipo más simple y más común de mutación de ácidos nucleicos es la
mutación puntual, que reemplaza una base por otra en un solo nucleótido.

Al contar el número de diferencias entre dos cadenas de ADN homólogas
tomadas de genomas distintos con un ancestro común, obtenemos una medida
del número mínimo de mutaciones puntuales que pudieron haber ocurrido en
el camino evolutivo entre las dos cadenas.

Esto se llama la «distancia de Hamming»

    GAGCCTACTAACGGGAT
    CATCGTAATGACGGCCT
    ^ ^ ^  ^ ^    ^^

La distancia de Hamming entre estas dos cadenas de ADN es 7.

# Notas de implementación

La distancia de Hamming solo está definida para secuencias de igual longitud.
Por lo tanto, puedes asumir que a tu función de distancia de Hamming solo se
le pasarán secuencias de igual longitud.

**Nota: Este problema está obsoleto; fue reemplazado por el que se llama `hamming`.**
