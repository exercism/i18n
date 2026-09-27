# Sobre

O [Pony](http://www.ponylang.org) é uma linguagem de programação orientada a objetos, baseada no modelo de atores e segura quanto a capacidades, focada em fazer as coisas acontecerem.

É orientada a objetos porque tem classes e objetos, como o Python, o Java, o C++ e muitas outras linguagens. É baseada no modelo de atores porque tem atores (à semelhança do Erlang ou do Akka). Estes comportam-se como objetos, mas também podem executar código de forma assíncrona. Os atores são o que torna o Pony espetacular.
Quando dizemos que o Pony é seguro quanto a capacidades, queremos dizer várias coisas:

- É segura em termos de tipos. Mesmo segura em termos de tipos. Há uma prova matemática e tudo.
- É segura em termos de memória. Está bem, isso vem com a segurança de tipos, mas continua a ser interessante. Não há apontadores pendentes, não há transbordos de buffer e, pasme-se, a linguagem nem sequer tem o conceito de null!
- É segura em termos de exceções. Não há exceções em tempo de execução. Todas as exceções têm semântica definida e são sempre tratadas.
- É livre de corridas de dados. O Pony não tem bloqueios, nem operações atómicas, nem nada do género. Em vez disso, o sistema de tipos garante, em tempo de compilação, que o teu programa concorrente nunca poderá ter corridas de dados. Assim, podes escrever código altamente concorrente e nunca te enganares.
- É livre de impasses. Esta é fácil, porque o Pony não tem bloqueios nenhuns! Por isso, é certo que nunca entram em impasse, porque não existem.

Quem está a começar deve seguir primeiro o [tutorial](https://tutorial.ponylang.org/).
