# Flujo de trabajo «Ningún archivo importante cambió»

Cuando se fusiona un PR de un track que afecta a un ejercicio, se activa la reprobación de _todas_ las últimas iteraciones publicadas de las soluciones de los estudiantes.
Para los ejercicios populares, esta es una operación _muy_ costosa (¡70 000 ejecuciones de pruebas para el Hello World de Python, en el caso más extremo!).

Este flujo de trabajo verifica si los cambios de un PR activarían la reprobación de soluciones y, de ser así, agrega un comentario que explica el riesgo de fusionar el PR _tal como está_.
También explica cómo fusionar el PR sin volver a probar las soluciones.

Para obtener más información, consulta la documentación [Evitar que se activen ejecuciones de pruebas innecesarias](https://exercism.org/docs/building/tracks#h-avoiding-triggering-unnecessary-test-runs).

## Origen

El flujo de trabajo se define en el archivo `.github/workflows/no-important-files-changed.yml`.
