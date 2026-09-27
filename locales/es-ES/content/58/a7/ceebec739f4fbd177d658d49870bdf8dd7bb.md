# Instrucciones

Calcula la distancia de Hamming entre dos cadenas de ADN.

Una mutación no es más que un error que se produce durante la creación o
la copia de un ácido nucleico, en particular del ADN. Dado que los ácidos
nucleicos son vitales para las funciones celulares, las mutaciones tienden
a provocar un efecto en cadena por toda la célula. Aunque las mutaciones
son técnicamente errores, una mutación muy poco frecuente puede dotar a la
célula de un atributo beneficioso. De hecho, los efectos macro de la
evolución se deben al resultado acumulado de mutaciones microscópicas
beneficiosas a lo largo de muchas generaciones.

El tipo más simple y más común de mutación de ácido nucleico es la mutación
puntual, que reemplaza una base por otra en un único nucleótido.

Al contar el número de diferencias entre dos cadenas de ADN homólogas
tomadas de genomas distintos con un antepasado común, obtenemos una medida
del número mínimo de mutaciones puntuales que podrían haber ocurrido en el
camino evolutivo entre las dos cadenas.

Esto se conoce como la «distancia de Hamming»

    GAGCCTACTAACGGGAT
    CATCGTAATGACGGCCT
    ^ ^ ^  ^ ^    ^^

La distancia de Hamming entre estas dos cadenas de ADN es 7.

# Notas de implementación

La distancia de Hamming solo está definida para secuencias de la misma
longitud. Por lo tanto, puedes suponer que a tu función de distancia de
Hamming solo se le pasarán secuencias de la misma longitud.

**Nota: Este problema está obsoleto; ha sido sustituido por el llamado `hamming`.**
