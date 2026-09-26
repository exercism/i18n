# Acerca de

Coq es un lenguaje de programación y un sistema lógico al mismo tiempo, basado en la [correspondencia de Curry-Howard](https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence).
Para ser un sistema lógico con sentido, el lenguaje está diseñado de manera que cualquier programa escrito en Coq tiene garantizado que termina.
Por eso, Coq rara vez se usa para fines generales; en cambio, permite desarrollar *teorías matemáticas* y escribir *programas certificados*.

Coq también es un asistente de demostración interactivo.
No resuelve los teoremas automáticamente, sino que ayuda al usuario a construir demostraciones mediante tácticas.
El lenguaje de tácticas (Ltac) es un lenguaje propio, que permite automatizar partes de las demostraciones.
Un script de demostración bien escrito se parece a una demostración informal escrita en prosa.

Las principales áreas de aplicación e investigación que usan Coq incluyen:

* Matemáticas (teoría de números, teoría de conjuntos, teoría de la lógica, teoría de la computabilidad, álgebra, geometría, ...)
* Lenguajes de programación (compiladores, modelos de ejecución, optimizaciones de compiladores, sistemas de tipos, ...)
* Algoritmos certificados (corrección y terminación de algoritmos) y extracción a un lenguaje de propósito general (normalmente Ocaml o Haskell)

Algunos desarrollos notables en Coq son:

* Demostración verificada por computadora del [problema de los cuatro colores](https://madiot.fr/coq100/#32)
* [CompCert](http://compcert.inria.fr/compcert-C.html), un compilador de C certificado

Si te interesa Coq pero todavía no lo has aprendido, muchas veces se recomienda empezar con la serie [Software Foundations](https://softwarefoundations.cis.upenn.edu/).
En especial, los primeros capítulos (hasta «IndProp») te darán los fundamentos que necesitas antes de empezar a trabajar con conceptos y teorías más interesantes.
Quizá también te resulten interesantes [otros recursos](https://coq.inria.fr/documentation).

Las conversaciones sobre Coq y sobre los desarrollos hechos con Coq suelen darse en [Reddit /r/coq](https://www.reddit.com/r/Coq/) y [Discourse](https://coq.discourse.group/latest).
Si tienes preguntas, también puedes conseguir ayuda en [StackOverflow](https://stackoverflow.com/questions/tagged/coq?sort=newest&pageSize=50); no olvides etiquetar tu pregunta con «coq».