# Flujo de trabajo «No important files changed»

Cuando se fusiona un PR de un track que afecta a un ejercicio, hace que se vuelvan a probar _todas_ las últimas iteraciones publicadas de las soluciones de los estudiantes.
Para los ejercicios populares, es una operación _muy_ costosa (¡70.000 ejecuciones de pruebas para el Hello World de Python, como caso extremo!).

Este flujo de trabajo comprueba si los cambios de un PR provocarían que se vuelvan a probar las soluciones y, de ser así, añade un comentario en el que explica el riesgo de fusionar el PR _tal cual_.
También explica cómo fusionar el PR sin volver a probar las soluciones.

Para obtener más información, consulta la documentación [Evitar ejecuciones de pruebas innecesarias](https://exercism.org/docs/building/tracks#h-avoiding-triggering-unnecessary-test-runs).

## Origen

El flujo de trabajo se define en el archivo `.github/workflows/no-important-files-changed.yml`.
