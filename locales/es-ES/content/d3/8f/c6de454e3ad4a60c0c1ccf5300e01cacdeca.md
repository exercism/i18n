# Acerca de

Coq es un lenguaje de programación y un sistema lógico al mismo tiempo, basado en la [correspondencia de Curry-Howard](https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence).
Para ser un sistema lógico significativo, el lenguaje está diseñado de manera que cualquier programa escrito en Coq tenga garantizada su terminación.
Por ello, Coq rara vez se usa para fines generales; en cambio, permite desarrollar *teorías matemáticas* y escribir *programas certificados*.

Coq es también un asistente de demostraciones interactivo.
No resuelve los teoremas automáticamente, sino que ayuda al usuario a construir demostraciones mediante tácticas.
El lenguaje de tácticas (Ltac) es un lenguaje en sí mismo, que permite automatizar partes de las demostraciones.
Un script de demostración bien escrito se parece a una demostración informal escrita en prosa.

Las principales áreas de aplicación e investigación que usan Coq son:

* Matemáticas (teoría de números, teoría de conjuntos, teoría de la lógica, teoría de la computabilidad, álgebra, geometría, ...)
* Lenguajes de programación (compiladores, modelos de ejecución, optimizaciones de compilador, sistemas de tipos, ...)
* Algoritmos certificados (corrección y terminación de algoritmos) y extracción a un lenguaje de propósito general (normalmente OCaml o Haskell)

Entre los desarrollos destacados en Coq se incluyen:

* Demostración verificada por ordenador del [problema de los cuatro colores](https://madiot.fr/coq100/#32)
* [CompCert](http://compcert.inria.fr/compcert-C.html), un compilador de C certificado

Si te interesa Coq pero aún no lo has aprendido, a menudo se recomienda empezar por la serie [Software Foundations](https://softwarefoundations.cis.upenn.edu/).
En especial, los primeros capítulos (hasta «IndProp») te darán los fundamentos que necesitas antes de empezar a trabajar con conceptos y teorías más interesantes.
También pueden resultarte interesantes [otros recursos](https://coq.inria.fr/documentation).

Las conversaciones sobre Coq y los desarrollos que lo usan suelen tener lugar en [Reddit /r/coq](https://www.reddit.com/r/Coq/) y [Discourse](https://coq.discourse.group/latest).
Si tienes preguntas, también puedes obtener ayuda en [StackOverflow](https://stackoverflow.com/questions/tagged/coq?sort=newest&pageSize=50); no olvides etiquetar tu pregunta con «coq».