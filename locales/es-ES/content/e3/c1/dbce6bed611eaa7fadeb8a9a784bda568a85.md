# Anexo a las instrucciones

Cuenta las letras, ignorando si son mayúsculas o minúsculas y descartando lo que no sean letras, y devuelve un diccionario que asocie cada letra minúscula con su recuento.

Usa `pf.Parallel.map!(items, { workers, task })` de la [plataforma roc-parallel](https://github.com/ageron/roc-parallel) para procesar los `items` dados con una función `task` pura, en paralelo a través de varios hilos (indicados por `workers`). Los resultados se devuelven en el orden de entrada una vez procesados todos los elementos. Solo tienes que editar `ParallelLetterFrequency.roc`.

Sugerencia: te recomendamos usar la [biblioteca Unicode](https://github.com/roc-lang/unicode) para la conversión entre mayúsculas y minúsculas y la detección de letras. En concreto, echa un vistazo a `unicode.Case.to_lower`, `unicode.GeneralCategory.of_scalar`, `unicode.Scalar.iter` y `unicode.Scalar.to_str`. Trata las letras como valores escalares de Unicode; no hace falta normalización Unicode.

Nota: a diferencia de la mayoría de los demás ejercicios, este ejercicio usa funciones con efectos. Por ahora, la instrucción `expect` de Roc no puede llamar a funciones con efectos, así que en este ejercicio las pruebas no usan `expect` ni `roc test`. En su lugar, las pruebas se ejecutan con `roc --opt=speed` y cualquier error que devuelva el código de Roc lo comunica la plataforma, con un formato distinto de lo habitual.

También puede que quieras echar un vistazo al ejercicio `bank-account`, que explora otra cara de la concurrencia: aplicar actualizaciones de forma segura a un estado compartido.
