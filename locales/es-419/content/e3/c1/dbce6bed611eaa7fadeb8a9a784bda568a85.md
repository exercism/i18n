# Anexo de instrucciones

Cuenta las letras sin distinguir mayúsculas de minúsculas y sin contar los caracteres que no sean letras, y devuelve un diccionario que va de letras minúsculas a sus conteos.

Usa `pf.Parallel.map!(items, { workers, task })` de la [plataforma roc-parallel](https://github.com/ageron/roc-parallel) para procesar los `items` dados con una función `task` pura, en paralelo a través de varios hilos (indicados por `workers`). Los resultados se devuelven en el orden de entrada una vez que se han procesado todos los elementos. Solo necesitas editar `ParallelLetterFrequency.roc`.

Sugerencia: te recomendamos usar la [biblioteca de Unicode](https://github.com/roc-lang/unicode) para la conversión de mayúsculas y minúsculas y la detección de letras. En particular, revisa `unicode.Case.to_lower`, `unicode.GeneralCategory.of_scalar`, `unicode.Scalar.iter` y `unicode.Scalar.to_str`. Trata las letras como valores escalares de Unicode; no se requiere normalización Unicode.

Nota: A diferencia de la mayoría de los otros ejercicios, este ejercicio usa funciones con efectos. Por ahora, la sentencia `expect` de Roc no puede llamar a funciones con efectos, así que en este ejercicio las pruebas no usan `expect` ni `roc test` en absoluto. En su lugar, las pruebas se ejecutan con `roc --opt=speed` y cualquier error que devuelva el código de Roc lo reporta la plataforma, con un formato distinto al habitual.

También puedes revisar el ejercicio `bank-account`, que explora otra cara de la concurrencia: aplicar actualizaciones de forma segura a un estado compartido.
