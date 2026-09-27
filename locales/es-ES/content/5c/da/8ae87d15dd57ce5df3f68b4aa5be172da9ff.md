# Acerca de

[Pony](http://www.ponylang.org) es un lenguaje de programación orientado a objetos, con modelo de actores y seguro en cuanto a capacidades, centrado en hacer las cosas.

Es orientado a objetos porque tiene clases y objetos, como Python, Java, C++ y muchos otros lenguajes. Tiene modelo de actores porque tiene actores (parecidos a los de Erlang o Akka). Estos se comportan como objetos, pero además pueden ejecutar código de forma asíncrona. Los actores hacen que Pony sea genial.
Cuando decimos que Pony es seguro en cuanto a capacidades, nos referimos a varias cosas:

- Es seguro en cuanto a tipos. De verdad, seguro en cuanto a tipos. Hay hasta una demostración matemática.
- Es seguro en cuanto a memoria. Vale, eso viene incluido con la seguridad de tipos, pero sigue siendo interesante. No hay punteros colgantes ni desbordamientos de búfer y, es más, ¡el lenguaje ni siquiera tiene el concepto de null!
- Es seguro en cuanto a excepciones. No hay excepciones en tiempo de ejecución. Todas las excepciones tienen una semántica definida y siempre se gestionan.
- Está libre de carreras de datos. Pony no tiene bloqueos ni operaciones atómicas ni nada por el estilo. En su lugar, el sistema de tipos garantiza en tiempo de compilación que tu programa concurrente nunca pueda tener carreras de datos. Así puedes escribir código muy concurrente sin equivocarte nunca.
- Está libre de interbloqueos. Esta es fácil, ¡porque Pony no tiene bloqueos de ningún tipo! Así que desde luego no se interbloquean, porque no existen.

Quienes se inicien en Pony deberían empezar por el [tutorial](https://tutorial.ponylang.org/).
