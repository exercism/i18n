# Sobre

O Coq é, ao mesmo tempo, uma linguagem de programação e um sistema lógico, baseado na [correspondência de Curry-Howard](https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence).
Para que seja um sistema lógico com significado, a linguagem foi concebida de modo a que qualquer programa escrito em Coq tenha termininação garantida.
Por isso, o Coq raramente é usado para fins gerais; em vez disso, permite desenvolver *teorias em matemática* e escrever *programas certificados*.

O Coq é também um assistente de prova interativo.
Não resolve teoremas automaticamente, mas ajuda o utilizador a construir provas através de táticas.
A linguagem de táticas (Ltac) é uma linguagem por si só, que permite automatizar partes das provas.
Um script de prova bem escrito assemelha-se a uma prova informal escrita em prosa.

As principais áreas de aplicação e de investigação que usam o Coq incluem:

* Matemática (teoria dos números, teoria dos conjuntos, teoria da lógica, teoria da computabilidade, álgebra, geometria, ...)
* Linguagens de programação (compiladores, modelos de execução, otimizações do compilador, sistema de tipos, ...)
* Algoritmos certificados (correção e terminação de algoritmos) e extração para uma linguagem de uso geral (normalmente Ocaml ou Haskell)

Entre os desenvolvimentos notáveis em Coq estão:

* Prova verificada por máquina do [Problema das Quatro Cores](https://madiot.fr/coq100/#32)
* O [CompCert](http://compcert.inria.fr/compcert-C.html), um compilador C certificado

Se estás interessado no Coq mas ainda não o aprendeste, aconselha-se muitas vezes começar pela série [Software Foundations](https://softwarefoundations.cis.upenn.edu/).
Em especial, os primeiros capítulos (até "IndProp") dar-te-ão os fundamentos de que precisas antes de começares a trabalhar em conceitos e teorias mais interessantes.
Talvez também aches interessantes os [outros recursos](https://coq.inria.fr/documentation).

As discussões sobre o Coq e sobre desenvolvimentos feitos com Coq acontecem normalmente no [Reddit /r/coq](https://www.reddit.com/r/Coq/) e no [Discourse](https://coq.discourse.group/latest).
Se tiveres dúvidas, também podes pedir ajuda no [StackOverflow](https://stackoverflow.com/questions/tagged/coq?sort=newest&pageSize=50); não te esqueças de etiquetar a tua pergunta com "coq".