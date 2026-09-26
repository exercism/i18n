# Sobre

Coq é uma linguagem de programação e um sistema lógico ao mesmo tempo, baseada na [correspondência de Curry-Howard](https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence).
Para ser um sistema lógico significativo, a linguagem foi projetada de modo que qualquer programa escrito em Coq tenha garantia de terminação.
Por isso, o Coq raramente é usado para fins gerais; em vez disso, ele permite desenvolver *teorias matemáticas* e escrever *programas certificados*.

O Coq também é um assistente de provas interativo.
Ele não resolve teoremas automaticamente, mas ajuda o usuário a construir provas por meio de táticas.
A linguagem de táticas (Ltac) é uma linguagem própria, que permite automatizar partes das provas.
Um script de prova bem escrito se parece com uma prova informal escrita em prosa.

As principais áreas de aplicação e pesquisa que usam o Coq incluem:

* Matemática (teoria dos números, teoria dos conjuntos, teoria da lógica, teoria da computabilidade, álgebra, geometria, ...)
* Linguagens de programação (compiladores, modelos de execução, otimizações de compilador, sistema de tipos, ...)
* Algoritmos certificados (correção e terminação de algoritmos) e extração para uma linguagem de uso geral (geralmente OCaml ou Haskell)

Desenvolvimentos notáveis em Coq incluem:

* Prova do [Problema das Quatro Cores](https://madiot.fr/coq100/#32) verificada por máquina
* [CompCert](http://compcert.inria.fr/compcert-C.html), um compilador C certificado

Se você tem interesse em Coq mas ainda não aprendeu, muitas vezes recomenda-se começar pela série [Software Foundations](https://softwarefoundations.cis.upenn.edu/).
Especialmente os primeiros capítulos (até "IndProp") darão os fundamentos que você precisa antes de começar a trabalhar em conceitos e teorias mais interessantes.
Você também pode achar [outros recursos](https://coq.inria.fr/documentation) interessantes.

As discussões sobre Coq e sobre desenvolvimentos que usam Coq costumam acontecer no [Reddit /r/coq](https://www.reddit.com/r/Coq/) e no [Discourse](https://coq.discourse.group/latest).
Se você tiver dúvidas, também pode buscar ajuda no [StackOverflow](https://stackoverflow.com/questions/tagged/coq?sort=newest&pageSize=50); não se esqueça de marcar sua pergunta com a tag "coq".